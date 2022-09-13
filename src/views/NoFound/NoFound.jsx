import React from "react";
import { Typography, Button } from "antd";
import notFound from '../../extras/img/error-6482984.svg'
const { Title } = Typography;
const NoFound = () => {
    return (
        <div >
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <img src={notFound} alt="not found" style={{ width: 600, }} />
            </div>
            <Title style={{ textAlign: 'center', flex: 6 }}>OOOPS!!!!!??? PERRO QUE A PASAO!!</Title>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Button type="dashed">Regresar al inicio</Button>
            </div>
        </div>

    );
};

export default NoFound;
