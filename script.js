// Current language state
let currentLang = 'en';

// Obfuscated personal data (Base64 encoded and split into parts)
const obfuscatedData = {
    // "Radomir Mazoń" split and encoded with UTF-8 support
    name: ['UmFkb21pci', 'BNYXpv', 'xYQ='],
    // "+48 669 889 224" split and encoded
    phone: ['KzQ4', 'IDY2', 'OSA4', 'ODkgMjI0'],
    // "radomir@mazon.pl" split and encoded
    email: ['cmFkb2', '1pckBt', 'YXpvbi5wbA==']
};

// Decode Base64 string with UTF-8 support
function decodeBase64(str) {
    // Modern approach for UTF-8 decoding
    const binary = atob(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
}

// Decode and display personal data
function decodePersonalData() {
    // Decode name by assembling parts
    const nameEl = document.getElementById('name-data');
    if (nameEl) {
        const encodedName = obfuscatedData.name.join('');
        nameEl.textContent = decodeBase64(encodedName);
    }

    // Decode phone by assembling parts
    const phoneEl = document.getElementById('phone-data');
    if (phoneEl) {
        const encodedPhone = obfuscatedData.phone.join('');
        phoneEl.textContent = decodeBase64(encodedPhone);
    }

    // Decode email by assembling parts
    const emailEl = document.getElementById('email-data');
    if (emailEl) {
        const encodedEmail = obfuscatedData.email.join('');
        emailEl.textContent = decodeBase64(encodedEmail);
    }
}

// Toggle language function
function toggleLanguage() {
    const langBtn = document.getElementById('langBtn');

    if (currentLang === 'en') {
        currentLang = 'pl';
        langBtn.textContent = 'EN';
        updateContent('pl');
    } else {
        currentLang = 'en';
        langBtn.textContent = 'PL';
        updateContent('en');
    }
}

// Update all content based on selected language
function updateContent(lang) {
    const elements = document.querySelectorAll('[data-en][data-pl]');

    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Toggle project descriptions visibility
function initProjectToggles() {
    const toggles = document.querySelectorAll('.projects-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Find the parent cv-item to locate summary and details within it
            const cvItem = toggle.closest('.cv-item');
            if (!cvItem) return;

            const summary = cvItem.querySelector('.projects-summary');
            const details = cvItem.querySelector('.projects-details');

            if (summary && details) {
                // Toggle visibility
                if (details.classList.contains('visible')) {
                    details.classList.remove('visible');
                    summary.style.display = 'block';
                } else {
                    details.classList.add('visible');
                    summary.style.display = 'none';
                }
            }
        });
    });
}

// Toggle older courses visibility
function initCoursesToggle() {
    const toggleButton = document.querySelector('.courses-toggle');
    const olderCourses = document.querySelector('.older-courses');
    const toggleContainer = document.querySelector('.courses-toggle-container');

    if (toggleButton && olderCourses) {
        toggleButton.addEventListener('click', function() {
            // Show older courses and hide the button
            olderCourses.classList.add('visible');
            if (toggleContainer) {
                toggleContainer.style.display = 'none';
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Decode and display personal data
    decodePersonalData();

    // Set default language to English
    updateContent('en');

    // Initialize project toggles
    initProjectToggles();

    // Initialize courses toggle
    initCoursesToggle();
});
