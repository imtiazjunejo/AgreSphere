import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const ConnectDB = async () => {
    try {
        // Remove the slash if it exists at the end of URI
        const uri = process.env.MONGODB_URI.endsWith('/') 
            ? process.env.MONGODB_URI.slice(0, -1) 
            : process.env.MONGODB_URI;
            
        const conn = await mongoose.connect(`${uri}/${DB_NAME}`)
        console.log(`\n MONGODB CONNECTED !! DB HOST : ${conn.connection.host}`)

    } catch (error) {
        console.log("MONGODB_CONNECTION ERROR: ", error)
        process.exit(1)
    }
}

export default ConnectDB