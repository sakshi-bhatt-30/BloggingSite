import React from 'react';
import { styled, Box, Typography, keyframes } from '@mui/material';

const change = keyframes`
  0% { background-image: url(tech1.png); }
  50% { background-image: url(fashion1.png); }
  100% { background-image: url(travel1.png); }
  
`;


const Image = styled(Box)`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${change} 20s infinite;
  background-size: cover;
`;

const Heading = styled(Typography)`
  font-size: 100px;
  font-weight: bold;
  font-family: "Times New Roman", Times, serif;
  color: #FFFFFF;
  line-height: 1;
`;

const SubHeading = styled(Typography)`
  font-size: 20px;
  background: #FFFFFF;
`;

const styles = ({
    app: {
        margin: '0 auto',
        maxWidth: '100%'
    }
  });

const Banner = () => {
    
    return (
        <div style={styles.app}>
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>Code for Interview</SubHeading>
        </Image>
        </div>
    )
}

export default Banner;