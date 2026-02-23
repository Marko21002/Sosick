// Multilingual support for templates
// Add this script to both templates

const translations = {
    de: {
        title: 'Dr. Markus Weber — Zahnarzt Wien',
        book: 'Termin buchen',
        badge: '⭐️ 4.9/5 von 200+ Patienten',
        heroTitle: 'Ihr Zahnarzt in Wien mit Herz und moderner Technik',
        heroSubtitle: 'Seit über 15 Jahren sorgen wir für gesunde, schöne Zähne.',
        years: 'Jahre Erfahrung',
        patients: 'Zufriedene Patienten',
        recommend: 'Weiterempfehlung',
        cta: 'Kostenlosen Termin vereinbaren',
        about: 'Über uns',
        aboutTitle: 'Ihre Zahnarztpraxis im Herzen von Wien',
        services: 'Leistungen',
        contact: 'Kontakt',
        phone: 'Telefon',
        email: 'E-Mail',
        address: 'Adresse'
    },
    en: {
        title: 'Dr. Markus Weber — Dentist Vienna',
        book: 'Book appointment',
        badge: '⭐️ 4.9/5 from 200+ patients',
        heroTitle: 'Your dentist in Vienna with heart and modern technology',
        heroSubtitle: 'For over 15 years, we have been ensuring healthy, beautiful teeth.',
        years: 'Years experience',
        patients: 'Happy patients',
        recommend: 'Would recommend',
        cta: 'Schedule free appointment',
        about: 'About us',
        aboutTitle: 'Your dental practice in the heart of Vienna',
        services: 'Services',
        contact: 'Contact',
        phone: 'Phone',
        email: 'Email',
        address: 'Address'
    },
    ru: {
        title: 'Др. Маркус Вебер — Стоматолог Вена',
        book: 'Записаться',
        badge: '⭐️ 4.9/5 от 200+ пациентов',
        heroTitle: 'Ваш стоматолог в Вене с душой и современными технологиями',
        heroSubtitle: 'Более 15 лет мы заботимся о здоровых, красивых зубах.',
        years: 'Лет опыта',
        patients: 'Довольных пациентов',
        recommend: 'Рекомендуют',
        cta: 'Записаться бесплатно',
        about: 'О нас',
        aboutTitle: 'Ваша стоматология в центре Вены',
        services: 'Услуги',
        contact: 'Контакты',
        phone: 'Телефон',
        email: 'Почта',
        address: 'Адрес'
    }
};

function setLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    const t = translations[lang];
    document.title = t.title;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) el.textContent = t[key];
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setLang('de');
});
