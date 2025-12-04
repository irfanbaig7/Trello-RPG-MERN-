import Project from "../models/ProjectModel.js";


export const createProject = async (req, res) => {
    try {

        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Project name is required" });
        }

        const project = await Project.create({
            userId: req.userId,
            name,
            description: description || "",
        })

        res.status(201).json({
            message: "Project created",
            project,
        });

    } catch (error) {
        console.error("Error accure inside createProject!!", error)
        res.status(500).json({
            message: "createProject/Server error"
        })
    }
}


// Get all projects of current user ( comes form authmiddleware req.userId, bcz next()) 
export const getProject = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.userId }).sort({ createdAt: -1, })
        res.json({ projects })
    } catch (error) {
        console.error("Error inside getProject, ", error)
        res.status.json({
            message: "getProject/Server Error"
        })
    }
}

