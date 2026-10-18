export function renderDivisionPage(page, route, sections) {
  return [
    sections.renderPageSwitcher(route),
    sections.hero(page),
    sections.about(page),
    sections.services(page),
    page.designStyles ? sections.styles(page) : "",
    sections.projects(page.theme === "interior" ? "interior" : "construction"),
    sections.materials(page),
    sections.budget(page),
    sections.process(page),
    sections.payments(page),
    sections.consult(page, page.theme === "interior" ? "interior" : "construction")
  ].join("");
}
