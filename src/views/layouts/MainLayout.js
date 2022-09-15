import React from 'react'
import iconHonduras from '../../extras/img/iconHonduras.png'
const MainLayout = ({children}) => {
  return (
    <>
    <header>
        <nav className='nav container'>
            <ul>
                <li className='li-logo'> <img src={iconHonduras} alt='imagen de hondruas' className='w-7' /></li>
                <li>queOnda</li>
            </ul>
            <ul className='text-end'>
                <li>prueba</li>
                <li>prueba 2</li>
            </ul>
        </nav>
    </header>
    <main className='h-full'>
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