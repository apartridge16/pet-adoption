import { RequestHandler } from "express";
import { Pets } from "../models/pets";

export const defaultToPets: RequestHandler = (req, res, next) => {
  res.redirect('/pets');
}

export const allPets: RequestHandler = async (req, res, next) => {
  let petsList: Pets[] = await Pets.findAll();
  res.render('allPets', { petsList });
}

export const onePet: RequestHandler = async (req, res, next) => {
  let petID = req.params.petId;
  let pet: Pets | null = await Pets.findByPk(petID);

  if (pet) {
    res.render('petDetails', { foundPet: pet });
  }
  else {
    res.status(404).render('error', { message: 'pet not found' });
  }
}

export const addPetPage: RequestHandler = (req, res, next) => {
  res.render('addNewPet');
}

export const addPet: RequestHandler = async (req, res, next) => {
  let newPet: Pets = req.body;
  await Pets.create(newPet);
  res.redirect('/pets');
}

export const editPetPage: RequestHandler = async (req, res, next) => {
  let petID = req.params.petId;
  let pet: Pets | null = await Pets.findOne({
    where: { petId: petID }
  });

  if (pet) {
    res.render('editPetPage', { foundPet: pet });
  }
  else {
    res.status(404).render('error', { message: 'pet not found' });
  }
}

export const editPet: RequestHandler = async (req, res, next) => {
  let petID = req.params.petId;
  let updatedPet: Pets = req.body;

  let [updated] = await Pets.update(updatedPet, {
    where: { petId: petID }
  });

  if (updated === 1) {
    res.redirect(`/pets/${petID}`);
  }
  else {
    res.render('error', { message: 'Pet could not be updated' });
  }
}

export const deletePet: RequestHandler = async (req, res, next) => {
  let petID = req.params.petId;

  let deleted = await Pets.destroy({
    where: { petId: petID }
  });

  if (deleted) {
    res.redirect('/pets')
  }
  else {
    res.status(404).render('error', { message: 'Cannot find pet' });
  }
}