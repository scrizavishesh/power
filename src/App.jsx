import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import DashboardLayout from './Dashboard/DashboardLayout';
import WithoutAuth from './Main/WithoutAuth';

function App() {

  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        {
          token 
          ?
            <DashboardLayout /> 
            :
            <WithoutAuth />
        }
      </BrowserRouter>
    </>
  );
}

export default App;