import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    margin-top:30px;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
    
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3" >BLOGGING SITE </Typography>
                <Text variant="h5">I'm a Computer Science Student.
                    I've built various fullstack projects.<br />
                    If you are interested, you can view my projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/sakshi-bhatt-30" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/ " color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>  
                         or send me an Email 
                        <Link href="mailto:....@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;