import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    public static TABLE_USERS = "users"
    public async insertUser(newUser: UserDB) {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(newUser)
    }
    public async getUsers(q: string | undefined) {
        if (q) {
            const result: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where("name", "LIKE", `%${q}`)
            return result
        } else {
            const result: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
            return result
        }
    }
    public async findUserById(id: any) {
        const [userDB]: UserDB[] | undefined[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({id});
        return userDB;
    }
    public async validateUserCredentials(email: string, password: string): Promise<boolean> {
        const user: UserDB | undefined = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
            .where({ email, password })
            //first pois retorna o primeiro caso
            .first();
        //aqui é retornado um booleano true caso o user for diferente de undefined
        //O operador !! é usado para converter o valor de user para um valor booleano,
        // transformando undefined em false e qualquer objeto em true.
        return !!user;
    }
}