const SESSION_KEY = "gowardhan.admin.session.v1";
const AUTH_KEY = "gowardhan.admin.passwordHash.v1";
const INQUIRIES_KEY = "gowardhan.inquiries.v1";
const WEBSITE_DATA_KEY = "gowardhan.websiteData.override.v1";

function shell(content) {
  return `<section class="admin-shell"><div class="admin-topline"><a class="eyebrow" href="#/">← Back to website</a><span class="admin-label">Website administration</span></div>${content}</section>`;
}

function loginMarkup(isSetup) {
  return shell(`<div class="admin-card"><span class="eyebrow">${isSetup ? "First-time setup" : "Private workspace"}</span><h1>${isSetup ? "Create your admin password." : "Welcome back."}</h1><p>${isSetup ? "Set a password to open the enquiry inbox saved in this browser." : "Enter your admin password to view locally saved enquiries."}</p><form id="adminAuthForm" class="admin-form"><label for="adminPassword">${isSetup ? "Create password" : "Admin password"}</label><input id="adminPassword" name="password" type="password" autocomplete="${isSetup ? "new-password" : "current-password"}" required minlength="10">${isSetup ? '<label for="adminPasswordConfirm">Confirm password</label><input id="adminPasswordConfirm" name="confirmPassword" type="password" autocomplete="new-password" required minlength="10"><small>Use at least 10 characters.</small>' : ""}<button class="button button-dark" type="submit">${isSetup ? "Set password" : "Log in"} <span aria-hidden="true">↗</span></button><div class="admin-message" id="adminMessage" role="status" aria-live="polite"></div></form><p class="admin-warning"><strong>Local-only storage:</strong> form entries are not sent anywhere. They stay in this browser on this device. Clearing browser data will remove them, so download a JSON backup regularly.</p></div>`);
}

export function renderAdminPage() {
  return shell(`<div class="admin-loading"><span class="eyebrow">Loading admin workspace</span></div>`);
}

export function mountAdminPage(defaultData, initialData) {
  const app = document.querySelector("#app");
  const showLogin = isSetup => {
    sessionStorage.removeItem(SESSION_KEY);
    app.innerHTML = loginMarkup(isSetup);
    const form = document.querySelector("#adminAuthForm");
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const message = document.querySelector("#adminMessage");
      const password = form.elements.password.value;
      try {
        if (password.length < 10) throw new Error("Choose a password with at least 10 characters.");
        if (isSetup && password !== form.elements.confirmPassword.value) throw new Error("The passwords do not match.");
        const hash = await passwordHash(password);
        if (isSetup) localStorage.setItem(AUTH_KEY, hash);
        else if (hash !== localStorage.getItem(AUTH_KEY)) throw new Error("That password does not match.");
        sessionStorage.setItem(SESSION_KEY, "authenticated");
        await showEditor(initialData, defaultData);
      } catch (error) {
        console.error("Admin login could not be completed.", error);
        message.textContent = error.message || "Unable to connect to the admin service.";
      }
    });
    document.querySelector("#adminPassword").focus();
  };

  try {
    const isSetup = !localStorage.getItem(AUTH_KEY);
    if (sessionStorage.getItem(SESSION_KEY) === "authenticated" && !isSetup) showEditor(initialData, defaultData);
    else showLogin(isSetup);
  } catch (error) {
    console.error("Unable to access local admin storage.", error);
    app.innerHTML = shell(`<div class="admin-card"><h1>Browser storage unavailable.</h1><p>Enable local storage for this website and reload. The admin inbox and saved enquiries live in this browser.</p><p class="admin-message">${escapeHtml(error.message)}</p></div>`);
  }
}

