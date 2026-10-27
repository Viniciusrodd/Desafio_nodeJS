
// imports
import { Router } from "express";

// import controller
import { filmController } from "./controller/film.controller.js";

// router - init
export const router = Router();

// routes
router.get('/filmes', (req, res) => filmController.get(req, res));