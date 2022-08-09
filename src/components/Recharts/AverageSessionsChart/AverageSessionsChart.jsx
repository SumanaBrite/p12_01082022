import './AverageSessionsChart.css'
import React, { useEffect, useState } from 'react';
import { getUserAverageSessions } from '../../../services/Api';
import AverageSessionsChartTooltip from './AverageSessionsChartTooltip';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AverageSessionsChart({ id }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const request = await getUserAverageSessions(id);
      setData(request.data.sessions);
      console.log(request.data.sessions)
    };
    getData();
  }, [id]);
  let daysArray = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  let days = daysArray.map((day, index) => {
    return <span key={index}>{day}</span>
  })
  return (
    <div className='container-averageSessionsChart'>
       <div className="days">{days}</div>
      <h4 className='averageSessionHeader'>Durée moyenne des sessions</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={600}
          height={300}
          data={data}

        >
          <XAxis
            axisLine={false}
						tickLine={false}
						dataKey='days'
						stroke='rgba(255, 255, 255, 0.5)'
						tick={{ fontSize: 12 }}
						minTickGap={3}
          />
          <YAxis
            hide={true}
            domain={['dataMin -40', 'dataMax +30']}
            tickLine={false}
            type="number"
          />
          <Tooltip content ={<AverageSessionsChartTooltip/>}/>
          <Line
						dataKey='sessionLength'
						type='monotone'
						stroke='rgba(255, 255, 255, 0.5)'
						strokeWidth={2}
						dot={false}
						activeDot={{
							stroke: 'rgba(255, 255, 255, 0.5)',
							strokeWidth: 10,
							r: 5,
						}}
					/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}