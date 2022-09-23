import dbConnect from '../../../utils/mongooseConnect';
import {  signup } from '../../../controllers/authController';
import errorServerResponse from "../../../utils/serverError";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      try{
        await signup(req,res);
      }
      catch(err){
        errorServerResponse(res,err)
      }
 
      break;
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}
