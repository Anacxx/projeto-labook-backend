import { UserDatabase } from "../database/UserDatabase"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/users/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/users/signup.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { USER_ROLES, User, UserDB } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class UserBusiness{
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { name, email, password} = input 
        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)
        const userDBExists = await this.userDatabase.findUserByEmail(email)
        if(userDBExists){
            throw new BadRequestError("This email is already registered!")
        }
        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            USER_ROLES.ADMIN, 
        )
        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole()
        }
        await this.userDatabase.insertUser(newUserDB)
        const payload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }
        const token = this.tokenManager.createToken(payload)
        const output: SignupOutputDTO = {
            message: "User registered successfully.",
            token
        }
        return output
    }

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input;
        
        const userDB = await this.userDatabase.findUserByEmail(email)
        if (!userDB) {
            throw new NotFoundError('Invalid email');
        }
        const hashedPassword = userDB.password
        const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)
        if (!isPasswordCorrect) {
            throw new BadRequestError("Invalid password")
          }
        const payload = {
            id: userDB.id,
            name: userDB.name,
            role:userDB.role
        }
        const token = this.tokenManager.createToken(payload)
        const output: LoginOutputDTO = {
            message: 'Login successful',
            token
        }
        return output
  };
}

