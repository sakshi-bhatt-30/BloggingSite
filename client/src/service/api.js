import axios from 'axios';
import { API_NOTIFICATION_MESSAGE,SERVICE_URL } from '../constants/config';

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
        console.log('Error in response',error.toJSON());
        return{
            isError: true,
            msg:API_NOTIFICATION_MESSAGE.responseFailure,
            code:error.response.status
        }

    }else if(error.request){
        //req is made but no response was received 
        console.log('Error in request',error.toJSON());
        return{
            isError: true,
            msg:API_NOTIFICATION_MESSAGE.requestFail,
            code:""
        }

    }else{
        //frontend error something happend in setting up the req that triggerd the error
        console.log('Error in network',error.toJSON());
        return{
            isError: true,
            msg:API_NOTIFICATION_MESSAGE.networkError,
            code:""
        }

    }
}

const API={};
for (const[key,value] of Object.entries(SERVICE_URL)){
    API[key]=(body,showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method:value.method,
            url:value.url,
            data:body,
            responseType:value.responseType,
            onUploadProgress:function(progressEvent){
                if(showUploadProgress){
                    let percentcomplete= Math.round((progressEvent.loaded*100/progressEvent.total));
                    showUploadProgress(percentcomplete);
                }
            },
            onDownloadProgress:function(progressEvent){
                if(showDownloadProgress){
                    let percentcomplete= Math.round((progressEvent.loaded*100/progressEvent.total));
                    showDownloadProgress(percentcomplete);
                }
            }
        })
}
export {API};