

# LinkedIn Profiler API

This API provides routes for creating and editing LinkedIn Profiles. It gives you an url where you can view the Linked In profile.


## Setup Locally

1. Git clone the repository
2. Run `npm install` to install the dependencies
3. Create a `.env` file and copy over the Environment variables from `.env.sample`
4. Make sure you have PostgreSQL installed and running on your machine.
5. Update the `DATABASE_URL` in the `.env` file by updating [USERNAME] and [PASSWORD] with your PostgreSQL username and password.
6. Run `npm run dev` to start the development server
7. The server should be running on `http://localhost:3000`
8. You can now make requests to the server using the following API descriptions.

## API Endpoints

### Note: Find the Postman Documentation for the API [here](https://documenter.getpostman.com/view/22025803/2sA2xk2CWZ).

### Create a LinkedIn Profile

```http
  /api/profile
```

### GET Request
- **Description:** Retrieves the profile of a user based on the provided user ID.
- **Parameters:**
  - `userId` (query parameter): The ID of the user whose profile is to be retrieved.
- **Success Response (200):**
  - **Content:** JSON object containing the user profile details including first name, last name, headline, location (city, state, country), about, experiences, educations, and skills.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.

### POST Request
- **Description:** Creates a new user profile with the provided details.
- **Request Body:**
  - JSON object containing:
    - `firstName` (string): The first name of the user.
    - `lastName` (string): The last name of the user.
    - `headline` (string): The headline of the user's profile.
    - `city` (string): The city of the user's location.
    - `state` (string): The state of the user's location.
    - `country` (string): The country of the user's location.
- **Success Response (200):**
  - **Content:** JSON object containing the newly created user's details.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.

### PUT Request
- **Description:** Updates an existing user profile with the provided details.
- **Request Body:**
  - JSON object containing:
    - `id` (integer): The ID of the user whose profile is to be updated.
    - `firstName` (string, optional): The updated first name of the user.
    - `lastName` (string, optional): The updated last name of the user.
    - `headline` (string, optional): The updated headline of the user's profile.
- **Success Response (200):**
  - **Content:** JSON object containing the updated user's details.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.

### DELETE Request
- **Description:** Deletes the user profile associated with the provided user ID.
- **Request Body:**
  - JSON object containing:
    - `id` (integer): The ID of the user whose profile is to be deleted.
- **Success Response (200):**
  - **Content:** JSON object containing the details of the deleted user.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.


### Create and Update Experience

```http
  /api/profile/experience
```

## GET /experiences

- **Description:** Retrieve a list of experiences.
- **Parameters:** 
    - `userId` (optional): Filter experiences by user ID.
- **Response**
    - `200 OK`: Successful response containing a JSON object with an array of experiences.
    - `400 Bad Request`: Error response if there's a problem with the request parameters.
    - `500 Internal Server Error`: Error response if there's a server-side issue.


## POST /experiences

- **Description:** Create a new experience.
- **Request Body:**
    - `title` (string, required): Title of the experience.
    - `employmentType` (string, required): Type of employment (e.g., full-time, part-time, internship).
    - `companyName` (string, required): Name of the company.
    - `location` (string, required): Location of the experience.
    - `locationType` (string, required): Type of location (e.g., city, remote).
    - `startMonth` (string, required): Start month of the experience.
    - `startYear` (number, required): Start year of the experience.
    - `endMonth` (string, optional): End month of the experience.
    - `endYear` (number, optional): End year of the experience.
    - `description` (string, optional): Description of the experience.
    - `userId` (number, required): ID of the user associated with the experience.
- **Response**
    - `201 Created`: Successful response containing a JSON object with the newly created experience.
    - `400 Bad Request`: Error response if there's a problem with the request body.
    - `500 Internal Server Error`: Error response if there's a server-side issue.

### PUT /experiences

- **Description:** Update an existing experience.
- **Request Body:**
    - `id` (number, required): ID of the experience to update.
    - Any of the following fields (optional):
    - `title`
    - `employmentType`
    - `companyName`
    - `location`
    - `locationType`
    - `startMonth`
    - `startYear`
    - `endMonth`
    - `endYear`
    - `description`
- **Response:**
    - `200 OK`: Successful response containing a JSON object with the updated experience.
    - `400 Bad Request`: Error response if there's a problem with the request body or if the experience does not exist.
    - `500 Internal Server Error`: Error response if there's a server-side issue.

## DELETE /experiences

- **Description:** Delete an existing experience.
- **Request Body:**
    - `id` (number, required): ID of the experience to delete.
- **Response:**
- `200 OK`: Successful response containing a JSON object with the deleted experience.
- `400 Bad Request`: Error response if there's a problem with the request body.
- `500 Internal Server Error`: Error response if there's a server-side issue.

