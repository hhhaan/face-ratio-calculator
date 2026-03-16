import { useState, useEffect, useRef } from 'react';
import { FaceDetector, FaceLandmarker } from '@mediapipe/tasks-vision';
import { initializeVisionModels } from '@/shared/lib/mediapipe';

export const useVisionModels = () => {
    const faceDetectorRef = useRef<FaceDetector | null>(null);
    const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
    const [isModelReady, setIsModelReady] = useState(false);

    useEffect(() => {
        initializeVisionModels().then(({ detector, landmarker }) => {
            faceDetectorRef.current = detector;
            faceLandmarkerRef.current = landmarker;
            setIsModelReady(true);
        });
    }, []);

    return { faceDetectorRef, faceLandmarkerRef, isModelReady };
};
