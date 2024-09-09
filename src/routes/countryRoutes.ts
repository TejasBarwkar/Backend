import { Router } from "express";
import {
  getCountries,
  getCountryById,
  addCountry,
  getUniqueContinents,
} from "../controllers/countryController";
import upload from "../middlewares/upload";

const router = Router();

router.get("/countries", getCountries);
router.get("/country/:id", getCountryById);
router.post("/country", upload.single("flag"), addCountry);
router.get("/continents", getUniqueContinents);

export default router;
