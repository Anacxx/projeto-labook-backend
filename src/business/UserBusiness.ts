import { UserDatabase } from "../database/UserDatabase"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/signup.dto"
import { User } from "../models/User"
import { UserDB } from "../types"

export class UserBusiness{
    constructor(
        private userDatabase: UserDatabase
    ){}
    //FUNCIONANDO OK
    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const {id, name, email, password, role} = input 
        const userDBExists = await this.userDatabase.findUserById(id)
        if(userDBExists){
            throw new Error('Essa Id já existe')
        }
        const newUser = new User(
            id,
            name,
            email,
            password,
            role
        )
        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole()
        }
        await this.userDatabase.insertUser(newUserDB)
        const output: SignupOutputDTO = {
            message: 'Usuário cadastrado com sucesso',
            user: {
                id: newUser.getId(),
                name: newUser.getName()
            }
        }
        return output
    }
        //MUDAR A INTERFACE DE OUTPUT -- ERRADOOOOOOOOO
    public login = async (input: LoginInputDTO): Promise<Boolean> => {
            const { email, password } = input;
            const isValidCredentials = await this.userDatabase.validateUserCredentials(email,password)
          if (!isValidCredentials) {
            return false;
          }else{
            return true;
          }
  };
}
