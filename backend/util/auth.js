import jwt from 'jsonwebtoken';


const SECRET_KEY = 'CMSC100FTT';

function auth(req,res,next){
    const authHeader = req.headers.authorization && req.headers.authorization.split(' ')[1]
  //check token
  if(authHeader==null){

      return res.status(401).json({error:"Access-denied"});
  }

  //check validity
  try{
      const verified = jwt.verify(authHeader, SECRET_KEY);

      req.user={id: verified.id}; 
      next();

  }catch (e){
        console.log('here then')
      res.status(401).json({error:"Invalid-token"});
  }

}

export { auth }