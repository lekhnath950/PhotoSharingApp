import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header';
import Login from './components/Auth/Login';
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from 'react';
import { loadUser } from './Actions/User';
import Home from './components/Home/Home';
import Account from './components/Account';
import Newpost from './components/Newpost';
import Register from './components/Auth/Register';
import Profile from './components/Profile';
import Explore from './components/Explore';


function App() {

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(loadUser());
  }, [dispatch])

  const {isAuthenticated} = useSelector((state) => state.user)

  return (
    <Router>
      { 
        isAuthenticated &&    <Header  />
      }
      <div className='aaa'>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home/> : <Login/>} />
        <Route path="/account" element={isAuthenticated ? <Account/> : <Login/>} />
        <Route path="/newpost" element={isAuthenticated ? <Newpost/> : <Login/>} />
        <Route path="/register" element={isAuthenticated ? <Account/> : <Register/>} />
        <Route path="/explore" element={isAuthenticated ? <Explore/> : <Register/>} />
        <Route path="/user/:id" element={isAuthenticated ? <Profile/> : <Register/>} />
      </Routes>
      </div>

    </Router>
  );
}

export default App;
