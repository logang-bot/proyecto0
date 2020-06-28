const helpers = {}
helpers.isAuthenticatedd = (req,res,next)=>{
    if(req.isAuthenticated()){
        console.log('done')
        return next()
    }
    console.log('no esta autenticado')
    res.send('no esta autenticado')
}
module.exports = helpers