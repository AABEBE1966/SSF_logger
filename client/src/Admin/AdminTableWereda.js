import React, { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { LineChart, PieChart, Pie, Cell, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, BarChart, Bar, } from 'recharts';
import { findAllMetrics, findAllMetricsForZone } from '../adapters/admin';
import zones from "../Data";
import { ChevronDown, ChevronLeft, Eye, EyeOff } from "react-feather";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
    }, [selectedZone, pieData, allMetricsData])

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
    // const columns = [{  
    //     Header: 'Name',  
    //     accessor: 'name'  
    //    },{  
    //    Header: 'Age',  
    //    accessor: 'age'  
    //    }]   

    //    const data = [{  
    //     name: 'Ayaan',  
    //     age: 26  
    //     },{  
    //     name: 'Ahana',  
    //     age: 22  
    //     },{  
    //     name: 'Peter',  
    //     age: 40   
    //     },{  
    //     name: 'Virat',  
    //     age: 30  
    //     },{  
    //     name: 'Rohit',  
    //     age: 32  
    //     },{  
    //     name: 'Dhoni',  
    //     age: 37  
    //     }]  


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
            {/* 
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
            </BarChart> : <p>loading</p>} */}
            {/* {!loading && pieData ? <PieChart width={600} height={300}>
                <Pie data={pieData} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                    {
                        pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart> : <p>Loading</p>} */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AdminTableWereda;
