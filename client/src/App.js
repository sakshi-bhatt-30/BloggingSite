import DataProvider from './contex/DataProvider';
import './App.css';
import Login from './components/account/login';
import Home from './components/home/Home';
import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import Header from './components/header/Header';
import { useState } from 'react';
import CreatePost from './components/create/Create';
import DetailView from './components/details/DetailView';
import UpdatePost from './components/create/Update';
import About from './components/about/about';
import Contact from './components/contact/contact';


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
              <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
               <Route path='/create' element={<CreatePost />} />
              </Route>
              <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>
            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<UpdatePost />} />
            </Route>
            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>

              </Routes>
            </div>
          </BrowserRouter>
      </DataProvider>

    </div>
  );
}

export default App;
