const handleSignin = (req, res, db, bcrypt)=>{
    const {email, password} = req.body;
    if(!password || !email) {
        return res.status(400).json('incorrect form submission');
    }
    db.select('email','hash').from('login')
    .where('email','=', email)
    .then(data => {
        const isValid = bcrypt.compareSync( password, data[0].hash);
        if(isValid) {
            return db.select('*').from('users')
              .where('email','=', email)
              .then(user => {
                  console.log(user);
                  res.json(user[0]);
              })
              .catch(err => res.status(400).json('unable to get user'))
            res.json()
        } else {
            res.status(404).json('userid or password is wrong')
        }
    })
    .catch (err => res.status(400).json('userid or password is wrong'));
}

module.exports = {
    handleSignin : handleSignin
}