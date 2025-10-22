import { Router } from "express";
import blog from "../Models/blogSchema.js";

const blogRoutes = Router();

blogRoutes.post("/addBlog", async(req,res)=>{
    try {
        const {title,content,author,category} = req.body;

        const existingBlog = await blog.findOne({title});

        if (existingBlog) {
            return res.status(400).json({ message: "Blog with this title already exist." });
        }

        const newBlog = new blog({
            title,
            content,
            author,
            category,
          });

        await newBlog.save();

        res.status(201).json({ message: "Blog created successfully.",blog: newBlog,});
        
    } catch (error) {
        res.status(500).json({message: "Error creating Blog."});
    }
})

blogRoutes.get("/viewBlogs",async(req,res)=>{
    try{
        const allBlog = await blog.find();
        if(!allBlog.length){
            return res.status(404).json({ message: "No blogs found." });
        }
        res.status(200).json(blog);
    }
    catch(error){
        res.status(500).json({message:"Error in fetching the Blogs"})
    }
});

blogRoutes.get("/viewBlog/:id",async(req,res)=>{
    try{
        const { id }= req.params();
        const viewBlog = await blog.find(id);
        if(!viewBlog){
            return res.status(404).json({ message: "No blog is found in this title." });
        }
        res.status(200).json(blog);
    }
    catch(error){
        res.status(500).json({message:"Error in fetching the Blog"})
    }
});

blogRoutes.put("/updateBlog/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, author, category } = req.body;
  
      const updatedBlog = await blog.findByIdAndUpdate(
        id,
        { title, content, author, category },
        { new: true } 
      );
  
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found!" });
      }
  
      res.status(200).json({ message: "Blog updated successfully!", blog: updatedBlog
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error in updating the Blog" });
    }
  });
  

blogRoutes.delete("/deleteBlog/:id", async(req,res)=>{
    try {
        const {id } = req.params;
        const blogToDelete = await blog.findOneAndDelete(id);
    
        if (!blogToDelete) {
          return res.status(404).json({ msg: "blog not found" });
        }
    
        res.status(200).json({ msg: "blog deleted successfully" });
      } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ msg: "Internal Server Error" });
      }
})

export default blogRoutes;