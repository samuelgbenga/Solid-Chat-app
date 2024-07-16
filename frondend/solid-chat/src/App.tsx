
import './App.css'
//import React from 'react';
//import Login from './component/authentication/Login';
//import Container from './component/container';
import SessionContextProvider from './context/SessionContext';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import WebsocketsContextProvider from './context/WebsocketContext';
import LoginPage from './page/LoginPage';
import MainPage from './page/MainPage';

function App() {
  

  return (
    <Router>
      <SessionContextProvider>
        <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/chat' element={(
            <WebsocketsContextProvider>
              <MainPage/>
            </WebsocketsContextProvider>
          )} />
        </Routes>
      </SessionContextProvider>
    </Router>
  )
}

export default App
