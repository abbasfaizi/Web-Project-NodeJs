import mongoose, {createConnection} from "mongoose";

describe("test-db", () => {

    beforeAll(async () => {
        // Generate a unique database name for testing
        const testDbName = 'testdb_'; //+ Date.now();

        // Connect to the MongoDB database with the unique name
        const conn = createConnection("mongodb+srv://foodmatcher:dat076@dat076.nqicb2v.mongodb.net/test1");
        //await mongoose.connect("mongodb+srv://foodmatcher:dat076@dat076.nqicb2v.mongodb.net/" + testDbName);

    });

    test('should add a new user to the users map', async () => {
        const conn = createConnection("mongodb+srv://foodmatcher:dat076@dat076.nqicb2v.mongodb.net/test1");
        return true;
    });

// Disconnect from the MongoDB database
    /*
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    }); */

});