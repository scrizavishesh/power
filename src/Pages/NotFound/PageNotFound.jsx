import { Icon } from '@iconify/react';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
height: 93vh;
`;


const PageNotFound = () => {

  return (
    <Container className='d-flex justify-content-center flex-column'>
      {/* <Icon className='toggleBars mb-3' icon="fa6-solid:bars" width="1.5em" height="1.5em"  style={{color: '#000'}} onClick={toggleSidebar}/> */}
      <p className='font14 text-center text-danger'>No Data Found !!!</p>
    </Container>
  );
}

export default PageNotFound;
