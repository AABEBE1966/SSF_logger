import React, { useEffect, useState } from 'react';

import { LineChart, PieChart, ResponsiveContainer, Pie, Cell, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, BarChart, Bar, } from 'recharts';
import { findAllMetrics } from '../adapters/admin';
import TableForRegionData from './TableForRegionData';


function AdminDataViewer(props) {
    const [allMetricsData, setAllMetricsData] = useState();
    const [allMetricsDataForGraph, setAllMetricsDataForGraph] = useState();
    const [pieData, setPieData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        if (loading) {
            await findAllMetrics(setAllMetricsData)
            await generateAllMetricsData()
            await generatePieData()
        }
        setLoading(false)
    }, [pieData, allMetricsData])

    const generateAllMetricsData = async () => {
        let ans = []
        if (allMetricsData) {
            let keys = Object.keys(allMetricsData);
            for (let i = 0; i < keys.length; i++) {
                let count_name = keys[i]
                let value = allMetricsData[count_name];
                if (count_name !== "bullet") {
                    ans.push({ name: count_name, uv: value, amount: value, pv: 2400, amt: 2400 })
                }
            }

            // ans = Object.keys(allMetricsData).map((count_name, idx) => {
            //     if (count_name !== "bullet") {
            //         return { name: count_name, uv: allMetricsData[count_name], amount: allMetricsData[count_name], pv: 2400, amt: 2400 }
            //     }
            // })
        }
        setAllMetricsDataForGraph(ans)

    };

    const generatePieData = async () => {
        let ans = []
        if (allMetricsData) {
            let keys = Object.keys(allMetricsData);
            for (let i = 0; i < keys.length; i++) {
                let count_name = keys[i]
                let value = allMetricsData[count_name];
                if (count_name !== "bullet" && count_name !== "person") {
                    ans.push({ "name": count_name, "value": value })
                }
            }
            // ans = Object.keys(allMetricsData).map((count_name, idx) => {
            //     if (count_name !== "bullet" && count_name !== "person") {
            //         return { "name": count_name, "value": allMetricsData[count_name] }
            //     }
            // })
        }
        setPieData(ans)
    }
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}`}</label>
                </div>
            );
        }

        return null;
    };




    console.log(allMetricsData)
    return (

        <div>
            <div class="shadow md:shadow-lg px-2 py-2">
                <h1 class="text-center px-0	py-5 text-green-500">
                    Overall data about arms and arm types
                </h1>
                {!loading && allMetricsDataForGraph ? <div class={`shadow md:shadow-lg px-2 py-2 grid grid-rows-3 grid-cols-4`}>
                    {
                        Object.keys(allMetricsData).map((count_name, idx) => {

                            return <p>
                                {count_name}: {allMetricsData[count_name]}
                            </p>

                        })
                    }
                </div> : <p>Loading</p>}

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 shadow md:shadow-lg py-2">
                    {!loading && allMetricsDataForGraph ?
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart height={300} data={allMetricsDataForGraph}>
                                <XAxis dataKey="name" stroke="#8884d8" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <Bar dataKey="amount" fill="#8884d8" barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>

                        : <p>loading</p>}
                    {!loading && pieData ?

                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart height={300}>
                                <Pie data={pieData} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                                    {
                                        pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                    }
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                        : <p>Loading</p>}
                </div>
                {!loading ?
                    <TableForRegionData /> : <p>loading</p>
                }
            </div>
        </div>
    );
}

export default AdminDataViewer;
