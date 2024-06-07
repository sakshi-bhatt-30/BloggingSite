import User from '../model/user.js'



const signupUser = async (request,response) => {
    try{
        const user=request.body()

        const newUser=new User(user);
        await new user.save();
        return response.status(200).json({msg:'signup successful'});
    }catch(error){
        return response.status(500).json({msg:'Error while signup'});
    }
}
 
export default signupUser;