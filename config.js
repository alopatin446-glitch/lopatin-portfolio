// Dynamic contacts config
const contacts = [
    { type: 'Email', value: 'anton@example.com', href: 'mailto:anton@example.com' },
    { type: 'Telegram', value: '@AntonLopatin', href: 'https://t.me/AntonLopatin' },
    { type: 'LinkedIn', value: 'Anton Lopatin', href: 'https://www.linkedin.com/in/anton-lopatin' },
];

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('dynamic-contacts');
    contacts.forEach(contact=>{
        const a = document.createElement('a');
        a.href = contact.href;
        a.textContent = `${contact.type}: ${contact.value}`;
        a.className = 'contact-link';
        a.style.color = '#b8925a';
        a.style.marginBottom = '0.5rem';
        container.appendChild(a);
    });
});