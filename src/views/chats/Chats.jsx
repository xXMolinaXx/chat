import React, { useContext, useState } from 'react'
import { UserContext } from '../../hooks/userContext';
import { notification, } from 'antd';
import { my_fetch } from '../../utils/fetch';
import MainLayout from '../layouts/MainLayout';
import { screenSize } from '../../const/screensize';
import SmallDeviceView from './SmallDeviceView';
import MediumDeviceView from './MediumDeviceView';


const Chats = () => {
    const [showModal, setshowModal] = useState(false)
    const userLogged = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userName, setuserName] = useState('');
    const [showUsers, setshowUsers] = useState(true)
    return (
        <MainLayout>
            <div className='h-full grid-container ' >
                {(screenSize.medium < window.innerWidth) && (<MediumDeviceView showModal={showModal} setshowModal={setshowModal} />)}
                {(screenSize.medium > window.innerWidth) && (<SmallDeviceView showUser={showUsers} />)}
            </div>
        </MainLayout >
    )
}

export default Chats