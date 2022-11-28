import React, {  useState } from 'react'
import MainLayout from '../layouts/MainLayout';
import { screenSize } from '../../const/screensize';
import SmallDeviceView from './SmallDeviceView';
import MediumDeviceView from './MediumDeviceView';


const Chats = () => {
    const [showModal, setshowModal] = useState(false)
    const [showUsers, ] = useState(true)
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