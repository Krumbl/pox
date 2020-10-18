const elog = require('electron-log');
elog.transports.console.format = '{iso} [{level}] [{processType}] {text}';
elog.transports.console.level = 'trace'
const clog = require('console');

export class Log {
    trace(msg) {
        elog.verbose(msg)
    }
    
    debug(msg) {
        elog.debug(msg)
    }
    
    info(msg) {
        elog.info(msg)
    }
    
    warn(msg) {
        elog.warn(msg)
    }
    
    error(msg) {
        elog.error(msg)
    }
    
    stringify(object) {
        return JSON.stringify(object, null, 2)
    }
    
    // TODO track nested group levels indentation
    group(groupName) {
        elog.debug("-----" + groupName + "-----")
        console.groupCollapsed(groupName)
    }
    
    // TODO track name to end
    groupEnd() {
        console.groupEnd()
        elog.debug("----------")
    }
}