import mongoose from "mongoose";


const Connection = async (username,password) =>{
    const url=`mongodb+srv://${username}:${password}@cluster0.ea3w5uv.mongodb.net/`;
    try{
       await mongoose.connect(url , { useNewUrlParser: true });
       console.log("successfully connected");
    }catch(error){
        console.log("not connectes",error);
    }
}
export default Connection;