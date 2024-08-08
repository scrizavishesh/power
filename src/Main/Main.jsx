import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../Pages/AdminDashboard/AdminDashboard'
import PageNotFound from '../Pages/NotFound/PageNotFound'
import styled from 'styled-components';
import Users from '../Pages/Users/Users';
import Settings from '../Pages/Settings/Settings';
import PayOutOperations from '../Pages/Operations/PayOutOperations';
import CreateUsers from '../Pages/Users/CreateUsers';
import ProfilePage from '../Pages/Profile/ProfilePage';
import MangeUTR from '../Pages/ManageUTR/MangeUTR';
import KBProfilePage from '../Pages/Profile/KBProfilePage';
import PayInOperation from '../OperationsForUser/PayInOperations';
import PayOutOperation from '../OperationsForUser/PayOutOperations';
import PayInOperations from '../Pages/Operations/PayInOperations';
import CreatePayInOrder from '../Pages/Operations/CreatePayInOrder';
import CreatePayoutOrder from '../Pages/Operations/CreatePayoutOrder';
import Index from '../Pages/SavedReports/Index';

const Main = ({ lightMode, setLightMode }) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<AdminDashboard lightMode={lightMode} setLightMode={setLightMode} />} />
        <Route path='/users' element={<Users />} />
        <Route path='/createUser' element={<CreateUsers />} />
        <Route path='/payInOperations' element={<PayInOperations />} />
        <Route path='/createPayInOrder' element={<CreatePayInOrder />} />
        <Route path='/payInOperation/:id' element={<PayInOperation />} />
        <Route path='/payOutOperations' element={<PayOutOperations />} />
        <Route path='/createPayOutOrder' element={<CreatePayoutOrder />} />
        <Route path='/payOutOperation/:id' element={<PayOutOperation />} />
        <Route path='/manageUTR' element={<MangeUTR />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/profilePage' element={<ProfilePage />} />
        <Route path='/saved_reports' element={<Index />} />
        <Route path='/kBProfilePage/:id' element={<KBProfilePage />} />
        <Route path="*" element={<PageNotFound lightMode={lightMode} setLightMode={setLightMode} />} />
      </Routes>
    </>
  )
}

export default Main