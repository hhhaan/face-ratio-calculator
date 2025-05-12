// SEOHelmet.tsx
import { Helmet } from 'react-helmet';

export const SEOHelmet = () => {
    return (
        <Helmet>
            <title>중안부 길이 계산기 | 무료 얼굴 비율 테스트</title>
            <meta
                name="description"
                content="AI로 정확한 중안부 길이 측정과 얼굴 비율 분석을 무료로 제공합니다. 중안부 길이 재는 법, 얼굴 비율 테스트를 쉽고 정확하게 해보세요."
            />
            <meta
                name="keywords"
                content="중안부 길이, 중안부 길이 재는법, 얼굴비율테스트, 중안부, 얼굴 비율 분석, 중안부 계산, 얼굴 황금비율, 얼굴 분석, 중안부 길이 측정, 얼굴형 분석"
            />

            {/* Open Graph 태그 */}
            <meta property="og:title" content="중안부 길이 계산기 | 무료 얼굴 비율 테스트" />
            <meta
                property="og:description"
                content="AI로 정확한 중안부 길이 측정과 얼굴 비율 분석을 무료로 제공합니다. 중안부 길이 재는 법, 얼굴 비율 테스트를 쉽고 정확하게 해보세요."
            />
            <meta property="og:url" content="https://face-ratio-calculator.web.app/" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://face-ratio-calculator.web.app/screen.png" />

            {/* 트위터 카드 */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="중안부 길이 계산기 | 무료 얼굴 비율 테스트" />
            <meta
                name="twitter:description"
                content="AI로 정확한 중안부 길이 측정과 얼굴 비율 분석을 무료로 제공합니다."
            />
            <meta name="twitter:image" content="https://face-ratio-calculator.web.app/screen.png" />

            {/* 표준 링크 */}
            <link rel="canonical" href="https://face-ratio-calculator.web.app/" />

            {/* 구조화된 데이터 */}
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebApplication',
                    name: '중안부 길이 계산기',
                    description: 'AI로 정확한 중안부 길이 측정과 얼굴 비율 분석을 무료로 제공합니다.',
                    url: 'https://face-ratio-calculator.web.app/',
                    applicationCategory: 'HealthApplication',
                    offers: {
                        '@type': 'Offer',
                        price: '0',
                        priceCurrency: 'KRW',
                    },
                    keywords: '중안부 길이, 중안부 길이 재는법, 얼굴비율테스트, 중안부, 얼굴 비율 분석',
                    mainEntityOfPage: {
                        '@type': 'WebPage',
                        '@id': 'https://face-ratio-calculator.web.app/',
                    },
                })}
            </script>
        </Helmet>
    );
};
