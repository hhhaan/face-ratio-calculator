import { trackShare } from '@/shared/lib/google-analytics';
import { Copy } from 'lucide-react';

export const ClipBoardShareButton = () => {
    const copyLinkToClipboard = () => {
        // UTM 파라미터가 포함된 URL 생성
        const baseUrl = window.location.href;
        const url = new URL(baseUrl);
        url.searchParams.append('utm_source', 'clipboard');
        url.searchParams.append('utm_medium', 'direct');
        url.searchParams.append('utm_campaign', 'share');

        navigator.clipboard
            .writeText(url.toString())
            .then(() => {
                alert('copied');
                // 공유 이벤트 측정
                trackShare('clipboard');
            })
            .catch((err) => {
                console.error('Failed to copy link:', err);
                alert('Failed to copy link');
            });
    };

    return (
        <button
            onClick={copyLinkToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300"
        >
            <Copy size={18} />
            <span className="text-sm">URL 복사</span>
        </button>
    );
};
