
const handelSignin = (req,res,db,bcrypt) => {
    const { email , password } = req.body;
    if (!email || !password){
        return res.status(400).json('incorrect from submission');
    }
    db.select('email','hash').from('login')
    .where('email', '=' ,email)
    .then(data => {
       const isvalid = bcrypt.compareSync(req.body.password, data[0].hash);
       if(isvalid){
          return db.select('*').from('users')
           .where('email','=',email)
           .then(user => {
               res.json(user[0])
           })
           .catch(rr => res.status(400).json('unable to get user'))
       }
       else {
        res.status(400).json('Wrong Credentials');
       }
    })
    .catch(err => res.status(400).json('Wrong Credentials'));
}


module.exports = {
    handelSignin: handelSignin
}