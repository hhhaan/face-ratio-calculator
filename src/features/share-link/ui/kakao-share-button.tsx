import { useEffect } from 'react';
import { trackShare } from '@/shared/lib/google-analytics/analytics';
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
        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '중안부 길이 분석 서비스',
                description: '중안부 비율을 분석해보세요!',
                // imageUrl: 'https://developers.kakao.com/assets/img/about/og_image.jpg',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
            buttons: [
                {
                    title: '웹에서 보기',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
            ],
            installTalk: true,
        });
        // 공유 이벤트 측정
        trackShare('kakao');
    };

    return (
        <button onClick={shareKakao} className="px-4 py-2 bg-yellow-400 rounded-lg text-black hover:bg-yellow-500">
            카카오톡 공유
        </button>
    );
};
