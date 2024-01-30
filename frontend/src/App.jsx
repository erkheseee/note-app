import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages & components
import Home from './pages/Home'
import Header from './components/Header'

function App() {

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Header />
            <div className='pages'>
              <Routes>
                <Route 
                  path='/notes'
                  element={<Home />}
                />
                <Route 
                  path='/notes/folders'
                  element={<Home />}
                />
                <Route 
                  path='/notes/note'
                  element={<Home />}
                />
              </Routes>
            </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
