import dbConnect from '../../../utils/mongooseConnect';
import {  getMyArticles, getUserArticles, getArticle, createArticle, updateArticle, deleteArticle
} from '../../../controllers/articleController';
import errorServerResponse from "../../../utils/serverError";
import {protect} from "../../../controllers/authController";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try{
        if(await protect(req,res)){
          if(!req.query.owner){
            await getMyArticles(req,res);
          }else{
            await getUserArticles(req,res);
          }
        }
      }
      catch(err){
        errorServerResponse(res);
      }
      break;
    case "POST":
      try{
        if(await protect(req,res)){
          createArticle(req,res);
        }
      }
      catch(err){
        errorServerResponse(res);
      }
      break;
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}
