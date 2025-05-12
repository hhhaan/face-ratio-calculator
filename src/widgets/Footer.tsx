import { AdSenseAd } from '@/shared/ads/ui';

export const Footer = () => {
    return (
        <footer className="py-8 px-8 bg-gray-50 border-t border-gray-200">
            <div className="max-w-6xl mx-auto">
                {/* 관련 정보 섹션 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">얼굴 비율 계산기</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 중안부 길이 측정</li>
                            <li>• 얼굴 비율 분석</li>
                            <li>• 황금비율 계산</li>
                            <li>• AI 얼굴 분석</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">관련 정보</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 이상적인 얼굴 비율</li>
                            <li>• 중안부 길이 재는 법</li>
                            <li>• 얼굴 황금비율이란?</li>
                            <li>• 얼굴형 분석 방법</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">비즈니스 문의</h3>
                        <p className="text-sm text-gray-600 mb-2">
                            광고, 제휴, 협업 등 비즈니스 관련 문의는 아래 이메일로 연락주세요:
                        </p>
                        <a
                            href="mailto:contact@faceratio.app"
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            contact@faceratio.app
                        </a>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 mb-4">
                    <p>© 2024 중안부 길이 계산기 - 무료 얼굴 비율 분석</p>
                    <p className="mt-2">정확하고 신뢰할 수 있는 AI 기반 얼굴 분석 서비스</p>
                </div>

                {/* Footer ad space */}
                <div className="mx-auto h-24 max-w-2xl bg-gray-100 border border-dashed border-gray-300 flex justify-center items-center text-gray-400">
                    <AdSenseAd />
                </div>
            </div>
        </footer>
    );
};
