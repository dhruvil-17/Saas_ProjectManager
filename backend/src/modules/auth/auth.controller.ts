import { Request, Response } from "express";
import { authService } from "./auth.service";

export const authController = {

    async signup(req:Request , res:Response){
        try {
            const {email , password} = req.body;

            const user = await authService.signup(email , password);

            res.status(201).json(user);

        } catch (error : any) {
            res.status(400).json({message : error.message})
        }
    },

    async login(req:Request , res:Response){
        try {
            const {email , password} = req.body;

            const data = await authService.login(email,password);

            res.status(200).json(data);
        } catch (error :any) {
            res.status(401).json({message : error.message})
        }
    },
};