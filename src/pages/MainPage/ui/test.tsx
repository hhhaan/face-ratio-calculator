import { useState } from 'react';
import { Camera } from 'lucide-react';
import { useCamera } from '@/features/camera';
import { useFaceDetector } from '@/features/face-detector';
import { ratio111Score } from '@/features/scoring';
import { KakaoShareButton, ClipBoardShareButton } from '@/features/share-link';

export const TestPage = () => {
    // 깃 cicd 무시용
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);
    const { videoRef, isVideoLoaded, isFreezed, setIsFreezed } = useCamera();
    const { faceRatios, canvasRef } = useFaceDetector({
        videoRef,
        isVideoLoaded,
        isFreezed,
    });

    // 점수에 따른 등급 결정 함수
    const getScoreGrade = (score: number) => {
        if (score >= 90) return { grade: 'S', color: 'text-purple-600', description: '완벽에 가까워요 !' };
        if (score >= 80) return { grade: 'A', color: 'text-blue-600', description: '부러운 비율이에요' };
        if (score >= 70) return { grade: 'B', color: 'text-green-600', description: '평균이에요 !' };
        if (score >= 60) return { grade: 'C', color: 'text-yellow-600', description: '개성..(?)이 있어요..' };
        if (score >= 50) return { grade: 'D', color: 'text-orange-500', description: '자신감을 가지세요 !' };
        return { grade: 'F', color: 'text-red-500', description: '개선이 필요한 비율' };
    };

    const toggleFreeze = () => {
        setIsFreezed(!isFreezed);
        if (!isFreezed) {
            // 카메라 정지
            videoRef.current?.pause();
        } else {
            // 카메라 재개 및 결과 초기화
            videoRef.current?.play();
            setShowResult(false);
        }
    };

    const handleCalculateScore = () => {
        if (!isFreezed) {
            alert('먼저 촬영을 해주세요!');
            return;
        }
        setIsCalculating(true);
        setTimeout(() => {
            const calculatedScore = ratio111Score(faceRatios.forehead, faceRatios.midFace, faceRatios.lowerFace);
            setScore(calculatedScore);
            setIsCalculating(false);
            setShowResult(true);
        }, 1000);
    };

    return (
        <div className="bg-gray-50 p-8 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold text-center mb-6">얼굴 비율 분석</h2>

            <main className="relative w-full h-auto mb-5">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="scale-x-[-1] w-full h-auto border border-gray-300 rounded"
                />
                <canvas
                    ref={canvasRef}
                    className="scale-x-[-1] absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden"
                />
                {isCalculating && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-sm rounded">
                        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
                            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                            <p className="mt-3 text-blue-600 font-semibold">얼굴 비율 분석 중...</p>
                        </div>
                    </div>
                )}
            </main>

            {/* 카메라 컨트롤 */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={toggleFreeze}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
                >
                    <Camera size={20} />
                    {isFreezed ? '촬영 다시하기' : '촬영하기'}
                </button>
            </div>

            {/* 얼굴 비율 데이터 표시 */}
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

            {/* 분석 버튼 */}
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

            {/* 점수 결과 UI - 계산된 후에만 표시 */}
            {showResult && (
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
            )}

            {/* 공유 버튼 영역 - 결과가 표시된 경우에만 표시 */}

            <div className="flex justify-end gap-2">
                <ClipBoardShareButton />
                <KakaoShareButton />
            </div>
        </div>
    );
};
