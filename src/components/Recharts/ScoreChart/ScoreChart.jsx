import './ScoreChart.css'
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Label, ResponsiveContainer, Legend } from "recharts";
import { getUserInfos } from '../../../services/Api';


export default function ScoreChart({ id }) {
    const [data, setData] = useState([]);
    const [score, setScore] = useState([]);

    useEffect(() => {

        const getData = async () => {
            const res = await getUserInfos(id);
            
            setData(res.data);
            let score = res.data.todayScore || res.data.score
            setScore(data)
            console.log(res.data)
            console.log(score)
        };
        getData();

    }, [id]);
    console.log(score)


    // useEffect(() => {
    // 	const getData = async () => {
    // 		const res = await getUserInfos(id);
    //         let data = [
    //             { name: "Score", value: res?.data?.score || res?.data?.todayScore },
    //             { name: "Total", value: 1 }]

    // 		// Formats data

    // 		setData(data);
    // 	};
    // 	getData();
    // }, [id]);
    return (
        <div className='container-ScoreChart'>                <h4>Score</h4>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={300} height={300}>
                    <Pie
                        data={score}
                        dataKey='score'
                        innerRadius={73}
                        outerRadius={85}
                        startAngle={90}
                    >

                    </Pie>
                </PieChart>
            </ResponsiveContainer>

        </div>
    )
}