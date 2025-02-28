import { useRef, useState } from 'react';
import { useCamera } from '@/features/camera';
import { useFaceDetector } from '@/features/face-detector';
import { ratio111Score } from '@/features/scoring';
import { KakaoShareButton, ClipBoardShareButton } from '@/features/share-link';
import { FaceCamera } from './face-camera';
import { FaceRatioAnalysis } from './face-ratio-analysis';
import { CalculateButton } from './calculate-button';
import { ResultCard } from './result-card';

export const MainPage = () => {
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);
    const { videoRef, isVideoLoaded, isFreezed, setIsFreezed } = useCamera();
    const { faceRatios, canvasRef } = useFaceDetector({
        videoRef,
        isVideoLoaded,
        isFreezed,
    });
    const resultCardRef = useRef<HTMLDivElement>(null);

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

            <FaceCamera
                videoRef={videoRef}
                canvasRef={canvasRef}
                isCalculating={isCalculating}
                isFreezed={isFreezed}
                toggleFreeze={toggleFreeze}
            />

            {/* 얼굴 비율 데이터 표시 */}
            <FaceRatioAnalysis faceRatios={faceRatios} />

            {/* 분석 버튼 */}
            <CalculateButton isFreezed={isFreezed} handleCalculateScore={handleCalculateScore} />

            {/* 점수 결과 UI - 계산된 후에만 표시 */}

            {/* {showResult && <ResultCard score={score} faceRatios={faceRatios} />} */}
            {/* 점수 결과 UI - 계산된 후에만 표시 */}
            <div id="result-container" ref={resultCardRef}>
                {showResult && <ResultCard score={score} faceRatios={faceRatios} />}
            </div>

            {/* 공유 버튼 영역 - 결과가 표시된 경우에만 표시 */}
            <ShareButtons />
        </div>
    );
};

export const ShareButtons = () => {
    return (
        <div className="flex justify-end gap-2">
            <ClipBoardShareButton />
            <KakaoShareButton />
        </div>
    );
};
