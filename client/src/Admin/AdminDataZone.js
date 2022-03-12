import React, { useEffect, useState } from 'react';

import { LineChart, PieChart, Pie, Cell, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, BarChart, Bar, } from 'recharts';
import { findAllMetrics } from '../adapters/admin';
import zones from "../Data";
import { ChevronDown, ChevronLeft, Eye, EyeOff } from "react-feather";

function AdminDataZone(props) {
    const [allMetricsData, setAllMetricsData] = useState();
    const [allMetricsDataForGraph, setAllMetricsDataForGraph] = useState();
    const [pieData, setPieData] = useState();
    const [loading, setLoading] = useState(true);

    const [isShowingZones, setIsShowingZones] = useState(false);
    const [isShowingDistricts, setIsShowingDistricts] = useState(false);
    const [selectedZone, setSelectedZone] = useState();
    const [selectedDistrict, setSelectedDistrict] = useState();


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




    console.log(allMetricsData)
    return (
        <div>

            <div>
                <div
                    onClick={() => setIsShowingZones(!isShowingZones)}
                    className=" mb-2 flex cursor-pointer justify-between rounded-md  border  p-2 shadow-lg "
                >
                    <p>{` ${selectedZone ? selectedZone : ""} , ${selectedDistrict ? selectedDistrict : ""
                        } `}</p>
                    {selectedZone ? null : <p>Zones</p>}
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
                                            if (selectedZone === zone) {
                                                setIsShowingDistricts(!isShowingDistricts);
                                                setSelectedZone("");
                                                setSelectedDistrict("");
                                            } else {
                                                setIsShowingDistricts(true);
                                            }
                                        }}
                                    >
                                        <p>{zone}</p>
                                        <ChevronDown />
                                    </div>
                                    {isShowingDistricts && selectedZone === zone && (
                                        <div className=" space-y-2 rounded-md border p-4  ">
                                            {zones[selectedZone].map((district, idx) => {
                                                return (
                                                    <p
                                                        key={idx}
                                                        className=" cursor-pointer "
                                                        onClick={() => {
                                                            setSelectedDistrict(district);
                                                            setIsShowingZones(false);
                                                        }}
                                                    >
                                                        {district}
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            {/* <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart> */}
            {/* <LineChart width={600} height={300} data={allMetricsDataForGraph} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="name" tick={renderCustomAxisTick} />
                <YAxis />
                <Bar dataKey="uv" barSize={30} fill="#8884d8"
                    label={renderCustomBarLabel} />
            </BarChart> */}
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

export default AdminDataZone;
