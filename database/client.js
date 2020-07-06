const mongoose = require('mongoose')

 mongoose.connect(process.env.MONGO_DB,{useNewUrlParser: true})
.then(()=> console.log('connected to the DB'))
.catch(err => console.error(err))
// .catch() for errors on connection time.
const client = mongoose.connection
// .on() for errors after connection is established.
client.on('error',err=>{
    console.error(err)
})

module.exports = client