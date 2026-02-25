
import { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { ManpowerChart } from '../components/charts/ManpowerChart';
import { TurnoverChart } from '../components/charts/TurnoverChart';
import HeadcountWidget from '../components/charts/HeadcountWidget';
import StatisticsSection from '../components/charts/DonutCharts';
import AnalyticsBar from '../components/charts/AnalyticsBar';

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
};

const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

    const openModal = (title: string, content: JSX.Element) => {
        setModalTitle(title);
        setModalContent(content);
        setModalOpen(true);
    };

    return (
        <div className="space-y-6 pb-6">
            {/* Greeting Header */}
            <div className="flex justify-between items-end animate-fade-in-up">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                        {getGreeting()}, <span style={{
                            background: 'linear-gradient(135deg, #059669, #008000)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>John Doe</span> 👋
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Here's what's happening with your team today.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                    <Calendar size={14} />
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
            </div>

            {/* Top Row: Headcount Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
                    <HeadcountWidget
                        title="Total Manpower"
                        count={12500}
                        icon="users"
                        gradient="gradient-green"
                        onView={() => openModal('Total Manpower', <ManpowerChart />)}
                    />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
                    <HeadcountWidget
                        title="Total Vacant"
                        count={320}
                        icon="check"
                        gradient="gradient-amber"
                        onView={() => openModal('Total Vacant', <AnalyticsBar title="Vacant per Region" labels={["BARMM", "CAR", "NCR", "R1", "R2", "R3", "R4A", "R4B"]} data={[12, 8, 50, 40, 30, 20, 10, 5]} color="#F97316" />)}
                    />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
                    <HeadcountWidget
                        title="New Hires"
                        count={45}
                        icon="users"
                        gradient="gradient-blue"
                        onView={() => openModal('New Hires', <AnalyticsBar title="New Hires (Monthly)" labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} data={[5, 8, 10, 7, 9, 6]} color="#0EA5E9" />)}
                    />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
                    <HeadcountWidget
                        title="Separations"
                        count={12}
                        icon="users"
                        gradient="gradient-rose"
                        onView={() => openModal('Separations', <AnalyticsBar title="Separations (Monthly)" labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} data={[1, 2, 3, 2, 1, 3]} color="#EF4444" />)}
                    />
                </div>
            </div>

            {/* Middle Row: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
                {/* Manpower Chart - Takes up 2 columns */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-64 lg:h-96 card-hover">
                    <ManpowerChart />
                </div>

                {/* Turnover Chart - Takes up 1 column */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-64 lg:h-96 card-hover">
                    <TurnoverChart />
                </div>
            </div>

            {/* Bottom Row: Donut Charts / Statistics */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-slate-800">Demographics & Attendance</h3>
                </div>
                <StatisticsSection />
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
                    <div
                        className="absolute inset-0"
                        style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}
                        onClick={() => setModalOpen(false)}
                    />
                    <div className="relative w-[95%] max-w-3xl bg-white rounded-2xl shadow-2xl z-10 h-[70vh] animate-scale-in overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h4 className="text-lg font-bold text-slate-800">{modalTitle}</h4>
                            <button
                                className="p-2 hover:bg-slate-100 rounded-xl transition-colors duration-200"
                                onClick={() => setModalOpen(false)}
                            >
                                <X size={18} className="text-slate-400" />
                            </button>
                        </div>
                        {/* Modal Content */}
                        <div className="p-6 h-[calc(100%-64px)]">{modalContent}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
