export function renderProjectsPage(data, escape, projects) {
  return `<section class="page-intro"><span class="eyebrow">A selection of our work</span><h1>Spaces with <em>purpose.</em></h1><p>${escape(data.pages.construction.projectsIntro)}</p></section>${projects(null, true)}`;
}
