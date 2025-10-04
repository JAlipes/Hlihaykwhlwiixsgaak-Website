import { Request, Response } from 'express';

// Import models
import { SectionModel } from '../models/SectionDataSchema';

// Import Utils
import { UploadToCloudinary } from '../utils/UploadToCloudinary';

export async function GetData(req: Request, res: Response){
    try { 
        const { sectionName } = req.query;

        if (!sectionName || typeof sectionName !== 'string') {
            return res.status(400).json({message : `Section Name Required`});
        }

        const sectionData = await SectionModel.findOne({ sectionName }); 

        if (!sectionData) {
            return res.status(404).json({message : `Section Data Not Found`});
        }

        console.log('Retrieved Data Succesffuly');
        res.status(200).json(sectionData);

    } catch (err) {
        return res.status(500).json({message: `Error Getting Section Data`}); 
    }
}  

export async function SaveData(req: Request, res: Response){
    // use both saveText and saveImage helpers in here
    try {
        const { sectionName, text } = req.body;

        if(!sectionName){
            return res.status(400).json({message : `Section Name Is Required`})
        }

        let imageUrl = req.body.image;


        // if file uploaded, replace with new S3 URL
        if (req.file) {
            imageUrl = await UploadToCloudinary(req.file, sectionName);
        }
        console.log(`(SaveData function) Image URL: ${imageUrl}`)
        const updateSectionData = await SectionModel.findOneAndUpdate(
            { sectionName },
            { text, image: imageUrl },
            { upsert: true, new : true}
        )

        res.status(200).json({message : `Saved Section Data Succesfully`, updateSectionData});
    } catch (err) {
        console.error(`Error Saving Section Data`, err);
        res.status(500).json({message: `Failed to save section data`});
    }
}


