import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(
        message: string = "Resource not found" // mensagem de erro padrão caso não seja enviado um argumento
    ) {
        super(404, message)
    }
}