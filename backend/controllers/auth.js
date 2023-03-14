import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
    const {name, email, password} = req.body;

    const saltRounds = 10;

    if(!name || ! email || !password)
    {
        return next(createError({status: 400, message: "all input fields are required"}));
    }

    try {
        const salt = await bcryptjs.genSalt(saltRounds)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            name : name,
            email : email,
            password : hashedPassword,
        })
        await newUser.save();
        return res.status(201).json("new user created")
    } catch (error) {
        console.log(error);
        return next(error)
    }
}
export const login = async (req, res, next) => {
    console.log("login is triggered");
    if (!req.body.email || !req.body.password) {
        return next(
          createError({
            message: 'Email and password are required',
            statusCode: 400,
          }),
        );
      }
    console.log(req.body.email, req.body.password);
      try {
        const user = await User.findOne({ email: req.body.email }).select(
          'name email password',
        );
        if (!user) {
          return next(
            createError({ status: 404, message: 'User not found with the email' }),
          );
        }
        const isPasswordCorrect = await bcryptjs.compare(
          req.body.password,
          user.password,
        );
        if (!isPasswordCorrect) {
          return next(
            createError({ status: 400, message: 'Password is incorrect' }),
          );
        }
        const payload = {
          id: user._id,
          name: user.name,
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: '1d',
        });
        console.log("LL", token)
        return await res
          .cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            
          })
          .status(200)
          .json({ name: user.name, email: user.email, message: 'login success' });
      } catch (err) {
        console.log(err)
        return next(err);
      }
}

export const logout = (req, res) => {

     res.clearCookie("access_token");
     return res.status(200).json({message: "Logout Success"});
}


export const isLoggedIn = (req, res) => {
    console.log("islogged in accessed");
    console.log(req, req.cookie)
    const token = req.cookies.access_token;
    console.log("token data", token);
    if(!token)
    {
      console.log("token is not there");
        return res.json(false)
    }
    return jwt.verify(token, process.env.SECRET_KEY, (err)=> {
        if(err) {
          console.log("token error");
            return res.json(false);
        }
        console.log("giving true");
        return res.json(true);
    })
}