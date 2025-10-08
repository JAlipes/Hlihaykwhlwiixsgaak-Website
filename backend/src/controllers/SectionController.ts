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

// SaveData handles basic (non-slides) sections where a single text + image are stored.
// Image upload (if any) is processed via multer single('image') middleware.
export async function SaveData(req: Request, res: Response){
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

// (Currently unused externally) Generic update endpoint that can switch a section
// between slides or basic mode depending on payload. Retained for potential future use.
export async function UpdateData(req: Request, res: Response) {
    try {
        const { sectionName } = req.params;

        if (!sectionName) {
            return res.status(400).json({ message: 'Section name is required' });
        }

        const sectionData = await SectionModel.findOne({ sectionName });

        if (!sectionData) {
            return res.status(404).json({ message: 'Section data not found' });
        }

        // Update fields based on request body
        if (req.body.slides) {
            sectionData.slides = req.body.slides;
            sectionData.text = undefined;
            sectionData.image = undefined;
        } else {
            sectionData.text = req.body.text;
            sectionData.image = req.body.image;
            sectionData.slides = undefined;
        }

        await sectionData.save();

        return res.status(200).json({ message: 'Section data updated successfully', sectionData });
    } catch (err) {
        console.error('Error updating section data', err);
        return res.status(500).json({ message: 'Error updating section data' });
    }
}

// SaveSlides accepts multipart/form-data containing:
// - sectionName
// - slides (JSON string array of slide objects)
// - slideImages[] (0..n File inputs corresponding by index to slides where image changed)
// It uploads only the changed images, merges returned URLs into slide objects and persists.
export async function SaveSlides(req: Request, res: Response) {
    try {
        const { sectionName } = req.body;
        if (!sectionName) {
            return res.status(400).json({ message: 'Section name is required' });
        }

        let rawSlides = req.body.slides;
        if (!rawSlides) {
            return res.status(400).json({ message: 'Slides payload is required' });
        }

        // Slides may arrive as JSON string inside multipart/form-data
        let slides: any[];
        try {
            slides = typeof rawSlides === 'string' ? JSON.parse(rawSlides) : rawSlides;
        } catch (e) {
            return res.status(400).json({ message: 'Invalid slides JSON' });
        }

        if (!Array.isArray(slides)) {
            return res.status(400).json({ message: 'Slides must be an array' });
        }

        // Process uploaded files (if any)
        const files = (req.files as Express.Multer.File[]) || [];
        // Each file corresponds to the slide index in order of appearance
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file) continue;
            try {
                const url = await UploadToCloudinary(file, `${sectionName}-slide-${i}`);
                if (slides[i]) {
                    slides[i].image = url;
                }
            } catch (err) {
                console.error(`Failed to upload image for slide ${i}`, err);
            }
        }

        const updated = await SectionModel.findOneAndUpdate(
            { sectionName },
            { slides, text: undefined, image: undefined },
            { upsert: true, new: true }
        );
        
        console.log('Slides saved successfully');
        return res.status(200).json({ message: 'Slides saved successfully', sectionData: updated });
    } catch (err) {
        console.error('Error saving slides', err);
        return res.status(500).json({ message: 'Failed to save slides' });
    }
}


