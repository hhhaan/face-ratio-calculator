export const FAQSection = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">자주 묻는 질문</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="font-medium text-gray-900 mb-2">Q: 중안부 길이는 어떻게 측정하나요?</h3>
                    <p className="text-gray-600">
                        A: AI가 자동으로 얼굴의 주요 포인트를 인식하여 눈썹에서 코끝까지의 거리를 측정합니다.
                    </p>
                </div>
                <div>
                    <h3 className="font-medium text-gray-900 mb-2">Q: 결과는 얼마나 정확한가요?</h3>
                    <p className="text-gray-600">A: 최신 AI 기술을 활용하여 높은 정확도를 보장합니다.</p>
                </div>
                <div>
                    <h3 className="font-medium text-gray-900 mb-2">Q: 개인정보는 안전한가요?</h3>
                    <p className="text-gray-600">
                        A: 모든 분석은 사용자의 기기에서 실시간으로 이루어지며, 어떠한 이미지도 서버에 저장되지
                        않습니다.
                    </p>
                </div>
            </div>
        </div>
    );
};
