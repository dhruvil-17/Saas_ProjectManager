import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../user/user.repository";
import { env } from "../../config/env";

export const authService = {

    async signup(email : string, password: string){

        try {
            //check existing user
        const existingUser = await userRepository.findByEmail(email);
        if(existingUser){
            throw new Error("user already exists");
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password , 10);

        //create user

        const user = await userRepository.create({
            email,
            password : hashedPassword,
        });

        return user;
        } catch (error) {
            console.log('error signing up' , error)
        }
    },

    async login(email:string , password:string){

        const user = await userRepository.findByEmail(email);

        if(!user){
            throw new Error("No user exists with this email , please sign Up!")
        }

        const isValid = bcrypt.compare(password,user.password)
        if (!isValid) {
            throw new Error("Invalid Credentials")
        }

        const accessToken = jwt.sign(
            {userId : user.id},
            env.JWT_SECRET,
            {expiresIn : "15m"}
        );

        return{user,accessToken};
    },
};