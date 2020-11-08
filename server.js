const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4200;

const accessController = require('./controller/accessController.js');

const securityMiddleware = (req, res, next) => {
    // if (req.url.indexOf("/access/login") != -1) {
    //     next()
    //     return 
    // }
    // try {
    //     let access = require('./src/assets/access.json')
    //     let token_header = req.headers.authorization
    //     if(utils.is_undefined(token_header)) throw {status:403,message:"El header de autorización no es valido"}
    //     for (t of access.tokens) {
    //         if (token_header.indexOf(t.token)!=-1 ) {
    //             t_creation = new Date(t.creation)
    //             t_use = new Date(t.use)
    //             t_actual = new Date()
    //             if ((access.life_time - Math.round((t_actual - t_creation) / 1000) <= 0) || (access.session_time - Math.round((t_actual - t_use) / 1000) <= 0)) {
    //                 throw { status: 403, message: "Sesión expirada, por favor ingrese de nuevo" }
    //             }
    //             t.use = t_actual
    //             utils.update_tokens(access)
    //             next()
    //             return 0
    //         }
    //     }
    //     throw { status: 401, message: "No tienes permiso para ver este contenido" }
    // } catch (error) {
    //     console.log(error.message)
    //     res.status(error.status).send(error.message)
    // }
    next();
}

app.use(securityMiddleware)
app.use('/access', accessController);


app.listen(process.env.PORT || port, () => {
    console.log("Servidor esperando en el puerto " + port)
});

module.exports = app