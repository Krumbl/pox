import { Account } from "./account"
import { Character } from "./character"

export class Server {
    name: string
    account: Account
    characters: Map<string, Character>

    constructor(name: string, account: Account) {
        this.name = name
        this.account = account
        this.characters = new Map<string, Character>() 
    }
}