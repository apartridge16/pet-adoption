"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const petsController_1 = require("../controllers/petsController");
const router = (0, express_1.Router)();
// GET /pets - renders a list of all pets
router.get('/', petsController_1.allPets);
// GET /pets/add - render the add pets page
router.get('/add', petsController_1.addPetPage);
// POST /pets/add - add pet to array
router.post('/add', petsController_1.addPet);
// GET /pets/edit/:petId - render the edit pet page
router.get('/edit/:petId', petsController_1.editPetPage);
// POST /pets/edit/:petId - render the edit pet page
router.post('/edit/:petId', petsController_1.editPet);
// POST /pets/delete/:petId - delete pet
router.post('/delete/:petId', petsController_1.deletePet);
// GET /pets/:petId - render the pet requested
router.get('/:petId', petsController_1.onePet);
exports.default = router;
