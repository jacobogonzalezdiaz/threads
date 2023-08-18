"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

export async function updateUser({
    username,
    userId,
    name,
    bio,
    image,
    path
}: Params): Promise<void>{
    connectToDB();

    try {
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            {upsert: true}
            );
    
            if(path === '/profile/edit'){
                revalidatePath(path);
            }
    } catch (error: any) {
        throw new Error(`Fallo para crear/actualizar el usuario: ${error.message}`);
    }
}

export async function fetchUser(userId: string){
    try {
        connectToDB();
        return await User
            .findOne({id:userId})
            //.populate({
            //    path: 'communities',
            //    model: Community
            //})
    } catch (error: any) {
        throw new Error(`No se pudo recuperar el usuario: ${error.message}`);
    }
}