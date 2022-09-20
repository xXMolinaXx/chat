import React, { useContext, useState } from 'react'
import { UserContext } from '../../hooks/userContext';
import { notification, Modal, Col, Row, Card, Input, Button, Typography, Descriptions, PageHeader, } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import beachBackground from './../../extras/img/sea-2755908.jpg';
import { my_fetch } from '../../utils/fetch';
import global_variables from '../../keys';
import MainLayout from '../layouts/MainLayout';
import { screenSize } from '../../const/screensize';
import SmallDeviceView from './SmallDeviceView';
import MediumDeviceView from './MediumDeviceView';
const { Meta } = Card;
const { Text, Link } = Typography;
const Chats = () => {

    const userLogged = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userName, setuserName] = useState('');
    const [showUsers, setshowUsers] = useState(true)
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        const asnwer = await my_fetch.my_fetch_post(`${global_variables.url_server}/users/addFriend`, { userName, userLoggedId: userLogged.userLogged._id })
        console.log(asnwer);
        notification.open({
            message: asnwer.success ? 'Agregado' : 'Error',
            description: asnwer.message
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <MainLayout>
            <div className='h-full grid-container pt-5 px-5' >
            {(screenSize.medium < window.innerWidth) && (<MediumDeviceView  />)}
                {(screenSize.medium > window.innerWidth) && (<SmallDeviceView showUser={showUsers} />)}
            </div>
        </MainLayout >
    )
}

export default Chats