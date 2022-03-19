import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { findAllPersonForWereda } from '../adapters/admin';

const columns = [
    { id: 'firstName', label: 'First Name', minWidth: 170 },
    { id: 'lastName', label: 'Last Name', minWidth: 170 },
    { id: 'armType', label: 'Arm Type', minWidth: 100 },
    { id: 'bulletNumber', label: 'Bullet Number', minWidth: 100 },
    { id: 'licenseNumber', label: 'License', minWidth: 100 },
    { id: 'kebele', label: 'kebele', minWidth: 100 },
    { id: 'wereda', label: 'wereda', minWidth: 100 },
    { id: 'zone', label: 'zone', minWidth: 100 },
];


export default function TableForWeredaData(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [loading, setLoading] = useState(true);
    const [wereda, setWereda] = useState("");
    const [zone, setZone] = useState("");
    const [allPersonsForWereda, setAllPersonForWereda] = useState([]);


    useEffect(async () => {
        setWereda(props.wereda)
        setZone(props.zone)
        if (loading && zone !== "" && wereda !== "") {
            console.log("It should call the api")
            setLoading(false)
            await findAllPersonForWereda(setAllPersonForWereda, zone, wereda)
        }
    }, [props])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div class="shadow md:shadow-lg px-5 py-5">
            {
                allPersonsForWereda !== [] ? <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 600 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allPersonsForWereda
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.licenseNumber}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={`${column.id}+ ${row.licenseNumber}`} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[20, 50, 100]}
                        component="div"
                        count={allPersonsForWereda.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper> : <p>Loading</p>
            }
        </div>
    );
}