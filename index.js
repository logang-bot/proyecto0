const app = require('./src/server/config')
require('./src/server/database')

app.listen(app.get('port'), ()=>{
    console.log('servidor en puerto', app.get('port'))
})
