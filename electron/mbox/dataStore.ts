import { Log } from "../log";
import { Account } from "./account";
import { Character } from "./character";
import { Currency } from "./Currency";
import { Mbox } from "./mbox";
import { Server } from "./server";
var fs = require('fs')
var path = require('path')

export class DataStore {
    private log = new Log()

    wowPath: string
    accounts: Map<string, Account> = new Map<string, Account>()
    currency: Currency


    // TODO
    servers: Map<string, Server> = new Map<string, Server>()
    characters: Map<string, Character> = new Map<string, Character>()// these id need to be more than name

    // /Applications/World of Warcraft/_retail_/WTF
    constructor(wowPath) {
        this.wowPath = wowPath
        this.load(wowPath)
    }

    load(wowPath) {
        let accountsPath = path.join(wowPath, 'Account')

        fs.readdirSync(accountsPath, {"withFileTypes" : true})
                .filter(f => f.isDirectory() && f.name != 'SavedVariables')
                .forEach(accountFile => {
                    this.log.info('Load account ' + accountFile.name);
                    // let account = {name: accountFile.name, servers: new Map()}
                    let account = new Account(accountFile.name)
                    let mbox = new Mbox(path.join(accountsPath, accountFile.name));
                    this.log.info(mbox.characters);
                    mbox.characters.forEach(character=> {
                        // TODO remove servers from account object
                        if (!account.servers.has(character.server)) {
                            this.log.trace("Add server " + character.server)
                            this.log.trace(account.servers);
                            // account.servers.set(character.server, {name: character.server, characters: new Map(), account: account})
                            account.servers.set(character.server, new Server(character.server, account))
                            this.log.trace(account.servers);
                        }
                        // add server when find a new one
                        if (!this.servers.has(character.server)) {
                            this.servers.set(character.server, new Server(character.server, account))
                        }
                        // TODO change character objects to ids on server
                        // TODO add account id to character
                        account.servers.get(character.server).characters.set(character.name, (character));
                        // character.server = account.servers.get(character.server);
                    });
                    this.log.trace("add account " + account.name + this.log.stringify(account))
                    this.accounts.set(account.name, account)
                    this.log.trace(this.accounts);
                });
        this.log.trace(this.accounts)

        let copper=0
        this.accounts.forEach((account, name) => {
            account.servers.forEach((server, name) => {
                server.characters.forEach((character, name) => {
                    this.log.trace('Load currency: ' + account.name + '-' + server.name + '-' + character.name + '-' + character.currency.copper)
                    copper += character.currency.copper
                    this.log.trace(copper)
                })
            })
        })
        this.currency = new Currency(copper)
    }

    getCurrency() {
        return this.currency;
    }
}