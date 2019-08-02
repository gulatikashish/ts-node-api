import {Request, Response, NextFunction} from "express";
import { UserController } from "../controllers/userController";

export class Userroutes { 
    
    public userController: UserController = new UserController() 
    
    public routes(app): void {   
        
        app.route('/')
        .get(this.userController.findAllUsers)
        app.route('/login')
        .post(this.userController.login)
        // Contact 
       

    }
}