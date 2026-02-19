import { useState } from 'react';
import UserManagement from '../../components/admin/UserManagement';
import AccessManagement from '../../components/admin/AccessManagement';
import ActivityLog from '../../components/admin/ActivityLog';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'access' | 'logs'>('users');

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>

            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'users'
                            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        User Management
                    </button>
                    <button
                        onClick={() => setActiveTab('access')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'access'
                            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Access Management
                    </button>
                    <button
                        onClick={() => setActiveTab('logs')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'logs'
                            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Activity Log
                    </button>
                </nav>
            </div>

            <div className="pt-4">
                {activeTab === 'users' && <UserManagement />}
                {activeTab === 'access' && <AccessManagement />}
                {activeTab === 'logs' && <ActivityLog />}
            </div>
        </div>
    );
};

export default AdminSettings;
