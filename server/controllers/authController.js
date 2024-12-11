const User = require('../models/user');
const {hashPassword, comparePassword} = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

const registerUser = async(req, res) =>{
    try{
        const {name,email,password} = req.body;
        if(!name){
            return res.json({
                error: 'Name is required'
            })
        };
        if(!password || password.length < 7){
            return res.json({
                error: 'Password is required and should be at least 7 characters long'
            })
        };
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error: 'Email already used'
            })
        };

        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async(req, res) => {
    try{
       const{email,password} = req.body;

       const user = await User.findOne({email});
       if(!user){
            return res.json({
                error: 'No user found'
            })
        }

       const match = await comparePassword(password, user.password)
       if(match){
            jwt.sign({email: user.email, id: user._id, name:  user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            } )
        }
       if(!match){
            res.json({
                error:'Passwords dont match'
              })
            }
    } catch (error){
        console.log(error)
    }
}

const getProfile =(req,res) =>{
    const {token} =req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else{
        res.json(null)
    }
}
const markSlideCompleted = async (req, res) => {
    try {
        const { slideId, sectionId, isLastSlide } = req.body; // Receive both slide and section IDs and the isLastSlide flag
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            // Update the user's completedSlides array
            let updateData = {
                $addToSet: { completedSlides: slideId }, // Add slide to completedSlides
            };

            // Only mark the section as completed if this is the last slide in the section
            if (isLastSlide) {
                updateData.$addToSet = { ...updateData.$addToSet, completedSections: sectionId }; // Add section to completedSections
            }

            const updatedUser = await User.findByIdAndUpdate(
                user.id,
                updateData,
                { new: true }
            );

            return res.json(updatedUser);  // Send back updated user data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    markSlideCompleted,
}