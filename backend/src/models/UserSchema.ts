import {Schema, Document, model} from 'mongoose';

interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // store hash only
});

export const UserModel = model<UserDocument>('User', userSchema);
