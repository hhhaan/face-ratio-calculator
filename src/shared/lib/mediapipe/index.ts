import { FilesetResolver, FaceLandmarker, FaceDetector } from '@mediapipe/tasks-vision';

const MEDIAPIPE_WASM = '/mediapipe/wasm';
const FACE_LANDMARKER_MODEL = '/mediapipe/face_landmarker.task';
const FACE_DETECTOR_MODEL = '/mediapipe/blaze_face_short_range.tflite';

// 모듈 로드 시 즉시 WASM 초기화 시작 (useEffect 대기 없이)
const visionPromise = FilesetResolver.forVisionTasks(MEDIAPIPE_WASM);

export const initializeVisionModels = async () => {
    const vision = await visionPromise;

    const [landmarker, detector] = await Promise.all([
        FaceLandmarker.createFromModelPath(vision, FACE_LANDMARKER_MODEL),
        FaceDetector.createFromModelPath(vision, FACE_DETECTOR_MODEL),
    ]);

    console.log('Vision models initialized successfully');
    return { landmarker, detector };
};
