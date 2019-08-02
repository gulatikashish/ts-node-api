import * as express from "express";
import * as bodyParser from "body-parser";
import { Userroutes } from "./routes/userRoutes";
import * as mongoose from "mongoose";
import {Register} from './registerAdmin'
import { Request, Response,NextFunction } from 'express';
import * as cors from 'cors'
class App {

    public app: express.Application;
    public routePrv: Userroutes = new Userroutes();
    public register: Register = new Register();
    public mongoUrl: string = 'mongodb://localhost/Katalyse';

    constructor() {
        this.app = express();
        this.config();        
        this.routePrv.routes(this.app);     
        this.mongoSetup();
    }

    private config(): void{
        this.app.use(cors())
        this.app.use(this.register.registerAdmin)
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl); 
    }

}

export default new App().app;