
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
            align: 'end' as const,
            labels: {
                usePointStyle: true,
                padding: 15,
            }
        },
        title: {
            display: true,
            text: 'TURN OVER RATE & ABSENTISM',
            position: 'top' as const,
            align: 'start' as const,
            color: '#333',
            font: {
                size: 16,
                weight: 'bold' as const,
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 20,
            grid: {
                color: '#f0f0f0',
            }
        },
        x: {
            grid: {
                display: false,
            }
        }
    },
    elements: {
        line: {
            tension: 0.4,
        }
    }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
    labels,
    datasets: [
        {
            fill: false,
            label: 'Turn Over Rate',
            data: [4, 6, 5, 8, 7, 9, 8, 10, 6, 8, 5, 7],
            borderColor: '#1E88E5',
            pointBackgroundColor: '#1E88E5',
            pointBorderColor: '#1E88E5',
            tension: 0.4,
        },
        {
            fill: false,
            label: 'Absentism',
            data: [5, 7, 6, 7, 8, 9, 7, 11, 7, 9, 6, 8],
            borderColor: '#00897B',
            pointBackgroundColor: '#00897B',
            pointBorderColor: '#00897B',
            tension: 0.4,
        },
    ],
};

export function TurnoverChart() {
    return <div className="h-full w-full"><Line options={options} data={data} /></div>;
}
