import { RefObject } from 'react';
import { Camera } from 'lucide-react';

export const FaceCamera = ({
    videoRef,
    canvasRef,
    isCalculating,
    isFreezed,
    toggleFreeze,
}: {
    videoRef: RefObject<HTMLVideoElement | null>;
    canvasRef: RefObject<HTMLCanvasElement | null>;
    isCalculating: boolean;
    isFreezed: boolean;
    toggleFreeze: () => void;
}) => {
    return (
        <>
            <main className="relative w-full h-auto mb-5">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="scale-x-[-1] w-full h-auto border border-gray-300 rounded"
                />
                <canvas
                    ref={canvasRef}
                    className="scale-x-[-1] absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden"
                />
                {isCalculating && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-sm rounded">
                        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
                            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                            <p className="mt-3 text-blue-600 font-semibold">얼굴 비율 분석 중...</p>
                        </div>
                    </div>
                )}
            </main>

            <div className="flex justify-center mb-6">
                <button
                    onClick={toggleFreeze}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
                >
                    <Camera size={20} />
                    {isFreezed ? '촬영 다시하기' : '촬영하기'}
                </button>
            </div>
        </>
    );
};
