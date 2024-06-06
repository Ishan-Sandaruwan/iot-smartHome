import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Light from './components/Light'
import Gas from './components/Gas'
import Solid from './components/Solid'
import Fish from './components/Fish'
import Footer from './components/Footer'

function App() {

  return (
    <div className="bg-gradient-to-tr from-lime-100 via-emerald-100 to-cyan-100 w-full min-h-screen text-slate-800 cursor-default">
    <Navbar/>
    <div className='max-w-4xl mx-auto lg:max-w-6xl'>
      <Hero/>
      <Light/>
      <Gas/>
      <Solid/>
      <Fish/>
    </div>
    <Footer/>
  </div>
  )
}

export default App
