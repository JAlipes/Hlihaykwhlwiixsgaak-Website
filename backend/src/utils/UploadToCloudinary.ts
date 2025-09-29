import {v2 as cloudinary} from 'cloudinary';

// Import Utils
import { GetEnvVarOrFail } from './GetEnvVarOrFail';

cloudinary.config({
  cloud_name: `${GetEnvVarOrFail('CLOUDINARY_CLOUD_NAME')}`,
  api_key: `${GetEnvVarOrFail('CLOUDINARY_API_KEY')}`,
  api_secret: `${GetEnvVarOrFail('CLOUDINARY_API_SECRET')}`,
});

/**
 * Using and abstracted request handler made by cloudinary. It handles uploading the image as well as the creation of the URL for the image.
 */
export async function UploadToCloudinary(imageFile: Express.Multer.File, sectionName: String) : Promise<string>{
    console.log('Inside UploadToCloudinary')
    return new Promise<string>((resolve, reject) => { 

        // Uploads the images first. If successful we get a url if not we throw an error.
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'sectionImages',
                public_id: `${sectionName}Id`,
                overwrite: true,
                resource_type: 'image'
            },
            (error, result) => {
                if(error) return reject(error);
                if(!result) return reject(`Cloudinary did not return a result`);
                console.log('Passed All Cloudinary Checks');
                console.log(`(UploadToCloudinary) Image URL: ${result.secure_url}`)
                resolve(result.secure_url);
            }
        );
        stream.end(imageFile.buffer);
    });
}