import { Currency } from "./Currency";

export class DataStore {
    currency: Currency

    getCurrency() {
        return this.currency;
    }
}