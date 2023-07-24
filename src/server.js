const express = require("express");
const { Octokit } = require("@octokit/rest");
require("dotenv").config();
const path = require("path");
const PORT = 4000;
const app = express();

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
const octokit = new Octokit({ auth: process.env.GITHUB_API_KEY });

app.get("/repos", async (req, res) => {
  try {
    const response = await octokit.repos.listForAuthenticatedUser();
    const repositories = response.data.map((repo) => {
      return {
        name: repo.name,
        desc: repo.description,
        src: repo.html_url,
        live: repo.homepage,
      };
    });

    res.send(repositories);
  } catch (error) {
    console.error("Error retrieving repositories:", error);
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
