

export const API_NOTIFICATION_MESSAGE={
    loading:{
        title: 'loading...',
        message:'Data id being loaded. Wait for a while'
    },
    success:{
        title:'Success',
        message:'Data loaded'
    },
    responseFailure:{
        title:'Error',
        message:'An error occurred while fetching the response from the server'
    },
    requestFail:{
        title:'Error',
        message:'An error occurred while parsing the request data'     
    },
    networkError:{
        title:'Error',
        message:'Unable to connect with the server. Please check your internet connection'
    }

}

export const SERVICE_URL={
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: { url: '/login', method: 'POST' }
}