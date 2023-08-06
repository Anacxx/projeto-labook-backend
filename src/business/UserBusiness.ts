import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UserDB } from "../types"

export class UserBusiness{
    public signup = async (input: any) => {
        const {id, name, email, password, role} = input 
        const userDatabase = new UserDatabase()
        const userDBExists = await userDatabase.findUserById(id)
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
        await userDatabase.insertUser(newUserDB)
        const output = {
            message: 'Usuário cadastrado com sucesso',
            user: {
                id: newUser.getId(),
                name: newUser.getName()
            }
        }
        return output
    }
    
    //responsavel por se conectar com o banco de dados
    //responsavel por receber a resposta do BD e mandar para a controller.
    public login = async (input: any): Promise<boolean> => {
            const { email, password } = input;
            const userDatabase = new UserDatabase()
            const isValidCredentials = await userDatabase.validateUserCredentials(email,password)
          if (!isValidCredentials) {
            return false;
          }else{
            return true;
          }
  };
}
