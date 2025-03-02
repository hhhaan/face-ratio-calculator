// SEOHelmet.tsx
import { Helmet } from 'react-helmet';

export const SEOHelmet = () => {
    return (
        <Helmet>
            <title>얼굴 비율 측정기 | 중안부 길이 계산기</title>
            <meta
                name="description"
                content="얼굴 비율을 측정하여 황금비율에 맞는지 확인해보세요. 중안부 길이 계산으로 나만의 얼굴 균형을 분석하세요."
            />
            <meta name="keywords" content="얼굴 비율, 황금비율, 중안부, 중안부 길이, 얼굴 측정, 미용, 성형" />

            {/* Open Graph 태그 */}
            <meta property="og:title" content="얼굴 비율 측정기 | 중안부 길이 계산기" />
            <meta
                property="og:description"
                content="얼굴 비율을 측정하여 황금비율에 맞는지 확인해보세요. 중안부 길이 계산으로 나만의 얼굴 균형을 분석하세요."
            />
            <meta property="og:url" content="https://face-ratio-calculator.web.app/" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://face-ratio-calculator.web.app/screen.png" />

            {/* 트위터 카드 */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="얼굴 비율 측정기 | 중안부 길이 계산기" />
            <meta name="twitter:description" content="얼굴 비율을 측정하여 황금비율에 맞는지 확인해보세요." />
            <meta name="twitter:image" content="https://face-ratio-calculator.web.app/screen.png" />

            {/* 표준 링크 */}
            <link rel="canonical" href="https://face-ratio-calculator.web.app/" />

            {/* 구조화된 데이터 */}
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebApplication',
                    name: '얼굴 비율 측정기',
                    description:
                        '얼굴 비율을 측정하여 황금비율에 맞는지 확인해보세요. 중안부 길이 계산으로 나만의 얼굴 균형을 분석하세요.',
                    url: 'https://face-ratio-calculator.web.app/',
                    applicationCategory: 'BeautyApplication',
                    offers: {
                        '@type': 'Offer',
                        price: '0',
                        priceCurrency: 'KRW',
                    },
                })}
            </script>
        </Helmet>
    );
};
