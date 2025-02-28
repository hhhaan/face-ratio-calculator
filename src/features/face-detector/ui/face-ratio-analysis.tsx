export const FaceRatioAnalysis = ({
    faceRatios,
}: {
    faceRatios: { forehead: number; midFace: number; lowerFace: number };
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Face Ratio Analysis</h2>
            <div className="space-y-2">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="font-medium">이마:</span>
                    <span>{faceRatios.forehead}%</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="font-medium">중안부:</span>
                    <span>{faceRatios.midFace}%</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="font-medium">하관:</span>
                    <span>{faceRatios.lowerFace}%</span>
                </div>
            </div>
        </div>
    );
};
