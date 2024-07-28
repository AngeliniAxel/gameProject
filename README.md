### Login/Register Template
This is a simple login/registration app using the PERN stack to practice typescript. The frontend is built with React and Redux, and the backend uses Node.js, Express and PostgreSQL.

## Frontend Routes

- `/login`: Login page
- `/register`: Registration page
- `/dashboard`: For now it is just a welcome message taking the user's name from the Redux state.

## Backend Routes

### Auth Routes

- `POST /register`
  - Registers a new user
  - Request body: `{ name, lastName, email, password }`

- `POST /login`
  - Logs in an existing user
  - Request body: `{ email, password }`
 
 - `GET /is-verify`
  - Returns true if the authorization middleware is ok

### Middlewares

- Authorization
  - Verifies if the token is valid

- Authorization
  - Verifies if the email is valid
