import { AdSenseAd } from '@/shared/ads/ui';

export const Footer = () => {
    return (
        <footer className="py-4 px-8 bg-gray-50 border-t border-gray-200">
            <div className="text-center mb-4">
                <p>© 2025 Face Analysis App</p>
            </div>
            {/* Footer ad space */}
            <div className="mx-auto h-24 max-w-2xl bg-gray-100 border border-dashed border-gray-300 flex justify-center items-center text-gray-400">
                <AdSenseAd />
            </div>
        </footer>
    );
};
