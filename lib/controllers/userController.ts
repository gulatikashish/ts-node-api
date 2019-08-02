import { Request, Response } from 'express';
import { User } from '../models/userModel';
import * as jwt from 'jsonwebtoken';
// import { validationResult } from 'express-validator/check';
import { config } from '../config'
import { Services } from '../helper/services'
export class UserController {
    public async findAllUsers(req: Request, res: Response) {
        const users = await User.find()
        res.send({ data: "users" })

    }

    public async login(req: Request, res: Response) {

        try {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //   return res.status(422).json({ errors: errors.mapped() });
            // }
            let { email, password } = req.body;
            let check = await User.findOne({ email });
            if (!check) {
                res.status(401).send({
                    success: false,
                    message: 'No Such Email Exist',
                });
                return;
            }
            let encPassword = await new Services().decrypt(password, check.password);
            if (!encPassword) {
                res.status(401).send({
                    success: false,
                    message: 'Invalid Credentials',
                });
            }
            let token = jwt.sign(
                {
                    _id: check._id,
                    email: check.email,
                },
                config.secret,
                { expiresIn: config.tokenExpiresInMinutes * 1000 * 60 },
            );
            res.status(200).send({
                success: true,
                message: 'Login Success',
                data: check,
                token: token,
            });
            return;
        } catch (error) {
            res.status(401).send({
                success: false,
                message: error,
            });
            return;
        }

    }

}