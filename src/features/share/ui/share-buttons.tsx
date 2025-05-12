import { Share2 } from 'lucide-react';
import { KakaoShareButton } from './kakao-share-button';
import { ClipBoardShareButton } from './clip-board-share-button';
import { trackShare } from '@/shared/lib/google-analytics/analytics';

interface ShareButtonsProps {
    score?: number;
    showResult: boolean;
}

export const ShareButtons = ({ score, showResult }: ShareButtonsProps) => {
    const handleScoreShare = () => {
        if (!score) {
            alert('먼저 얼굴 비율을 측정해주세요!');
            return;
        }

        // UTM 파라미터가 포함된 URL 생성
        const baseUrl = 'https://face-ratio-calculator.web.app';
        const url = new URL(baseUrl);
        url.searchParams.append('utm_source', 'score_share');
        url.searchParams.append('utm_medium', 'social');
        url.searchParams.append('utm_campaign', 'share');

        // 공유할 텍스트 생성
        const shareText = `내 얼굴 비율 점수는 ${score}점이에요! 🎉\n\n얼굴 비율 측정기로 나의 얼굴 비율을 확인해보세요.\n${url.toString()}`;

        // 공유 API 호출
        if (navigator.share) {
            navigator
                .share({
                    title: '얼굴 비율 측정 결과',
                    text: shareText,
                    url: url.toString(),
                })
                .catch((error) => {
                    console.log('공유 실패:', error);
                    // 공유 실패시 클립보드 복사로 폴백
                    navigator.clipboard
                        .writeText(shareText)
                        .then(() => alert('클립보드에 복사되었습니다!'))
                        .catch(() => alert('클립보드 복사에 실패했습니다.'));
                });
        } else {
            // Web Share API를 지원하지 않는 경우 클립보드 복사
            navigator.clipboard
                .writeText(shareText)
                .then(() => alert('클립보드에 복사되었습니다!'))
                .catch(() => alert('클립보드 복사에 실패했습니다.'));
        }
        trackShare('share');
    };

    return (
        <div className="flex justify-end gap-2 mt-4">
            {/* 기존 공유 버튼들 */}
            <ClipBoardShareButton />
            <KakaoShareButton />

            {/* 점수 공유 버튼 */}
            <button
                onClick={handleScoreShare}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    showResult
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!showResult}
                title={!showResult ? '얼굴 비율을 측정하면 점수를 공유할 수 있어요!' : '나의 얼굴 비율 점수 공유하기'}
            >
                <Share2 size={18} />
                <span className="text-sm">점수 공유</span>
            </button>
        </div>
    );
};
