import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler);

const AreaChart = ({ lightMode }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Details',
        data: [45000, 20000, 30000, 18000, 20000, 40000, 20000, 10000, 28000, 20000, 30000, 25000],
        fill: true,
        backgroundColor: 'rgba(34, 197, 93, 0.1)',
        borderColor: '#22C55D',
        pointRadius: 0,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: function (tooltipItems) {
            const item = tooltipItems[0];
            return data.labels[item.dataIndex];
          },
          label: function (tooltipItem) {
            return `Details: ${tooltipItem.raw}`;
          }
        },
        backgroundColor: '#ffffff',
        titleColor: '#000000',
        bodyColor: '#000000',
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: lightMode ? 'var(--searchGreyText)' : '#999999',
        },
        border: {
          color: lightMode ? '#008479' : '#999999'
        }
      },
      y: {
        grid: {
          display: false
        },
        beginAtZero: true,
        border: {
          color: lightMode ? '#008479' : '#999999'
        },
        ticks: {
          color: lightMode ? 'var(--searchGreyText)' : '#999999',
          callback: function (value) {
            return value / 1000 + 'k';
          }
        }
      }
    }
  };

  return (
    <div className="chart-container" style={{ height: '80vh' }}>
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default AreaChart;















// import React from 'react';
// import {
//     Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler
// } from 'chart.js';

// import { Line } from 'react-chartjs-2';

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler);

// const AreaChart = () => {
//     const data = {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//         datasets: [
//             {
//                 label: 'Go Attendance',
//                 data: [45000, 20000, 30000, 18000, 20000, 40000, 20000, 10000, 28000, 20000, 30000, 25000],
//                 fill: true,
//                 backgroundColor: '#f8fff5',
//                 borderColor: '#22C55D',
//                 borderRadius: 5,
//                 tension: 0.5
//             }
//         ]
//     };

//     const options = {
//         responsive: true,
//         layout: {
//             padding: {
//                 top: 10,
//                 bottom: 10,
//                 left: 10,
//                 right: 10,
//             },
//         },
//         plugins: {
//             legend: {
//                 display: false,
//             }
//         },
//         scales: {
            
//             x: {
//                 grid: {
//                     display: true,
//                     color: '#F3F9F8',
//                 },
//                 ticks: {
//                     color: '#000',
//                 },
//                 border: {
//                     color: '#008479',
//                 },
//             },
//             y: {
//                 grid: {
//                     display: true,
//                     color: '#F3F9F8',
                    
//                 },
//                 beginAtZero: true,
//                 max: 40000,
//                 border: {
//                     color: '#008479',
//                 },
//                 ticks: {
//                     color: '#000',
//                     callback: function(value) {
//                         return value / 1000 + 'K';
//                     }
//                 },
//             },
//         }
//     };

//     return (
//         <>
//             <div className="chart-container" style={{ width: '100%'}}>
//                 <Line data={data} options={options}></Line>
//             </div>
//         </>
//     );
// }

// export default AreaChart;
