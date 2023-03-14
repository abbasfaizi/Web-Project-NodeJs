/* Handles database connection, connects to different database for testing and regular use */
import { createConnection } from "mongoose";

// Should be in an external file for security (in reality)
const mainDB : string = "mongodb+srv://foodmatcher:dat076@dat076.nqicb2v.mongodb.net/mainDB";
const testDB : string = "mongodb+srv://foodmatcher:dat076@dat076.nqicb2v.mongodb.net/testDB";

const DB_URI = process.env.NODE_ENV === "test" ?
    testDB :
    mainDB;

export const conn = createConnection(DB_URI);
