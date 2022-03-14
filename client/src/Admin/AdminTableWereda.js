import React from 'react';
import React, { useEffect, useState } from 'react';

import { LineChart, PieChart, Pie, Cell, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, BarChart, Bar, } from 'recharts';
import { findAllMetrics, findAllMetricsForZone } from '../adapters/admin';
import zones from "../Data";
import { ChevronDown, ChevronLeft, Eye, EyeOff } from "react-feather";

function AdminTableWereda(props) {
    const [allMetricsData, setAllMetricsData] = useState();
    const [allMetricsDataForGraph, setAllMetricsDataForGraph] = useState();
    const [pieData, setPieData] = useState();
    const [loading, setLoading] = useState(true);
    const [isShowingZones, setIsShowingZones] = useState(false);
    const [selectedZone, setSelectedZone] = useState("");


    useEffect(async () => {
        if (loading && selectedZone !== "") {
            console.log("It should call the api")
            await findAllMetricsForZone(setAllMetricsData, selectedZone)
            await generateAllMetricsData()
            await generatePieData()
            setLoading(false)
        }
    }, [selectedZone,pieData,allMetricsData])

    const generateAllMetricsData = async () => {
        let ans = []
        if (allMetricsData) {
            ans = Object.keys(allMetricsData).map((count_name, idx) => {
                if (count_name !== "bullet") {
                    return { name: count_name, uv: allMetricsData[count_name], amount: allMetricsData[count_name], pv: 2400, amt: 2400 }
                }
            })
        }
        setAllMetricsDataForGraph(ans)

    };

    const generatePieData = async () => {
        let ans = []
        if (allMetricsData) {
            ans = Object.keys(allMetricsData).map((count_name, idx) => {
                if (count_name !== "bullet" && count_name !== "person") {
                    return { "name": count_name, "value": allMetricsData[count_name] }
                }
            })
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

    // https://www.javatpoint.com/react-table
    const columns = [{  
        Header: 'firstName',  
        accessor: 'firstName'  
       },{  
       Header: 'lastName',  
       accessor: 'lastName'  
       }]  


    console.log("printing data in the page")
    console.log(allMetricsData)
    return (
        <div>

            <div>
                <div
                    onClick={() => setIsShowingZones(!isShowingZones)}
                    className=" mb-2 flex cursor-pointer justify-between rounded-md  border  p-2 shadow-lg "
                >
                    <p>{` ${selectedZone ? selectedZone : ""} `}</p>
                    {selectedZone ? null : <p>Select Zone</p>}
                    <ChevronDown
                        className={`transition-transform  ${isShowingZones ? " rotate-180 " : "rotate-0  "
                            }  `}
                    />
                </div>
                {isShowingZones && (
                    <div className=" max-h-[20rem] overflow-scroll rounded-md border px-4 shadow-2xl transition-all scrollbar-hide  ">
                        {Object.keys(zones).map((zone, idx) => {
                            return (
                                <div key={idx} className={`  rounded-md  px-4 `}>
                                    <div
                                        className={`${selectedZone === zone &&
                                            "text-headingSix font-medium "
                                            } my-2 flex cursor-pointer justify-between`}
                                        onClick={() => {
                                            setSelectedZone(zone);
                                            setIsShowingZones(false);
                                            setLoading(true)
                                            if (selectedZone === zone) {
                                                setSelectedZone("");
                                            }
                                        }}
                                    >
                                        <p>{zone}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div class="shadow md:shadow-lg px-2">
                <h1 class="text-center px-0 text-green-500">
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
            </div>

            {!loading && allMetricsDataForGraph ? <BarChart width={600} height={300} data={allMetricsDataForGraph}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="amount" fill="#8884d8" barSize={30} />
            </BarChart> : <p>loading</p>}
            {!loading && pieData ? <PieChart width={600} height={300}>
                <Pie data={pieData} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                    {
                        pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart> : <p>Loading</p>}
        </div>
    );
}

export default AdminTableWereda;
