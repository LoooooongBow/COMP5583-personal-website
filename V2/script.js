const translations = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navProjects: "Project",
    navContact: "Contact",
    homeIntro: "I’m an MSc student at The Hong Kong Polytechnic University.",
    avatarPlaceholder: "Photo will be added later",
    aboutEyebrow: "Profile",
    aboutTitle: "About",
    educationTitle: "Education",
    currentSchool: "The Hong Kong Polytechnic University",
    currentDegree: "MSc in agentic AI system",
    undergradSchool: "Shandong University",
    undergradDegree: "Computer Science and Technology",
    interestsTitle: "Interests",
    interestsText: "NLP, with a focus on LLMs and agents.",
    projectsEyebrow: "Research Training",
    projectsTitle: "Projects",
    projectsNote: "Both projects below are proposed research projects and have not yet been implemented.",
    proposed: "Proposed Project",
    purpose: "Purpose",
    features: "Key Features",
    contribution: "Planned Personal Contribution",
    technology: "Technology",
    expandProject: "Expand details",
    collapseProject: "Collapse details",
    project1Title: "Dynamic Long-Term Memory for Personalized LLMs",
    project1Purpose: "Explore how a personalized LLM can maintain and update long-term user preferences as those preferences change over time.",
    project1Features: "A structured memory store, preference-update rules, conflict detection between old and new memories, and evaluation of personalization consistency across multi-session conversations.",
    project1Contribution: "Design the experimental pipeline, reproduce representative long-term-memory baselines, build controlled preference-change cases, and analyze when memory updates improve or harm personalization.",
    project2Title: "Memory Compression for Long-Term Personalized LLMs",
    project2Purpose: "Study how long-term user memories can be compressed while preserving the information most useful for future personalized responses.",
    project2Features: "Compare extractive, abstractive, and importance-aware compression strategies; control memory budgets; and measure the trade-off between memory size, retrieval quality, and personalization performance.",
    project2Contribution: "Implement several compression baselines, define memory-budget experiments, construct evaluation cases for preference preservation, and identify failure patterns caused by over-compression.",
    contactEyebrow: "Get in Touch",
    contactTitle: "Contact",
    contactText: "You can reach me by email.",
    themeDarkTarget: "Dark",
    themeLightTarget: "Light",
    switchToDarkTheme: "Switch to dark theme",
    switchToLightTheme: "Switch to light theme"
  },
  zh: {
    navHome: "主页",
    navAbout: "关于",
    navProjects: "项目",
    navContact: "联系",
    homeIntro: "我目前就读于香港理工大学硕士项目。",
    avatarPlaceholder: "头像将在后续添加",
    aboutEyebrow: "个人信息",
    aboutTitle: "关于",
    educationTitle: "教育背景",
    currentSchool: "香港理工大学",
    currentDegree: "MSc in agentic AI system",
    undergradSchool: "山东大学",
    undergradDegree: "计算机科学与技术",
    interestsTitle: "研究兴趣",
    interestsText: "自然语言处理（NLP），重点关注大语言模型（LLM）与智能体（Agent）。",
    projectsEyebrow: "科研训练",
    projectsTitle: "项目",
    projectsNote: "以下两个项目均为拟议研究项目，尚未实际实施。",
    proposed: "拟议项目",
    purpose: "项目目的",
    features: "主要特点",
    contribution: "计划中的个人工作",
    technology: "使用技术",
    expandProject: "展开详情",
    collapseProject: "收起详情",
    project1Title: "面向个性化大语言模型的动态长期记忆",
    project1Purpose: "研究个性化大语言模型如何在用户偏好随时间变化的情况下，持续维护并更新长期用户偏好。",
    project1Features: "设计结构化记忆存储、偏好更新规则、新旧记忆冲突检测，并在多轮、多会话场景下评估个性化一致性。",
    project1Contribution: "计划设计实验流程，复现具有代表性的长期记忆基线，构造可控的偏好变化案例，并分析记忆更新在何种情况下能够提升或损害个性化效果。",
    project2Title: "面向长期个性化大语言模型的记忆压缩",
    project2Purpose: "研究如何在压缩长期用户记忆的同时，尽可能保留对未来个性化回答最有价值的信息。",
    project2Features: "比较抽取式、生成式和重要性感知的记忆压缩方法，控制不同记忆预算，并分析记忆规模、检索质量与个性化表现之间的权衡。",
    project2Contribution: "计划实现多种记忆压缩基线，设计不同记忆预算下的实验，构造偏好保留评测案例，并分析过度压缩导致的典型失败模式。",
    contactEyebrow: "联系方式",
    contactTitle: "联系",
    contactText: "可以通过电子邮件联系我。",
    themeDarkTarget: "深色",
    themeLightTarget: "浅色",
    switchToDarkTheme: "切换到深色主题",
    switchToLightTheme: "切换到浅色主题"
  }
};

