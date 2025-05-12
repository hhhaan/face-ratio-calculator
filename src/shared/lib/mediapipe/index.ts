import { FilesetResolver, FaceLandmarker, FaceDetector } from '@mediapipe/tasks-vision';

export const initializeVisionModels = async () => {
    const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );

    // FaceLandmarker 초기화
    const landmarker = await FaceLandmarker.createFromModelPath(
        vision,
        'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task'
    );

    // FaceDetector 초기화
    const detector = await FaceDetector.createFromModelPath(
        vision,
        'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite'
    );

    console.log('Vision models initialized successfully');
    return { landmarker, detector };
};
