import express, { json } from "express";
import mysql from "mysql2/promise";
import 'dotenv/config';
import { addMovie, addMovieWatchlist, getMovies, rentMovie, updateMovie } from "./functions/movie.js";
import cors from 'cors';
import { addEmployee, getEmployees } from "./functions/employee.js";
import { addAccount, getAccountData, getPurchaseHistory, verifyAccount } from "./functions/account.js";

const dbPassword = `${process.env.DB_PASSWORD}`;

const app = express();

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: dbPassword,
  database: "test",
  port: "1337",
});

app.use(express.json());
app.use(cors());

// API request to test if server is up.
app.get("/", (req, res) => {
  res.json("Backend setup and connected.");
});


/**
 * Movie API routes
 */
// Get all movies
app.get("/movie", async (req, res) => {
  return getMovies(db, req, res);
});

// Add movie
app.post("/movie", (req, res) => {
    return addMovie(db, req, res);
});

// Update movie by id
app.put("/movie/:id", (req, res) => {
  return updateMovie(db, req, res);
});

//Add movie to watchlisr
app.post("/movie", (req, res) => {
  return addMovieWatchlist(db, req, res);
});

//rent movie
app.post("/movie", (req, res) => {
  return rentMovie(db, req, res);
});

//buy movie
app.post("/movie", (req, res) => {
  return buyMovie(db, req, res);
});

/**
 * Employee API routes
 */
// Get all employees
app.get("/employee", async (req, res) => {
  return getEmployees(db, req, res);
});

// Add employee
app.post("/employee", async (req, res) => {
  return addEmployee(db, req, res);
});

/**
 * Account API routes
 */
app.post("/account", async (req, res) => {
  return addAccount(db, req, res);
});

app.get("/verify-account", async (req, res) => {
  return verifyAccount(db, req, res);
});

app.get("/account", async (req, res) => {
  return getAccountData(db, req, res);
});

app.get("/purchase_history", async (req, res) => {
  return getPurchaseHistory(db, req, res);
});

// TODO: Update employee
// app.put("/employee/:id", (req, res) => {
//   return updateEmployee(db, req, res);
// });

app.listen(8800, () => {
  console.log("Connected to backend.");
});
