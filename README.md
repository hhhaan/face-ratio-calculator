# 중안부 길이 계산기 (Midface Length Calculator)

## 프로젝트 소개

중안부 길이 계산기는 사용자의 얼굴 이미지를 분석하여 중안부 길이 및 관련 비율을 측정하고 계산하는 웹 애플리케이션입니다. 이 도구는 MediaPipe를 사용하여 얼굴의 주요 랜드마크를 감지하고, 이를 바탕으로 중안부 길이와 관련 비율을 정확하게 계산합니다.

## 주요 기능

-   실시간 웹캠 얼굴 인식 및 분석
-   이미지 업로드를 통한 얼굴 분석
-   중안부 길이 및 관련 비율 측정 및 시각화
-   측정 결과 저장 및 공유 기능

## 측정되는 얼굴 비율

-   중안부 길이 (눈 아래부터 입술 윗부분까지)
-   얼굴 전체 길이에 대한 중안부 비율
-   중안부와 하안부 비율
-   중안부와 상안부 비율

## 기술 스택

-   Frontend: React.js
-   얼굴 인식: MediaPipe Face Mesh
-   스타일링: Tailwind CSS

## 설치 방법

1. 저장소 클론

```bash
git clone https://github.com/hhhaan/face-ratio-calculator.git
cd face-ratio-calculator
```

2. 의존성 설치

```bash
npm install
```

3. 개발 서버 실행

```bash
npm start
```

## 사용 방법

### 웹캠을 통한 실시간 분석

1. 웹캠 활성화 버튼을 클릭
2. 화면에 얼굴이 정면으로 보이도록 조정
3. 자동으로 중안부 길이와 비율이 계산됨
4. 결과 저장 버튼을 클릭하여 분석 결과 저장

### 이미지 업로드를 통한 분석

1. 이미지 업로드 버튼을 클릭
2. 분석하고자 하는 얼굴 이미지 선택
3. 결과 확인 및 저장/공유

## 결과 해석

-   중안부 길이에 대한 설명과 일반적인 비율과의 비교
-   개인별 얼굴 특성에 맞는 해석

## 개인정보 보호

-   모든 얼굴 분석은 사용자의 브라우저에서 로컬로 처리됩니다
-   사용자가 명시적으로 저장을 선택하지 않는 한 이미지나 분석 결과가 서버로 전송되지 않습니다

## 기여 방법

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/contribution`)
3. Commit your Changes (`git commit -m 'Add some contribution'`)
4. Push to the Branch (`git push origin feature/contribution`)
5. Open a Pull Request

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.

## 연락처

프로젝트 관리자: hhhaan
