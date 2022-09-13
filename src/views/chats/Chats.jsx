import React, { useContext, useState } from 'react'
import { UserContext } from '../../hooks/userContext';
import { notification, Modal, Col, Row, Card, Input, Button, Typography, Descriptions, PageHeader, } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import beachBackground from './../../extras/img/sea-2755908.jpg';
import { my_fetch } from '../../methods/fetch';
import global_variables from '../../keys';
const { Meta } = Card;
const { Text, Link } = Typography;
const Chats = () => {
    
    const userLogged = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userName, setuserName] = useState('');
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        const asnwer =await my_fetch.my_fetch_post(`${global_variables.url_server}/users/addFriend`, { userName, userLoggedId: userLogged.userLogged._id })
        console.log(asnwer);
        notification.open({
            message: asnwer.success ? 'Agregado':'Error',
            description: asnwer.message})
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div style={{ backgroundImage: `url(${beachBackground})`, minHeight: 700 }}>
            <Modal title="Agregar amigo por nombre de usuario" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Input value={userName} onChange={({ target }) => setuserName(target.value)} placeholder="nombre de amigo" className='rounded-lg' />
            </Modal>
            <Row>
                <PageHeader
                    className="site-page-header bg-white"
                    onBack={() => window.history.back()}
                    title="HN chat"
                    extra={[
                        <Button key="2" onClick={showModal}>Agregar amigo</Button>,
                        <Button key="1" type="secondary">
                            cerrar sesion
                        </Button>,
                    ]}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="user logged">Lili Qu</Descriptions.Item>

                    </Descriptions>
                </PageHeader>
            </Row>
            <Row gutter={10} className='px-5 pt-5'>
                <Col span={3}  >
                    <Card
                        hoverable
                        className='bg-gray-400 rounded'
                        cover={<img className='rounded-xl' style={{ width: 100, height: 100, marginLeft: 'AUTO', marginRight: 'AUTO', borderRadius: 100, objectFit: 'cover', marginTop: 10 }} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
                <Col span={21}>
                    <div className='h-full w-full rounded-xl p-2' style={{ backgroundColor: 'rgba(255 ,255 ,255 ,0.6)' }} >
                        <Row className='pb-5' >
                            <Col span={24}>

                                <Row>
                                    <Text underline >Ant Design (keyboard)</Text>
                                </Row>
                                <Row >
                                    <Col span={18}></Col>
                                    <Text underline style={{ textAlign: 'end' }} >Ant Design (keyboard)</Text>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={22}>
                                <Input placeholder="Basic usage" className='rounded-lg' />
                            </Col>
                            <Col span={2}>
                                <Button className='text-black ' type="text" icon={<SendOutlined style={{ fontSize: '20px', }} />}>
                                    enviar
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Chats