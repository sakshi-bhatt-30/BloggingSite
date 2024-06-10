import DataProvider from './contex/DataProvider';
import './App.css';
import Login from './components/account/login';
import Home from './components/home/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    
    <div className="App">
      <DataProvider>
        <BrowserRouter>
            <div style={{margintop:64}}>
              <Routes>
              <Route path='/login' element={ <Login/>} />
              <Route path='/' element={<Home />} />
              
              </Routes>
            </div>
          </BrowserRouter>
      </DataProvider>

    </div>
  );
}

export default App;
