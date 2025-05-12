export const ResultCard = ({
    score,
    faceRatios,
}: {
    score: number;
    faceRatios: { forehead: number; midFace: number; lowerFace: number };
}) => {
    // 점수에 따른 등급 결정 함수
    const getScoreGrade = (score: number) => {
        if (score >= 90) return { grade: 'S', color: 'text-purple-600', description: '완벽에 가까워요 !' };
        if (score >= 80) return { grade: 'A', color: 'text-blue-600', description: '부러운 비율이에요' };
        if (score >= 70) return { grade: 'B', color: 'text-green-600', description: '평균이에요 !' };
        if (score >= 60) return { grade: 'C', color: 'text-yellow-600', description: '그래도.. 개성..(?) 있어요..' };
        if (score >= 50) return { grade: 'D', color: 'text-orange-500', description: '자신감을 가지세요 !' };
        return { grade: 'F', color: 'text-red-500', description: '개선이 필요한 비율' };
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden mb-8 transition-all transform hover:scale-105">
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">분석 결과</h3>

                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-sm text-gray-500">당신의 점수는</p>
                        <div className="flex items-baseline">
                            <span className="text-4xl font-bold text-blue-600">{score.toFixed(1)}</span>
                            <span className="text-gray-500 ml-1">/ 100</span>
                        </div>
                    </div>
                    <div
                        className={`flex items-center justify-center w-16 h-16 rounded-full ${
                            getScoreGrade(score).color
                        } bg-opacity-10 border-2 border-current`}
                    >
                        <span className="text-3xl font-bold">{getScoreGrade(score).grade}</span>
                    </div>
                </div>

                <p className="text-gray-600 mb-4">{getScoreGrade(score).description}</p>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${score}%` }}></div>
                </div>

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
        </div>
    );
};
