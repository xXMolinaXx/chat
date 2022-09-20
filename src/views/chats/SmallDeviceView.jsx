import { Card } from 'antd'
import React from 'react'
const { Meta } = Card;
const SmallDeviceView = ({showUser}) => {
    return (
        <>
            { showUser ? <div className="my-container centerHorizontalVertical">
                {false ?
                    (<Card
                        hoverable
                        className='rounded m-3 drop-shadow-xl h-52'
                        cover={<img className='rounded-xl' style={{ width: 100, height: 100, marginLeft: 'AUTO', marginRight: 'AUTO', borderRadius: 100, objectFit: 'contain', marginTop: 10 }} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>)
                    :
                    <p className='text-center'>No tienes ninguna conversacion</p>
                }
            </div>
            :
            <div className=' bg-white rounded-l m-3 drop-shadow-xl'>
                1
            </div>}
        </>
    )
}

export default SmallDeviceView