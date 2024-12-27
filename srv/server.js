/*eslint-env node, es6 */ /*eslint no-console: 0,*/
"use strict";
global.__base = __dirname;
const cds =  require("@sap/cds");
//const proxy = require('@sap/cds-odata-v2-adapter-proxy');
const cov2ap = require("@cap-js-community/odata-v2-adapter");

const port = process.env.PORT || 4004;

cds.on('bootstrap', (app) => {

    app.use(cov2ap( {returnPrimitiveNested: false}));

    //app.use(proxy({ path: 'v2/proxy', ieee754Compatible: true, port: port, returnPrimitiveNested: false }));// ieee754Compatible: true }));

    app.use(function (err, req, res, next) {
        if (err.code !== 'EBADCSRFTOKEN') {
            console.log(">>> error");
            console.error(err);
            next(err);
        } else {
            res.status(403);
            res.set('X-CSRF-Token', 'required');
            res.set("content-type", "application/json");
            res.send({
                error: {
                    code: "403",
                    message: "CSRF Token required",
                    target: ""
                },
                severity: "error"
            });

        }

    });

});

cds.on('served', async () => {
    console.log(">>> CDS served");

});

module.exports = (o) => {
    console.log(">>> SERVER CDS START");
    return cds.server(o);
};