import React, { useContext, useState } from 'react'
import { Input, Button, Row, Col, notification } from 'antd';
import backgroundImageSVG from '../../extras/img/background-869586.svg'
import global_variables from '../../keys';
import { my_fetch } from '../../methods/fetch';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../hooks/userContext';

import "./styles.css"
import MainLayout from '../layouts/MainLayout';
const CreateUser = () => {
    const { setUserLogged } = useContext(UserContext);
    let navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setpassword] = useState('');
    const addUser = async () => {
        const answer = await my_fetch.my_fetch_post(`${global_variables.url_server}/users/creatUser`, { userName, password })
        if (answer.sucess) {
            navigate('/chats');
        }
        else notification.open({
            message: 'Error',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    }
    const logUser = async () => {
        const answer = await my_fetch.my_fetch_post(`${global_variables.url_server}/users/login`, { userName, password })
        if (answer.sucess) {
            setUserLogged(answer.data);
            navigate('/chats');
        }
        else notification.open({
            message: 'Error',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    }
    return (
        <MainLayout>
            <div
                id='main-div'
                style={{ height: '100%', backgroundImage: `url('${backgroundImageSVG}')`, backgroundSize: 'cover' }}
                className="container centerHorizontalVertical"
            >
                <div className='p-5 font-sans w-96 h-96   rounded-lg shadow-lg container centerHorizontalVertical box-login-form' >
                    <h1 className=' text-6xl text-center'>Usuarios</h1>
                    <Input value={userName} onChange={({ target }) => setUserName(target.value)} className='rounded-md my-5 h-14' placeholder="Nombre de usuario" />
                    <Input value={password} onChange={({ target }) => setpassword(target.value)} className='rounded-md my-5 h-14' placeholder="Contrasena" type="password" />
                    <Row gutter={48}>
                        <Col className="gutter-row" >
                            <Button onClick={addUser} >
                                Crear Usuario
                            </Button>
                        </Col>
                        <Col className="gutter-row" >
                            <Button onClick={logUser} >
                                Ingresar
                            </Button>
                        </Col>
                    </Row >
                </div>
            </div>
        </MainLayout>
    )
}

export default CreateUser