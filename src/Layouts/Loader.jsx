import React from 'react';
import styled from 'styled-components';
import { BallTriangle, Circles, ThreeCircles } from "react-loader-spinner"

const DataLoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const DataLoader = () => {
    return (
        <DataLoaderContainer>
            {/* <BallTriangle height={100} width={100} radius={5} color="red" ariaLabel="ball-triangle-loading" wrapperStyle={{}} wrapperClass="" visible={true} /> */}
            <Circles height="100" width="100" color="#008479" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
            {/* <ThreeCircles visible={true} height="100" width="100" color="#008479" ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass="" /> */}
        </DataLoaderContainer>
    );
};

export default DataLoader;