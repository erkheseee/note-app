import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages & components
import Home from './pages/Home'
import Header from './components/Header'
import { useEffect, useState } from 'react'

function App() {
  const initial = false;

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Header />
            <div className='pages'>
              <Routes>
                <Route 
                  path='/'
                  element={<Home initial={initial}/>}
                />
              </Routes>
            </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