--- 

### Create and Update Education

```http
  /api/profile/education
```
### GET Request
- **Description:** Retrieves education details either for a specific user or all educations if no user ID is provided.
- **Parameters:**
  - `userId` (query parameter, optional): The ID of the user whose education details are to be retrieved.
- **Success Response (200):**
  - **Content:** JSON object containing the education details.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.

### POST Request
- **Description:** Creates a new education entry for a user.
- **Request Body:**
  - JSON object containing:
    - `school` (string): The name of the school.
    - `degree` (string): The degree obtained.
    - `fieldOfStudy` (string): The field of study.
    - `startMonth` (string): The starting month of education.
    - `startYear` (string): The starting year of education.
    - `endMonth` (string, optional): The ending month of education (default: 'Present').
    - `endYear` (string, optional): The ending year of education.
    - `description` (string, optional): Description of education.
    - `grade` (string, optional): Grade obtained.
    - `userId` (integer): The ID of the user to whom this education entry belongs.
- **Success Response (200):**
  - **Content:** JSON object containing the newly created education details.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.

### PUT Request
- **Description:** Updates an existing education entry.
- **Request Body:**
  - JSON object containing:
    - `id` (integer): The ID of the education entry to be updated.
    - `school` (string, optional): The updated name of the school.
    - `degree` (string, optional): The updated degree obtained.
    - `fieldOfStudy` (string, optional): The updated field of study.
    - `startMonth` (string, optional): The updated starting month of education.
    - `startYear` (string, optional): The updated starting year of education.
    - `endMonth` (string, optional): The updated ending month of education.
    - `endYear` (string, optional): The updated ending year of education.
    - `description` (string, optional): Updated description of education.
    - `grade` (string, optional): Updated grade obtained.
- **Success Response (200):**
  - **Content:** JSON object containing the updated education details.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.

### DELETE Request
- **Description:** Deletes an education entry.
- **Request Body:**
  - JSON object containing:
    - `id` (integer): The ID of the education entry to be deleted.
- **Success Response (200):**
  - **Content:** JSON object containing the details of the deleted education entry.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.

---

### Create and Update About Section

```http
  /api/profile/about
```
### POST Request
- **Description:** Creates a new about section for a user profile.
- **Request Body:**
  - JSON object containing:
    - `about` (string): The about section content.
    - `userId` (integer): The ID of the user to whom this about section belongs.
- **Success Response (200):**
  - **Content:** JSON object containing the newly created about section details.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.

### PUT Request
- **Description:** Updates the about section for a user profile.
- **Request Body:**
  - JSON object containing:
    - `id` (integer): The ID of the about section to be updated.
    - `about` (string): The updated about section content.
- **Success Response (200):**
  - **Content:** JSON object containing the updated about section details.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.

### DELETE Request
- **Description:** Deletes the about section associated with the provided ID.
- **Request Body:**
  - JSON object containing:
    - `id` (integer): The ID of the about section to be deleted.
- **Success Response (200):**
  - **Content:** JSON object containing the details of the deleted about section.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.


---

### Create and Update Skills

```http
  /api/profile/skills
```

### GET Request
- **Description:** Retrieves skills associated with a specific user.
- **Parameters:**
  - `userId` (query parameter): The ID of the user whose skills are to be retrieved.
- **Success Response (200):**
  - **Content:** JSON object containing the user's skills.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.

### POST Request
- **Description:** Adds a new skill to a user's profile.
- **Request Body:**
  - JSON object containing:
    - `name` (string): The name of the skill.
    - `userId` (integer): The ID of the user to whom this skill belongs.
- **Success Response (200):**
  - **Content:** JSON object containing the newly created skill details.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.

### PUT Request
- **Description:** Updates an existing skill.
- **Request Body:**
  - JSON object containing:
    - `id` (integer): The ID of the skill to be updated.
    - `name` (string): The updated name of the skill.
- **Success Response (200):**
  - **Content:** JSON object containing the updated skill details.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.

### DELETE Request
- **Description:** Deletes a skill.
- **Request Body:**
  - JSON object containing:
    - `id` (integer): The ID of the skill to be deleted.
- **Success Response (200):**
  - **Content:** JSON object containing the details of the deleted skill.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.


---

### Get Profile URL

```http
  /api/profile/url
```

### GET Request
- **Description:** Retrieves the profile URL of a user based on the provided user ID.
- **Parameters:**
  - `userId` (query parameter): The ID of the user whose profile URL is to be retrieved.
- **Success Response (200):**
  - **Content:** JSON object containing the profile URL of the user.
- **Error Response (400):**
  - **Content:** JSON object with an error message indicating a bad request.
