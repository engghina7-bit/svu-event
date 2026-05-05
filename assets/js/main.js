/* ===========================
   دليل فعاليات الجامعة الافتراضية
   ملف JavaScript الرئيسي
   =========================== */

// --- زر العودة للأعلى (Scroll to Top) ---
document.addEventListener('DOMContentLoaded', function() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// --- فلترة الفعاليات حسب التصنيف ---
function filterEvents(category) {
    const cards = document.querySelectorAll('.event-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // تحديث حالة الأزرار
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    cards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
            card.classList.add('fade-in', 'visible');
        } else {
            if (card.dataset.category === category) {
                card.style.display = 'block';
                card.classList.add('fade-in', 'visible');
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// --- فلترة حسب البحث النصي ---
function searchEvents() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.event-card');
    
    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const desc = card.querySelector('.card-text').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// --- فلترة حسب التاريخ ---
function filterByDate() {
    const dateInput = document.getElementById('dateFilter');
    if (!dateInput) return;
    
    const selectedDate = dateInput.value;
    const cards = document.querySelectorAll('.event-card');
    
    if (!selectedDate) {
        cards.forEach(card => card.style.display = 'block');
        return;
    }
    
    cards.forEach(card => {
        const cardDate = card.dataset.date;
        if (cardDate === selectedDate) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// --- التحقق من نموذج اتصل بنا ---
function validateContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const message = document.getElementById('contactMessage');
    const alertSuccess = document.getElementById('alertSuccess');
    const alertError = document.getElementById('alertError');
    
    // إخفاء الرسائل السابقة
    if (alertSuccess) alertSuccess.style.display = 'none';
    if (alertError) alertError.style.display = 'none';
    
    // إزالة تنسيقات الخطأ السابقة
    [name, email, message].forEach(field => {
        if (field) field.classList.remove('is-invalid');
    });
    
    let isValid = true;
    let errors = [];
    
    // التحقق من الاسم
    if (!name.value.trim()) {
        name.classList.add('is-invalid');
        errors.push('يرجى إدخال الاسم');
        isValid = false;
    }
    
    // التحقق من البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        email.classList.add('is-invalid');
        errors.push('يرجى إدخال البريد الإلكتروني');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        errors.push('صيغة البريد الإلكتروني غير صحيحة');
        isValid = false;
    }
    
    // التحقق من الرسالة
    if (!message.value.trim()) {
        message.classList.add('is-invalid');
        errors.push('يرجى إدخال الرسالة');
        isValid = false;
    }
    
    if (isValid) {
        // عرض رسالة النجاح
        if (alertSuccess) {
            alertSuccess.style.display = 'block';
            alertSuccess.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
        }
        // مسح الحقول
        name.value = '';
        email.value = '';
        message.value = '';
    } else {
        // عرض رسالة الخطأ
        if (alertError) {
            alertError.style.display = 'block';
            alertError.innerHTML = errors.join('<br>');
        }
    }
    
    return false;
}

// --- تأثير الظهور عند التمرير (Fade In on Scroll) ---
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => observer.observe(el));
});

// --- تفعيل الرابط النشط في شريط التنقل ---
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});

// --- حفظ تفضيلات التصنيف في localStorage ---
function saveFilterPreference(category) {
    localStorage.setItem('preferredCategory', category);
}

function loadFilterPreference() {
    return localStorage.getItem('preferredCategory') || 'all';
}

// --- تحميل التفضيلات عند فتح صفحة الفعاليات ---
document.addEventListener('DOMContentLoaded', function() {
    const savedCategory = loadFilterPreference();
    if (savedCategory !== 'all' && document.querySelector('.event-card')) {
        const btn = document.querySelector(`[data-category="${savedCategory}"]`);
        if (btn) btn.click();
    }
});
