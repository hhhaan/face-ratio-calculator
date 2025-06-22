import { useState, useEffect, useCallback, useRef } from 'react';
import { initializeVisionModels } from '@/shared/lib/mediapipe';
import { FaceDetector, FaceLandmarker } from '@mediapipe/tasks-vision';
import { FACE_DETECTION_CONFIG } from '@/features/face-detection/config';
import { drawHorizontalLine, drawBox } from '@/features/canvas/utils';

export const useFaceDetector = ({
    videoRef,
    isVideoLoaded,
    isFreezed,
    boxHeight,
}: {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    isVideoLoaded: boolean;
    isFreezed: boolean;
    boxHeight: number;
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const tempCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    const boxHeightRef = useRef<number>(boxHeight);

    const [faceDetector, setFaceDetector] = useState<FaceDetector | null>(null);
    const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);

    const [faceRatios, setFaceRatios] = useState<{
        forehead: number;
        midFace: number;
        lowerFace: number;
    }>({
        forehead: 0,
        midFace: 0,
        lowerFace: 0,
    });

    useEffect(() => {
        boxHeightRef.current = boxHeight;
    }, [boxHeight]);

    // 프레임 관련 변수들을 useRef로 관리하여 렌더링 사이에도 값이 유지되도록 함
    const frameRef = useRef({
        lastFrameTime: 0,
        fps: 8,
        frameInterval: 1000 / 8, // 8 FPS
    });

    // useEffect에서 한 번만 생성
    useEffect(() => {
        // 임시 캔버스 초기화
        tempCanvasRef.current = document.createElement('canvas');
        tempCtxRef.current = tempCanvasRef.current.getContext('2d', { alpha: false });

        // 컴포넌트 언마운트 시 정리
        return () => {
            if (tempCanvasRef.current) {
                tempCanvasRef.current = null;
                tempCtxRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const init = async () => {
            try {
                const { landmarker, detector } = await initializeVisionModels();
                setFaceDetector(detector);
                setFaceLandmarker(landmarker);
            } catch (error) {
                console.error('Failed to initialize vision models:', error);
            }
        };
        init();
    }, []);

    const detectFace = useCallback(async () => {
        if (!faceDetector || !faceLandmarker) {
            console.error('Face detector or landmarker not initialized');
            return;
        }

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d', { alpha: false });

        if (!video || !canvas || !ctx) {
            console.error('Video, canvas, or context not found');
            return;
        }

        // 원본 크기 저장
        const originalWidth = video.videoWidth || 640;
        const originalHeight = video.videoHeight || 480;

        // 0.7 비율로 처리
        const scale = 0.7;

        // 처리용 임시 캔버스 생성
        const tempCanvas = tempCanvasRef.current;
        const tempCtx = tempCtxRef.current;
        if (!tempCanvas || !tempCtx) return;

        if (tempCanvas.width !== originalWidth * scale || tempCanvas.height !== originalHeight * scale) {
            tempCanvas.width = originalWidth * scale;
            tempCanvas.height = originalHeight * scale;
        }

        tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

        // 축소된 이미지로 감지 수행
        const detections = faceDetector.detect(tempCanvas);
        const landmarkResult = faceLandmarker.detect(tempCanvas);

        // 원본 크기의 캔버스 설정
        canvas.width = originalWidth;
        canvas.height = originalHeight;

        // 원본 비디오 프레임 그리기
        ctx.fillStyle = FACE_DETECTION_CONFIG.lineColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        detections.detections.forEach((detection) => {
            const box = detection.boundingBox;
            if (!box || !faceDetector || !faceLandmarker) return;

            // 스케일에 맞게 좌표 조정
            const scaledBox = {
                originX: box.originX / scale,
                originY: box.originY / scale,
                width: box.width / scale,
                height: box.height / scale,
            };

            const adjustedExtensionRatio = FACE_DETECTION_CONFIG.baseExtensionRatio + boxHeightRef.current;

            const extendedBox = {
                originX: scaledBox.originX,
                originY: scaledBox.originY - scaledBox.height * adjustedExtensionRatio,
                width: scaledBox.width,
                height: scaledBox.height * (1 + adjustedExtensionRatio),
            };

            if (landmarkResult.faceLandmarks.length > 0) {
                const landmarks = landmarkResult.faceLandmarks[0];

                const leftEyebrowLower = landmarks[282];
                const rightEyebrowLower = landmarks[52];
                const noseBottom = landmarks[94];

                const eyebrowBottomY = (leftEyebrowLower.y + rightEyebrowLower.y) / 2;
                const hairlineY = extendedBox.originY;

                const eyebrowLineY = eyebrowBottomY * canvas.height;
                const noseBottomY = noseBottom.y * canvas.height;
                const chinBottomY = extendedBox.originY + extendedBox.height;

                const foreheadHeight = eyebrowLineY - hairlineY;
                const midFaceHeight = noseBottomY - eyebrowLineY;
                const lowerFaceHeight = chinBottomY - noseBottomY;

                const totalHeight = extendedBox.height;

                setFaceRatios({
                    forehead: Number(((foreheadHeight / totalHeight) * 100).toFixed(1)),
                    midFace: Number(((midFaceHeight / totalHeight) * 100).toFixed(1)),
                    lowerFace: Number(((lowerFaceHeight / totalHeight) * 100).toFixed(1)),
                });

                drawBox(
                    ctx,
                    extendedBox.originX,
                    extendedBox.originY,
                    extendedBox.width,
                    extendedBox.height,
                    FACE_DETECTION_CONFIG.lineColor,
                    FACE_DETECTION_CONFIG.lineWidth
                );

                // 눈썹 아래 라인
                drawHorizontalLine(ctx, extendedBox.originX, eyebrowLineY, extendedBox.width);

                // 코 아래 라인
                drawHorizontalLine(ctx, extendedBox.originX, noseBottomY, extendedBox.width);
            }
        });
    }, [videoRef, faceDetector, faceLandmarker, setFaceRatios]);

    // 애니메이션 루프
    useEffect(() => {
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!isFreezed) {
                // 현재 시간과 마지막 프레임 시간의 차이 계산
                const elapsed = timestamp - frameRef.current.lastFrameTime;

                // 설정한 프레임 간격보다 많은 시간이 지났는지 확인
                if (elapsed >= frameRef.current.frameInterval) {
                    // 얼굴 감지 실행
                    detectFace();

                    // 마지막 프레임 시간 업데이트 (타이밍 정확도를 위한 보정 포함)
                    frameRef.current.lastFrameTime = timestamp - (elapsed % frameRef.current.frameInterval);
                }

                // 다음 애니메이션 프레임 요청
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        if (faceDetector && faceLandmarker && isVideoLoaded && !isFreezed) {
            // 첫 프레임에서 lastFrameTime 초기화를 위해 timestamp 전달
            animationFrameId = requestAnimationFrame(animate);

            return () => {
                cancelAnimationFrame(animationFrameId);
            };
        }
    }, [detectFace, faceDetector, faceLandmarker, isVideoLoaded, isFreezed]); // boxHeight 의존성 제거

    return { faceDetector, faceLandmarker, faceRatios, canvasRef, detectFace };
};
