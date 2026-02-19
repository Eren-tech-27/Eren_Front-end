import type { FC } from 'react';

interface MapComponentProps {
    onRegionSelect: (regionId: string) => void;
    selectedRegion: string | null;
}

const MapComponent: FC<MapComponentProps> = ({ onRegionSelect, selectedRegion }) => {
    // Simplified SVG Map representation of Philippines Regions
    // Using circles/paths as placeholders for actual map shapes
    const regions = [
        { id: 'NCR', cx: 200, cy: 150, r: 15, name: 'NCR' },
        { id: 'CAR', cx: 200, cy: 80, r: 20, name: 'CAR' },
        { id: 'R1', cx: 160, cy: 90, r: 18, name: 'Region 1' },
        { id: 'R2', cx: 240, cy: 80, r: 22, name: 'Region 2' },
        { id: 'R3', cx: 200, cy: 120, r: 18, name: 'Region 3' },
        { id: 'R4A', cx: 210, cy: 170, r: 18, name: 'Region 4A' },
        { id: 'R4B', cx: 170, cy: 220, r: 25, name: 'Region 4B' },
        { id: 'R5', cx: 260, cy: 230, r: 22, name: 'Region 5' },
        { id: 'R6', cx: 180, cy: 300, r: 20, name: 'Region 6' },
        { id: 'R7', cx: 240, cy: 320, r: 15, name: 'Region 7' },
        { id: 'R8', cx: 290, cy: 290, r: 20, name: 'Region 8' },
        { id: 'R9', cx: 150, cy: 400, r: 18, name: 'Region 9' },
        { id: 'R10', cx: 220, cy: 390, r: 18, name: 'Region 10' },
        { id: 'R11', cx: 260, cy: 420, r: 18, name: 'Region 11' },
        { id: 'R12', cx: 210, cy: 430, r: 20, name: 'Region 12' },
        { id: 'R13', cx: 260, cy: 360, r: 18, name: 'Region 13' },
        { id: 'BARMM', cx: 180, cy: 430, r: 22, name: 'BARMM' },
    ];

    return (
        <div className="w-full h-full flex items-center justify-center bg-blue-50 rounded-xl overflow-hidden relative">
            <svg viewBox="0 0 400 500" className="h-full w-full max-h-[600px]">
                {/* Background / Sea */}
                <rect width="400" height="500" fill="#E0F2F1" />

                {/* Regions */}
                {regions.map((region) => (
                    <g
                        key={region.id}
                        onClick={() => onRegionSelect(region.id)}
                        className="cursor-pointer transition-all duration-300 hover:opacity-80"
                    >
                        <circle
                            cx={region.cx}
                            cy={region.cy}
                            r={region.r}
                            fill={selectedRegion === region.id ? '#008000' : '#81C784'}
                            stroke="#fff"
                            strokeWidth="2"
                            className="transition-all duration-300"
                            style={{
                                filter: selectedRegion === region.id ? 'drop-shadow(0px 4px 6px rgba(0,0,0,0.2))' : 'none',
                                transformOrigin: 'center',
                                transform: selectedRegion === region.id ? 'scale(1.1)' : 'scale(1)',
                            }}
                        />
                        <text
                            x={region.cx}
                            y={region.cy}
                            dy={4}
                            textAnchor="middle"
                            className="text-[10px] font-bold fill-white pointer-events-none"
                            style={{ fontSize: '10px' }}
                        >
                            {region.id}
                        </text>
                    </g>
                ))}
            </svg>

            <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-lg text-xs text-gray-500">
                Click on a region to view details
            </div>
        </div>
    );
};

export default MapComponent;
