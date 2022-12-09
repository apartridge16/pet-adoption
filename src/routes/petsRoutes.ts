import { Router } from 'express';
import { addPet, addPetPage, allPets, deletePet, editPet, editPetPage, onePet } from '../controllers/petsController';



const router = Router();

// GET /pets - renders a list of all pets
router.get('/', allPets);

// GET /pets/add - render the add pets page
router.get('/add', addPetPage);

// POST /pets/add - add pet to array
router.post('/add', addPet);

// GET /pets/edit/:petId - render the edit pet page
router.get('/edit/:petId', editPetPage);

// POST /pets/edit/:petId - render the edit pet page
router.post('/edit/:petId', editPet);

// POST /pets/delete/:petId - delete pet
router.post('/delete/:petId', deletePet);

// GET /pets/:petId - render the pet requested
router.get('/:petId', onePet);

export default router;