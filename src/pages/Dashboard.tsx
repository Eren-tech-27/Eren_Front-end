
import { ManpowerChart } from '../components/charts/ManpowerChart';
import { TurnoverChart } from '../components/charts/TurnoverChart';
import HeadcountWidget from '../components/charts/HeadcountWidget';
import { AttendanceDonut, RatioDonut, NonOrganicDonut, OrganicDonut } from '../components/charts/DonutCharts';
import { Printer } from 'lucide-react';

const Dashboard = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-4 md:space-y-6 pb-6">
            <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-4 mb-4 md:mb-6 print:hidden">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 md:hidden">Dashboard</h1>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full md:w-auto justify-center md:justify-start"
                >
                    <Printer className="h-5 w-5" />
                    <span className="text-sm md:text-base">Print</span>
                </button>
            </div>

            {/* First Row: Manpower Chart - Full Width */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 h-64 md:h-72">
                <ManpowerChart />
            </div>

            {/* Second Row: Headcount (1/5) + Turnover Chart (3/5) + Attendance (1/5) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                {/* Headcount Widget - Full width on mobile, 1/2 on sm, 1/5 on lg */}
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 print:hidden">
                    <HeadcountWidget 
                        title="HEADCOUNT" 
                        count={175} 
                        secondCount={32}
                        icon="users" 
                        color="text-green-600" 
                    />
                </div>

                {/* Turnover Chart - Full width on mobile and sm, 3/5 on lg */}
                <div className="sm:col-span-1 lg:col-span-3 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 h-64 md:h-72">
                    <TurnoverChart />
                </div>

                {/* Attendance Donut - Full width on mobile and sm, 1/5 on lg */}
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-64 md:h-72">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 md:mb-6 w-full text-center">ATTENDANCE</h3>
                    <AttendanceDonut />
                </div>
            </div>

            {/* Third Row: Three Donut Charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Ratio Donut */}
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-64 md:h-72">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 md:mb-6 w-full text-center">RATIO</h3>
                    <RatioDonut />
                </div>

                {/* Non-Organic Donut */}
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-64 md:h-72">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 md:mb-6 w-full text-center">NON-ORGANIC</h3>
                    <NonOrganicDonut />
                </div>

                {/* Organic Donut */}
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-64 md:h-72">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 md:mb-6 w-full text-center">ORGANIC</h3>
                    <OrganicDonut />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
