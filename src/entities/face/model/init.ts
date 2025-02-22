import { FilesetResolver, FaceDetector, FaceLandmarker } from '@mediapipe/tasks-vision';

export const initializeFaceDetector = async () => {
    const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm');
    return await FaceDetector.createFromModelPath(
        vision,
        'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite'
    );
};

export const initializeFaceLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm');
    return await FaceLandmarker.createFromModelPath(
        vision,
        'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task'
    );
};
