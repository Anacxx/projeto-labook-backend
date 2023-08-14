import { UserDB } from "../models/User";
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
    public async findUserByEmail(email: string): Promise<UserDB | undefined> {
        const [userDB]: UserDB[] | undefined[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({email});
        return userDB;
    }
}