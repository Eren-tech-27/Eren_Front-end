
import { Users, UserCheck } from 'lucide-react';

interface HeadcountWidgetProps {
    title: string;
    count: number;
    secondCount?: number;
    subtitle?: string;
    icon?: 'users' | 'check';
    color?: string;
}

const HeadcountWidget = ({ title, count, secondCount, subtitle, icon = 'users', color = 'text-[var(--color-primary)]' }: HeadcountWidgetProps) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
            <div>
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-6">{title}</h3>
                {secondCount !== undefined ? (
                    <div className="space-y-4">
                        <div className="flex items-baseline gap-2">
                            <p className={`text-4xl font-bold ${color}`}>{count.toLocaleString()}</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className={`text-2xl font-bold text-gray-500`}>{secondCount.toLocaleString()}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-start">
                        <div>
                            <p className={`text-4xl font-bold ${color}`}>{count.toLocaleString()}</p>
                        </div>
                        <div className={`p-3 rounded-full bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
                            {icon === 'users' ? (
                                <Users className={`h-6 w-6 ${color}`} />
                            ) : (
                                <UserCheck className={`h-6 w-6 ${color}`} />
                            )}
                        </div>
                    </div>
                )}
            </div>
            {subtitle && (
                <div className="mt-4 text-sm text-gray-500">
                    {subtitle}
                </div>
            )}
        </div>
    );
};

export default HeadcountWidget;
