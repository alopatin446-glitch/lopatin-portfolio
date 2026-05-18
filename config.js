// CONFIGURATION MODULE: Данные для управления дашбордом
const APP_CONFIG = {
    profile: {
        systemCode: "AL_CORE // ARCHITECT_V2",
        statusText: "AVAILABLE FOR PROJECTS",
        isAvailable: true // true — зеленая точка, false — красная точка
    },
    contacts: {
        phone: { label: "телефон", value: "+7 (913) 411-39-41", href: "tel:+7 (913) 411-39-41" },
        email: { label: "почта", value: "alopatin446@gmail.com", href: "mailto:alopatin446@gmail.com" },
        telegram: { label: "Telegram // Антон", value: "@Antoshka_admin", href: "https://t.me/Antoshka_admin" },
        maxMessenger: { label: "MAX // Мессенджер", value: "Открыть профиль", href: "https://max.ru/u/f9LHodD0cOK2NaBdJfC710fSE0Km5DBT0VQpPpKMdWaOACHQGl_WRhUxYg4" }
    }
};

// RUN-TIME FUNCTIONS: Функция инициализации и вывода данных на экран
document.addEventListener("DOMContentLoaded", () => {
    initDashboard(APP_CONFIG);
});

function initDashboard(config) {
    // 1. Обновляем верхний статус-бар
    const sysCodeEl = document.getElementById("sys-code");
    const sysStatusEl = document.getElementById("sys-status");

    if (sysCodeEl) sysCodeEl.textContent = config.profile.systemCode;
    if (sysStatusEl) {
        sysStatusEl.innerHTML = `
            <span class="status-dot" style="background-color: ${config.profile.isAvailable ? 'var(--accent-green)' : '#ef4444'}; box-shadow: 0 0 8px ${config.profile.isAvailable ? 'var(--accent-green)' : '#ef4444'}"></span>
            ${config.profile.statusText}
        `;
    }

    // 2. Рендерим блок контактов
    const contactsContainer = document.getElementById("dynamic-contacts");
    if (contactsContainer) {
        contactsContainer.innerHTML = `
            <a href="${config.contacts.phone.href}" class="contact-link">
                <span class="contact-label">${config.contacts.phone.label}</span>
                <span class="contact-value">${config.contacts.phone.value}</span>
            </a>

            <a href="${config.contacts.email.href}" class="contact-link">
                <span class="contact-label">${config.contacts.email.label}</span>
                <span class="contact-value">${config.contacts.email.value}</span>
            </a>

            <a href="${config.contacts.telegram.href}" target="_blank" class="contact-link" style="border-color: rgba(16, 185, 129, 0.2);">
                <span class="contact-label" style="color: var(--accent-green);">${config.contacts.telegram.label}</span>
                <span class="contact-value" style="color: var(--accent-green);">${config.contacts.telegram.value}</span>
            </a>

            <a href="${config.contacts.maxMessenger.href}" target="_blank" class="contact-link" style="border-color: rgba(139, 92, 246, 0.3);">
                <span class="contact-label" style="color: #a78bfa;">${config.contacts.maxMessenger.label}</span>
                <span class="contact-value" style="color: #a78bfa;">${config.contacts.maxMessenger.value}</span>
            </a>
        `;
    }
}