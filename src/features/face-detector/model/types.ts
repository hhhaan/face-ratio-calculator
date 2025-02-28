export interface FaceRatios {
    forehead: number;
    midFace: number;
    lowerFace: number;
}

export interface UseFaceDetectorProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    isFreezed: boolean;
    isVideoLoaded: boolean;
}

export interface UseFaceDetectorResult {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    faceRatios: FaceRatios;
}
