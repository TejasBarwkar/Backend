# VueJS

### **Project Setup**

### 1. Backend

To set up this project locally on your machine, please follow these steps:

1. Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/TejasBarwkar/Backend.git
```

2. Navigate to the project directory:

```bash
cd Backend
```

3. Install project dependencies - Ensure that Node.js (^20.17.0) is installed on your system:

```bash
npm install
```

4. Start the development server using nodemon:

```bash
npm i -g nodemon
npx nodemon
```

---

### 2. Frontend

1. Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/TejasBarwkar/Frontend.git
```

2. Navigate to the project directory:

```bash
cd Frontend
```

3. Install project dependencies

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

By default, the server will run on `PORT = 5173`

---

### **Project Description**

**Part 1: Backend**

**Folders & Files**

1. routes
   1. `countryRoutes` - Defines routes for country-related endpoints
2. validations - Contains validation rules for country-related API endpoints
3. models
   1. `countryModel` - Defines the schema for the country entity
4. controllers - Contains the logic to handle incoming requests
5. middlewares
   1. `upload` - File upload middleware using multer library.
6. services
   1. `fileUploadService` - Handles file uploads by storing them to disk. This service can be extended to resize images into multiple dimensions for different devices.
7. helpers - Utility and helper functions
8. repositories
   1. `countryRepository` - Contains the data access layer and is responsible for interacting with the country data file. Only this layer will need to be modified if we choose to switch from a data file to a database.

---

### Multer upload middleware:

Middleware for handling file uploads, storing the uploaded file in memory. The file is later saved to disk by `fileUploadService` if it passes the validation checks in the controller. This approach avoids storing the file on disk prematurely and having to call another method to delete the file if validation fails.

Currently, the max file size and file types are defined as constants, but we can extend this middleware to be more generic by allowing route-specific file size limits and accepted file types.

---

### **API Endpoints**

```bash
Prefix: /api/{version}
```

1. Get all countries

```bash
GET /api/v1/countries
```

2. Get a country by ID

```bash
GET /api/v1/country/:id
```

3. Add a new country

```bash
POST /api/v1/country
```

4. Get all unique continents

```bash
GET api/v1/continents
```

---

### Get All Continents API:

Fetches a list of all continents. If the "Add Country" form is displayed within the same component as the dropdown, this extra API call can be avoided by including continent information in the same GET countries API response.

However, if there is a separate route for adding countries (e.g., `/country/add`) and the list of countries is extensive, it is more efficient to have a dedicated API call to retrieve the continents list.

---

### **Project Description**

**Part 1: Frontend**

**Folders & Files**

1. router - Contains the Vue Router configuration for the application
2. constants - App constants
3. types - Typescript interfaces / models
4. stores - Holds the Pinia store definitions for state management
   1. countries - Manages country-related state and actions
5. components
   1. `Shared` folder - Reusable components that are used across multiple parts of the application. This folder includes common elements like button, form elements, loader that are designed to be consistent and maintainable throughout the project
6. views - Contains Vue components that represent different pages or views in the application
7. services
   1. `api.ts` - Configures and exports an Axios instance with a base URL defined by the `API_BASE_URL` constant. This setup standardizes HTTP requests across the application, centralizing API endpoint management and ensuring that all requests use a consistent base URL.

---

### State Management

**Normalized state for countries:**

In Pinia store setup, countries are stored in a normalized state with the structure `{ countryId: CountryObject }`. Before fetching a country by ID from the API, the application first checks if the country ID is already present in the state. If the country is not already loaded, an API call is made to retrieve the data, which is then stored in the state. This normalization improves data retrieval performance and ensures that each country is loaded only once, reducing redundant API calls.

---
