import Joi, { CustomHelpers } from "joi";
import { Country } from "../models/countryModel";
import { CountryRepository } from "../repositories/countryRepository";
import { Request } from "express";

export const validateCountry = async (
  req: Request
): Promise<{
  hasError: boolean;
  errors: Record<string, string>;
}> => {
  const data: Country = req.body;
  const countries = CountryRepository.getCountries();

  const existingCountryNameValidation = (
    value: string,
    helpers: CustomHelpers
  ) => {
    const existingName = countries.find(
      (country) => country.name.toLowerCase() === value.toLowerCase()
    );

    if (existingName) {
      return helpers.message({ custom: "Country name must be unique" });
    }

    return value;
  };

  const existingCountryRankValidation = (
    value: number,
    helpers: CustomHelpers
  ) => {
    const existingRank = countries.find((country) => country.rank === value);

    if (existingRank) {
      return helpers.message({ custom: "Country rank must be unique" });
    }

    return value;
  };

  const countrySchema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(20)
      .required()
      .custom(
        existingCountryNameValidation,
        "Distinct country name validation"
      ),
    continent: Joi.string().required(),
    flag: Joi.string().optional(),
    rank: Joi.number()
      .integer()
      .min(1)
      .required()
      .custom(existingCountryRankValidation, "Distinct rank validation"),
  });

  const errors: Record<string, string> = {};
  let hasError: boolean = false;

  const { error } = countrySchema.validate(data, { abortEarly: false });

  if (error) {
    hasError = true;

    error.details.forEach((detail) => {
      const key = detail.path[0];
      errors[key] = detail.message;
    });
  }

  if (!req.file) {
    hasError = true;
    errors["flag"] = '"flag" is not allowed to be empty';
  }

  return { hasError, errors };
};