const root = document.documentElement;
const header = document.getElementById("siteHeader");
const languageToggle = document.getElementById("languageToggle");
const themeToggle = document.getElementById("themeToggle");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const projectToggles = [...document.querySelectorAll("[data-project-toggle]")];

function currentLanguage() {
  return root.lang.startsWith("zh") ? "zh" : "en";
}

function safeStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    // Storage can be unavailable because of browser/privacy policy.
  }
}

function updateProjectToggleLabel(button) {
  const expanded = button.getAttribute("aria-expanded") === "true";
  const language = currentLanguage();
  const label = button.querySelector("[data-toggle-label]");
  const icon = button.querySelector(".toggle-icon");

  label.textContent = translations[language][expanded ? "collapseProject" : "expandProject"];
  icon.textContent = expanded ? "−" : "+";
}

function updateDisplayControls() {
  const language = currentLanguage();
  const theme = root.dataset.theme === "dark" ? "dark" : "light";
  const nextThemeIsDark = theme === "light";

  languageToggle.textContent = language === "en" ? "中文" : "English";
  languageToggle.setAttribute(
    "aria-label",
    language === "en" ? "Switch to Chinese" : "切换到英文"
  );

  themeToggle.textContent = translations[language][
    nextThemeIsDark ? "themeDarkTarget" : "themeLightTarget"
  ];
  themeToggle.setAttribute(
    "aria-label",
    translations[language][nextThemeIsDark ? "switchToDarkTheme" : "switchToLightTheme"]
  );
}

function setLanguage(language) {
  const safeLanguage = translations[language] ? language : "en";
  root.lang = safeLanguage === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (element.hasAttribute("data-toggle-label")) return;

    const key = element.dataset.i18n;
    const translatedText = translations[safeLanguage][key];

    if (translatedText) {
      element.textContent = translatedText;
    }
  });

  projectToggles.forEach(updateProjectToggleLabel);
  updateDisplayControls();
  safeStorageSet("preferredLanguage", safeLanguage);
}

function setTheme(theme) {
  const safeTheme = theme === "dark" ? "dark" : "light";
  root.dataset.theme = safeTheme;

  updateDisplayControls();
  safeStorageSet("preferredTheme", safeTheme);
}

function updateHeaderHeight() {
  const headerHeight = Math.ceil(header.getBoundingClientRect().height);
  root.style.setProperty("--header-height", `${headerHeight}px`);
}

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

let clickedNavTarget = null;
let programmaticScroll = false;
let settledProgrammaticY = null;
let programmaticScrollTimer = null;

function finishProgrammaticScroll() {
  programmaticScroll = false;
  settledProgrammaticY = window.scrollY;
}

function scheduleProgrammaticScrollFinish() {
  window.clearTimeout(programmaticScrollTimer);
  programmaticScrollTimer = window.setTimeout(finishProgrammaticScroll, 140);
}

