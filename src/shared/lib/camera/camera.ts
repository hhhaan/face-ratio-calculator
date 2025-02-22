export const requestCameraPermission = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        });
        return stream;
    } catch (error) {
        console.error('Error requesting camera permission:', error);
        throw error;
    }
};
