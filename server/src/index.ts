import { app } from "./start";


/**
* App Variables
*/

const args = process.argv;
let port:number

if (args.length > 2)
    port = Number(args[2])
else
    port = 8080 // Default port

const PORT : number = port;


/**
* Server Activation
*/


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
