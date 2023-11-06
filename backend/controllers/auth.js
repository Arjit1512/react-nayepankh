import bcrypt from 'bcrypt';
import User from '../models/User.js';

/*REGISTER USER*/
export const register = async(req,res) => {
    try{
        
        const{
            email,
            password
        } = req.body;

        // const salt = await bcrypt.genSalt();
        // const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new User ({
            email,
            password
           });
        const savedUser = await newUser.save();
        
         //res.json("exist")
       
        if(savedUser){
            res.json("notexist")
            return;
        }
        if(!savedUser){
            res.json("exist")
            return;
        }  
        
        res.status(201).json(savedUser);

    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}


/*LOGIN USER*/
export const login = async (req,res) => {
    try{
       const {
          email,
          password
       } = req.body;

       const user = await User.findOne({email:email});
       if(!user) return res.status(400).json({message : "User does not exist."});

       const isMatch = (user.password === password);//await bcrypt.compare(password,user.password);
       console.log(isMatch, 'isMatch');
       
       if(isMatch){
        res.json("exist")
        return;
       } 
       
       if(!isMatch){
        res.json("notexist")
        return;
       } //return res.status(400).json({message : "Invalid credentials."});
 
       //const token = jwt.sign({id:user._id} , process.env.JWT_SECRET);
       //delete user.password;

       res.status(200).json({user});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}