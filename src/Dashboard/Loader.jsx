// Import necessary dependencies
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { RotatingLines } from "react-loader-spinner"



// Styled component for the Hash Loader container
const HashLoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
`;

// Hash Loader component
const HashLoader = () => {
  return (
    <HashLoaderContainer>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="#2C6DB5"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </HashLoaderContainer>
  );
};

// Export the HashLoader component
export default HashLoader;



