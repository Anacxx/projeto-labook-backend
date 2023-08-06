import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController{
        //Funcionando ok
    public signup = async (req: Request, res: Response) => {
        try {
        const input = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        const userBusiness = new UserBusiness()
        const output = await userBusiness.signup(input)
    
        return res.status(201).send(output);
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error")
            }
        }
    };
        //responsavel por receber o input!
        //responsabel por mandar input p/ a business
        //somente a business que faz conexão com o banco de dados.
        // a business deve buscar no db e devolver a resposta para controller
        //controler só mostra o resultado
    public login = async (req: Request, res: Response) => {
        try {
            //recebendo o input da requisição
            const input = { 
                email: req.body.email, 
                password: req.body.password
                }
            //enviando para a business o input
            const userBusiness = new UserBusiness()
            //recebendo da business o resultado da busca no BD
            const output = await userBusiness.login(input)
            //Verificando se existe dentro do BD um EMAIL E SENHA que correspondem.
            if (!output) {
            return res.status(401).send('Invalid email or password');
            }
    
            return res.status(200).send('Login successful');
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error")
            }
        }
        }
};
        