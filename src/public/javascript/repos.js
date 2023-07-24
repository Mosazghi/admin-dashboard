/**
 * @class Repos
 * @classdesc Fetches and displays my GitHub repositories
 * @property {string} loader - HTML markup for the loading spinner
 * @property {HTMLElement} projects - The projects section of the dashboard
 * @method build - Fetches the repositories and displays them on the dashboard
 */
class Repos {
  constructor() {
    this.build();
  }

  loader = `<div class="loading-spinner"></div>`;
  projects = document.querySelector("#projects");

  async build() {
    this.projects.innerHTML += this.loader;

    const response = await fetch("/repos");
    const repositories = await response.json();

    const projectGrid = document.querySelector("#project-grid");

    repositories.forEach((repo) => {
      const article = document.createElement("article");

      article.innerHTML = `
      <h5>${repo.name}</h5>
      <p>
      ${repo.desc}
      </p>
      <div class="text-end pt-4">
        <a href="${
          repo.live ? repo.live : repo.src
        }" class="link me-2 "target="_blank">  <i class="bi bi-eye me-2"></i></a>
        <a href="${
          repo.src
        }" class="link me-2 "target="_blank">  <i class="bi bi-github me-2"></i></a>
      </div>
      `;
      projectGrid.appendChild(article);
    });
    this.projects.removeChild(this.projects.lastChild);
  }
}

export default Repos;
