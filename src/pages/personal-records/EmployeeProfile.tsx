import { useState } from 'react';
import { ArrowLeft, User, BookOpen, FileText, Scale, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PersonalC1 } from '../../components/personal-records/PersonalC1';
import { VoluntaryC2 } from '../../components/personal-records/VoluntaryC2';
import { OtherC3 } from '../../components/personal-records/OtherC3';
import { LegalC4 } from '../../components/personal-records/LegalC4';



const EmployeeProfile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('c1');

    const tabs = [
        { id: 'c1', label: 'C1 - Personal Info', icon: User },
        { id: 'c2', label: 'C2 - Family & Educ', icon: BookOpen },
        { id: 'c3', label: 'C3 - Eligibility & Work', icon: FileText },
        { id: 'c4', label: 'C4 - Legal Questionnaire', icon: Scale },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft size={24} className="text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Employee Profile</h1>
                    <p className="text-sm text-gray-500">Viewing records for Juan Dela Cruz</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar / Profile Card */}
                <div className="w-full lg:w-80 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="relative mb-4">
                            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow-md">
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <User size={48} />
                                </div>
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-[var(--color-primary)] text-white rounded-full hover:bg-green-700 transition-colors shadow-sm">
                                <Camera size={16} />
                            </button>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Juan Dela Cruz</h2>
                        <p className="text-sm text-gray-500">Administrative Officer V</p>
                        <div className="mt-4 flex gap-2 w-full">
                            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                                Message
                            </button>
                            <button className="flex-1 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:bg-green-700">
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-6 py-4 border-l-4 transition-all ${activeTab === tab.id
                                    ? 'border-[var(--color-primary)] bg-green-50 text-[var(--color-primary)]'
                                    : 'border-transparent text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <tab.icon size={20} />
                                <span className="font-medium text-sm">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {activeTab === 'c1' && <PersonalC1 />}
                    {activeTab === 'c2' && <VoluntaryC2 />}
                    {activeTab === 'c3' && <OtherC3 />}
                    {activeTab === 'c4' && <LegalC4 />}
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;
