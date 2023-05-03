import { Request, Response, NextFunction, } from "express";
import Curso from "./module";
import { transaction } from "objection";
import notFoundError from "../../helper/not-found-error";




export default {}