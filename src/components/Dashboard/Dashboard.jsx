import './Dashboard.css'
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserInfos } from '../../services/Api';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ActivityChart from '../Recharts/ActivityChart/ActivityChart';
import AverageSessionsChart from '../Recharts/AverageSessionsChart/AverageSessionsChart';
import ScoreChart from '../Recharts/ScoreChart/ScoreChart';
import PerformanceChart from '../Recharts/PerformanceChart/PerformanceChart';
import Points from '../../components/Points/Points'

export default function Dashboard({ match }) {

	const [data, setData] = useState([]);
	const [score, setScore] = useState([]);
	// const { userInfos, keyData } = data;
	const { id } = useParams();
	console.log(id)
	useEffect(() => {
		const getData = async () => {
			const request = await getUserInfos(id);
			console.log(request.data)
			if (!request) return <Navigate to='/404' />;
			setData(request.data);
			setScore([
				{ score: request.data.todayScore || request.data.score },
				{
					score:
						1 - request.data.todayScore || 1 - request.data.score,
				},
			]);
		};
		getData();
	}, [id]);
	if (data.length === 0) return null;
	return (
		<div className='container-body'>
			<div className='section-header'>
				<h1>
					Bonjour <span>{data.userInfos.firstName}</span>
				</h1>
				<p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
			</div>
			<div className='container-charts'>
				<div className='left-chart'>
					<ActivityChart id={id} />
					<div className='container-smallCharts'>
						<AverageSessionsChart id={id}/>
						<PerformanceChart id={id} />
						<ScoreChart id={id} score={data.score || data.todayScore}/>
					</div>

				</div>
				<div className='right-chart'>
					<Points img={'/img/calories-icon.png'} kcal={data.keyData.calorieCount} catogery={"Calories"} />
					<Points img={'/img/protein-icon.png'} kcal={data.keyData.proteinCount} catogery={"Proteins"} />
					<Points img={'/img/carbs-icon.png'} kcal={data.keyData.carbohydrateCount} catogery={"Glucides"} />
					<Points img={'/img/fat-icon.png'} kcal={data.keyData.lipidCount} catogery={"Lipides"} />

				</div>
			</div>
		</div>

	)
}

Dashboard.propTypes = {
	match: PropTypes.object,
};