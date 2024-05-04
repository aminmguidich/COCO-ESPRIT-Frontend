import { MessageType } from "./MessageType";

export class Chat {
    idChat?:number;
    type: MessageType;
    message: string;
    sender: string;
    user: number;

    constructor(type: MessageType, message: string, user: number) {
        this.type = type;
        this.message = message;
        this.user = user;
    }
}