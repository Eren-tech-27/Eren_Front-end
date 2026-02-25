import { Search, Filter, Calendar, ChevronLeft, ChevronRight, MoreVertical, Edit, EyeOff, Ban } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AttendanceTable = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const employees = [
        { id: 1, name: 'Dela Cruz, Juan', position: 'Admin Officer', status: 'Present', timeIn: '07:55 AM', timeOut: '05:01 PM' },
        { id: 2, name: 'Santos, Maria', position: 'Project Manager', status: 'On Leave', timeIn: '-', timeOut: '-' },
        { id: 3, name: 'Reyes, Jose', position: 'Tech Assistant', status: 'Late', timeIn: '08:30 AM', timeOut: '05:30 PM' },
        { id: 4, name: 'Garcia, Ana', position: 'Admin Aide', status: 'Present', timeIn: '07:45 AM', timeOut: '05:15 PM' },
        { id: 5, name: 'Bautista, Pedro', position: 'Driver', status: 'Present', timeIn: '06:00 AM', timeOut: '03:00 PM' },
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
                    <h1 className="text-2xl font-bold text-gray-900">Attendance & Leave</h1>
                    <p className="text-sm text-gray-500">Monitor daily attendance and leave requests.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                    <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft size={20} /></button>
                    <div className="flex items-center gap-2 font-medium">
                        <Calendar size={18} className="text-[var(--color-primary)]" />
                        <span>September 14, 2024</span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight size={20} /></button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">Present</p>
                    <p className="text-3xl font-bold text-green-600">850</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">Absent / Leave</p>
                    <p className="text-3xl font-bold text-red-500">45</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">Late</p>
                    <p className="text-3xl font-bold text-orange-500">12</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">On Travel</p>
                    <p className="text-3xl font-bold text-blue-500">5</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-visible">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-gray-700">Daily Attendance Log</h3>
                    <div className="flex gap-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter size={18} className="text-gray-600" />
                        </button>
                    </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#107d38] text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Employee
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Time In
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Time Out
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Status
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
                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                            {employee.name.charAt(0)}
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                            <div className="text-xs text-gray-500">{employee.position}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {employee.timeIn}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {employee.timeOut}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${employee.status === 'Present' ? 'bg-green-100 text-green-800' : ''}
                    ${employee.status === 'On Leave' ? 'bg-red-100 text-red-800' : ''}
                    ${employee.status === 'Late' ? 'bg-orange-100 text-orange-800' : ''}
                  `}>
                                        {employee.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-2 relative">
                                        {/* Eye button removed per request */}
                                        <div className="relative">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); toggleMenu(employee.id); }}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <MoreVertical size={18} />
                                            </button>

                                            {activeMenu === employee.id && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-100 py-1 text-left"
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

export default AttendanceTable;
