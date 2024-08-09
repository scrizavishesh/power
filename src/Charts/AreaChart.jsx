import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { graphData } from '../Utils/Apis';
import HashLoader from '../Dashboard/Loader';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler);

const AreaChart = ({ year, type, lightMode }) => {

  // const [year, setYear] = useState(2024);
  // const [type, setType] = useState('payin')

  const [graphDat, setGraphData] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = async () => {
    try {
      setShowLoader(true);
      const orderResponse = await graphData(year, type);
      console.log(orderResponse, "OrderGraphData")
      if (orderResponse?.status === 200)
        setShowLoader(false);
      setGraphData(orderResponse?.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [year, type]);

  const labels = Object.keys(graphDat);
  const payinData = labels.map(month => graphDat[month].payin.Created);
  const payoutData = labels.map(month => graphDat[month].payout.Submitted);



  const data = {
    labels,
    datasets: [
      {
        label: 'Payin Created',
        data: payinData,
        fill: true,
        backgroundColor: 'rgba(34, 197, 93, 0.1)',
        borderColor: '#22C55D',
        pointRadius: 0,
        tension: 0.4
      },
      {
        label: 'Payout Submitted',
        data: payoutData,
        fill: true,
        backgroundColor: 'rgba(34, 197, 193, 0.1)',
        borderColor: '#22C5DD',
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
            return value + 'k';
          }
        }
      }
    }
  };

  return (
    <>{
      showLoader && (
        <HashLoader />
      )
    }
      <div className="chart-container" style={{ height: '80vh' }}>
        <Line data={data} options={options}></Line>
      </div>
    </>

  );
};

export default AreaChart;














