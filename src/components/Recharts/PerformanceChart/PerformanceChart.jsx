import './Performance.css'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState } from 'react';
import { getUserPerformance } from '../../../services/Api';


export default function PerformanceChart({ id }) {
  const [data, setData] = useState([]);

  const [performance, setPerformance] = useState()
  const [kind, setKind] = useState()

  // useEffect(() => {
  //   setPerformance(props.performance?.data)
  //   setKind(props.performance?.kind)
  // }, [props.performance])

  // The loop changes the numbers to their corresponding performance, according to the figma model
  // for (let i = 0; i < performance?.length; i++) {
  //   performance[i].kind =
  //     kind[i + 1].charAt(0).toUpperCase() + kind[i + 1].slice(1) // put captial on first letter
  // }

  useEffect(() => {
    const getData = async () => {
      const request = await getUserPerformance(id);
      request.data.data.map(obj => {
        console.log(obj);             
            obj.kind = request.data.kind[obj.kind];   
            console.log(obj.kind);             
        });

      setData(request.data.data);
      console.log(request.data.data)

    };
    getData();
  }, [id]);
  return (
    <div className='container-performanceChart'>
      <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx='50%' cy='50%' outerRadius='60%' data={data}>
					<PolarGrid />
					<PolarAngleAxis
						dataKey='kind'
						stroke='white'
						tickLine={false}
						tick={{ fontSize: 11 }}
					/>
					<Radar
						dataKey='value'
						stroke='#FF0101'
						fill='#FF0101'
						fillOpacity={0.7}
					/>
				</RadarChart>
      </ResponsiveContainer>

    </div>
  )
}