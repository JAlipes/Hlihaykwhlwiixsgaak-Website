import mongoose from "mongoose";

const sectionTextSchema = new mongoose.Schema({
    text: {type: String, required: true},
})

export const SectionTextModel = mongoose.model('SectionText', sectionTextSchema);