function showEditor(initialData, defaultData) {
  const app = document.querySelector("#app");
  let currentData = initialData;
  try {
    const savedData = localStorage.getItem(WEBSITE_DATA_KEY);
    if (savedData) currentData = JSON.parse(savedData);
  } catch (error) {
    console.error("Saved website content is invalid and could not be loaded.", error);
  }

  app.innerHTML = shell(`<div class="admin-editor"><div class="admin-editor-heading"><div><span class="eyebrow">Content studio</span><h1>Edit your website.</h1><p>Edit the complete website content below as JSON. This includes pages, service and style cards, images, projects, navigation, and contact details.</p></div><button class="text-link admin-logout" id="adminLogout" type="button">Log out <span aria-hidden="true">↗</span></button></div><div class="admin-records"><div class="admin-records-heading"><div><span class="eyebrow">Consultation inbox</span><h2>Website enquiries</h2><p>Records are saved only in this browser and are not sent anywhere.</p></div><div class="admin-record-actions"><button class="button admin-secondary" id="adminRefreshRecords" type="button">Refresh</button><button class="button admin-secondary" id="adminDownloadRecords" type="button">Download enquiries JSON</button></div></div><div id="adminRecordsMessage" class="admin-message" role="status" aria-live="polite">Loading enquiries…</div><div id="adminRecords" class="admin-record-list"></div></div><div class="admin-actions"><button class="button button-dark" id="adminSave" type="button">Save in this browser</button><button class="button admin-secondary" id="adminExport" type="button">Download backup</button><label class="button admin-secondary admin-import" for="adminImport">Import JSON backup</label><input id="adminImport" type="file" accept="application/json,.json" hidden><button class="button admin-secondary" id="adminReset" type="button">Reset local changes</button></div><p class="admin-warning"><strong>All data stays in this browser on this device.</strong> Enquiry records and content edits are stored locally. Download JSON backups before clearing browser data.</p><label class="admin-json-label" for="adminContent">Complete website content <span>JSON</span></label><textarea id="adminContent" class="admin-json" spellcheck="false" aria-describedby="adminContentHelp"></textarea><small id="adminContentHelp">Edit, add, or remove any content in the JSON. Image paths should be relative to the website root, for example <code>images/SPACE INTERIOR DESIGNER/STUDIO.jpg</code>.</small><div id="adminEditorMessage" class="admin-message" role="status" aria-live="polite"></div></div>`);

  const editor = document.querySelector("#adminContent");
  editor.value = JSON.stringify(currentData, null, 2);
  document.querySelector(".admin-editor").insertAdjacentHTML("afterbegin", passwordSettingsMarkup());
  bindPasswordChange();

  document.querySelector("#adminSave").addEventListener("click", () => {
    const message = document.querySelector("#adminEditorMessage");
    try {
      const parsed = JSON.parse(editor.value);
      if (!parsed || typeof parsed !== "object" || !parsed.site || !parsed.pages || !Array.isArray(parsed.projects) || !Array.isArray(parsed.navigation)) {
        message.textContent = "Content must include site and pages objects, plus projects and navigation arrays.";
        return;
      }
      localStorage.setItem(WEBSITE_DATA_KEY, JSON.stringify(parsed));
      message.textContent = "Website content saved in this browser. Refresh to apply your changes.";
    } catch (error) {
      message.textContent = error instanceof SyntaxError ? `Invalid JSON: ${error.message}` : `Unable to save content: ${error.message}`;
    }
  });

  document.querySelector("#adminExport").addEventListener("click", () => {
    const message = document.querySelector("#adminEditorMessage");
    try {
      const data = JSON.parse(editor.value);
      const url = URL.createObjectURL(new Blob([`${JSON.stringify(data, null, 2)}\n`], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "website-content.json";
      link.click();
      URL.revokeObjectURL(url);
      message.textContent = "Website content backup downloaded.";
    } catch (error) {
      message.textContent = error instanceof SyntaxError ? `Invalid JSON: ${error.message}` : `Unable to export content: ${error.message}`;
    }
  });

  document.querySelector("#adminImport").addEventListener("change", async event => {
    const message = document.querySelector("#adminEditorMessage");
    const [file] = event.currentTarget.files;
    if (!file) return;
    try {
      if (file.size > 2_000_000) throw new Error("Choose a JSON file smaller than 2 MB.");
      const imported = JSON.parse(await file.text());
      if (!imported || typeof imported !== "object" || !imported.site || !imported.pages || !Array.isArray(imported.projects) || !Array.isArray(imported.navigation)) {
        throw new Error("This file does not contain a valid website content object.");
      }
      editor.value = JSON.stringify(imported, null, 2);
      message.textContent = `Loaded ${file.name}. Review the content, then save it in this browser.`;
    } catch (error) {
      message.textContent = `Unable to import backup: ${error.message}`;
    } finally {
      event.currentTarget.value = "";
    }
  });

  document.querySelector("#adminReset").addEventListener("click", () => {
    const message = document.querySelector("#adminEditorMessage");
    try {
      localStorage.removeItem(WEBSITE_DATA_KEY);
    } catch (error) {
      message.textContent = `Unable to reset local content: ${error.message}`;
      return;
    }
    editor.value = JSON.stringify(defaultData, null, 2);
    message.textContent = "Local content changes removed. Original website content is active.";
  });

  document.querySelector("#adminLogout").addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
    mountAdminPage(defaultData, initialData);
  });
  bindInquiryRecords();
}

