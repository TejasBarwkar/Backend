import { Country } from "../models/countryModel";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(__dirname, "../../data/countries.json");

const getCountries = (): Country[] => {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }

  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data) as Country[];
};

const writeCountry = (country: Country): void => {
  const countries = getCountries();
  countries.push(country);

  fs.writeFileSync(dataFilePath, JSON.stringify(countries, null, 4));
};

const getUniqueContinents = (): string[] => {
  const countries = getCountries();
  const continents = countries.map((country) => country.continent);

  return Array.from(new Set(continents));
};

export const CountryRepository = {
  getCountries,
  writeCountry,
  getUniqueContinents,
};
