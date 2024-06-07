import axios from 'axios';

const API_URL='https://localhost:8000';

const axiosInstance= axios.create({
    baseURL: API_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }
})

axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)
axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response);
    },
    function(error){
        return Promise.reject(processError(error));
    }
)

const processResponse=(response)=>{
    if(response?.status===200){
        return{isSuccess:true, data:response.data};
    }else{
        return {
            isFaliure : true,
            status:response?.status,
            msg: response?.msg,
            code: response?.code
    }}
}

const processError=(error)=>{
    if(error.response){
        //req is made but the server responded with status other than 2.x.x
    }else if(error.request){
        //req is made but no response was received 
    }else{
        //frontend error something happend in setting up the req that triggerd the error
    }
}