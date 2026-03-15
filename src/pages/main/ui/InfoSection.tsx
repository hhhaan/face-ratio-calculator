export const InfoSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">중안부 길이란?</h2>
                <p className="text-gray-600 mb-4">
                    중안부는 눈썹에서 코끝까지의 거리를 의미합니다. 이상적인 얼굴 비율에서 중안부는 전체 얼굴 길이의 약
                    1/3을 차지합니다.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>이마 : 중안부 : 하안부 = 1 : 1 : 1 비율이 이상적</li>
                    <li>중안부가 너무 길거나 짧으면 얼굴 균형이 깨질 수 있음</li>
                </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">얼굴 비율 분석 방법</h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    <li>정면을 바라보고 카메라를 정확히 응시</li>
                    <li>머리카락을 이마가 보이도록 정리</li>
                    <li>이마 시작점을 정확히 조절</li>
                    <li>분석 버튼을 눌러 결과 확인</li>
                </ol>
            </div>
        </div>
    );
};
