import React, { useState, useEffect, useContext } from 'react';
import { styled, InputBase, FormControl, Container, Button, TextareaAutosize  } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import {  useLocation, useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api.js';
import { DataContext } from '../../contex/DataProvider';

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;
const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;
const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;
const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const UpdatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState();
    const { account } = useContext(DataContext);
    const { id } = useParams();

    const url = post.picture 
    ? post.picture :'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, [id]);

    const updateBlogPost = async () => {
        await API.updatePost(post);
        navigate(`/details/${id}`);
    }
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const formdata = new FormData();
                formdata.append("name", file.name);
                formdata.append("file", file);
              
                try {
                    const response = await API.uploadFile(formdata);
                    setPost(prevPost => ({ ...prevPost, picture: response.data })); 
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
            }
        }
        getImage();
        setPost(prevPost => ({
            ...prevPost,
            categories: location.search?.split('=')[1] || 'All',    
            username: account.username 
        }));
    }, [file, location.search, account.username]);

    


    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
        
    }
    

    return ( 
    
    <Container>
    <Image src={url} alt="banner" />
    <StyledFormControl>
        <label htmlFor='fileInput'>
            <Add fontSize="large" color="action" />
        </label>
        <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField  value= {post.title} name='title' onChange={(e) => handleChange(e)} placeholder="Title" />
        <Button onClick={() => updateBlogPost()} variant="contained" color="primary">Update</Button>
    </StyledFormControl>
    <Textarea
        minRows={5}
        placeholder="Tell your story..."
        name='description'
        onChange={(e) => handleChange(e)}
        value={post.description}
    />
    </Container>
    
    );
    
}
 
export default UpdatePost;