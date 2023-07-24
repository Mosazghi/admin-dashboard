const navItems = [
  { name: "Home", icon: "bi-house-door-fill" },
  { name: "Profile", icon: "bi-person-square" },
  { name: "Messages", icon: "bi-chat-right-fill" },
  { name: "History", icon: "bi-clock-fill" },
  { name: "Tasks", icon: "bi-list-task" },
  { name: "Communities", icon: "bi-people-fill" },
  { name: "Settings", icon: "bi-gear-fill" },
  { name: "Support", icon: "bi-question-circle-fill" },
  { name: "Privacy", icon: "bi-shield-fill-check" },
];

const onlyBottom = {
  Settings: true,
  Support: true,
  Privacy: true,
};

/**
 *
 * @class Nav
 * @classdesc Initializes the navigation bar (aside)
 */
class Nav {
  constructor() {
    this.build();
  }

  build() {
    const navTop = document.getElementById("nav-top");
    const navBottom = document.getElementById("nav-bottom");

    navItems.forEach((item) => {
      if (!(item.name in onlyBottom)) {
        navTop.innerHTML += this.template(item);
      } else {
        navBottom.innerHTML += this.template(item);
      }
    });
  }

  template(item) {
    return `
    <li class="nav-item">
      <a class="nav-link" href="#">
        <i class="bi ${item.icon} me-0 me-lg-3"></i>
        <span>${item.name}</span>
      </a>
    </li>
    `;
  }
}

export default Nav;
