const db = require('../config/db');

const getAllUsers = (callback) => {
  const sql = "SELECT * FROM users";
  db.query(sql, callback);
};

const signupUser = (username, email, password, callback) => {
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  const values = [username, email, password];
  db.query(sql, values, callback);
};

const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const values = [email];
  db.query(sql, values, callback);
};

module.exports = { getAllUsers, signupUser, findUserByEmail };