import { useState } from 'react';
import MapComponent from '../../components/regions/MapComponent';
import RegionStats from '../../components/regions/RegionStats';

const RegionLayout = () => {
    const [selectedRegion, setSelectedRegion] = useState<string>('NCR');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Regional Offices</h1>
                    <p className="text-sm text-gray-500">Interactive map of regional deployments.</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
                {/* Map Area */}
                <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                    <MapComponent
                        selectedRegion={selectedRegion}
                        onRegionSelect={setSelectedRegion}
                    />
                </div>

                {/* Sidebar Info Area */}
                <div className="w-full lg:w-96 h-full overflow-y-auto">
                    <RegionStats regionId={selectedRegion} />
                </div>
            </div>
        </div>
    );
};

export default RegionLayout;
