require("dotenv").config();
const express = require("express");
const app = express();
const port = 8888;
var querystring = require("querystring");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

console.log(process.env.CLIENT_ID);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";
const scope = "user-read-email user-read-private";

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        state: state,
        scope: scope,
        redirect_uri: REDIRECT_URI,
      })
  );
});

app.get('/callback', (req, res) => {
    res.send('callback');  
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
