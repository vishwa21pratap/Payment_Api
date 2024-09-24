const User = require('../Model/user_model');

const createUser = async (req, res) => {
  const { username, password } = req.body;


  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getUserById = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  const loginUser = async (req, res) => {
    const {username , password} = req.body;
    try{

      if(!username || !password){
        return res.status(404).json({'msg' : 'all fields are mandatory'});
      }
      const user = await User.findOne({username:username});
      if(user.password === password){
        return res.status(200).json({'msg': "User login successfull"})
      }
    }catch(err){
      return res.json({'err':err});
    }
  };
  
module.exports = {
  createUser, 
  getUserById,
  loginUser
}