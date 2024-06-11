import {Box, Button, TextField, styled,Typography} from '@mui/material';
import React, { useState, useContext } from 'react';
import { API } from '../../service/api';
import { DataContext } from '../../contex/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
   
`;

const Image = styled('img')({
    width: 300,
    display: 'flex',
    margin: 'auto',
    
});
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-bottom: 30px;
    }
`;
const LoginButton = styled(Button)`
    
    background: #8FBC8B;
    color: #1B4D3E;
    height: 48px;
    border-radius: 2px;
    
`;

const SignupButton = styled(Button)`
    
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;
const loginInitial ={
    username:'',
    password:''
};

const signupInitial ={
    name:'',
    username:'',
    password:''
};



const Login = ({isUserAuthenticated}) => {
    
    const imageURL = 'https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png';

    const [account,toggleAccount]= useState('login');

    const[signup,setSignup]=useState(signupInitial);

    const[login,setLogin]=useState(loginInitial);
    const[error,setError]=useState('');

    const { setAccount  } = useContext(DataContext);
    const navigate= useNavigate();

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }
    const onInputChange =(e) =>{
        setSignup({...signup, [e.target.name]: e.target.value});
    }
    const signupUser= async ()=>{
        
        if (!signup.name || !signup.username || !signup.password) {
            setError('All fields are required');
            return;
        }
        let response = await API.userSignup(signup);
        if(response.isSuccess){
            setError('');
            setSignup(signupInitial);
            toggleAccount('login');
        }else{
            setError('Something went wrong');
        }
    }
    const onValueChange=(e)=>{
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const loginUser= async ()=>{
        let response = await API.userLogin(login);
        if(response.isSuccess){
            setError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true)
            // setLogin(loginInitialValues);
            navigate('/');

        }else{
            setError('Something went wrong');
        }
    }

    return ( 
        <Component>
            <Box>
                <Image src={imageURL} alt="Login"/>
                {
                account === 'login' ?
                <Wrapper>
                    <TextField variant="standard" onChange={(e)=>onValueChange(e)} name="username" label='Enter Username'/> 
                    <TextField variant="standard" onChange={(e)=>onValueChange(e)} name="password" label="Enter Password"/>
                    <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <SignupButton onClick={() => toggleSignup()}>Sign Up</SignupButton>
                </Wrapper> 
                :
                <Wrapper>
                    <TextField variant="standard" onChange={(e)=>onInputChange(e)} name="name" label='Enter Name' />
                    <TextField variant="standard" onChange={(e)=>onInputChange(e)} name="username" label='Enter Username' />
                    <TextField variant="standard" onChange={(e)=>onInputChange(e)} name="password" label='Enter Password' />
                    {error && <Error> {error}</Error>}
                    <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                </Wrapper>
                }
                
            </Box>
        </Component>
     );
}
 
export default Login;
