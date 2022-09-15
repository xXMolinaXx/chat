import React, { useEffect, useState } from 'react'
import { screenSize } from '../../const/screensize'
import iconHonduras from '../../extras/img/iconHonduras.png'
const MainLayout = ({children}) => {
    const [browserWidth, setbrowserWidth] = useState(window.innerWidth);
    useEffect(() => {
        setbrowserWidth(window.innerWidth)
    },[])
    
  return (
    <>
    <header>
        <nav className='nav container'>
            <div className='container'>
                <img src={iconHonduras} alt='imagen de hondruas' className='w-7' />
                <p>hn</p>
            </div>
            {
                screenSize.small <  browserWidth
                ? 
            <ul className='text-end'>
                <li>prueba</li>
                <li>prueba 2</li>
            </ul>
            :
            <div class="hamburger">
                <div class="hamburger-inner"></div>
            </div>
            }
        </nav>
    </header>
    <main className='h-full w-full'>
        {children}
    </main>
    <footer>
        <p className='text-center'>
        Derechos reservados. Kenny Molina
        </p>
    </footer>
    </>
  )
}

export default MainLayout