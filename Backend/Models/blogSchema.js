import { Schema,model } from "mongoose";

const blogSchema = new Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, enum: ['Technology', 'Health', 'Lifestyle', 'Education'], required: true },
    createdAt: { type: Date,default: Date.now}
});

const blog = model("Blog", blogSchema);

export default blog;

