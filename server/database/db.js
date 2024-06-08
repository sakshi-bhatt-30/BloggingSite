import mongoose from "mongoose";


const Connection = async (username,password) =>{
    const url=`mongodb://${username}:${password}@ac-87pheul-shard-00-00.jt7nge4.mongodb.net:27017,ac-87pheul-shard-00-01.jt7nge4.mongodb.net:27017,ac-87pheul-shard-00-02.jt7nge4.mongodb.net:27017/?ssl=true&replicaSet=atlas-r47hfv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster`;
    
    try{
       await mongoose.connect(url); //{ useUnifiedTopology: true }
       
       console.log("successfully connected");
    }catch(error){
        console.log("not connectes",error);
    }
}
export default Connection;