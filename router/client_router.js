const {my_router}=require("express");

const client_router=my_router();

const {authenticate}=require("../middleware/auth_middleware");

const {clientSignup,clientLogin,clientLogout}=require("../control/client_control");

client_router.post("/signup",clientSignup);

client_router.post("/login",clientLogin);

client_router.post("/logout",authenticate,clientLogout);

module.exports={client_router};