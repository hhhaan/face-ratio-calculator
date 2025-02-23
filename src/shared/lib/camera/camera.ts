export const requestCameraPermission = async () => {
    try {
        // 브라우저 카메라 지원 여부 확인
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Browser does not support camera access');
        }

        // 권한 상태 확인 (가능한 경우)
        if (navigator.permissions && navigator.permissions.query) {
            const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
            if (result.state === 'denied') {
                throw new Error('Camera permission is denied. Please reset permission and try again.');
            }
        }

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user',
            },
            audio: false,
        });
        return stream;
    } catch (error) {
        console.error('Error requesting camera permission:', error);
        // 사용자가 이해하기 쉬운 에러 메시지로 변환
        if (error instanceof Error) {
            if (error.name === 'NotAllowedError') {
                throw new Error('카메라 접근이 거부되었습니다. 브라우저 설정에서 카메라 권한을 허용해주세요.');
            }
            if (error.name === 'NotFoundError') {
                throw new Error('카메라를 찾을 수 없습니다. 카메라가 연결되어 있는지 확인해주세요.');
            }
        }
        throw error;
    }
};
