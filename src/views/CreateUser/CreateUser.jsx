import React, { useContext, useState } from 'react'
import { Input, Button, Row, Col, notification } from 'antd';
import backgroundImageSVG from '../../extras/img/background-869586.svg'
import comunicacionPNG from '../../extras/img/comunicacion.png'
import global_variables from '../../keys';
import { my_fetch } from '../../methods/fetch';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../hooks/userContext';
import MainLayout from '../layouts/MainLayout';
import { screenSize } from '../../const/screensize';

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
                style={{ backgroundImage: `url('${backgroundImageSVG}')`, backgroundSize: 'cover' }}
                className={`my-container h-full ${ screenSize.medium < window.innerWidth && 'centerHorizontalVertical'}`}
            >
                <div className='p-5'>
                    <h1 className=' text-6xl text-center text-white'>Que Onda!</h1>
                    <div className='my-container centerHorizontal pt-5'>
                        <img src={comunicacionPNG} alt='icono de chat' width={150}/>
                    </div>
                    <Input value={userName} onChange={({ target }) => setUserName(target.value)} className='rounded-md my-5 h-14' placeholder="Nombre de usuario" />
                    <Input value={password} onChange={({ target }) => setpassword(target.value)} className='rounded-md my-5 h-14' placeholder="Contrasena" type="password" />
                    <Row gutter={48} className='centerHorizontal'>
                        <Col className="gutter-row" >
                            <Button className='bg-white' onClick={addUser} >
                                Crear Usuario
                            </Button>
                        </Col>
                        <Col className="gutter-row" >
                            <Button className='bg-white' onClick={logUser} >
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