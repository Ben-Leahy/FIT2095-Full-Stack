/**************************************** Imports ****************************************/
let express = require("express");
const path = require("path");

/**************************************** Definitions ****************************************/
let router = express.Router();

let pets = [
  {
    id: 1, // 5 digit number
    petName: "Patty", // string
    petPrice: 1000, // number
    petSpecies: "dog", // string
  },
  {
    id: 11,
    petName: "Sassy",
    petPrice: 1002,
    petSpecies: "cat",
  },
  {
    id: 2435,
    petName: "Bessie",
    petPrice: 2100,
    petSpecies: "Cow",
  },
];

/* **************************************** Endpoints ****************************************/
// Home Page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// Update Pet Species
router.get("/ben/petstore/update", (req, res) => {
  const id = parseInt(req.query.id);
  const { species } = req.query;
  index = pets.findIndex((pet) => pet.id === id); // index is outputting negative 1 even when it exists.
  console.log(pets[index]);
  console.log(index);
  console.log(pets[index]);
  pets[index].petSpecies = species;
  res.json(pets[index]);
});

// Add Pet
router.get("/ben/petstore/add", (req, res) => {
  const { petName, petPrice, petSpecies } = req.query;
  newId = Math.floor(Math.random() * 99999); // Assume that a random number between 0 and 99998 will be unique
  newPet = {
    id: newId,
    petName: petName,
    petPrice: petPrice,
    petSpecies: petSpecies,
  };
  pets.push(newPet);
  res.json(newPet);
});

// Delete Pet
router.get("/ben/petstore/remove/:id", (req, res) => {
  // find index
  const { id } = req.query;
  index = pets.findIndex((elem) => elem.id === id);
  pets.splice(index, 1); //remove pet
  // How would I redirect to getPets?
  res.json(pets); //send json of pets
});

// Species Report
router.get("/ben/petstore/report/:species", (req, res) => {
  const { species } = req.query;
  petsOfSpecies = pets.filter(
    (pet) => pet.species === species //TODO: not handling upper case
  );
  petCount = petsOfSpecies.length;

  if (petCount === 0) {
    res.status(404).send("Task not found."); //this is chainable because res.status(404) returns the res object
  } else {
    let avgPetPrice = 0;
    petsOfSpecies.forEach((pet) => {
      avgPetPrice = avgPetPrice + pet.petPrice;
    });

    let minPetPrice = petsOfSpecies[0].petPrice;
    let maxPetPrice = petsOfSpecies[0].petPrice;
    petsOfSpecies.forEach((pet) => {
      minPetPrice = minPetPrice < pet.petPrice ? minPetPrice : pet.petPrice;
      maxPetPrice = maxPetPrice > pet.petPrice ? maxPetPrice : pet.petPrice;
    });

    let petNames = [];
    petsOfSpecies.forEach((pet) => {
      petNames.push(pet.petName);
    });

    report = {
      species: species,
      count: petCount,
      avgPrice: avgPetPrice,
      minPrice: minPetPrice,
      maxPrice: maxPetPrice,
      names: petNames,
    };
    res.json(report);
  }
});

// Get Pets
router.get("/ben/petstore", (req, res) => {
  res.json(pets); //send json of pets
});

/**************************************** Exports ****************************************/
module.exports = router;
