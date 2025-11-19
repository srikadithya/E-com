import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Auth from './pages/Auth'
import ViewProducts from './pages/ViewProducts'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/home" element={<ViewProducts/>}/>
      </Routes>
    </div>
  )
}

export default App