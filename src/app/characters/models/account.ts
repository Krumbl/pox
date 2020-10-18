import { Server } from "./server"

export class Account {
    name: string
    servers: Map<string, Server>

    constructor(name) {
        this.name = name
        this.servers = new Map<string, Server>() 
    }
}