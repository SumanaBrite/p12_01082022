import './AverageSessionsChart.css'
import React from 'react'
export default function AverageSessionsChartTooltip({ active, payload }) {
	if (active) {
		return <p className='averageSessionsTooltip'>{`${payload[0].value} `} min</p>;
	}
	return null;
}