function releaseClickedNavTargetIfUserScrolled() {
  if (
    clickedNavTarget &&
    !programmaticScroll &&
    settledProgrammaticY !== null &&
    Math.abs(window.scrollY - settledProgrammaticY) > 2
  ) {
    clickedNavTarget = null;
    settledProgrammaticY = null;
  }
}

function updateActiveNav() {
  if (clickedNavTarget) {
    setActiveNav(clickedNavTarget);
    return;
  }

  const headerHeight = header.getBoundingClientRect().height;
  const probeY = headerHeight + 24;

  // Re-read live viewport rectangles every time. This remains valid after
  // project collapse/expand and responsive reflow, without cached heights.
  let activeSection = sections[0];
  let closestDistance = Number.POSITIVE_INFINITY;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();

    if (rect.top <= probeY && rect.bottom > probeY) {
      activeSection = section;
      break;
    }

    const distance = Math.min(Math.abs(rect.top - probeY), Math.abs(rect.bottom - probeY));
    if (distance < closestDistance) {
      closestDistance = distance;
      activeSection = section;
    }
  }

  setActiveNav(activeSection.id);
}

function scrollToSection(target) {
  updateHeaderHeight();
  const headerHeight = header.getBoundingClientRect().height;
  const isHome = target.id === "home";
  const targetTop = isHome
    ? 0
    : target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

  clickedNavTarget = target.id;
  programmaticScroll = true;
  settledProgrammaticY = null;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
  });

  // Preserve the explicit click target even if the browser clamps the requested
  // position at the current document bottom.
  setActiveNav(target.id);
  scheduleProgrammaticScrollFinish();
}

languageToggle.addEventListener("click", () => {
  setLanguage(currentLanguage() === "zh" ? "en" : "zh");
  updateHeaderHeight();
  updateActiveNav();
});

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const selector = link.getAttribute("href");
    const target = document.querySelector(selector);

    if (!target) return;

    event.preventDefault();
    scrollToSection(target);
    history.replaceState(null, "", selector);
  });
});

projectToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const detailsId = button.getAttribute("aria-controls");
    const details = document.getElementById(detailsId);
    const currentlyExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!currentlyExpanded));
    details.hidden = currentlyExpanded;
    updateProjectToggleLabel(button);

    requestAnimationFrame(() => {
      updateHeaderHeight();
      updateActiveNav();
    });
  });
});

let scrollFrame = null;
window.addEventListener(
  "scroll",
  () => {
    if (programmaticScroll) {
      scheduleProgrammaticScrollFinish();
    }

    if (scrollFrame !== null) return;

    scrollFrame = requestAnimationFrame(() => {
      releaseClickedNavTargetIfUserScrolled();
      updateActiveNav();
      scrollFrame = null;
    });
  },
  { passive: true }
);

if ("onscrollend" in window) {
  window.addEventListener("scrollend", () => {
    if (programmaticScroll) {
      window.clearTimeout(programmaticScrollTimer);
      finishProgrammaticScroll();
    }
  });
}

window.addEventListener("resize", () => {
  updateHeaderHeight();
  updateActiveNav();
});

document.getElementById("currentYear").textContent = new Date().getFullYear();

const storedLanguage = safeStorageGet("preferredLanguage");
setLanguage(storedLanguage || "en");

const storedTheme = safeStorageGet("preferredTheme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(storedTheme || (systemPrefersDark ? "dark" : "light"));

updateHeaderHeight();
updateActiveNav();

if (window.location.hash) {
  const initialTarget = document.querySelector(window.location.hash);

  if (initialTarget) {
    requestAnimationFrame(() => {
      updateHeaderHeight();
      const headerHeight = header.getBoundingClientRect().height;
      const targetTop = initialTarget.id === "home"
        ? 0
        : initialTarget.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

      window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
      clickedNavTarget = initialTarget.id;
      settledProgrammaticY = window.scrollY;
      setActiveNav(initialTarget.id);
    });
  }
}
