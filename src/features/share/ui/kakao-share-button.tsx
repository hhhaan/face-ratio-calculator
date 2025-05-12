import { useEffect } from 'react';
import { trackShare } from '@/shared/lib/google-analytics/analytics';
import { MessageCircle } from 'lucide-react';
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Kakao: any;
    }
}

export const KakaoShareButton = () => {
    const JS_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(JS_KEY);
            console.log('Kakao SDK initialized');
        }
    }, [JS_KEY]);

    const shareKakao = () => {
        if (!window.Kakao || !window.Kakao.Share) {
            console.error('Kakao SDK not loaded');
            return;
        }

        // UTM 파라미터가 포함된 URL 생성
        const baseUrl = window.location.href;
        const url = new URL(baseUrl);
        url.searchParams.append('utm_source', 'kakao');
        url.searchParams.append('utm_medium', 'social');
        url.searchParams.append('utm_campaign', 'share');

        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '중안부 길이 분석 서비스',
                description: '중안부 비율을 분석해보세요!',
                // imageUrl: 'https://developers.kakao.com/assets/img/about/og_image.jpg',
                link: {
                    mobileWebUrl: url.toString(),
                    webUrl: url.toString(),
                },
            },
            buttons: [
                {
                    title: '웹에서 보기',
                    link: {
                        mobileWebUrl: url.toString(),
                        webUrl: url.toString(),
                    },
                },
            ],
            installTalk: true,
        });
        // 공유 이벤트 측정
        trackShare('kakao');
    };

    return (
        <button
            onClick={shareKakao}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 rounded-lg text-black hover:bg-yellow-500"
        >
            <MessageCircle size={18} />
            <span className="text-sm">카카오톡 공유</span>
        </button>
    );
};
