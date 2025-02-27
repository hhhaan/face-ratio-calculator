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
