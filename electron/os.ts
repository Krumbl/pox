var os = require('os')

export class OS {
    // TODO not static
    static getCpus() {
        return os.cpus()
    }

    static getMemory() {
        return {
            "freemem": os.freemem(),
            "totalmem": os.totalmem()
        }
    }
}