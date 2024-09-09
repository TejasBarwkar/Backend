import express from "express";
import path from "path";
import countryRoutes from "./routes/countryRoutes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../images")));

// Routes
app.use("/api/v1", countryRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
