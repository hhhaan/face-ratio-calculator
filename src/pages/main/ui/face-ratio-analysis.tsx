export const FaceRatioAnalysis = ({
    faceRatios,
}: {
    faceRatios: { forehead: number; midFace: number; lowerFace: number };
}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="font-medium mb-2">얼굴 비율 데이터</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">이마</p>
                    <p className="font-semibold">{faceRatios.forehead.toFixed(1)}%</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">중안부</p>
                    <p className="font-semibold">{faceRatios.midFace.toFixed(1)}%</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">하안부</p>
                    <p className="font-semibold">{faceRatios.lowerFace.toFixed(1)}%</p>
                </div>
            </div>
        </div>
    );
};
