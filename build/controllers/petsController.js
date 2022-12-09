"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.editPet = exports.editPetPage = exports.addPet = exports.addPetPage = exports.onePet = exports.allPets = exports.defaultToPets = void 0;
const pets_1 = require("../models/pets");
const defaultToPets = (req, res, next) => {
    res.redirect('/pets');
};
exports.defaultToPets = defaultToPets;
const allPets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let petsList = yield pets_1.Pets.findAll();
    res.render('allPets', { petsList });
});
exports.allPets = allPets;
const onePet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let petID = req.params.petId;
    let pet = yield pets_1.Pets.findByPk(petID);
    if (pet) {
        res.render('petDetails', { foundPet: pet });
    }
    else {
        res.status(404).render('error', { message: 'pet not found' });
    }
});
exports.onePet = onePet;
const addPetPage = (req, res, next) => {
    res.render('addNewPet');
};
exports.addPetPage = addPetPage;
const addPet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let newPet = req.body;
    yield pets_1.Pets.create(newPet);
    res.redirect('/pets');
});
exports.addPet = addPet;
const editPetPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let petID = req.params.petId;
    let pet = yield pets_1.Pets.findOne({
        where: { petId: petID }
    });
    if (pet) {
        res.render('editPetPage', { foundPet: pet });
    }
    else {
        res.status(404).render('error', { message: 'pet not found' });
    }
});
exports.editPetPage = editPetPage;
const editPet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let petID = req.params.petId;
    let updatedPet = req.body;
    let [updated] = yield pets_1.Pets.update(updatedPet, {
        where: { petId: petID }
    });
    if (updated === 1) {
        res.redirect(`/pets/${petID}`);
    }
    else {
        res.render('error', { message: 'Pet could not be updated' });
    }
});
exports.editPet = editPet;
const deletePet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let petID = req.params.petId;
    let deleted = yield pets_1.Pets.destroy({
        where: { petId: petID }
    });
    if (deleted) {
        res.redirect('/pets');
    }
    else {
        res.status(404).render('error', { message: 'Cannot find pet' });
    }
});
exports.deletePet = deletePet;
