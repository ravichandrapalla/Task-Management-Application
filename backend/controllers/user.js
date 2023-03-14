import User from "../models/User.js"

export const getUserInfo = async(req, res, next) => {
    try {
        const data = await User.findById(req.user.id).select("name email");
        return res.status(200).json(data);
    }catch( error) {
        return next(error);
    }
}

export const updatedUser = async (req, res, next) => {
    const {name, email} = req.body; 
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            name : name,
            email : email,
        }, {new:true}).select("name email");
        return res.status(200).json(updatedUser);
    } catch (error) {
        return next(error);
    }
}