export function renderContactPage(data, escape, consult) {
  const contact = data.contact;
  return `<section class="page-intro"><span class="eyebrow">We’d love to hear about it</span><h1>Let’s talk about <em>your space.</em></h1><p>${escape(contact.text)}</p><div class="contact-details"><div><span class="eyebrow">Visit</span><p>${escape(contact.address)}</p></div><div><span class="eyebrow">Call</span><p>${escape(contact.phone)}</p></div><div><span class="eyebrow">Write</span><p>${escape(contact.email)}</p></div><div><span class="eyebrow">Studio hours</span><p>${escape(contact.hours)}</p></div></div></section>${consult(data.pages.construction, "construction")}`;
}
