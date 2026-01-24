import Problems from '../models/problems.js'
import User from '../models/userSchema.js'
import logger from '../config/logger.js';
import mongoose from 'mongoose';

export const createProblem = async (req, res) => {
  try {
    //const userId = req.userId; to be implemting
    logger.info("create problem end point hit....")
    const userId = req.user.userId;
    const { slug, title, description, difficulty, tags, constraints, inputFormat, outputFormat, timeLimit, memoryLimit } = req.body;

    //check user access here
    const user = await User.findOne({ _id: userId });
    console.log(user);

    if (user.role !=='super_admin' && user.role!== 'admin') {
      return res.status(403).json({
        success: false,
        message: "you are not authorised to create problem",
      });
    }

    //check for the required field 
    if (!slug || !title || !description || !difficulty) {
      return res.status(400).json("slug , title ,description or difficulty is required");
    }

    //check the duplicay of the problem 
    const problem = await Problems.findOne({ slug: slug });
    if (problem) {
      return res.status(400).json({
        success: false,
        message:"similar problem already exist.try different",
       })
    }
    
    //create the problem;
    const newProblem = await Problems.create({
      slug,
      title,
      description,
      difficulty,
      tags,
      constraints,
      inputFormat,
      outputFormat,
      timeLimit,
      memoryLimit,
    });

    if (!newProblem) {
      return res.status(400).json({
        success: false,
        message:"problem creation got failed.try again."
      })
    }
    else {
      return res.status(200).json({
      success: true,
      message:"Problem created Successfully",
    })
    }
  }
  catch (err) {
    console.log("error while creating Problem:", err.message);
    logger.error(`error while creating a problem :${err.message}`);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

export const getASingleProblem = async (req, res) => {
  try {
    logger.info("get a single problem endpoint hit......");
    const { problemId } = req.params;
    if (!problemId) return res.status(400).json("problemId is required");
    const problem = await Problems.findOne({_id:problemId});
    return res.status(200).json({
      success: true,
      message: "problem fetched successfully",
      problem
    });
  }
  catch (err) {
    console.error("error while getting a problem", err.message);
    logger.error(`error while getting a single problem :${err.message}`);
    return res.status(500).json({
      success: false,
      message:"internal server error.try after sometime."
    })
  }
}

export const getAllProblem = async (req, res) => {
  try {
    logger.info("get all problem endpoint hit......");
    const problems = await Problems.find();
    return res.status(200).json({
      success: false,
      message: "problems fetched successfully",
      problems,
    })
  }
  catch (err) {
    console.error("error while getting all problem", err.message);
    logger.error(`error while getting all problem ${err.message}`);
    return res.status(500).json({
      success: false,
      message:"internal server error.try after sometime."
    })
  }
}

export const deleteAProblem = async (req, res) => {
  try {
    const { problemId } = req.params;
    if (!problemId) return res.status(400).json("problemId required");

    const problemIdObject = new mongoose.Types.ObjectId(problemId);
    const deletedProblem = await Problems.findByIdAndDelete(problemIdObject);
    return res.status(200).json({
      success: true,
      message: "problem deleted successfully !",
      deletedProblem,
    })
  }
  catch (err) {
    console.error("error while deleting the problem");
    logger.error(`error while deleting the problem ${err.message}`);
    return res.status(500).json({
      success: false,
      message:"internal server error",
    })
  }
}

export const updateAProblem = async (req, res) => {
  try {
    logger.info("update a problem endpoint hit ......");
    const role = req.user.role;
    if (role !== "admin" || role !== "super_admin") return res.json("unauthorised access");

    const { problemId } = req.params;
    if (!problemId) {
      return res.status(400).json({ message: "problemId required" });
    }

    // only pick allowed fields
    const updateFields = (({
      description,
      title,
      difficulty,
      tags,
      constraints,
      inputFormat,
      outputFormat,
      timeLimit,
      memoryLimit,
      supportedLanguages
    }) => ({
      description,
      title,
      difficulty,
      tags,
      constraints,
      inputFormat,
      outputFormat,
      timeLimit,
      memoryLimit,
      supportedLanguages
    }))(req.body);

    // remove undefined fields
    Object.keys(updateFields).forEach(
      key => updateFields[key] === undefined && delete updateFields[key]
    );

    const updatedProblem = await Problems.findByIdAndUpdate(
      problemId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    return res.status(200).json({
      message: "Problem updated successfully",
      data: updatedProblem
    });

  } catch (err) {
    logger.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
