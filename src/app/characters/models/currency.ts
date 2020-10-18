var path = require('path')
var fs = require('fs')
var lua = require('luaparse')

export class Currency {
    copper
    text

    constructor(copper) {
        this.copper = copper
        this.text = this.getText()
    }

    static copy(currency) {
        return new Currency(currency.copper)
    }

    static fromMbox(accountPath, account, server, character) {
        let copper = 0

        let mboxPath=path.join(accountPath, 
            account.name, 
            server.name, 
            character.name,
            'SavedVariables',
            'Mbox.lua')

        try {
            let luaDb = lua.parse(fs.readFileSync(mboxPath, 'utf-8'))
            // mlog.debug(JSON.stringify(luaDb, null, '\t'))
            copper = luaDb.body[0].init[0].value
        } catch (err) {
            if (err.code == 'ENOENT') {
                // mlog.debug('Mbox not found')
            } else {
                throw err;
            }
        }

        return new Currency(copper)
    }

    getText() {
        return'' + 
            Math.floor(Math.floor(this.copper / 100) / 100).toLocaleString() + 'g'
            + Math.floor(this.copper / 100) % 100 + 's'
            + this.copper % 100 + 'c'
    }

    static getTextStatic(currency) {
        return'' + 
            Math.floor(Math.floor(currency.copper / 100) / 100).toLocaleString() + 'g'
            + Math.floor(currency.copper / 100) % 100 + 's'
            + currency.copper % 100 + 'c'
    }
}