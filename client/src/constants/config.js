

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
    userLogin: { url: '/login', method: 'POST' },
    uploadFile: { url: 'file/upload', method: 'POST' },
    createPost: { url: 'create', method: 'POST' },
    getAllPosts: { url: '/posts', method: 'GET', params: true },
    getPostById: { url: 'post', method: 'GET', query: true },
    updatePost: { url: 'update', method: 'PUT', query: true },
    deletePost: { url: 'delete', method: 'DELETE', query: true },
    newComment: { url: '/comment/new', method: 'POST' },
    getAllComments: { url: 'comments', method: 'GET', query: true },
    deleteComment: { url: 'comment/delete', method: 'DELETE', query: true }
}