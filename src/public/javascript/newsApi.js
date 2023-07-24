/**
 * @class NewsApi
 * @description Fetches news from the News API and displays them on the dashboard
 * @property {string} loader - HTML markup for the loading spinner
 * @property {HTMLElement} news - The news section of the dashboard
 * @method getNews - Fetches the news from the News API
 * @method build - Displays the news on the dashboard
 */
class NewsApi {
  loader = `<div class="loading-spinner"></div>`;
  news = document.querySelector("#news");

  constructor() {
    this.build();
  }

  async getNews() {
    this.news.innerHTML += this.loader;

    const response = await fetch("/news");
    const data = await response.json();
    return data.articles.map((article) => {
      return {
        title: article.title,
        desc: article.description,
        url: article.url,
        urlImg: article.urlToImage,
      };
    });
  }

  async build() {
    const news = await this.getNews();
    const newsSection = document.querySelector("#news-wrapper");

    news.forEach((article) => {
      const div = document.createElement("article");
      div.classList.add("card");
      div.innerHTML = `
        <div class="card-img-wrapper">
        <img src=${article.urlImg} class="card-img-top"  alt="..." />
        </div>
        <div class="card-body pb-2">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">
            ${article.desc}
          </p>
          <a href="${article.url}" class="link" target="_blank">Read More</a>
        </div>
      `;
      newsSection.appendChild(div);
    });
    this.news.removeChild(this.news.lastChild);
  }
}

export default NewsApi;
