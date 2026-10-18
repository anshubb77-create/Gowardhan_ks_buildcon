/* =====================================================================
   websiteData.js — SINGLE SOURCE OF TRUTH for all editable content.
   Edit text, images, projects, prices, milestones and form options HERE.
   Replace every "" image with your own public image URL or a file path
   such as "images/villa.jpg". Empty images show a labelled placeholder.
   All sample projects/prices are DEMONSTRATIVE — replace with verified data.
   ===================================================================== */
const websiteData = {
  site: { name:"Gowardhan KS Buildcon International Pvt. Ltd.", logo:"" /* LOGO URL */, currency:"INR", locale:"en-IN",
    defaultRoute:"/construction-planning" },
  navigation:[
    {label:"Home",route:"/"},{label:"Construction & Planning",route:"/construction-planning"},
    {label:"SPACE INTERIOR DESIGNER",route:"/space-interior-design"},{label:"Our Projects",route:"/projects"},
    {label:"Our Services",route:"/construction-planning#services"},{label:"About Us",route:"/construction-planning#about"},
    {label:"Materials & Budget Planner",route:"/construction-planning#budget"},{label:"Payment Information",route:"/construction-planning#payments"},
    {label:"Free Consultation",route:"/construction-planning#consult"},{label:"Contact Us",route:"/contact"}],
  home:{ image:"images/SPACE INTERIOR DESIGNER/STUDIO.jpg", headline:"Thoughtful spaces.", emphasis:"Lasting feeling.", title:"Two divisions. One trusted name.", text:"Choose a division to explore services, projects, budget tools and consultation.", caption:"Considered living, beautifully made" },
  contact:{ address:"[Add verified office address]", phone:"[Add phone]", email:"[Add email]", hours:"[Add working hours]",
    heading:"Contact Us", text:"Reach out for a free consultation." },
  footer:{ note:"© Gowardhan KS Buildcon International Pvt. Ltd. All rights reserved.", links:[] },
  pages:{
    construction:{
      theme:"construction", title:"Construction & Architectural Planning", brandLabel:"A.K. Construction & Planner",
      seo:{title:"Construction & Architectural Planning | Gowardhan KS Buildcon", description:"Planning, drawings, estimation, construction and turnkey projects."},
      hero:{image:"images/AK CONSTRUCTION AND PLANNER/RANCHI.jpg",alt:"Architectural project in Ranchi",headline:"Building Your Vision. Planning Your Future.",
        text:"From architectural planning and engineering coordination to construction execution, we help transform your ideas into thoughtfully planned, functional and enduring spaces.",
        cta1:{label:"Get Free Consultation",href:"#consult"},cta2:{label:"Explore Our Projects",href:"#/projects"},stats:[]},
      about:{show:true,title:"About Construction & Planning",image:"images/AK CONSTRUCTION AND PLANNER/JAMSHEDPUR.jpeg",
        paragraphs:["Under Gowardhan KS Buildcon International Pvt. Ltd., our construction and planning services cover planning, drawings, estimation, project coordination, construction and renovation. [Replace with approved company introduction.]"],
        points:[["Mission","[Add mission]"],["Vision","[Add vision]"],["Philosophy","[Add philosophy]"],["Quality standards","[Add standards]"],["Coordination approach","[Add approach]"],["Materials & budget","Budget-aware material selection."]]},
      services:[
        {id:"c1",icon:"📐",title:"Architectural Planning",sub:"2D Floor Plans & Space Planning",image:"images/AK CONSTRUCTION AND PLANNER/FLOOR PLAN(ITKI, RANCHI).png",text:"Functional floor plan concepts, room arrangements, circulation and space utilisation for residential and commercial projects."},
        {id:"c2",icon:"🏢",title:"3D Elevation Design",sub:"Modern Residential & Commercial Elevations",image:"images/AK CONSTRUCTION AND PLANNER/RANCHI.jpeg",text:"3D elevations for residential, commercial, institutional, healthcare and warehouse/industrial buildings."},
        {id:"c3",icon:"🧱",title:"Structural Design",sub:"Structural Planning & Engineering Services",image:"images/AK CONSTRUCTION AND PLANNER/HOSPITAL PLAN 2(RANCHI).jpg",text:"Structural planning and technical coordination. Engineering approval or certification is not implied unless confirmed by the company."},
        {id:"c4",icon:"🧮",title:"Estimation & Costing",sub:"BOQ, Material Estimation & Cost Analysis",image:"images/AK CONSTRUCTION AND PLANNER/FLOOR PLAN(ITKI, RANCHI).png",text:"BOQ, material quantities, preliminary cost analysis, labour considerations and budget planning. Request a project-specific estimate."},
        {id:"c5",icon:"🏗️",title:"Construction Services",sub:"Residential & Commercial Construction",image:"images/AK CONSTRUCTION AND PLANNER/COMPLETED PROJECT/0630d43e-60ca-481f-b6f8-42e6c87241fd.jpg",text:"Residential and commercial construction with defined scope of work."},
        {id:"c6",icon:"🔑",title:"Turnkey Projects",sub:"Planning to Project Execution",image:"images/AK CONSTRUCTION AND PLANNER/DORANDA(RANCHI).jpeg",text:"Integrated delivery from planning through coordination, material selection, execution, supervision and handover, per agreed scope."},
        {id:"c7",icon:"🛠️",title:"Renovation Work",sub:"Home & Commercial Space Renovation",image:"images/AK CONSTRUCTION AND PLANNER/COMPLETED PROJECT/0630d43e-60ca-481f-b6f8-42e6c87241fd.jpg",text:"Renovation and upgrading of homes, offices and commercial premises."},
        {id:"c8",icon:"👷",title:"Construction Supervision",sub:"Site Coordination & Work Monitoring",image:"images/AK CONSTRUCTION AND PLANNER/DORANDA 2(RANCHI).jpeg",text:"Progress monitoring, coordination with contractors and consultants, and quality checks within agreed scope."},
        {id:"c9",icon:"⚡",title:"Electrical & Plumbing Drawings",sub:"Building Services Planning",image:"images/AK CONSTRUCTION AND PLANNER/HOSPITAL(RANCHI).jpg",text:"Electrical and plumbing layout planning and drawing coordination."},
        {id:"c10",icon:"📄",title:"Submission Drawing in Nagar Nigam",sub:"Pre-DCR Drawings & Submission Support",image:"images/AK CONSTRUCTION AND PLANNER/SUBBMISSION(PRE DCR).jpg",text:"Preparation of drawing documentation for Nagar Nigam / the applicable authority, including Pre-DCR drawings. Requirements vary by authority; approval is not guaranteed. [Edit exact scope.]"},
        {id:"c11",icon:"🗂️",title:"Building Planning & Project Coordination",sub:"Optional — remove if not offered",image:"images/AK CONSTRUCTION AND PLANNER/JAMSHEDPUR.jpeg",text:"Coordinating floor plans, documentation, estimation, material choices and execution schedule."}],
      projectsIntro:"Sample entries are demonstrative until replaced with real projects.",
      materials:[
        {id:"m1",name:"Cement (OPC/PPC)",category:"Cement & concrete",image:"",desc:"General structural cement.",spec:"[Grade]",unit:"bag",priceMin:null,priceMax:null,quality:"Standard",uses:"Foundation, slabs",pros:"Widely available",cons:"Grade depends on use",updated:"",source:""},
        {id:"m2",name:"TMT Reinforcement Steel",category:"Reinforcement steel",image:"",desc:"Ribbed bars for RCC.",spec:"[Fe500/Fe550]",unit:"kg",priceMin:null,priceMax:null,quality:"Standard",uses:"Columns, beams",pros:"High strength",cons:"Price fluctuates",updated:"",source:""},
        {id:"m3",name:"Red Clay Brick",category:"Bricks & blocks",image:"",desc:"Traditional walling.",spec:"",unit:"piece",priceMin:null,priceMax:null,quality:"Economy",uses:"Walls",pros:"Familiar",cons:"Heavier",updated:"",source:""},
        {id:"m4",name:"AAC Block",category:"Bricks & blocks",image:"",desc:"Light-weight walling.",spec:"",unit:"piece",priceMin:null,priceMax:null,quality:"Standard",uses:"Walls",pros:"Light, insulating",cons:"Needs correct mortar",updated:"",source:""},
        {id:"m5",name:"Vitrified Tiles",category:"Flooring & tiles",image:"",desc:"Durable flooring.",spec:"",unit:"sq ft",priceMin:null,priceMax:null,quality:"Premium",uses:"Floors",pros:"Durable",cons:"Slippery if glossy",updated:"",source:""}],
      budgetPlanner:{
        title:"Budget Planning & Cost Estimation", cta:"Get a Detailed Project Estimate",
        disclaimer:"Indicative only. Not a quotation. Actual cost depends on specifications, location, site conditions, drawings, material rates and agreed scope.",
        ratesSource:"SAMPLE rates — replace with verified rates", ratesUpdated:"",
        projectTypes:["Residential","Commercial","Industrial","Institutional"],
        qualityRates:{Economy:1400,Standard:1800,Premium:2400}, /* INR per sq ft built-up — SAMPLE */
        floorFactor:0, contingencyPct:5,
        breakdown:[["Materials",45],["Labour",20],["Structural work",15],["Finishes",10],["Electrical work",5],["Plumbing work",5]]},
      process:["Initial consultation","Requirements and site information","Architectural planning","Structural and building-services coordination","Estimation and budget approval","Material selection","Construction and execution","Site supervision and progress updates","Finishing and handover"],
      paymentIntro:"Example milestones only. Final schedule depends on the signed agreement.",
      paymentMilestones:[
        {order:1,title:"Booking / consultation",desc:"[Edit]",percent:10,due:"At booking",status:""},
        {order:2,title:"Planning & drawings",desc:"[Edit]",percent:20,due:"On drawing delivery",status:""},
        {order:3,title:"Foundation & structure",desc:"[Edit]",percent:40,due:"On stage completion",status:""},
        {order:4,title:"Finishing",desc:"[Edit]",percent:20,due:"On stage completion",status:""},
        {order:5,title:"Handover",desc:"[Edit]",percent:10,due:"At handover",status:""}],
      consultation:{title:"Free Construction Consultation",cta:"Get Free Consultation",fields:[
        {n:"name",l:"Full name",t:"text",r:1},{n:"phone",l:"Phone number",t:"tel",r:1},{n:"email",l:"Email address",t:"email",r:1},
        {n:"service",l:"Preferred service",t:"select",r:1,o:"@services"},
        {n:"projectType",l:"Project type",t:"select",o:["Residential","Commercial","Industrial","Institutional"]},
        {n:"location",l:"Project location",t:"text",r:1},{n:"plot",l:"Plot area (sq ft)",t:"number"},{n:"builtup",l:"Proposed built-up area (sq ft)",t:"number"},
        {n:"floors",l:"Number of floors",t:"number"},{n:"budget",l:"Estimated budget range",t:"select",o:["Under ₹25 lakh","₹25–50 lakh","₹50 lakh–1 crore","Above ₹1 crore"]},
        {n:"material",l:"Material / finish preferences",t:"text"},{n:"stage",l:"Project stage",t:"select",o:["Idea","Plot purchased","Drawings ready","Ready to build"]},
        {n:"start",l:"Expected starting date",t:"date"},{n:"msg",l:"Description of requirements",t:"textarea"}]},
      faqs:[]},
    interiorDesign:{
      theme:"interior", title:"SPACE INTERIOR DESIGNER", brandLabel:"SPACE INTERIOR DESIGNER",
      seo:{title:"SPACE INTERIOR DESIGNER | Gowardhan KS Buildcon",description:"Residential and commercial interiors, 3D visualisation and turnkey solutions."},
      hero:{image:"images/SPACE INTERIOR DESIGNER/STUDIO.jpg",alt:"Interior design studio project",headline:"A softer kind of luxury.",
        text:"We create beautiful, functional and inspiring interiors that bring together thoughtful space planning, refined materials, furniture, lighting and personalised design.",
        cta1:{label:"Discover Our Designs",href:"#styles"},cta2:{label:"Explore Interior Projects",href:"#/projects"},cta3:{label:"Get Free Interior Consultation",href:"#consult"}},
      about:{show:true,title:"ABOUT SPACE INTERIOR DESIGNER",image:"images/SPACE INTERIOR DESIGNER/Bedroom image.jpg",
        paragraphs:["At SPACE INTERIOR DESIGNER, we transform spaces into beautiful, functional, and inspiring environments. We specialize in residential and commercial interiors, space planning, 3D visualization, modular furniture, electrical and plumbing planning, and turnkey interior solutions.","Our goal is to combine creativity, functionality, and quality to create spaces that reflect your lifestyle and vision."],
        tagline:"SPACE INTERIOR DESIGNER — Transforming Spaces, Elevating Lifestyles.",points:[]},
      services:[
        {id:"i1",icon:"01",title:"Residential Interior Design",image:"images/SPACE INTERIOR DESIGNER/Bedroom image 3.jpg",text:"Personalised interiors for apartments, villas and homes: living rooms, bedrooms, kitchens, bathrooms, wardrobes and dining spaces."},
        {id:"i2",icon:"02",title:"Commercial Interior Design",image:"images/SPACE INTERIOR DESIGNER/STUDIO.jpg",text:"Functional, attractive offices, retail shops, studios and other business spaces."},
        {id:"i3",icon:"03",title:"3D Interior Visualization",image:"images/SPACE INTERIOR DESIGNER/Bedroom image (2).jpg",text:"Realistic 3D visuals of layouts, materials, colours, furniture and lighting before execution."},
        {id:"i4",icon:"04",title:"Space Planning & Design",image:"images/SPACE INTERIOR DESIGNER/Bedroom image.jpg",text:"Room layouts, circulation, furniture positions, storage and efficient use of space."},
        {id:"i5",icon:"05",title:"Modular Furniture & Custom Joinery",image:"images/SPACE INTERIOR DESIGNER/BEDROOM.......jpg",text:"Modular kitchens, wardrobes, storage, cabinetry and custom furniture with configurable finishes."},
        {id:"i6",icon:"06",title:"Turnkey Interior Solutions",image:"images/SPACE INTERIOR DESIGNER/STUDIO.jpg",text:"Coordinated delivery from consultation to handover, according to the agreed scope."},
        {id:"i7",icon:"07",title:"Renovation & Interior Upgradation",image:"images/SPACE INTERIOR DESIGNER/Bedroom image 3.jpg",text:"Finish upgrades, layout improvements, furniture replacement and lighting upgrades."},
        {id:"i8",icon:"08",title:"Electrical Planning & Layout Design",image:"images/SPACE INTERIOR DESIGNER/Bedroom image (2).jpg",text:"Planning of lighting points, switches, outlets and appliance connections. Design planning only — not licensed installation or certification."},
        {id:"i9",icon:"09",title:"Plumbing Planning & Layout Design",image:"images/SPACE INTERIOR DESIGNER/BEDROOM.......jpg",text:"Plumbing layout coordination for kitchens, bathrooms and utility areas. Design planning only — not licensed installation."}],
      designStyles:[
        {id:"s1",title:"Contemporary",text:"Clean lines, considered details and confident proportions.",image:"images/SPACE INTERIOR DESIGNER/Bedroom image 3.jpg",palette:"Greys, white, black accents"},
        {id:"s2",title:"Minimalist",text:"Calm, uncluttered spaces where every piece has purpose.",image:"images/SPACE INTERIOR DESIGNER/Bedroom image.jpg",palette:"Whites, light wood"},
        {id:"s3",title:"Scandinavian",text:"Light-filled rooms softened by tactile natural materials.",image:"images/SPACE INTERIOR DESIGNER/Bedroom image (2).jpg",palette:"White, pale oak, soft grey"},
        {id:"s4",title:"Industrial",text:"Honest materials, sculptural forms and tailored contrast.",image:"images/SPACE INTERIOR DESIGNER/STUDIO.jpg",palette:"Charcoal, steel, brick"},
        {id:"s5",title:"Luxury",text:"Rich materials, quiet shine and beautifully layered light.",image:"images/SPACE INTERIOR DESIGNER/BEDROOM.......jpg",palette:"Marble, brass, deep tones"},
        {id:"s6",title:"Warm modern",text:"Modern forms made welcoming with soft, earthy finishes.",image:"images/SPACE INTERIOR DESIGNER/Bedroom image.jpg",palette:"Walnut, taupe, olive"}],
      materials:[
        {id:"f1",name:"Engineered Wood Flooring",category:"Wood & finishes",image:"",desc:"Warm natural look.",color:"Walnut",texture:"Grained",finish:"Matte",unit:"sq ft",priceMin:null,priceMax:null,uses:"Living, bedrooms",care:"Avoid standing water",quality:"Premium"},
        {id:"f2",name:"Digital Laminate",category:"Laminates & veneers",image:"",desc:"Wide design range.",color:"Various",texture:"Smooth",finish:"Matte",unit:"sheet",priceMin:null,priceMax:null,uses:"Wardrobes, kitchens",care:"Wipe with damp cloth",quality:"Standard"},
        {id:"f3",name:"Vitrified Floor Tile",category:"Floor tiles & stone",image:"",desc:"Low-maintenance floor.",color:"Beige",texture:"Smooth",finish:"Glossy",unit:"sq ft",priceMin:null,priceMax:null,uses:"All rooms",care:"Easy to clean",quality:"Economy"},
        {id:"f4",name:"Emulsion Wall Paint",category:"Wall paint & coverings",image:"",desc:"Washable wall finish.",color:"Warm white",texture:"Smooth",finish:"Satin",unit:"sq ft",priceMin:null,priceMax:null,uses:"Walls",care:"Gentle washing",quality:"Standard"}],
      budgetPlanner:{
        title:"Interior Budget Planner", cta:"Plan My Interior Budget",
        disclaimer:"Preliminary estimate, not a quotation. Depends on site measurements, specifications, scope, location and supplier rates.",
        ratesSource:"SAMPLE rates — replace with verified rates", ratesUpdated:"",
        projectTypes:["Apartment","Villa","Independent house","Office","Retail shop"],
        qualityRates:{Economy:1100,Standard:1700,Premium:2600}, /* INR per sq ft — SAMPLE */
        addons:[{label:"Modular kitchen",amount:150000},{label:"Wardrobes / storage",amount:100000},{label:"Feature lighting",amount:50000},{label:"Soft furnishings & decor",amount:60000}],
        contingencyPct:5,
        breakdown:[["Design fees",8],["Furniture",30],["Materials",22],["Finishes",15],["Lighting",8],["Installation",7],["Labour",10]]},
      process:["Free consultation","Understanding lifestyle and requirements","Site information and measurements","Space planning and layout development","Concept design and 3D visualization","Material, colour, lighting and furniture selection","Detailed design and layout coordination","Interior execution and installation (if included in scope)","Final inspection and handover"],
      paymentIntro:"Placeholder stages until official policy is confirmed. No online payment is collected on this site.",
      paymentMilestones:[
        {order:1,title:"Consultation / booking",desc:"[Edit]",percent:10,due:"At booking",status:""},
        {order:2,title:"Concept & design development",desc:"[Edit]",percent:30,due:"On concept approval",status:""},
        {order:3,title:"Material procurement & execution",desc:"[Edit]",percent:40,due:"On order",status:""},
        {order:4,title:"Installation & handover",desc:"[Edit]",percent:20,due:"At handover",status:""}],
      consultation:{title:"Free Interior Design Consultation",cta:"Get Free Interior Consultation",fields:[
        {n:"name",l:"Name",t:"text",r:1},{n:"phone",l:"Phone number",t:"tel",r:1},{n:"email",l:"Email",t:"email",r:1},
        {n:"location",l:"Project location",t:"text",r:1},{n:"property",l:"Property type",t:"select",o:["Apartment","Villa","Independent house","Office","Retail shop"]},
        {n:"space",l:"Room / space type",t:"text"},{n:"area",l:"Approximate area (sq ft)",t:"number"},
        {n:"style",l:"Design style",t:"select",o:"@styles"},{n:"material",l:"Material preferences",t:"text"},
        {n:"furniture",l:"Furniture & storage requirements",t:"text"},{n:"service",l:"Preferred service",t:"select",r:1,o:"@services"},
        {n:"budget",l:"Estimated interior budget",t:"select",o:["Under ₹5 lakh","₹5–15 lakh","₹15–30 lakh","Above ₹30 lakh"]},
        {n:"start",l:"Expected start date",t:"date"},{n:"msg",l:"Additional requirements",t:"textarea"}]},
      faqs:[]}},
  /* Unified projects. division: "construction" | "interior". status: ongoing | upcoming | completed.
     SAMPLE entries — delete or replace with real, approved records. */
  projects:[
    {id:"p1",demo:true,name:"Sample Residential Villa",division:"construction",category:"Residential",type:"Villa",status:"ongoing",location:"[City]",
     description:"Demonstrative record.",cover:"images/AK CONSTRUCTION AND PLANNER/DORANDA(RANCHI).jpeg",gallery:["images/AK CONSTRUCTION AND PLANNER/DORANDA 2(RANCHI).jpeg","images/AK CONSTRUCTION AND PLANNER/RANCHI.jpeg"],alt:"Residential building project in Doranda, Ranchi",start:"2025-01-15",expectedEnd:"2026-03-30",actualEnd:"",
     area:"2,400 sq ft",budget:"",materials:["RCC","AAC block"],services:["Construction Services"],progress:55,highlights:["Sample highlight"],show:true},
    {id:"p2",demo:true,name:"Sample Commercial Complex",division:"construction",category:"Commercial",type:"Complex",status:"upcoming",location:"[City]",
     description:"Proposed — unconfirmed.",cover:"images/AK CONSTRUCTION AND PLANNER/JAMSHEDPUR.jpeg",gallery:[],alt:"Building design in Jamshedpur",start:"2026-06-01",expectedEnd:"",actualEnd:"",
     area:"",budget:"",materials:[],services:["Architectural Planning"],progress:null,highlights:[],show:true},
    {id:"p3",demo:true,name:"Sample Home Renovation",division:"construction",category:"Renovation",type:"Home",status:"completed",location:"[City]",
     description:"Demonstrative record.",cover:"images/AK CONSTRUCTION AND PLANNER/COMPLETED PROJECT/0630d43e-60ca-481f-b6f8-42e6c87241fd.jpg",gallery:[],alt:"Completed construction project",start:"2024-02-01",expectedEnd:"2024-06-01",actualEnd:"2024-06-20",
     area:"1,200 sq ft",budget:"",materials:[],services:["Renovation Work"],progress:100,highlights:[],show:true},
    {id:"p4",demo:true,name:"Sample Bedroom Interior",division:"interior",category:"Residential interiors",type:"Apartment",status:"completed",location:"[City]",
     style:"Warm modern",description:"Demonstrative record.",cover:"images/SPACE INTERIOR DESIGNER/Bedroom image 3.jpg",gallery:["images/SPACE INTERIOR DESIGNER/Bedroom image.jpg","images/SPACE INTERIOR DESIGNER/Bedroom image (2).jpg","images/SPACE INTERIOR DESIGNER/BEDROOM.......jpg"],alt:"Bedroom interior design",start:"2024-08-01",expectedEnd:"2024-10-15",actualEnd:"2024-10-30",
     area:"1,100 sq ft",budget:"",materials:["Walnut laminate"],services:["Residential Interior Design"],progress:100,highlights:[],show:true},
    {id:"p5",demo:true,name:"Sample Studio Interior",division:"interior",category:"Commercial interiors",type:"Studio",status:"ongoing",location:"[City]",
     style:"Contemporary",description:"Demonstrative record.",cover:"images/SPACE INTERIOR DESIGNER/STUDIO.jpg",gallery:[],alt:"Interior design studio",start:"2025-03-01",expectedEnd:"2025-12-01",actualEnd:"",
     area:"2,000 sq ft",budget:"",materials:[],services:["Commercial Interior Design"],progress:40,highlights:[],show:true}],
  testimonials:[]
};

export default websiteData;
