import { AdSenseAd } from '@/shared/ads/ui';

export const Header = () => {
    return (
        <header className="flex justify-between items-center px-8 py-4 bg-gray-50 border-b border-gray-200">
            <div className="text-xl font-bold">Face Analysis App</div>
            <nav className="hidden md:block">
                {/* <ul className="flex space-x-6">
                            <li className="cursor-pointer hover:text-blue-600">Home</li>
                            <li className="cursor-pointer hover:text-blue-600">Analysis</li>
                            <li className="cursor-pointer hover:text-blue-600">About</li>
                        </ul> */}
            </nav>
            {/* Header ad space */}
            <div className="hidden lg:flex h-24 w-64 bg-gray-100 border border-dashed border-gray-300 justify-center items-center text-gray-400">
                <AdSenseAd />
            </div>
        </header>
    );
};
