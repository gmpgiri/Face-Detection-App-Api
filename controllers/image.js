const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '5dd0d25a47e9499f837ad88938e5843f' 
  });

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data); 
    })
    .catch(err => err.status(400).json('api call did not work'));
}

const handleImageCount =(req, res, db) =>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err => res.status(404).json('unable to get count'));
}   

module.exports = {
    handleImageCount,
    handleApiCall
}