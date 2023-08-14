import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { SignupOutputDTO, SignupSchema } from "../dtos/users/signup.dto";
import { LoginInputDTO, LoginSchema } from "../dtos/users/login.dto";

export class UserController{
    constructor(
      private userBusiness: UserBusiness
    ){}

    public signup = async (req: Request, res: Response) => {
        try {
        const input = SignupSchema.parse({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
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

    public login = async (req: Request, res: Response) => {
      try {
          const input: LoginInputDTO = LoginSchema.parse({ 
              email: req.body.email, 
              password: req.body.password
        })
        
          const output = await this.userBusiness.login(input)

          res.status(200).send(output)
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
