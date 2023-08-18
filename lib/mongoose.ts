import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL not found');
    if(isConnected) return console.log('Todos listo, conexcion con MONGODB_URL');

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;
        console.log('Mongodb conectado')
    } catch (error) {
        console.log(error)
    }
}