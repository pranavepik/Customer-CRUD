import { Database } from "sqlite3";
import { open } from "sqlite";

export const openDb = async () => {
    return open({
        filename: './database.sqlite',
        driver: Database
    });
};