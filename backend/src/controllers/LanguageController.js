import Language from "../models/Language";
import logger from '../config/logger.js'
import mongoose from "mongoose";


export const addlanguageContainer = async (req, res) => {
  try {
    logger.info("add language endpoint hit.......");
    const role = req.user.role;
    //check for the access;
    if (role !== "super_admin") {
      return res.status(403).json("you are not authorised to create.");
    }

    //extract data from the req
    const { key, name, dockerImage, sourceFile, CompileCmd, runCmd, timeLimit, memoryLimit } = req.body;
    if (!key || !name || !dockerImage || !sourceFile || !CompileCmd || !runCmd || !timeLimit || !memoryLimit) return res.status(403).json("required fields are missing");

    //check for the duplicay
    const language = await Language.findOne({ key: key });
    if (language) {
      return res.status(200).json("language alraedy exists");
    }

    //create a new language;
    const newLanguage = await Language.create({
      key,
      name,
      dockerImage,
      sourceFile,
      compileCmd: CompileCmd ? CompileCmd : "",
      runCmd,
      timeLimit: Math.max(1200, timeLimit),
      memoryLimit: Math.max(256, memoryLimit)
    })

    if (!newLanguage) {
      return res.status(403).json({
        success: false,
        message: "error while creating the language"
      });
    }
    else {
      return res.status(200).json({
        success: true,
        message: "language created successfully",
        language: newLanguage
      });
    }
  }
  catch (error) {
    console.log("error while adding language", error.message);
    logger.error(`error while adding language :${error.message}`);
    return res.status(500).json(
      {
        success: false,
        mesaage:"internal server error",
      }
    )
  }
}

export const updateLanguageContainer = async (req, res) => {
  try {
    logger.info("update Language endpoint hit....");
    const role = req.user.role;
    if (role !== "super_admin") {
      return res.status(403).json("you are not authorised to update..");
    }
    
    if (!req.body) return res.status("data is required for updation");
    const { containerId, dockerImage, sourceFile, CompileCmd, runCmd, timeLimit, memoryLimit } = req.body;
    //change container id to mongo db objectId;
    const containerIdObject = new mongoose.Types.ObjectId(containerId);
    if (!containerIdObject) return res.status(403).json("containerId is required");
    
    //find the container 
    const container = await Language.findById(containerIdObject);
    if (!container) return res.status(404).json("no container exist with the id");
    //got container previous info
    const prevInfo = {
      prevDockerImage: container.dockerImage,
      prevsourceFile: container.sourceFile,
      prevCompileComd : container.compileCmd,
      prevrunCmd : container.runCmd,
      prevtimeLimit : container.timeLimit,
      prevmemoryLimit : container.memoryLimit,
    }
    
    const newInfo = {
      dockerImage,
      sourceFile,
      CompileCmd,
      runCmd,
      timeLimit,
      memoryLimit
    }
    
    //update the container
    container.dockerImage = newInfo.dockerImage ? newInfo.dockerImage : prevInfo.prevDockerImage;
    container.sourceFile = newInfo.sourceFile ? newInfo.sourceFile : prevInfo.prevsourceFile;
    container.compileCmd = newInfo.CompileCmd ? newInfo.CompileCmd : prevInfo.prevCompileComd;
    container.runCmd = newInfo.runCmd ? newInfo.runCmd : prevInfo.prevrunCmd;
    container.timeLimit = newInfo.timeLimit ? newInfo.timeLimit : prevInfo.prevtimeLimit;
    container.memoryLimit = newInfo.memoryLimit ? newInfo.memoryLimit : prevInfo.prevmemoryLimit;

    //save the newly updated container
    await container.save();
    return res.status(200).json({
      success: true,
      message: "container updated successFully",
      container,
    });
    
  }
  catch (err) {
    console.log("error while updating the langguage.");
    logger.info(`error while updating the language:${err.message}`);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

export const deleteLanguageContainer = async (req, res) => {
  try {
    logger.info("delete language container enpoint hit..")
    const { containerId } = req.body;
    if (!containerId) return res.status(400).json("containerId is missing");
    if (req.user.role != "super_admin") {
       return res.status(400).json("you are not authorise to delete")
    }

    //find the container
    const containerIdObject = new mongoose.Types.ObjectId(containerId);
    const container = await Language.findById(containerIdObject);
    if (!container) return res.status(400).json("no such container exist");
    ///delete the container 
    const deletedContainer = await Language.findByIdAndDelete(container._id);
    return res.status(200).json({
      success: true,
      message: "container deleted successfully !",
      deletedContainer
    });
  }
  catch (err) {
    console.error("error while deleting the container", err.message);
    logger.error(`error while deleting the container ${err.message}`);
    res.status(500).json({
      success: false,
      message:"internal server error",
    })
  }
}

export const getALanguageInfoContainer = async (req, res) => {
  try {
    logger.info("get a language container endPoint hit");
    const containerId = req.body;
    if (!containerId) {
      return res.status(400).json("containerId required");
    }
    
    const conatinerIdObject = new mongoose.Types.ObjectId(containerId);
    const container = await Language.findById(containerId);
    return res.status(200).json({
      success: true,
      message: "conatiner fetched",
      container
    });
  }
  catch (err) {
    console.error("error while getting a language container", err.message);
    logger.error(`error while getting container :${err.message}`);
    return res.status(500).json({
      success: false,
      message:"interna; server error",
    })
  }
}

export const getAllLanguageInfoContainer = async (req, res) => {
  try {
    logger.info("get all container end point hit...");
    const containers = await Language.find();
    return res.status(200).json({
      success: false,
      message: "containers fetched successfully",
      containers,
    })
  }
  catch (err) {
    console.error("error while getting all container", err.message);
    logger.error(`error while getting all container :${err.message}`);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}