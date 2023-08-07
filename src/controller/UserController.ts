import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { SignupOutputDTO, SignupSchema } from "../dtos/signup.dto";
import { LoginSchema } from "../dtos/login.dto";

export class UserController{
    constructor(
      private userBusiness: UserBusiness
    ){}
    //FUNCIONANDO OK
    public signup = async (req: Request, res: Response) => {
        try {
        const input = SignupSchema.parse({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
        const output: SignupOutputDTO  = await this.userBusiness.signup(input)
        return res.status(201).send(output);
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
              res.status(error.statusCode).send(error.message)
            } else if (error instanceof ZodError) {
              res.status(400).send(error.issues)
            } else {
              res.status(500).send("Unexpected error")
            }
        }
    };
    //MUDAR A INTERFACE DE OUTPUT -- ERRADOOOOOOOOO
    public login = async (req: Request, res: Response) => {
        try {
            const input = LoginSchema.parse({ 
                email: req.body.email, 
                password: req.body.password
          })

            const output: Boolean = await this.userBusiness.login(input)
            if (!output) {
            return res.status(401).send('Invalid email or password');
            }
            return res.status(200).send('Login successful');
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
              res.status(error.statusCode).send(error.message)
            } else if (error instanceof ZodError) {
              res.status(400).send(error.issues)
            } else {
              res.status(500).send("Unexpected error")
            }
        }
        }
};
        