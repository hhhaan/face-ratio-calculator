export const HairlineSlider = ({
    isFreezed,
    boxHeight,
    setBoxHeight,
}: {
    isFreezed: boolean;
    boxHeight: number;
    setBoxHeight: (height: number) => void;
}) => {
    const handleHairlineAdjustment = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setBoxHeight(value);
    };
    return (
        <div className="my-4">
            <label htmlFor="hairline-slider" className="block text-sm font-medium text-gray-700 mb-1">
                헤어라인 조정
            </label>
            <input
                id="hairline-slider"
                type="range"
                min="-0.1"
                max="0.1"
                step="0.01"
                value={boxHeight}
                onChange={handleHairlineAdjustment}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                disabled={isFreezed} // 촬영 상태에서만 조정 가능
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>낮게</span>
                <span>기본값</span>
                <span>높게</span>
            </div>
        </div>
    );
};
