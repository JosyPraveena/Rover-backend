const User = require("../database/models/user");
const bcrypt = require("bcrypt");

exports.create_user = async (req, res) => {
  const { user_name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("This user already exists");

  user = new User({
    user_name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  await user.save();
  const token = user.createToken()
  res.set('Access-Control-Expose-Headers', 'x-authorization-token')
  res.set('x-authorization-token',token)
  res.send({
    _id: user._id,
    email: user.email,
  });
};

exports.getUsers = async (req, res) => {
  User.find()
    .populate("posts")
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

exports.getme = async (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .populate("posts").sort({post_date: -1})
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

exports.getOneUser = async (req,res) =>{
  const {id} = req.params

  User.findById(id)
  .populate("posts")
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
}
