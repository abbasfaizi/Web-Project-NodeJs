import { createConnection } from "mongoose";


// Definiera en strängvariabel som representerar URI för huvuddatabasen
const mainDB : string = "mongodb+srv://foodmatcher:dat076@dat076.nqicb2v.mongodb.net/mainDB";

// Definiera en strängvariabel som representerar URI för testdatabasen
const testDB : string = "mongodb+srv://foodmatcher:dat076@dat076.nqicb2v.mongodb.net/testDB";

// Definiera en konstantvariabel som representerar URI för att ansluta till en av databaserna beroende på om miljön är test eller inte
const DB_URI = process.env.NODE_ENV === "test" ?
    testDB :
    mainDB;

// Skapa en anslutning till databasen med hjälp av createConnection-funktionen och tilldela den till en konstantvariabel 'conn'
export const conn = createConnection(DB_URI);
