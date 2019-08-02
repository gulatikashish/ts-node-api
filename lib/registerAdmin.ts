import { User } from './models/userModel';
import { Services } from './helper/services'
import {NextFunction,Request,Response} from 'express'

export class Register {
    constructor() {
     

    }

    public async registerAdmin(req: Request, res: Response, next: NextFunction) {
      
        const users = User.find({ email: 'admin@admin.com' }, (err, users) => {
            if (err) {
                res.send({err:err})
            }

            if (users.length == 0) {
                const admin = {
                    first_name: 'admin',
                    last_name: 'admin',
                    email: 'admin@admin.com',
                    password: 'admin',
                    account_address: '0x19539174029aF2f8E932657De2C9B6b12e2d5f02',
                    private_key: '5230c33189d306ee7224ab5396be88aa8f15a6c9bb9edc8840e90c41083e88f3',
                    role: 'ADMIN'
                }
                const pwd = new Services().encrypt(admin.password);
                const private_key = new Services().encrypt(admin.private_key);
                admin.password = pwd;
                admin.private_key = private_key;
                User.create(admin, (err, response) => {

                    
                    if (err) {
                       res.send({err:err})
                    }
                    else {
                      next()
                    }

                });

            }
            next()
        })
    }



}