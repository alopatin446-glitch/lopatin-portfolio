// Находим в функции initDashboard место отрисовки контактов и приводим к чистому виду:
function initDashboard(config) {
    // Верхний системный статус-бар
    const sysCodeEl = document.getElementById("sys-code");
    const sysStatusEl = document.getElementById("sys-status");
    if (sysCodeEl) sysCodeEl.innerText = `[${config.profile.systemCode}]`;
    if (sysStatusEl) sysStatusEl.innerText = config.profile.statusText;

    // Ссылка/CTA внутри Hero блока
    const heroContactsEl = document.getElementById("hero-live-contacts");
    if (heroContactsEl) {
        heroContactsEl.innerHTML = `
            <a href="${config.contacts.telegram.href}" target="_blank" class="contact-link" style="padding: 10px 16px; margin:0; font-size:12px;">
                <span class="contact-value">${config.contacts.telegram.label}</span>
            </a>
        `;
    }

    // Основной терминал контактов внизу страницы
    const contactsContainer = document.getElementById("dynamic-contacts");
    if (contactsContainer) {
        contactsContainer.innerHTML = `
            <a href="${config.contacts.telegram.href}" target="_blank" class="contact-link">
                <span class="contact-label">${config.contacts.telegram.label}</span>
                <span class="contact-value">${config.contacts.telegram.value}</span>
            </a>
            <a href="${config.contacts.email.href}" class="contact-link">
                <span class="contact-label">${config.contacts.email.label}</span>
                <span class="contact-value">${config.contacts.email.value}</span>
            </a>
            <a href="${config.contacts.phone.href}" class="contact-link">
                <span class="contact-label">${config.contacts.phone.label}</span>
                <span class="contact-value">${config.contacts.phone.value}</span>
            </a>
        `;
    }
}