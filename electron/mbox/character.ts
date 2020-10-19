'use strict'

import { Class } from "./class"
import { Currency } from "./currency"

export class Character {
    currency: Currency
    level: string
    class: Class
    name: string
    server: string 
    ilvl: string
    crafting: any

    constructor(name) {
        this.name = name
    }
}