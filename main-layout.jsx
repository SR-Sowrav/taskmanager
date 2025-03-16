import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export const MainLayout = ({children}) => {
  return (
    <div className='app'>

<Navbar/>
{children}
<Footer/>



    </div>
  )
}
