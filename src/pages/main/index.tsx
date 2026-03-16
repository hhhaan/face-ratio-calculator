import { useState } from 'react';
import { useCamera } from '@/features/camera';
import { useFaceDetector, useVisionModels } from '@/features/face-detection/hooks';
import { ratio111Score } from '@/features/scoring';
import { ShareButtons } from '@/features/share';
import { FaceCamera } from './ui/face-camera';
import { FaceRatioAnalysis } from './ui/face-ratio-analysis';
import { CalculateButton } from './ui/calculate-button';
import { ResultCard } from './ui/result-card';
import { SEOHelmet } from '@/shared/ui/SEO';
import { HairlineSlider } from './ui/slider';
import { InfoSection } from './ui/InfoSection';
import { FAQSection } from './ui/FAQSection';

export const MainPage = () => {
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);
    const [boxHeight, setBoxHeight] = useState(0);
    const { videoRef, isVideoLoaded, isFreezed, setIsFreezed } = useCamera();
    const { faceDetectorRef, faceLandmarkerRef, isModelReady } = useVisionModels();
    const { faceRatios, canvasRef } = useFaceDetector({
        videoRef,
        isVideoLoaded,
        isFreezed,
        boxHeight,
        faceDetectorRef,
        faceLandmarkerRef,
        isModelReady,
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
            <main>
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
                <InfoSection />

                {/* FAQ 섹션 */}
                <FAQSection />

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
            </main>
        </div>
    );
};
