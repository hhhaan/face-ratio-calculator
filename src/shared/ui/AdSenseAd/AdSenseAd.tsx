import { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: Array<{
            [key: string]: unknown;
        }>;
    }
}

interface AdSenseAdProps {
    adSlot?: string;
    adFormat?: string;
    responsive?: boolean;
    style?: React.CSSProperties;
}

export const AdSenseAd = ({
    adSlot = '8682712907',
    adFormat = 'auto',
    responsive = true,
    style = { display: 'block' },
}: AdSenseAdProps) => {
    useEffect(() => {
        const pushAd = () => {
            try {
                window.adsbygoogle = window.adsbygoogle || [];
                window.adsbygoogle.push({});
            } catch (error) {
                console.error('AdSense 에러:', error);
            }
        };

        const interval = setInterval(() => {
            // 300ms마다 AdSense 스크립트가 로드되었는지 확인
            if (window.adsbygoogle) {
                pushAd();
                // 광고가 푸시되면 인터벌 정리
                clearInterval(interval);
            }
        }, 300);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={style}
            data-ad-client="ca-pub-9867086602256535"
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={responsive ? 'true' : 'false'}
        ></ins>
    );
};
