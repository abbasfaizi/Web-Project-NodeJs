import {conn} from "../../db/model/conn";


describe("DB Test", () => {

    beforeAll(async () => {
        await conn.startSession();
    });

    afterAll(async () => {
        await conn.close();
    });

    test('Should return 1 if properly connected to Database', async () => {
        expect(conn.readyState).toBe(1);
    });

});
