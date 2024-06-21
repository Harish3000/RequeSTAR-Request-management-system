import { Request, Response } from "express";
import RequestModel, { IRequest } from "../models/requestModel";

const getRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const requests = await RequestModel.find();
    res.status(200).json(requests);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const addRequest = async (req: Request, res: Response): Promise<void> => {
  const {
    requestId,
    createdOn,
    location,
    service,
    status,
    priority,
    department,
    requestedBy,
    assignedTo,
  } = req.body;

  const newRequest: IRequest = new RequestModel({
    requestId,
    createdOn,
    location,
    service,
    status,
    priority,
    department,
    requestedBy,
    assignedTo,
  });

  try {
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateRequest = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedRequest = await RequestModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedRequest) {
      res.status(404).json({ message: "Request not found" });
    } else {
      res.status(200).json(updatedRequest);
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRequest = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedRequest = await RequestModel.findByIdAndDelete(id);
    if (!deletedRequest) {
      res.status(404).json({ message: "Request not found" });
    } else {
      res.status(200).json({ message: "Request deleted" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { getRequests, addRequest, updateRequest, deleteRequest };
