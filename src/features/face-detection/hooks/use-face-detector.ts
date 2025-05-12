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

    const boxHeightRef = useRef<number>(boxHeight);

    useEffect(() => {
        boxHeightRef.current = boxHeight;
    }, [boxHeight]);

    // 프레임 관련 변수들을 useRef로 관리하여 렌더링 사이에도 값이 유지되도록 함
    const frameRef = useRef({
        lastFrameTime: 0,
        fps: 10,
        frameInterval: 1000 / 10, // 15 FPS
    });

    useEffect(() => {
        if (isVideoLoaded && videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
        }
    }, [isVideoLoaded, videoRef]);

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

        ctx.fillStyle = FACE_DETECTION_CONFIG.lineColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const detections = faceDetector.detect(canvas);
        detections.detections.forEach((detection) => {
            const box = detection.boundingBox;
            if (!box || !faceDetector || !faceLandmarker) return;

            const adjustedExtensionRatio = FACE_DETECTION_CONFIG.baseExtensionRatio + boxHeightRef.current;

            const extendedBox = {
                originX: box.originX,
                originY: box.originY - box.height * adjustedExtensionRatio,
                width: box.width,
                height: box.height * (1 + adjustedExtensionRatio),
            };

            const landmarkResult = faceLandmarker.detect(canvas);
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

                // // 기준선 그리기
                // drawHorizontalLine(ctx, extendedBox.originX, hairlineY, extendedBox.width);

                // 눈썹 아래 라인
                drawHorizontalLine(ctx, extendedBox.originX, eyebrowLineY, extendedBox.width);

                // 코 아래 라인
                drawHorizontalLine(ctx, extendedBox.originX, noseBottomY, extendedBox.width);

                // 턱 끝
                // drawHorizontalLine(ctx, extendedBox.originX, chinBottomY, extendedBox.width);
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
