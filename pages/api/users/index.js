import dbConnect from '../../../utils/mongooseConnect';
import {  getAllUsers
} from '../../../controllers/userController';
import errorServerResponse from "../../../utils/serverError";
import {protect} from "../../../controllers/authController";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try{
        if(await protect(req,res)){
         
            await getAllUsers(req,res);
        
        }
      }
      catch(err){
        errorServerResponse(res, err);
      }
      break;
      
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}