function passwordSettingsMarkup() {
  return `<section class="admin-password-panel"><div><span class="eyebrow">Security</span><h2>Change admin password</h2><p>Update the password used to open this browser’s admin area.</p></div><form id="adminPasswordForm" class="admin-form"><label for="currentAdminPassword">Current password</label><input id="currentAdminPassword" name="currentPassword" type="password" autocomplete="current-password" required><label for="newAdminPassword">New password</label><input id="newAdminPassword" name="newPassword" type="password" autocomplete="new-password" minlength="10" required><label for="confirmAdminPassword">Confirm new password</label><input id="confirmAdminPassword" name="confirmPassword" type="password" autocomplete="new-password" minlength="10" required><small>Use at least 10 characters.</small><button class="button button-dark" type="submit">Change password</button><div id="adminPasswordMessage" class="admin-message" role="status" aria-live="polite"></div></form></section>`;
}

function bindPasswordChange() {
  const form = document.querySelector("#adminPasswordForm");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const message = document.querySelector("#adminPasswordMessage");
    const currentPassword = form.elements.currentPassword.value;
    const newPassword = form.elements.newPassword.value;
    const confirmation = form.elements.confirmPassword.value;
    try {
      const savedHash = localStorage.getItem(AUTH_KEY);
      if (!savedHash || await passwordHash(currentPassword) !== savedHash) {
        throw new Error("The current password is incorrect.");
      }
      if (newPassword.length < 10) {
        throw new Error("Choose a new password with at least 10 characters.");
      }
      if (newPassword !== confirmation) {
        throw new Error("The new passwords do not match.");
      }
      if (newPassword === currentPassword) {
        throw new Error("Choose a new password different from the current one.");
      }
      localStorage.setItem(AUTH_KEY, await passwordHash(newPassword));
      form.reset();
      message.textContent = "Admin password changed successfully.";
    } catch (error) {
      console.error("Unable to change the admin password.", error);
      message.textContent = error.message || "Unable to change the admin password.";
    }
  });
}

async function bindInquiryRecords() {
  const message = document.querySelector("#adminRecordsMessage");
  const recordsRoot = document.querySelector("#adminRecords");
  let records = [];
  const load = async () => {
    message.textContent = "Loading enquiries…";
    try {
      const savedRecords = localStorage.getItem(INQUIRIES_KEY);
      records = savedRecords ? JSON.parse(savedRecords) : [];
      if (!Array.isArray(records)) throw new Error("Saved enquiries are not a valid JSON array.");
      message.textContent = records.length ? `${records.length} enquiry record${records.length === 1 ? "" : "s"}` : "No enquiries have been received yet.";
      recordsRoot.innerHTML = records.map(record => {
        const details = Object.entries(record)
          .filter(([key]) => key !== "submittedAt" && key !== "id")
          .map(([key, value]) => `<div><dt>${escapeHtml(key.replace(/([A-Z])/g, " $1"))}</dt><dd>${escapeHtml(value)}</dd></div>`)
          .join("");
        return `<article class="admin-record"><div class="admin-record-meta"><h3>${escapeHtml(record.name || "Enquiry")}</h3><time>${escapeHtml(record.submittedAt || "")}</time></div><dl>${details}</dl></article>`;
      }).join("");
    } catch (error) {
      console.error("Unable to load locally saved consultation enquiries.", error);
      message.textContent = error.message || "Enquiries could not be loaded.";
      recordsRoot.replaceChildren();
    }
  };
  document.querySelector("#adminRefreshRecords").addEventListener("click", load);
  document.querySelector("#adminDownloadRecords").addEventListener("click", () => {
    const url = URL.createObjectURL(new Blob([`${JSON.stringify(records, null, 2)}\n`], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "inquiries.json";
    link.click();
    URL.revokeObjectURL(url);
  });
  await load();
}

async function passwordHash(password) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Secure password storage is unavailable. Open the site on localhost or HTTPS.");
  }
  const digest = await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}
