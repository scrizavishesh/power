import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login/Login';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #F2F3F6;
`;

const WithoutAuth = () => {
  return (
    <>
      <Container>
        <Routes>
          <Route path='/' element={<Login/>}/>
        </Routes>
      </Container>
    </>
  )
}

export default WithoutAuth