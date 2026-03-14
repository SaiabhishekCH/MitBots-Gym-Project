import express from "express";
import jwt from "jsonwebtoken";
import z from "zod";
import { userModel , workoutModel} from "./db.js";

const router = express.Router();

router.post("/signup" , async( req , res ) =>{

    const userName = req.body.userName;
    const password = req.body.password;

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const inputValid = z.object({
        userName : z.string(),
        password : z.string(),
        firstName : z.string(),
        lastName : z.string()
    })
    const validInput = inputValid.safeParse(req.body);
    if( !validInput.success ) {
        res.json({
            message : "Invalid Input"
        })
        return;
    }

    const userExists = await userModel.findOne( {
        userName : userName
    })

    if( userExists ){
        res.json({
            message : "User already Exists"
        })
        return;
    }

    await userModel.create({
        userName : userName,
        password : password,
        firstName : firstName,
        lastName : lastName
    })

    res.json({
        message : "Account Created !"
    })
})

router.post("/signin" , async ( req , res ) =>{

    let userName = req.body.userName;
    let password = req.body.password;
    
    const inputValid = z.object({
        userName : z.string(),
        password : z.string()
    })
    const validInput = inputValid.safeParse(req.body);

    if(!validInput.success){
        res.json({
            message : "Enter valid details"
        })
        return;
    }
    const foundUser = await userModel.findOne({
        userName : userName ,
        password : password
    })
     if( !foundUser ){
        res.json({
            message : "user not found"
        })
        return;
    }
    const token = jwt.sign({
        userName : userName
    } , JWT_SECRET);

    res.json({
        message : "Signedin successfully ! ",
        token : token
    })
})
router.post("/addWorkout", async (req, res) => {

    const { userName, exercise, sets, reps, weight } = req.body;

    await workoutModel.create({
        userName,
        exercise,
        sets,
        reps,
        weight
    });

    res.json({
        message: "Workout added successfully"
    });

});

export default router;