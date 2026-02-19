
import { useState, useRef, useEffect } from 'react';
import { Search, Filter, MoreVertical, Eye, Download, Edit, EyeOff, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const employees = [
        { id: 1, name: 'Dela Cruz, Juan', position: 'Administrative Officer', type: 'Regular', region: 'NCR' },
        { id: 2, name: 'Santos, Maria', position: 'Project Manager', type: 'Regular', region: 'Region 3' },
        { id: 3, name: 'Reyes, Jose', position: 'Technical Assistant', type: 'Contract of Service', region: 'Region 4A' },
        { id: 4, name: 'Garcia, Ana', position: 'Administrative Aide', type: 'Regular', region: 'Region 7' },
        { id: 5, name: 'Bautista, Pedro', position: 'Driver', type: 'Contract of Service', region: 'NCR' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = (id: number) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Personal Records</h1>
                    <p className="text-sm text-gray-500">Manage employee information and records.</p>
                </div>
                <button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Add Employee
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Employees</p>
                        <p className="text-3xl font-bold text-gray-900">1,250</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-full">
                        <span className="text-blue-600 font-bold">ALL</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Regular</p>
                        <p className="text-3xl font-bold text-gray-900">850</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-full">
                        <span className="text-[var(--color-primary)] font-bold">REG</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Contract of Service</p>
                        <p className="text-3xl font-bold text-gray-900">400</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-full">
                        <span className="text-orange-500 font-bold">COS</span>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search employee..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-visible">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#107d38] text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Position
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Region
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                            {employee.name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                            <div className="text-sm text-gray-500">ID: {2024000 + employee.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{employee.position}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.type === 'Regular' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                        }`}>
                                        {employee.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {employee.region}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-2 relative">
                                        <button
                                            onClick={() => navigate('/dashboard/employee/1')}
                                            className="text-[var(--color-primary)] hover:text-green-900"
                                            title="View Details"
                                        >
                                            <Eye size={20} />
                                        </button>
                                        <div className="relative">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); toggleMenu(employee.id); }}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <MoreVertical size={20} />
                                            </button>

                                            {activeMenu === employee.id && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-100 py-1"
                                                >
                                                    <button
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                        onClick={() => setActiveMenu(null)}
                                                    >
                                                        <Edit size={16} /> Edit
                                                    </button>
                                                    <button
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                        onClick={() => setActiveMenu(null)}
                                                    >
                                                        <EyeOff size={16} /> Hide
                                                    </button>
                                                    <button
                                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                        onClick={() => setActiveMenu(null)}
                                                    >
                                                        <Ban size={16} /> Block
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
