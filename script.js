import websiteData from "./websiteData.js";
import * as ui from "./components.js";
import { renderHomePage } from "./pages/home.js";
import { renderProjectsPage } from "./pages/projects.js";
import { renderContactPage } from "./pages/contact.js";
import { renderConstructionPage } from "./pages/construction.js";
import { renderInteriorPage } from "./pages/interior.js";
import { renderAdminPage, mountAdminPage } from "./pages/admin.js";

const $ = s => document.querySelector(s);
const DATA_STORAGE_KEY = "gowardhan.websiteData.override.v1";
let D = websiteData;
try {
 const savedData = localStorage.getItem(DATA_STORAGE_KEY);
 if (savedData) D = JSON.parse(savedData);
} catch (error) {
 console.error("Unable to load locally saved website content.", error);
}
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const inr = n => new Intl.NumberFormat(D.site.locale,{style:"currency",currency:D.site.currency,maximumFractionDigits:0}).format(n);
const PAGES = {"/construction-planning":D.pages.construction,"/space-interior-design":D.pages.interiorDesign};
const img = (src,alt,cls="") => src ? `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.outerHTML='<div class=ph>${esc(alt)}</div>'">` : `<div class="ph">${esc(alt||"Add image URL in websiteData.js")}</div>`;
const price = m => m.priceMin==null ? "Price on request" : `${inr(m.priceMin)}${m.priceMax?"–"+inr(m.priceMax):""} / ${esc(m.unit)} <small>(indicative${m.updated?", updated "+esc(m.updated):""})</small>`;

/* ---- utilities ---- */
function duration(a,b){ const s=Date.parse(a), e=Date.parse(b); if(!s||!e||e<s) return null; const d=Math.round((e-s)/864e5); return d>=60?`${Math.round(d/30.4)} months`:`${d} days`; }
function pctTotal(list){ return list.reduce((t,m)=>t+(+m.percent||0),0); }
function calcBudget(bp,{area,quality,extras=[],floors=1}){
  const base=area*(bp.qualityRates[quality]||0)*(bp.floorFactor?1+bp.floorFactor*(floors-1):1);
  const add=extras.reduce((t,x)=>t+x,0), sub=base+add, cont=sub*(bp.contingencyPct||0)/100;
  return {rows:bp.breakdown.map(([l,p])=>[l,base*p/100]), add, cont, total:sub+cont};
}

