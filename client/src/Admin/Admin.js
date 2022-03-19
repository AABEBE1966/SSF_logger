import React from 'react';
import AdminDataViewer from './AdminDataViewer';
import AdminDataWereda from './AdminDataWereda';
import AdminDataZone from './AdminDataZone';
import AdminTableWereda from './AdminTableWereda';
import TableComponent from './TableForWeredaData';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ResponsiveNavBar from '../ResponsiveNavBar';



function Admin(props) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            <ResponsiveNavBar />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Regional" value="1" />
                            <Tab label="Zonal" value="2" />
                            <Tab label="Wereda" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">   <div class="grid grid-cols-1 gap-4">
                        <AdminDataViewer />
                    </div>
                    </TabPanel>
                    <TabPanel value="2">   <div class="grid grid-cols-1 gap-4">
                        <AdminDataZone />
                    </div></TabPanel>
                    <TabPanel value="3">   <div class="grid grid-cols-1 gap-4">
                        <AdminDataWereda />
                    </div></TabPanel>
                </TabContext>
            </Box>

            {/* <div class="grid grid-cols-1 gap-4">
                <AdminDataWereda />
                <TableComponent />
            </div>
            <div class="grid grid-cols-2 gap-4">
                <AdminTableWereda />
                <AdminDataWereda />
            </div>
            <TableComponent /> */}
        </div>
    );
}

export default Admin;