import jwt from 'jsonwebtoken';

const SECRET_KEY = 'CMSC100FTT';

function auth(req,res,next){
  const authHeader=req.header('authorization');

  //check token
  if(authHeader==null){
      return res.status(401).json({error:"Access-denied"});
  }

  //check validity
  try{
      const verified=jwt.verify(authHeader, SECRET_KEY, {expiresIn: '1hr'});
      
      req.id={id:verified.id}; 
      req.type={type:verified.type}
      next();

  }catch (e){
      res.status(401).json({error:"Invalid-token"});
  }

}

export { auth }