/* ---- sections ---- */
function hero(p){ const h=p.hero; return `<section class="hero ${p.theme==="interior"?"hero-interior":"hero-construction"}" style="${h.image?`--hero-image:url('${esc(h.image)}')`:""}"><div class="hero-shade"></div><div class="in"><span class="eyebrow">${esc(p.brandLabel)}</span><h1>${esc(h.headline)}</h1><p>${esc(h.text)}</p>
 ${[h.cta1,h.cta2,h.cta3].filter(Boolean).map((c,i)=>`<a class="btn ${i?"ghost":""}" href="${c.href.startsWith("#/")?esc(c.href):"#"+curRoute()}" data-jump="${esc(c.href)}">${esc(c.label)}</a>`).join("")}</div></section>`; }
function about(p){ const a=p.about; if(!a.show) return ""; return `<section id="about" class="about-section"><div class="about-copy">${ui.sectionHeading("The studio",esc(a.title))}<div class="about-paragraphs">${a.paragraphs.map(t=>`<p>${esc(t)}</p>`).join("")}${a.tagline?`<p class="about-tagline"><b>${esc(a.tagline)}</b></p>`:""}</div></div>${a.image?img(a.image,a.title,"about-image"):`<div class="about-image about-image-placeholder" role="img" aria-label="Quietly refined interior"></div>`}
 ${a.points.length?`<div class="grid">${a.points.map(([t,x])=>`<div class="panel"><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join("")}</div>`:""}</section>`; }
function services(p){ return `<section id="services" class="services-section">${ui.sectionHeading("What we do","Our services","Thoughtful detail, from the first sketch to the final finishing touch.")}<div class="grid">${p.services.map(s=>`<article class="card service-card">${img(s.image,s.title)}<div class="body"><span class="service-index">${s.icon||""}</span><h3>${esc(s.title)}</h3>${s.sub?`<small>${esc(s.sub)}</small>`:""}<p>${esc(s.text)}</p></div><div class="body"><a class="text-link" href="#consult" data-svc="${esc(s.title)}" data-jump="#consult">Enquire about this service <span aria-hidden="true">↗</span></a></div></article>`).join("")}</div></section>`; }
function projectCard(pr){ const d=duration(pr.start,pr.actualEnd||pr.expectedEnd);
 return `<article class="card">${img(pr.cover,pr.alt||pr.name)}<div class="body"><span class="tag">${esc(pr.status)}</span><span class="tag">${esc(pr.category)}</span>${pr.demo?'<span class="tag">Demo</span>':""}<h3>${esc(pr.name)}</h3><small>${esc(pr.location)}${d?" · "+d:""}</small>
 ${pr.progress!=null&&pr.status==="ongoing"?`<div class="bar" role="progressbar" aria-valuenow="${pr.progress}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pr.progress}%"></i></div><small>${pr.progress}% (as entered by owner)</small>`:""}</div>
 <div class="body"><button class="btn" data-proj="${esc(pr.id)}">View details</button></div></article>`; }
function projects(division,showAll){ const list=D.projects.filter(p=>p.show!==false&&(showAll||p.division===division));
 const cats=["all","ongoing","upcoming","completed"];
 return `<section id="projects" class="projects-section">${ui.sectionHeading("Selected work",showAll?"Projects":"Spaces we’ve shaped","A glimpse into the places, details and possibilities we bring to life.")}<div class="filters" role="group" aria-label="Filter projects">${cats.map(c=>`<button data-f="${c}" class="${c==="all"?"on":""}">${c[0].toUpperCase()+c.slice(1)} (${c==="all"?list.length:list.filter(p=>p.status===c).length})</button>`).join("")}${showAll?`<select id="divF" aria-label="Division"><option value="">Both divisions</option><option value="construction">Construction</option><option value="interior">Interior</option></select>`:""}</div>
 <div class="grid" id="projGrid"></div></section>`; }
function bindProjects(division,showAll){ let f="all",dv="";
 const draw=()=>{ const l=D.projects.filter(p=>p.show!==false&&(showAll||p.division===division)&&(f==="all"||p.status===f)&&(!dv||p.division===dv));
  $("#projGrid").innerHTML=l.length?l.map(projectCard).join(""):`<p class="muted">No ${f==="all"?"":f+" "}projects to show yet.</p>`; };
 document.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{f=b.dataset.f;document.querySelectorAll("[data-f]").forEach(x=>x.classList.toggle("on",x===b));draw();});
 const s=$("#divF"); if(s) s.onchange=()=>{dv=s.value;draw();}; draw(); }
function openProject(id){ const p=D.projects.find(x=>x.id===id), m=$("#modal"); const dur=duration(p.start,p.actualEnd), plan=duration(p.start,p.expectedEnd);
 const row=(k,v)=>v?`<tr><th>${k}</th><td>${esc(v)}</td></tr>`:"";
 m.innerHTML=`<div class="box" role="dialog" aria-modal="true" aria-label="${esc(p.name)}"><button class="btn ghost" id="x" style="float:right;color:#333">Close ✕</button><h2>${esc(p.name)}</h2>${img(p.cover,p.alt||p.name)}<p>${esc(p.description)}</p>
 <table>${row("Status",p.status)}${row("Type",p.type)}${row("Location",p.location)}${row("Style",p.style)}${row("Area",p.area)}${row("Start",p.start)}${row("Expected completion",p.expectedEnd)}${row("Actual completion",p.actualEnd)}${row("Planned duration",plan)}${row("Actual duration",dur)}${row("Budget",p.budget)}${row("Materials",(p.materials||[]).join(", "))}${row("Services",(p.services||[]).join(", "))}</table>
 ${(p.highlights||[]).length?`<ul>${p.highlights.map(h=>`<li>${esc(h)}</li>`).join("")}</ul>`:""}
 <div class="gal">${(p.gallery||[]).map(g=>img(g,p.name)).join("")}</div></div>`; m.hidden=false; $("#x").focus();
 m.onclick=e=>{if(e.target===m||e.target.id==="x")m.hidden=true;}; }
function materials(p){ return `<section id="materials">${ui.sectionHeading("Material library","Materials & finishes","Materials selected for their character, performance and enduring appeal.")}<div class="grid">${p.materials.map(m=>`<article class="card">${img(m.image,m.name)}<div class="body"><span class="tag">${esc(m.category)}</span><span class="tag">${esc(m.quality||"")}</span><h3>${esc(m.name)}</h3><p>${esc(m.desc)}</p><small>${price(m)}</small></div><div class="body"><label><input type="checkbox" class="cmp" value="${esc(m.id)}" style="width:auto"> Compare</label></div></article>`).join("")}</div><div id="cmpOut"></div></section>`; }
function bindMaterials(p){ const out=$("#cmpOut"); document.querySelectorAll(".cmp").forEach(c=>c.onchange=()=>{
 const sel=[...document.querySelectorAll(".cmp:checked")].map(x=>p.materials.find(m=>m.id===x.value));
 if(sel.length<2){out.innerHTML=sel.length?'<p class="muted">Select one more to compare.</p>':"";return;}
 const keys=[["Category","category"],["Specification","spec"],["Colour","color"],["Texture","texture"],["Finish","finish"],["Quality","quality"],["Uses","uses"],["Advantages","pros"],["Considerations","cons"],["Care","care"]].filter(([,k])=>sel.some(m=>m[k]));
 out.innerHTML=`<h3>Comparison</h3><div style="overflow:auto"><table><tr><th></th>${sel.map(m=>`<th>${esc(m.name)}</th>`).join("")}</tr>${keys.map(([l,k])=>`<tr><th>${l}</th>${sel.map(m=>`<td>${esc(m[k]||"—")}</td>`).join("")}</tr>`).join("")}<tr><th>Price</th>${sel.map(m=>`<td>${price(m)}</td>`).join("")}</tr></table></div>`; }); }
function styles(p){ if(!p.designStyles) return ""; return `<section id="styles" class="styles-section">${ui.sectionHeading("Find your point of view","A style, made yours.","Explore a few of the moods and materials we love to work with.")}<div class="grid style-grid">${p.designStyles.map(s=>`<article class="card style-card">${img(s.image,s.title)}<div class="body"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p><small>Palette: ${esc(s.palette)}</small></div></article>`).join("")}</div></section>`; }
function budget(p){ const b=p.budgetPlanner, interior=!!b.addons;
 return `<section id="budget"><h2>${esc(b.title)}</h2><form id="bf" class="fgrid" novalidate>
 <div><label for="bt">Project type</label><select id="bt">${b.projectTypes.map(t=>`<option>${esc(t)}</option>`).join("")}</select></div>
 <div><label for="ba">Area (sq ft)</label><input id="ba" type="number" min="1" required><div class="err" id="bae"></div></div>
 ${interior?"":`<div><label for="bfl">Floors</label><input id="bfl" type="number" min="1" value="1"></div>`}
 <div><label for="bq">Quality / finish level</label><select id="bq">${Object.keys(b.qualityRates).map(t=>`<option>${esc(t)}</option>`).join("")}</select></div>
 ${interior?b.addons.map((a,i)=>`<label style="font-weight:400"><input type="checkbox" class="ad" value="${a.amount}" style="width:auto"> ${esc(a.label)}</label>`).join(""):""}
 <div style="grid-column:1/-1"><button class="btn" type="submit">${esc(b.cta)}</button></div></form><div id="bo" aria-live="polite"></div>
 <div class="note">${esc(b.disclaimer)}<br>Rates: ${esc(b.ratesSource)}${b.ratesUpdated?" · updated "+esc(b.ratesUpdated):""}. Excludes land, statutory fees and taxes unless stated in a quotation.</div></section>`; }
function bindBudget(p){ const b=p.budgetPlanner; $("#bf").onsubmit=e=>{e.preventDefault(); const area=+$("#ba").value;
 if(!(area>0)){$("#bae").textContent="Enter an area greater than 0.";return;} $("#bae").textContent="";
 const r=calcBudget(b,{area,quality:$("#bq").value,floors:+($("#bfl")?.value||1),extras:[...document.querySelectorAll(".ad:checked")].map(x=>+x.value)});
 $("#bo").innerHTML=`<table>${r.rows.map(([l,v])=>`<tr><td>${esc(l)}</td><td>${inr(v)}</td></tr>`).join("")}${r.add?`<tr><td>Selected add-ons</td><td>${inr(r.add)}</td></tr>`:""}<tr><td>Contingency (${b.contingencyPct}%)</td><td>${inr(r.cont)}</td></tr><tr><th>Indicative total</th><th>${inr(r.total)}</th></tr></table><a class="btn" href="#consult" data-jump="#consult">Request a detailed quotation</a>`; }; }
function process(p){ return `<section id="process"><h2>${p.designStyles?"Design Process":"Construction Process"}</h2><ol class="steps">${p.process.map(s=>`<li>${esc(s)}</li>`).join("")}</ol></section>`; }
function payments(p){ const t=pctTotal(p.paymentMilestones), ok=Math.abs(t-100)<.01;
 return `<section id="payments"><h2>Payment Information</h2><p>${esc(p.paymentIntro)}</p><div style="overflow:auto"><table><tr><th>#</th><th>Milestone</th><th>Share</th><th>Due</th><th>Status</th></tr>${[...p.paymentMilestones].sort((a,b)=>a.order-b.order).map(m=>`<tr><td>${m.order}</td><td><b>${esc(m.title)}</b><br>${esc(m.desc)}</td><td>${m.percent!=null?m.percent+"%":inr(m.amount||0)}</td><td>${esc(m.due)}</td><td>${esc(m.status||"—")}</td></tr>`).join("")}</table></div>
 <div class="${ok?"ok":"note"}">${ok?"Percentages total 100%.":`Warning: percentages total ${t}%, not 100%. Please correct in websiteData.js.`}</div></section>`; }
function consult(p,key){ const c=p.consultation;
 const opts=o=>o==="@services"?p.services.map(s=>s.title):o==="@styles"?p.designStyles.map(s=>s.title):o;
 const requiredFields=new Set(["name","phone","email","location"]);
 const renderField=f=>`<div class="${f.t==="textarea"?"form-field-wide":""}"><label for="f_${f.n}">${esc(f.n==="location"?"Address":f.n==="msg"?"Additional requirements":f.l)}${requiredFields.has(f.n)?" *":""}</label>${f.t==="select"?`<select id="f_${f.n}" name="${f.n}"><option value="">Select…</option>${opts(f.o).map(o=>`<option>${esc(o)}</option>`).join("")}</select>`:f.t==="textarea"?`<textarea id="f_${f.n}" name="${f.n}" rows="4"></textarea>`:`<input id="f_${f.n}" name="${f.n}" type="${f.t}" ${f.t==="number"?'min="0"':""} ${requiredFields.has(f.n)?"required":""}>`}<div class="err" id="e_${f.n}"></div></div>`;
 const primary=c.fields.filter(f=>requiredFields.has(f.n));
 const additional=c.fields.find(f=>f.n==="msg");
 const optional=c.fields.filter(f=>!requiredFields.has(f.n)&&f.n!=="msg");
 return `<section id="consult"><h2>${esc(c.title)}</h2><form id="cf" novalidate><div class="fgrid consultation-primary">${primary.map(renderField).join("")}</div>${additional?renderField(additional):""}${optional.length?`<details class="more-details"><summary>More details <span>Optional — add project information if you’d like</span></summary><div class="fgrid">${optional.map(renderField).join("")}</div></details>`:""}
 <p><button class="btn" type="button" id="sub">${esc(c.cta)}</button></p><div id="fm" aria-live="polite"></div>
 <div class="note">Your enquiry is saved only in this browser and can be viewed from Admin on this device.</div></form></section>`; }
function bindConsult(p,key){ const f=$("#cf"); f.onsubmit=e=>{e.preventDefault(); let bad=false;
 const requiredFields=new Set(["name","phone","email","location"]);
 p.consultation.fields.forEach(x=>{const v=f.elements[x.n].value.trim(); let m=""; if(requiredFields.has(x.n)&&!v) m="Required."; else if(v&&x.t==="email"&&!/^\S+@\S+\.\S+$/.test(v)) m="Enter a valid email."; else if(v&&x.t==="tel"&&!/^[+\d][\d\s-]{7,14}$/.test(v)) m="Enter a valid phone number."; else if(v&&x.t==="number"&&+v<0) m="Must be 0 or more."; $("#e_"+x.n).textContent=m; if(m) bad=true;});
 const out=$("#fm"); if(bad){out.innerHTML='<div class="note">Please fix the highlighted fields.</div>';return;}
 const data=Object.fromEntries(new FormData(f));
 const record={id:crypto.randomUUID(),submittedAt:new Date().toISOString(),division:key,...data};
 try{
  const records=JSON.parse(localStorage.getItem("gowardhan.inquiries.v1")||"[]");
  if(!Array.isArray(records)) throw new Error("Saved enquiry data is invalid. Contact the site administrator before submitting again.");
  records.unshift(record);
  localStorage.setItem("gowardhan.inquiries.v1",JSON.stringify(records));
  out.innerHTML='<div class="ok">Thank you — your enquiry has been saved on this device.</div>'; f.reset();
 }catch(error){console.error("Local enquiry could not be saved.",error);out.innerHTML=`<div class="note">${esc(error.message||"Your enquiry could not be saved in this browser.")}</div>`;} };
 $("#sub").addEventListener("click",()=>f.dispatchEvent(new Event("submit",{bubbles:true,cancelable:true}))); }

/* ---- shell + router ---- */
const curRoute = () => (location.hash.slice(1).split("#")[0]) || "/";
function render(){ $("#modal").hidden=true; const r=curRoute(), anchor=location.hash.split("#")[2]; let html="", after=()=>{}; let p=PAGES[r], theme="";
 if(r==="/"){ html=renderHomePage(D,esc); document.title=D.site.name; }
 else if(p){ theme=p.theme; const key=p.theme==="interior"?"interior":"construction"; const sections={...ui,hero,about,services,styles,projects,materials,budget,process,payments,consult};
  html=key==="interior"?renderInteriorPage(p,r,sections):renderConstructionPage(p,r,sections);
  after=()=>{bindProjects(key);bindMaterials(p);bindBudget(p);bindConsult(p,key);}; document.title=p.seo.title; document.querySelector('meta[name=description]').content=p.seo.description; }
 else if(r==="/projects"){ html=renderProjectsPage(D,esc,projects); after=()=>bindProjects(null,true); document.title="Our Projects | "+D.site.name; }
 else if(r==="/contact"){ html=renderContactPage(D,esc,consult); after=()=>bindConsult(D.pages.construction,"construction"); document.title="Contact | "+D.site.name; }
 else if(r==="/admin"){ html=renderAdminPage(); after=()=>mountAdminPage(websiteData,D); document.title="Admin | "+D.site.name; }
 else { html='<section><h1>Page not found</h1><a class="btn" href="#/">Home</a></section>'; }
 document.body.className=theme?`theme-${theme}`:""; ui.renderChrome(D,r,esc); $("#app").innerHTML=html; after(); bindInlineEditing(D,r); bindReveals();
 if(anchor){ ($("#"+anchor)||$("#app")).scrollIntoView({behavior:"smooth"}); } else window.scrollTo(0,0); }
function bindReveals(){
 const targets=document.querySelectorAll("#app section:not(.hero):not(.home-hero), #app .card, #app .contact-details > div, #app .steps li");
 if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches){targets.forEach(el=>el.classList.add("is-visible"));return;}
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.12});
 let cardIndex=0;
 targets.forEach(el=>{el.classList.add("reveal");if(el.classList.contains("card")){el.style.setProperty("--reveal-delay",`${(cardIndex++%4)*90}ms`);}observer.observe(el);});
}
const ADMIN_SESSION_KEY = "gowardhan.admin.session.v1";
function bindInlineEditing(data, route) {
 if (sessionStorage.getItem(ADMIN_SESSION_KEY) !== "authenticated") return;

 const pageKey = route === "/space-interior-design" ? "interiorDesign" : "construction";
 const pagePrefix = `pages.${pageKey}`;
 const paths = new Map();
 const setPath = (selector, path) => {
  const element = $(selector);
  if (element) paths.set(element, path);
 };

 if (route === "/") {
  setPath(".home-hero", "home");
  setPath(".home-intro", "home");
 } else if (route === "/contact") {
  setPath(".page-intro", "contact");
  setPath("#consult", "pages.construction.consultation");
  document.querySelectorAll(".contact-details > div").forEach((element, index) => {
   const field = ["address", "phone", "email", "hours"][index];
   if (field) addEditControl(element, `contact.${field}`, data, true);
  });
 } else if (route === "/projects") {
  setPath(".page-intro", "pages.construction.projectsIntro");
  setPath("#projects", "projects");
 } else {
  setPath(".hero", `${pagePrefix}.hero`);
  setPath(".about-section", `${pagePrefix}.about`);
  setPath("#services", `${pagePrefix}.services`);
  setPath("#styles", `${pagePrefix}.designStyles`);
  setPath("#projects", "projects");
  setPath("#materials", `${pagePrefix}.materials`);
  setPath("#budget", `${pagePrefix}.budgetPlanner`);
  setPath("#process", `${pagePrefix}.process`);
  setPath("#payments", `${pagePrefix}.paymentMilestones`);
  const paymentIntro = $("#payments > p");
  if (paymentIntro) addEditControl(paymentIntro, `${pagePrefix}.paymentIntro`, data, true);
  setPath("#consult", `${pagePrefix}.consultation`);
 }

 const editTargets = [...paths.entries()];
 editTargets.forEach(([element, path]) => addEditControl(element, path, data));

 const setCardPaths = (selector, pathForIndex) => {
  document.querySelectorAll(selector).forEach((card, index) => {
   const path = pathForIndex(card, index);
   if (path) addEditControl(card, path, data, true);
  });
 };
 if (route === "/space-interior-design") {
  setCardPaths(".service-card", (_card, index) => `${pagePrefix}.services.${index}`);
  setCardPaths(".style-card", (_card, index) => `${pagePrefix}.designStyles.${index}`);
  setCardPaths("#materials .card", (_card, index) => `${pagePrefix}.materials.${index}`);
 }
 if (route === "/construction-planning") {
  setCardPaths(".service-card", (_card, index) => `${pagePrefix}.services.${index}`);
  setCardPaths("#materials .card", (_card, index) => `${pagePrefix}.materials.${index}`);
 }
 if (route === "/construction-planning" || route === "/space-interior-design") {
  setCardPaths(".about-section .panel", (_card, index) => `${pagePrefix}.about.points.${index}`);
  setCardPaths("#process .steps li", (_card, index) => `${pagePrefix}.process.${index}`);
  setCardPaths("#payments tbody tr", (_card, index) => `${pagePrefix}.paymentMilestones.${index}`);
 }
 if (route === "/projects" || route === "/construction-planning" || route === "/space-interior-design") {
  setCardPaths("#projGrid .card", card => {
   const projectId = card.querySelector("[data-proj]")?.dataset.proj;
   const index = data.projects.findIndex(project => project.id === projectId);
   return index < 0 ? "" : `projects.${index}`;
  });
 }
}
function addEditControl(element, path, data, item = false) {
 if (!path || element.querySelector(":scope > .inline-content-edit")) return;
 element.classList.add("inline-edit-target");
 const button = document.createElement("button");
 button.className = "inline-content-edit";
 button.type = "button";
 button.textContent = "Edit";
 const lastPart = path.split(".").at(-1);
 const description = /^\d+$/.test(lastPart) ? `item ${Number(lastPart) + 1}` : lastPart.replace(/([A-Z])/g, " $1");
 button.setAttribute("aria-label", `Edit ${description} content`);
 button.addEventListener("click", event => {
  event.stopPropagation();
  openInlineEditor(path, data, item);
 });
 element.append(button);
}
function readContentPath(root, path) {
 return path.split(".").reduce((value, part) => value?.[part], root);
}
function writeContentPath(root, path, value) {
 const parts = path.split(".");
 const key = parts.pop();
 const parent = parts.reduce((current, part) => current?.[part], root);
 if (parent == null || key == null) throw new Error("This content location no longer exists.");
 parent[key] = value;
}
function openInlineEditor(path, data, item) {
 const modal = $("#modal");
 const currentValue = readContentPath(data, path);
 if (currentValue === undefined) {
  console.error(`No website content exists at "${path}".`);
  return;
 }
 const title = path.split(".").at(-1).replace(/([A-Z])/g, " $1");
 const deletable = item && /^\d+$/.test(path.split(".").at(-1));
 modal.innerHTML = `<div class="box inline-edit-dialog" role="dialog" aria-modal="true" aria-labelledby="inlineEditTitle"><span class="eyebrow">Content editor</span><h2 id="inlineEditTitle">Edit ${esc(title)}</h2><p>Edit the JSON for this content and save it in this browser.</p><textarea id="inlineEditValue" class="admin-json" spellcheck="false" aria-label="Content JSON"></textarea><div id="inlineEditMessage" class="admin-message" role="status" aria-live="polite"></div><div class="inline-edit-actions"><button type="button" class="button button-dark" id="inlineEditSave">Save changes</button>${deletable?'<button type="button" class="button inline-delete" id="inlineEditDelete">Delete item</button>':""}<button type="button" class="button admin-secondary" id="inlineEditCancel">Cancel</button></div></div>`;
 const editor = $("#inlineEditValue");
 editor.value = JSON.stringify(currentValue, null, 2);
 modal.hidden = false;
 editor.focus();

 $("#inlineEditSave").onclick = () => {
  try {
   const value = JSON.parse(editor.value);
    const updated = JSON.parse(JSON.stringify(data));
   writeContentPath(updated, path, value);
    localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(updated));
    $("#inlineEditMessage").textContent = "Changes saved in this browser. The page will refresh to show your edits.";
   setTimeout(() => location.reload(), 500);
  } catch (error) {
   $("#inlineEditMessage").textContent = error instanceof SyntaxError ? `Invalid JSON: ${error.message}` : `Unable to save changes: ${error.message}`;
  }
 };
 if (deletable) $("#inlineEditDelete").onclick = () => {
  const parts = path.split(".");
  const index = Number(parts.pop());
  const parentPath = parts.join(".");
  const list = readContentPath(data, parentPath);
  if (!Array.isArray(list) || !Number.isInteger(index) || index < 0 || index >= list.length) {
   $("#inlineEditMessage").textContent = "This item can no longer be found.";
   return;
  }
  if (!window.confirm("Delete this content item from this browser?")) return;
  const updated = JSON.parse(JSON.stringify(data));
  readContentPath(updated, parentPath).splice(index, 1);
  localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(updated));
  location.reload();
 };
 $("#inlineEditCancel").onclick = () => { modal.hidden = true; };
 modal.onclick = event => { if (event.target === modal) modal.hidden = true; };
}
document.addEventListener("click",e=>{
 const pj=e.target.closest("[data-proj]"); if(pj) openProject(pj.dataset.proj);
 const j=e.target.closest("[data-jump]"); if(j){ const t=j.dataset.jump; if(t.startsWith("#/")) return; e.preventDefault(); const s=j.dataset.svc; $(t)?.scrollIntoView({behavior:"smooth"}); if(s){const sel=$("#f_service"); if(sel) sel.value=s;} } });
document.addEventListener("keydown",e=>{ if(e.key==="Escape") $("#modal").hidden=true; });
window.addEventListener("hashchange",()=>{ const parts=location.hash.split("#"); if(parts.length>2||curRoute()!==render.last){render.last=curRoute();render();} });
if(!location.hash) location.hash="#"+D.site.defaultRoute; render.last=curRoute(); render();
