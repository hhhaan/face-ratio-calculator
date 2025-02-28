import { logEvent } from 'firebase/analytics';
import analytics from '@/shared/lib/firebase/config';

// 방문 횟수를 측정하는 함수
export const trackPageView = () => {
    if (analytics) {
        logEvent(analytics, 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
        });
    }
};

// 공유 이벤트를 측정하는 함수
export const trackShare = (method: string, contentType = 'face_analysis_result') => {
    if (analytics) {
        logEvent(analytics, 'share', {
            method: method, // 'kakao', 'clipboard' 등
            content_type: contentType,
            item_id: window.location.pathname,
            timestamp: new Date().toISOString(),
        });
    }
};
