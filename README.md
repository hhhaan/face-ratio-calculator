# 중안부 길이 계산기

[![](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![](https://img.shields.io/badge/Vite-6-purple?logo=vite)](https://vitejs.dev/)
[![](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![](https://img.shields.io/badge/Firebase-11-orange?logo=firebase)](https://firebase.google.com/)
[![](https://img.shields.io/badge/Tailwind%20CSS-4-cyan?logo=tailwindcss)](https://tailwindcss.com/)

---

**중안부 길이 계산기**
중안부 길이 계산기는 사용자의 얼굴 이미지를 분석하여 중안부 길이 및 관련 비율을 측정하고 계산하는 웹 애플리케이션입니다. 이 도구는 MediaPipe를 사용하여 얼굴의 주요 랜드마크를 감지하고, 이를 바탕으로 중안부 길이와 관련 비율을 정확하게 계산합니다.

> **[서비스 주소](https://face-ratio-calculator.web.app)**

## 📸 주요 기능

-   **실시간 웹캠 분석**: 웹캠을 통해 실시간으로 얼굴 비율의 변화를 확인합니다.
-   **상세한 결과 제공**: 중안부 길이, 얼굴 전체 대비 중안부 비율 등 다양한 측정 지표를 시각화하여 보여줍니다.
-   **개인정보 보호 우선**: 모든 이미지 분석은 사용자의 브라우저에서만 처리되며, 이미지는 서버로 전송되지 않습니다.
-   **결과 공유**: 분석 결과를 카카오톡으로 간편하게 공유할 수 있습니다.

## 🤔 작동 원리

이 애플리케이션은 100% 클라이언트 사이드에서 작동하여 빠른 속도와 개인정보 보호를 보장합니다.

1.  **얼굴 랜드마크 감지**: MediaPipe Landmarker 모델을 사용하여 계산에 필요한 얼굴의 주요 랜드마크를 감지합니다.
2.  **비율 계산**: 감지된 랜드마크의 좌표를 바탕으로 중안부, 하안부 등의 상대적 길이를 계산하고 비율을 도출합니다.
3.  **결과 시각화**: 계산된 결과를 원본 이미지 위의 **HTML Canvas**에 렌더링하여 사용자가 직관적으로 이해할 수 있도록 돕습니다.
