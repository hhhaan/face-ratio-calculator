import { useRef, useState, useEffect } from 'react';

export const useCamera = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isFreezed, setIsFreezed] = useState(false);

    const requestCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: 640,
                    height: 480,
                },
                audio: false,
            });
            console.log('stream', stream);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsVideoLoaded(true);
        } catch (error) {
            console.error('카메라 접근 오류:', error);
        }
    };

    useEffect(() => {
        requestCameraPermission();
    }, []);

    return { videoRef, isVideoLoaded, isFreezed, setIsFreezed };
};
