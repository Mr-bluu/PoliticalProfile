let currentLang = localStorage.getItem("lang") || "cs";
let translations = {};

document.addEventListener("DOMContentLoaded", () => {
    renderLangSelect();   // vytvoří select dynamicky
    loadLang();           // načte a aplikuje překlady
    markActiveNav();
});

function renderLangSelect() {
    const container = document.getElementById("langContainer");
    if (!container) return;

    // vyrobíme select
    const selector = document.createElement("select");
    selector.id = "langSelect";
    selector.setAttribute("aria-label", currentLang === "cs" ? "Zvolit jazyk" : "Choose language");

    const options = [
        {value: "cs", label: "CZ"},
        {value: "en", label: "EN"}
    ];

    options.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt.value;
        o.textContent = opt.label;
        if (opt.value === currentLang) o.selected = true;  // rovnou nastavit
        selector.appendChild(o);
    });

    selector.addEventListener("change", e => {
        setLang(e.target.value);
    });

    container.innerHTML = ""; // vyčistit placeholder
    container.appendChild(selector);
}

function loadLang() {
    fetch("lang.json")
        .then(r => r.json())
        .then(data => {
            translations = data;
            applyLang();
        })
        .catch(err => console.error("Chyba při načítání lang.json:", err));
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    applyLang();

    renderLangSelect(); // obnoví přepínač jazyků

    const startBtn = document.getElementById("startBtn");
    const questionText = document.getElementById("questionText");

    // pokud jsme na stránce s výsledky
    if (byId("bars") && typeof renderResults === "function") {
        renderResults();
    }

    // pokud jsme u testu a test už běží (tlačítko Start je skryté)
    else if (typeof showQuestion === "function" && startBtn && startBtn.style.display === "none") {
        showQuestion();
    }

    // pokud test ještě nezačal → přelož úvodní hlášku
    else if (questionText && typeof t === "function") {
        questionText.textContent = t("click_to_start", "Klikněte na „Začít test“");
    }
}

function applyLang() {
    if (!translations || !translations[currentLang]) return;

    document.documentElement.lang = currentLang;

    // textové překlady
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    // HTML překlady (např. bannery s odkazem)
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
        const key = el.getAttribute("data-i18n-html");
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    const titleKey = document.body && document.body.dataset.pageTitle;
    if (titleKey && translations[currentLang][titleKey]) {
        document.title = translations[currentLang][titleKey];
    }
}

function markActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navlinks a[href]").forEach(link => {
        const target = link.getAttribute("href");
        link.classList.toggle("active", target === currentPage);
        if (target === currentPage) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
    });
}
