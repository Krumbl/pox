'use strict'

import { Server } from "http"
import { Class } from "./class"
import { Currency } from "./currency"

export class Character {
    currency: Currency
    level: string
    class: Class
    name: string
    server: string
    ilvl: string
    crafting: []

    constructor(name) {
        this.name = name
    }
}