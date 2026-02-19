
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'x' as const,
    plugins: {
        legend: {
            display: true,
            position: 'top' as const,
            align: 'end' as const,
            labels: {
                usePointStyle: true,
                padding: 15,
            }
        },
        title: {
            display: true,
            text: 'MANPOWER PER REGION',
            position: 'top' as const,
            align: 'start' as const,
            color: '#333',
            font: {
                size: 16,
                weight: 'bold' as const,
            },
            padding: {
                bottom: 20,
            }
        },
    },
    scales: {
        x: {
            stacked: true,
            grid: {
                display: false,
            }
        },
        y: {
            beginAtZero: true,
            stacked: true,
            grid: {
                color: '#f0f0f0',
            },
            ticks: {
                stepSize: 100,
            }
        }
    }
};

const labels = ['Region 1', 'Region 2', 'Region 3', 'Region 4A', 'Region 4B', 'Region 5', 'Region 6', 'Region 7', 'Region 8', 'Region 9', 'Region 10', 'Region 11', 'Region 12', 'Region 13', 'Region 17', 'BARMM', 'CAR/NCR'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Admin',
            data: [150, 200, 150, 180, 150, 200, 180, 150, 180, 200, 150, 180, 150, 200, 100, 180, 250],
            backgroundColor: '#00897B',
            borderRadius: 0,
        },
        {
            label: 'Tech',
            data: [120, 150, 180, 150, 120, 180, 150, 200, 120, 150, 200, 150, 150, 180, 120, 150, 200],
            backgroundColor: '#FFC107',
            borderRadius: 0,
        },
        {
            label: 'Support',
            data: [100, 130, 120, 170, 130, 220, 270, 50, 100, 200, 100, 120, 150, 20, 80, 50, 50],
            backgroundColor: '#FF6F00',
            borderRadius: 0,
        },
    ],
};

export function ManpowerChart() {
    return <div className="h-full w-full"><Bar options={options} data={data} /></div>;
}
