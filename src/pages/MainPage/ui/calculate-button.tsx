export const CalculateButton = ({
    isFreezed,
    handleCalculateScore,
}: {
    isFreezed: boolean;
    handleCalculateScore: () => void;
}) => {
    return (
        <div className="w-full my-6">
            <button
                onClick={handleCalculateScore}
                disabled={!isFreezed}
                className={`w-full p-4 rounded-lg font-semibold transition-all ${
                    isFreezed
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:from-blue-600 hover:to-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                얼굴 황금비율 점수 분석하기
            </button>
        </div>
    );
};
