const mongoose = require('mongoose')

mongoose.connect('mongodb://172.26.0.2:27017/proyecto0',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(db=> console.log('bd conectada :)'))
.catch(err => console.error(err)
)