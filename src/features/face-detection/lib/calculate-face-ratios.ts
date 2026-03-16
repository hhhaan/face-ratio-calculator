import { NormalizedLandmark } from '@mediapipe/tasks-vision';

type BoundingBox = {
    originX: number;
    originY: number;
    width: number;
    height: number;
};

type FaceRatios = {
    forehead: number;
    midFace: number;
    lowerFace: number;
};

export const calculateFaceRatios = (
    landmarks: NormalizedLandmark[],
    extendedBox: BoundingBox,
    canvasHeight: number,
): FaceRatios => {
    const leftEyebrowLower = landmarks[282];
    const rightEyebrowLower = landmarks[52];
    const noseBottom = landmarks[94];

    const eyebrowBottomY = (leftEyebrowLower.y + rightEyebrowLower.y) / 2;
    const hairlineY = extendedBox.originY;

    const eyebrowLineY = eyebrowBottomY * canvasHeight;
    const noseBottomY = noseBottom.y * canvasHeight;
    const chinBottomY = extendedBox.originY + extendedBox.height;

    const foreheadHeight = eyebrowLineY - hairlineY;
    const midFaceHeight = noseBottomY - eyebrowLineY;
    const lowerFaceHeight = chinBottomY - noseBottomY;

    const totalHeight = extendedBox.height;

    return {
        forehead: Number(((foreheadHeight / totalHeight) * 100).toFixed(1)),
        midFace: Number(((midFaceHeight / totalHeight) * 100).toFixed(1)),
        lowerFace: Number(((lowerFaceHeight / totalHeight) * 100).toFixed(1)),
    };
};
