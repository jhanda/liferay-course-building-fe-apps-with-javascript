import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const BarChart = ({ title, datasetLabel, labels, values, color }) => {

    const [chartData, setChartData] = useState(null);
    const [options, setOptions] = useState(null)

    useEffect(() => {
        if(values) {
            setOptions({
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: title,
                    },
                },
            });
            setChartData({
                labels,
                datasets: [{
                    label: datasetLabel,
                    data: values,
                    backgroundColor: color,
                }]
            });
        }
    }, [title, datasetLabel, labels, values, color]);

    return (
        <>
            {chartData ? (
                <Bar options={options} data={chartData} />
            ) : (
                <p>No data to display</p>
            )}
        </>
    );
};

export default BarChart;
