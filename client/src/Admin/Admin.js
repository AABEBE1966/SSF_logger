import React from 'react';
import AdminDataViewer from './AdminDataViewer';
import AdminDataZone from './AdminDataZone';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


function Admin(props) {
    return (

        <Container >

            <Row>
                <Col md={4} >
                    <AdminDataViewer />
                </Col>

                <Col md={4} >
                    <AdminDataZone />
                </Col>

                {/* <Col md={4} >
                    <AdminDataViewer />
                </Col> */}
            </Row>

        </Container>
    );
}

export default Admin;