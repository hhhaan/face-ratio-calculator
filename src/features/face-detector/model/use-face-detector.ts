import { useState, useEffect, useCallback, useRef } from 'react';
import { FilesetResolver, FaceDetector, FaceLandmarker } from '@mediapipe/tasks-vision';

export const useFaceDetector = ({
    videoRef,
    isVideoLoaded,
    isFreezed,
    boxHeight,
}: // setIsFreezed,
{
    videoRef: React.RefObject<HTMLVideoElement | null>;
    isVideoLoaded: boolean;
    isFreezed: boolean;
    boxHeight: number;
    // setIsFreezed: (isFreezed: boolean) => void;
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

    const initializeVisionModels = async () => {
        try {
            const vision = await FilesetResolver.forVisionTasks(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
            );

            // FaceLandmarker 초기화
            const landmarker = await FaceLandmarker.createFromModelPath(
                vision,
                'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task'
            );
            setFaceLandmarker(landmarker);

            // FaceDetector 초기화
            const detector = await FaceDetector.createFromModelPath(
                vision,
                'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite'
            );
            setFaceDetector(detector);

            console.log('Vision models initialized successfully');
        } catch (error) {
            console.error('Failed to initialize vision models:', error);
            throw error;
        }
    };

    useEffect(() => {
        initializeVisionModels();
    }, []);

    const detectFace = useCallback(async () => {
        if (!faceDetector || !faceLandmarker) {
            console.error('Face detector or landmarker not initialized');
            return;
        }

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (!video || !canvas || !ctx) {
            console.error('Video, canvas, or context not found');
            return;
        }

        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;

        ctx.fillStyle = 'rgba(0,0,255,0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const detections = faceDetector.detect(canvas);
        detections.detections.forEach((detection) => {
            const box = detection.boundingBox;
            if (!box) return;

            const baseExtensionRatio = 0.3;
            const adjustedExtensionRatio = baseExtensionRatio + boxHeight;

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

                // ctx.strokeStyle = '#00FF00';
                ctx.strokeStyle = '#43FD00';
                ctx.lineWidth = 2;
                ctx.strokeRect(extendedBox.originX, extendedBox.originY, extendedBox.width, extendedBox.height);

                // 기준선 그리기
                ctx.beginPath();
                ctx.moveTo(extendedBox.originX, hairlineY);
                ctx.lineTo(extendedBox.originX + extendedBox.width, hairlineY);
                // ctx.moveTo(0, hairlineY);
                // ctx.lineTo(canvas.width, hairlineY);
                ctx.stroke();

                // 눈썹 아래 라인
                ctx.beginPath();
                ctx.moveTo(extendedBox.originX, eyebrowLineY);
                ctx.lineTo(extendedBox.originX + extendedBox.width, eyebrowLineY);
                // ctx.moveTo(0, eyebrowLineY);
                // ctx.lineTo(canvas.width, eyebrowLineY);
                ctx.stroke();

                // 코 아래 라인
                ctx.beginPath();
                ctx.moveTo(extendedBox.originX, noseBottomY);
                ctx.lineTo(extendedBox.originX + extendedBox.width, noseBottomY);
                // ctx.moveTo(0, noseBottomY);
                // ctx.lineTo(canvas.width, noseBottomY);
                ctx.stroke();

                // 턱 끝
                ctx.beginPath();
                ctx.moveTo(extendedBox.originX, chinBottomY);
                ctx.lineTo(extendedBox.originX + extendedBox.width, chinBottomY);
                // ctx.moveTo(0, chinBottomY);
                // ctx.lineTo(canvas.width, chinBottomY);
                ctx.stroke();

                // 얼굴 박스
                ctx.strokeStyle = '#43FD00';
                ctx.lineWidth = 2;
                ctx.strokeRect(extendedBox.originX, extendedBox.originY, extendedBox.width, extendedBox.height);
            }
        });
    }, [faceDetector, faceLandmarker, videoRef, canvasRef, setFaceRatios, boxHeight]);

    // 애니메이션 루프
    useEffect(() => {
        let animationFrameId: number;
        const animate = () => {
            if (!isFreezed) {
                detectFace();
                animationFrameId = requestAnimationFrame(animate);
            }
        };
        if (faceDetector && faceLandmarker && isVideoLoaded && !isFreezed) {
            animate();
            return () => {
                cancelAnimationFrame(animationFrameId);
            };
        }
    }, [detectFace, faceDetector, faceLandmarker, isVideoLoaded, isFreezed, boxHeight]);

    return { faceDetector, faceLandmarker, faceRatios, canvasRef, detectFace };
};
