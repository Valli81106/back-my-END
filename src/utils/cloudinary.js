import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.cloud_nameCLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null//uplaod the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been successfully uploaded
        console.log("File has been uplaoded successfully on cloudianry", response.url)
        return response;
        
    }catch (error){
        fs.unlinkSync(localFilePath)  //ye files ko server se nikalta hai agar file uplaoding mein kuch problem aaya ho, cuz if smth went wrong
        return null
    }
}