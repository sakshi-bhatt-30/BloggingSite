import axios from 'axios';
import { API_NOTIFICATION_MESSAGE, SERVICE_URL } from '../constants/config';
import { getAccessToken, getType } from '../utils/commonUtils';

const API_URL='http://localhost:8000'

const axiosInstance= axios.create({
    baseURL: API_URL,
    timeout:10000,
    headers: {
        "Accept": "application/json, form-data", 
        "Content-Type": "application/json"
}
   
});

axiosInstance.interceptors.request.use(
    function(config){
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
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
            isFailure : true,
            status:response?.status,
            msg: response?.msg,
            code: response?.code
    }}
}

const processError=(error)=>{
    if(error.response){
        if (error.response?.status === 403) {
                    sessionStorage.clear();
        } else {
            console.log("ERROR IN RESPONSE: ", error.toJSON());
            return {
                isError: true,
                msg: API_NOTIFICATION_MESSAGE.responseFailure,
                code: error.response.status
            }
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
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value,body),
            onUploadProgress:function(progressEvent){
                if(showUploadProgress){
                    let percentcomplete= Math.round((progressEvent.loaded*100)/progressEvent.total);
                    showUploadProgress(percentcomplete);
                }
            },
            onDownloadProgress:function(progressEvent){
                if(showDownloadProgress){
                    let percentcomplete= Math.round((progressEvent.loaded*100)/progressEvent.total);
                    showDownloadProgress(percentcomplete);
                }
            }
        });
}
export {API};

