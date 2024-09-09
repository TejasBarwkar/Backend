import { Request, Response } from "express";
import { CountryRepository } from "../repositories/countryRepository";
import { Country } from "../models/countryModel";
import { validateCountry } from "../validations/countryValidation";
import { generateId } from "../helpers";
import { saveImageToDisk } from "../services/fileUploadService";

export const getCountries = (_req: Request, res: Response): void => {
  const countries = CountryRepository.getCountries();
  const countryList = countries.map(({ id, name }) => ({
    id,
    name,
  }));

  res.json(countryList);
};

export const getCountryById = (req: Request, res: Response): void => {
  const countries = CountryRepository.getCountries();
  const country = countries.find(
    (country: Country) => country.id === req.params.id
  );

  if (!country) {
    res.status(404).json({ error: "Country not found" });
  } else {
    res.json(country);
  }
};

export const addCountry = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { hasError, errors } = await validateCountry(req);

  if (hasError || !req.file) {
    res.status(400).json({ success: false, errors });
    return;
  }

  const filepath = saveImageToDisk(req.file, req.body.name);

  const { name, continent, rank } = req.body;

  const country: Country = {
    name,
    rank: parseInt(rank, 10),
    flag: filepath,
    continent,
    id: generateId(),
  };

  CountryRepository.writeCountry(country);

  res.status(201).json({ success: true, data: country });
};

export const getUniqueContinents = (_req: Request, res: Response): void => {
  const continents = CountryRepository.getUniqueContinents();
  res.json(continents);
};
