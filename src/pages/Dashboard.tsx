
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
        <div className="space-y-6 pb-6">
            <div className="flex justify-end mb-6 print:hidden">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Printer className="h-5 w-5" />
                    Print Dashboard
                </button>
            </div>

            {/* First Row: Manpower Chart - Full Width */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-72">
                <ManpowerChart />
            </div>

            {/* Second Row: Headcount (1/5) + Turnover Chart (3/5) + Attendance (1/5) */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Headcount Widget */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 print:hidden">
                    <HeadcountWidget 
                        title="HEADCOUNT" 
                        count={175} 
                        secondCount={32}
                        icon="users" 
                        color="text-green-600" 
                    />
                </div>

                {/* Turnover Chart - Takes up 3 columns */}
                <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-72">
                    <TurnoverChart />
                </div>

                {/* Attendance Donut */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 w-full text-center">ATTENDANCE</h3>
                    <AttendanceDonut />
                </div>
            </div>

            {/* Third Row: Three Donut Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Ratio Donut */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 w-full text-center">RATIO</h3>
                    <RatioDonut />
                </div>

                {/* Non-Organic Donut */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 w-full text-center">NON-ORGANIC</h3>
                    <NonOrganicDonut />
                </div>

                {/* Organic Donut */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 w-full text-center">ORGANIC</h3>
                    <OrganicDonut />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
