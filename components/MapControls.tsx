'use client';

interface MapControlsProps { onReset: () => void; }

export default function MapControls({ onReset }: MapControlsProps) {

    return (
        <div className="absolute top-4 right-4 z-10">
            <button
                onClick={onReset}
                className="
                    flex items-center gap-2
                    rounded-lg
                    bg-white
                    px-4 py-2
                    text-sm font-medium text-gray-700
                    shadow-md
                    hover:bg-gray-100
                    transition-colors
                "
            >
                <img src="/icons/center.svg" alt="" className="h-4 w-4"/>
                Vista inicial
            </button>
        </div>
    );
}