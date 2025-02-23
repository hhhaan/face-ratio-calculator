export const requestCameraPermission = async () => {
    try {
        // HTTPS 체크
        if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
            throw new Error('Camera access requires HTTPS');
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
        throw error;
    }
};
