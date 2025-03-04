import { trackShare } from '@/shared/lib/google-analytics';

export const ClipBoardShareButton = () => {
    const copyLinkToClipboard = () => {
        navigator.clipboard
            .writeText(window.location.href)
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
            className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300"
        >
            URL 복사
        </button>
    );
};
