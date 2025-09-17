import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

export const LineChartComponent = ({ data }) => {
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Crop Growth (cm)',
        data: [12, 19, 15, 27],
        borderColor: 'rgb(22, 163, 74)',
        backgroundColor: 'rgba(22, 163, 74, 0.2)',
        tension: 0.3
      }
    ]
  };

  return <Line data={chartData} options={chartOptions} />;
};

export const BarChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Cost (₹)',
        data: data.map(item => item.cost),
        backgroundColor: 'rgba(239, 68, 68, 0.7)'
      },
      {
        label: 'Profit (₹)',
        data: data.map(item => item.profit),
        backgroundColor: 'rgba(22, 163, 74, 0.7)'
      }
    ]
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export const PieChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.yield),
        backgroundColor: [
          'rgba(22, 163, 74, 0.7)',
          'rgba(234, 179, 8, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  };

  return <Pie data={chartData} options={chartOptions} />;
};