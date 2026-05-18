## EVENT HUB APP

This is a full-stack event registration application built with Next.js, Prisma, and PostgreSQL. It allows users to browse events, register for them, and manage their registrations.

### Features

- User authentication (sign up, log in, log out)
- Browse a list of upcoming events
- View event details
- Register for events
- View and manage user registrations

### Technologies Used

- Next.js: A React framework for building server-side rendered applications.
- Prisma: An ORM (Object-Relational Mapping) tool for database management.
- PostgreSQL: A powerful, open-source relational database.
- Tailwind CSS: A utility-first CSS framework for styling.
- bcrypt: A library for hashing passwords securely.
- jsonwebtoken: A library for generating and verifying JSON Web Tokens (JWT) for authentication.
- NextAuth.js: A library for handling authentication in Next.js applications.

### Getting Started

1. Clone the repository:
   ```bash
   git clone
   ```
2. Navigate to the project directory:
   ```bash
   cd event-registration-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the database:
   - Ensure you have PostgreSQL installed and running.
   - Create a new database named `events_db`.
   - Update the `DATABASE_URL` in the `prisma/.env` file with your database credentials:
     ```env
     DATABASE_URL=postgresql://<username>:<password>@localhost:5112/events_db
     ```
5. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
7. Open your browser and navigate to `http://localhost:3000` to see the application in action.
8. You can sign up for a new account, browse events, and register for them!
9. To run tests, use:
   ```bash
   npm test
   ```

### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details
