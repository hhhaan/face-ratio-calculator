import { useEffect, useRef, useState } from 'react';
import { requestCameraPermission } from '@/shared/lib/camera';

export const MainPage = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        requestCameraPermission().then((stream) => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadeddata = () => setIsVideoLoaded(true);
            }
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen p-20">
            <p className="text-3xl">Hello World</p>
            <div>
                <video ref={videoRef} autoPlay muted loop className="w-full h-full object-cover scale-x-[-1]" />
            </div>
        </div>
    );
};
