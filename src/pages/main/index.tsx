import { useState } from 'react';
import { useCamera } from '@/features/camera';
import { useFaceDetector } from '@/features/face-detection/hooks';
import { ratio111Score } from '@/features/scoring';
import { ShareButtons } from '@/features/share';
import { FaceCamera } from './ui/face-camera';
import { FaceRatioAnalysis } from './ui/face-ratio-analysis';
import { CalculateButton } from './ui/calculate-button';
import { ResultCard } from './ui/result-card';
import { SEOHelmet } from '@/shared/ui';
import { HairlineSlider } from './ui/slider';

export const MainPage = () => {
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);
    const [boxHeight, setBoxHeight] = useState(0);
    const { videoRef, isVideoLoaded, isFreezed, setIsFreezed } = useCamera();
    const { faceRatios, canvasRef } = useFaceDetector({
        videoRef,
        isVideoLoaded,
        isFreezed,
        boxHeight,
    });

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
        <div className="min-h-screen bg-gray-50">
            <SEOHelmet />

            {/* 메인 섹션 */}
            <section className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">중안부 길이 계산기</h1>
                    <p className="text-gray-600 mb-2">
                        AI 기술로 정확한 얼굴 비율을 분석하고 중안부 길이를 측정해보세요
                    </p>
                    <p className="text-sm text-gray-500">무료로 제공되는 전문적인 얼굴 분석 서비스</p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                    <FaceCamera
                        videoRef={videoRef}
                        canvasRef={canvasRef}
                        isCalculating={isCalculating}
                        isFreezed={isFreezed}
                        toggleFreeze={toggleFreeze}
                    />

                    <HairlineSlider isFreezed={isFreezed} boxHeight={boxHeight} setBoxHeight={setBoxHeight} />

                    {/* 중안부 길이 데이터 표시 */}
                    <FaceRatioAnalysis faceRatios={faceRatios} />

                    {/* 분석 버튼 */}
                    <CalculateButton isFreezed={isFreezed} handleCalculateScore={handleCalculateScore} />

                    {/* 점수 결과 UI - 계산된 후에만 표시 */}
                    {showResult && <ResultCard score={score} faceRatios={faceRatios} />}

                    {/* 공유 버튼 영역 - 결과가 표시된 경우에만 표시 */}
                    <ShareButtons score={parseInt(score.toFixed(1))} showResult={showResult} />
                </div>

                {/* 설명 섹션 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">중안부 길이란?</h2>
                        <p className="text-gray-600 mb-4">
                            중안부는 눈썹에서 코끝까지의 거리를 의미합니다. 이상적인 얼굴 비율에서 중안부는 전체 얼굴
                            길이의 약 1/3을 차지합니다.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>이마 : 중안부 : 하안부 = 1 : 1 : 1 비율이 이상적</li>
                            <li>중안부가 너무 길거나 짧으면 얼굴 균형이 깨질 수 있음</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">얼굴 비율 분석 방법</h2>
                        <ol className="list-decimal list-inside text-gray-600 space-y-2">
                            <li>정면을 바라보고 카메라를 정확히 응시</li>
                            <li>머리카락을 이마가 보이도록 정리</li>
                            <li>이마 시작점을 정확히 조절</li>
                            <li>분석 버튼을 눌러 결과 확인</li>
                        </ol>
                    </div>
                </div>

                {/* FAQ 섹션 */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-xl font-semibold mb-4">자주 묻는 질문</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">Q: 중안부 길이는 어떻게 측정하나요?</h3>
                            <p className="text-gray-600">
                                A: AI가 자동으로 얼굴의 주요 포인트를 인식하여 눈썹에서 코끝까지의 거리를 측정합니다.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">Q: 결과는 얼마나 정확한가요?</h3>
                            <p className="text-gray-600">A: 최신 AI 기술을 활용하여 높은 정확도를 보장합니다.</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">Q: 개인정보는 안전한가요?</h3>
                            <p className="text-gray-600">
                                A: 모든 분석은 사용자의 기기에서 실시간으로 이루어지며, 어떠한 이미지도 서버에 저장되지
                                않습니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 연락처 및 저작권 섹션 */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 text-center">
                    <h2 className="text-xl font-semibold mb-4">Contact</h2>
                    <p className="text-gray-600 mb-2">
                        <a href="mailto:hhanheon@gmail.com" className="text-blue-600 hover:underline">
                            hhanheon@gmail.com
                        </a>
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                        <p>© 2025 중안부 길이 계산기. All rights reserved.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
