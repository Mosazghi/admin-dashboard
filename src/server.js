const express = require("express");
require("dotenv").config();
const fetch = require("node-fetch");
const path = require("path");
const PORT = 4000;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`HTTP Method - ${req.method}, URL - ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, "public")));

// NEWS API ---------------------------------------------------
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

app.get("/news", (req, res) => {
  newsapi.v2
    .topHeadlines({
      language: "en",
      country: "us",
      pageSize: 4,
    })
    .then((response) => {
      res.send(response);
    });
});

// GITHUB API ---------------------------------------------------
const GITHUB_API_URL = "https://api.github.com/users/Mosazghi/repos";

app.get("/repos", async (req, res) => {
  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        Authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    const data = await response.json();
    const repositories = data.map((repo) => {
      return {
        name: repo.name,
        desc: repo.description,
        src: repo.html_url,
        live: repo.homepage,
      };
    });
    res.json(repositories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching repositories" });
  }
});

// APP ---------------------------------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});

module.exports = app;
