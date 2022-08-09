import './ActivityChart.css'
import React, { useState, useEffect } from 'react';
import { getUserActivity } from '../../../services/Api';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ActivityChartTooltip from '../ActivityChartTooltip/ActivityChartTooltip';


export default function ActivityChart({ id }) {
	const [data, setData] = useState([]);
	

	useEffect(() => {
		const getData = async () => {
			const request = await getUserActivity(id);
			console.log(request);

			// for (
			// 	let i = 1;
			// 	i < request.data.sessions.length;
			// 	i++
			// ) {
			// 	request.data.sessions[i] = {
			// 		...request.data.sessions[i],
			// 		day: i + 1,
			// 	};
			// }
			// ------------------------------------
			
	// for (let i = 0; i < data?.length; i++) {
	// 	data[i].day = [1, 2, 3, 4, 5, 6, 7]
	//   }
			setData(request.data.sessions);
			console.log(request.data.sessions);
		};
		getData();
	}, [id]);
	return (
		<>
			<div className='container-activityChart'>
				<h5 className='activityChart-header'>
					Activité quotidienne
				</h5>
				<div className='dots'>
					<div className='kilo'>
						<div className='dot-black'>
						</div>
						<p>Poids (kg)</p>
					</div>
					<div className='calories'>
						<div className='dot-red'>
						</div>
						<p>Calories brûlées (kCal)</p>
					</div>
				</div>
			</div>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={data}
					// margin={{
					// 	top: 5,	
					// }}
					// barGap={3}
					// barCategoryGap={4}

				>
					<CartesianGrid strokeDasharray="" />
					<XAxis dataKey="day" />
					<YAxis
					yAxisId='kg'
					datakey='kilogram'
					orientation='right'
					axisLine={false}
					tickLine={false}
					  />
					<YAxis 
					yAxisId='cal'
					datakey='calories'/>
					<Tooltip content={<ActivityChartTooltip/> } />
					<Legend />
					<Bar 
						yAxisId='kg'
						dataKey='kilogram'
						fill='#282D30'
						barSize={7}
						radius={[50, 50, 0, 0]}/>
					<Bar yAxisId='cal'
						dataKey='calories'
						fill='#E60000'
						barSize={7}
						radius={[50, 50, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</>
	)
}