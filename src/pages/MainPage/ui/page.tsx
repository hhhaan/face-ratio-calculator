import { useEffect, useRef, useState, useCallback } from 'react';
import { requestCameraPermission } from '@/shared/lib/camera';
import { FilesetResolver, FaceDetector, FaceLandmarker } from '@mediapipe/tasks-vision';

export const MainPage = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [faceDetector, setFaceDetector] = useState<FaceDetector | null>(null);
    const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isFreezed, setIsFreezed] = useState(false);

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
        const init = async () => {
            await Promise.all([initializeFaceDetector(), initializeFaceLandmarker()]);
            requestCameraPermission().then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadeddata = () => setIsVideoLoaded(true);
                }
            });
        };
        init();
    }, []);

    // FaceDetector 초기화
    const initializeFaceDetector = async () => {
        const vision = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
        );
        const detector = await FaceDetector.createFromModelPath(
            vision,
            'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite'
        );
        setFaceDetector(detector);
    };

    // FaceLandmarker 초기화
    const initializeFaceLandmarker = async () => {
        const vision = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
        );
        const landmarker = await FaceLandmarker.createFromModelPath(
            vision,
            'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task'
        );
        setFaceLandmarker(landmarker);
    };

    const toggleFreeze = () => {
        setIsFreezed(!isFreezed);
        if (!isFreezed) {
            videoRef.current?.pause();
        } else {
            videoRef.current?.play();
        }
    };

    // 얼굴 감지 및 랜드마크, 비율 계산 후 결과를 캔버스에 그리는 함수
    const detectAndDraw = useCallback(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (video && canvas && ctx && faceDetector && faceLandmarker && isVideoLoaded) {
            // 캔버스 사이즈 업데이트 및 비디오 프레임 그리기
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            try {
                const detections = faceDetector.detect(canvas);
                detections.detections.forEach((detection) => {
                    const box = detection.boundingBox;
                    if (!box) return;

                    const extendedBox = {
                        originX: box.originX,
                        originY: box.originY - box.height * 0.3,
                        width: box.width,
                        height: box.height * 1.3,
                    };

                    extendedBox.originY = Math.max(0, extendedBox.originY);
                    extendedBox.height = Math.min(canvas.height - extendedBox.originY, extendedBox.height);

                    const landmarkResult = faceLandmarker.detect(canvas);
                    if (landmarkResult.faceLandmarks.length > 0) {
                        const landmarks = landmarkResult.faceLandmarks[0];

                        // 주요 포인트 설정
                        const leftEyebrowLower = landmarks[282]; // 왼쪽 눈썹 아래
                        const rightEyebrowLower = landmarks[52]; // 오른쪽 눈썹 아래
                        const noseBottom = landmarks[94]; // 코 아래 (윗입술 위)

                        // 눈썹 아래 라인의 y좌표 (양쪽 눈썹 아래 지점의 평균)
                        const eyebrowBottomY = (leftEyebrowLower.y + rightEyebrowLower.y) / 2;

                        // 기준점들의 y좌표 (캔버스 좌표계)
                        const hairlineY = extendedBox.originY; // 이마 최상단 (박스 상단)
                        const eyebrowLineY = eyebrowBottomY * canvas.height; // 눈썹 아래 라인
                        const noseBottomY = noseBottom.y * canvas.height; // 코 아래
                        const chinBottomY = extendedBox.originY + extendedBox.height; // 턱 끝 (박스 하단)

                        // 각 부위 높이 계산
                        const foreheadHeight = eyebrowLineY - hairlineY; // 이마: 헤어라인 ~ 눈썹 아래
                        const midFaceHeight = noseBottomY - eyebrowLineY; // 중안부: 눈썹 아래 ~ 코 아래
                        const lowerFaceHeight = chinBottomY - noseBottomY; // 하안부: 코 아래 ~ 턱

                        const totalHeight = extendedBox.height;

                        if (!isFreezed) {
                            // 비율 계산 및 state 업데이트
                            setFaceRatios({
                                forehead: Number(((foreheadHeight / totalHeight) * 100).toFixed(1)),
                                midFace: Number(((midFaceHeight / totalHeight) * 100).toFixed(1)),
                                lowerFace: Number(((lowerFaceHeight / totalHeight) * 100).toFixed(1)),
                            });
                        }

                        // 기준선 그리기 (빨간선)
                        ctx.strokeStyle = '#FF0000';
                        ctx.lineWidth = 2;

                        // 헤어라인 (박스 상단)
                        ctx.beginPath();
                        ctx.moveTo(0, hairlineY);
                        ctx.lineTo(canvas.width, hairlineY);
                        ctx.stroke();

                        // 눈썹 아래 라인
                        ctx.beginPath();
                        ctx.moveTo(0, eyebrowLineY);
                        ctx.lineTo(canvas.width, eyebrowLineY);
                        ctx.stroke();

                        // 코 아래 라인
                        ctx.beginPath();
                        ctx.moveTo(0, noseBottomY);
                        ctx.lineTo(canvas.width, noseBottomY);
                        ctx.stroke();

                        // 턱 끝 (박스 하단)
                        ctx.beginPath();
                        ctx.moveTo(0, chinBottomY);
                        ctx.lineTo(canvas.width, chinBottomY);
                        ctx.stroke();
                    }

                    // 얼굴 박스 그리기 (초록색)
                    ctx.strokeStyle = '#00FF00';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(extendedBox.originX, extendedBox.originY, extendedBox.width, extendedBox.height);
                });
            } catch (error) {
                console.error('Detection error:', error);
            }
        }
    }, [faceDetector, faceLandmarker, isVideoLoaded, isFreezed]);

    useEffect(() => {
        let animationFrameId: number;
        const animate = () => {
            detectAndDraw();
            animationFrameId = requestAnimationFrame(animate);
        };
        if (faceDetector && faceLandmarker && isVideoLoaded) {
            animate();
            return () => cancelAnimationFrame(animationFrameId);
        }
    }, [detectAndDraw, faceDetector, faceLandmarker, isVideoLoaded]);

    return (
        <div className="flex flex-col items-center justify-center h-screen p-20">
            <p className="text-3xl pb-10">look straight ahead</p>
            <div className="flex flex-row items-center justify-center">
                <div className="relative">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover scale-x-[-1] absolute"
                    />
                    <canvas ref={canvasRef} className="scale-x-[-1]" />
                </div>
                <div className="flex flex-col h-full bg-black botder border-white items-center justify-between py-10">
                    <div className="flex flex-col items-start px-5  text-white">
                        <p>forehead: {faceRatios.forehead}%</p>
                        <p>midFace: {faceRatios.midFace}%</p>
                        <p>lowerFace: {faceRatios.lowerFace}%</p>
                    </div>
                    <div>
                        <button className="bg-white text-black px-5 py-2 cursor-pointer" onClick={toggleFreeze}>
                            {isFreezed ? 'unfreeze' : 'freeze'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
