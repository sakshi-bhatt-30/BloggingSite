import DataProvider from './contex/DataProvider';
import './App.css';
import Login from './components/account/login';
import Home from './components/home/Home';
import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import Header from './components/header/Header';
import { useState } from 'react';


const PrivateRoute = ({ isAuthenticated, ...props }) => {
  // const token = sessionStorage.getItem('accessToken');
  return isAuthenticated  ? 
  //&& token
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/login' />
};


function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    
    <div className="App">
      <DataProvider>
        <BrowserRouter>
            <div style={{margintop:64}}>
              <Routes>
              <Route path='/login' element={ <Login isUserAuthenticated={isUserAuthenticated} />} />

              <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
               <Route path='/' element={<Home />} />
              </Route>

              </Routes>
            </div>
          </BrowserRouter>
      </DataProvider>

    </div>
  );
}

export default App;
