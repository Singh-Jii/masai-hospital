const {my_router}=require("express");

const doctor_router=my_router();

const {authenticate}=require("../middleware/auth_middleware");

const {identify_role}=require("../middleware/role_middleware");

const {plus_doc,edit_doc,delete_doc,get_doc}=require("../control/doctor_control");

doctor_router.post("/appointments",authenticate,identify_role(["Client"]),plus_doc);

doctor_router.patch("/appointments/:id",authenticate,identify_role(["Client"]),edit_doc);

doctor_router.delete("/appointments/:id",authenticate,identify_role(["Client"]),delete_doc);

doctor_router.get("/appointments",authenticate,get_doc);

module.exports={doctor_router};