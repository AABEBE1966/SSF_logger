import React from 'react';
import AdminDataViewer from './AdminDataViewer';
import AdminDataWereda from './AdminDataWereda';
import AdminDataZone from './AdminDataZone';



function Admin(props) {
    return (
        <div>
            <div class="grid grid-cols-2 gap-4">
                <AdminDataViewer />
                <AdminDataZone />
            </div>
            <div class="grid grid-cols-2 gap-4">
                <AdminDataZone />
                <AdminDataWereda />
            </div>
        </div>
    );
}

export default Admin;