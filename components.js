export function sectionHeading(eyebrow, title, description = "") {
  return `<div class="section-heading"><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${description ? `<p>${description}</p>` : ""}</div>`;
}

export function renderPageSwitcher(route) {
  return `<div class="division-switcher" aria-label="Explore our divisions"><a class="${route === "/construction-planning" ? "active" : ""}" href="#/construction-planning">Architecture & build</a><a class="${route === "/space-interior-design" ? "active" : ""}" href="#/space-interior-design">Interior design</a></div>`;
}

export function renderChrome(data, route, escape) {
  const primary = [
    { label: "Home", route: "/" },
    { label: "Architecture", route: "/construction-planning" },
    { label: "Interiors", route: "/space-interior-design" },
    { label: "Projects", route: "/projects" },
    { label: "Contact", route: "/contact" }
  ];
  const link = (item) => `<a href="#${item.route}" class="${item.route === route ? "active" : ""}">${item.label}</a>`;
  document.querySelector("#header").innerHTML = `<div class="header-inner"><a class="brand" href="#/" aria-label="${escape(data.site.name)} home"><span class="brand-mark">G</span><span class="brand-copy"><strong>GOWARDHAN</strong><small>KS BUILDCON</small></span></a><button id="menuBtn" class="menu-button" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button><nav id="nav" aria-label="Main navigation">${primary.map(link).join("")}<a class="nav-cta" href="#/space-interior-design#consult">Start a project <span aria-hidden="true">↗</span></a></nav></div>`;
  document.querySelector("#menuBtn").onclick = (event) => {
    const open = document.querySelector("#nav").classList.toggle("open");
    event.currentTarget.setAttribute("aria-expanded", String(open));
    event.currentTarget.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  const contact = data.contact;
  document.querySelector("#footer").innerHTML = `<div class="footer-inner"><div><a class="brand footer-brand" href="#/"><span class="brand-mark">G</span><span class="brand-copy"><strong>GOWARDHAN</strong><small>KS BUILDCON</small></span></a><p>Spaces made to feel like yours.</p></div><div class="footer-contact"><span class="eyebrow">Let’s make something meaningful</span><a href="#/contact">${escape(contact.email)}</a><span>${escape(contact.phone)}</span></div><div class="footer-bottom"><span>${escape(data.footer.note)}</span><span>Architecture · Interiors · Build <a class="footer-admin-link" href="#/admin">Admin</a></span></div></div>`;
}
