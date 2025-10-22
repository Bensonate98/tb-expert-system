# Mindwave Project Setup Guide

Welcome to the **Node.js + TypeScript + Prisma + PostgreSQL** backend!  
This guide will help you quickly set up the project on your local machine and start contributing.

---

## Tech Stack
- **Node.js** (v18+ recommended)  
- **TypeScript**  
- **Prisma ORM**  
- **PostgreSQL**  
- **tsyringe** (for dependency injection)  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Mindwave-Connect/mindwave-backend.git
cd mindwave-backend
```

---

### 2. Install Dependencies
Make sure you have **Node.js** and **npm** (or **yarn/pnpm**) installed.

```bash
npm install
# or
yarn install
```

---

### 3. Set Up Environment Variables
Copy the example environment file and fill in your values.

```bash
cp .env.example .env
```

Update your `.env` file with your local database credentials:
```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dbname>"
```

---

### 4. Set Up PostgreSQL

Make sure PostgreSQL is running locally and create a new database for the project.

```bash
createdb <dbname>
```


### 5. Run Prisma Migrations
Apply the database schema to your PostgreSQL instance.

```bash
npm run migrate:dev
```

### 6. Run the application

#### For Development
```bash
npm run dev
```
This runs the app using `ts-node-dev` with hot reloading.

### 7. Verify Everything Works
Once the server starts, open your browser or use Postman to visit:
```
http://localhost:8080/api/v1/
```
You should get a JSON response like: "Welcome to mindwave connect"

