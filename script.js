// ---------- DATA WITH REAL MAKEUP & SKINCARE PRODUCT IMAGES ----------
const products = [
    { id: 1, name: 'Mask Fit Cushion', price: 899, category: 'cushion', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center', rating: 4.5 },
    { id: 4, name: 'Glow Cushion', price: 999, category: 'cushion', img: 'https://images.unsplash.com/photo-1559599238-308793637427?w=300&h=300&fit=crop&crop=center', rating: 4.7 },
    { id: 8, name: 'Cover Cushion', price: 799, category: 'cushion', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop&crop=center', rating: 4.1 },
    { id: 2, name: 'Lip Tint Dewy', price: 549, category: 'tint', img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop&crop=center', rating: 4.2 },
    { id: 5, name: 'Velvet Tint', price: 649, category: 'tint', img: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center', rating: 4.3 },
    { id: 7, name: 'Watery Tint', price: 599, category: 'tint', img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop&crop=center', rating: 4.4 },
    { id: 14, name: 'Matte Lip Tint', price: 599, category: 'tint', img: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center', rating: 4.0 },
    { id: 3, name: 'Hydro Glow Spray', price: 1299, category: 'skincare', img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop&crop=center', rating: 4.8 },
    { id: 6, name: 'Revitalizing Cream', price: 1599, category: 'skincare', img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=300&fit=crop&crop=center', rating: 4.6 },
    { id: 13, name: 'Vitamin C Serum', price: 1199, category: 'skincare', img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop&crop=center', rating: 4.7 },
    { id: 9, name: 'Lip Sleeping Mask', price: 699, category: 'lipcare', img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop&crop=center', rating: 4.9 },
    { id: 11, name: 'Tint Gloss', price: 749, category: 'lipcare', img: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center', rating: 4.6 },
    { id: 10, name: 'Sheet Mask Set', price: 499, category: 'facemask', img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop&crop=center', rating: 4.4 },
    { id: 12, name: 'Calming Face Mask', price: 899, category: 'facemask', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center', rating: 4.3 }
];

let cart = [];
let wishlist = [];
let currentCategory = 'all';
let slideIndex = 0;
let isLoggedIn = false;
let pendingAction = null;
let pendingProductId = null;
let pendingQuantity = 1;

// ---------- USER DATA ----------
let userData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '********'
};

// ---------- DELIVERY TRACKING DATA ----------
let deliveryData = {
    orderId: '#TIRTIR-2026-001',
    orderDate: 'August 15, 2026',
    totalAmount: '₹1,499.00',
    paymentMethod: 'UPI',
    status: '📦 Out for Delivery',
    deliveryPerson: {
        name: 'Rahul Sharma',
        phone: '+91 98765 43210',
        email: 'rahul.delivery@tirtir.com',
        vehicle: 'Blue Tata Ace',
        id: 'DL-2026-045'
    },
    progress: 65,
    distance: '2.5 km away',
    estimatedTime: '35 minutes',
    otp: '123456'
};

let deliveryInterval = null;

// ---------- CHATBOT RESPONSES ----------
const chatbotResponses = {
    'best': '🌟 Our best-selling products are the **Mask Fit Cushion** (4.5⭐) and **Lip Tint Dewy** (4.2⭐)! They\'re customer favorites for a reason! Try them today!',
    'return': '🔄 We offer a **30-day return policy**. Items must be unused and in original packaging. Just contact our support team to initiate a return. Simple and hassle-free!',
    'shipping': '🚚 Yes! We offer **free shipping** on all orders above ₹999. Delivery typically takes 3-5 business days. You\'ll get a tracking link once shipped!',
    'cruelty': '🐰 Yes! All TIRTIR products are **100% cruelty-free** and never tested on animals. We love our furry friends! PETA certified!',
    'track': '📦 You can track your order by clicking on the **"Track"** button in the header or navigation menu. You\'ll see live location of your delivery with real-time updates!',
    'payment': '💳 We accept **Cash on Delivery**, **UPI**, **Google Pay**, **PhonePe**, and **Paytm**. All payments are secure and encrypted for your safety.',
    'delivery': '⏱️ Delivery usually takes **3-5 business days** within India. Express shipping available for select locations. You\'ll get a tracking link once your order is shipped.',
    'contact': '📞 You can reach our support team at **hello@tirtir.com** or call **+91 98765 43210**. We\'re here 9 AM - 6 PM, Mon-Fri! We\'d love to hear from you!',
    'default': 'Thanks for your question! 😊 Our team will get back to you shortly. In the meantime, feel free to browse our amazing collection of K-Beauty products!'
};

// ---------- DOM REFS ----------
const grid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const wishCount = document.getElementById('wishCount');
const cartPopup = document.getElementById('cartPopup');
const wishPopup = document.getElementById('wishPopup');
const cartItemsDiv = document.getElementById('cartItems');
const wishItemsDiv = document.getElementById('wishItems');
const cartTotalDiv = document.getElementById('cartTotal');
const paymentMsg = document.getElementById('paymentMsg');
const upiPinSection = document.getElementById('upiPinSection');
const upiPin = document.getElementById('upiPin');
const pinError = document.getElementById('pinError');
const celebrationPopup = document.getElementById('celebrationPopup');
const celebrationTotal = document.getElementById('celebrationTotal');
const feedbackPopup = document.getElementById('feedbackPopup');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');

// ---------- TOGGLE PASSWORD ----------
function togglePassword(inputId, element) {
    const input = document.getElementById(inputId);
    const icon = element.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// ---------- SLIDESHOW ----------
function changeSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function currentSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slideIndex = n;
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

setInterval(() => changeSlide(1), 5000);

// ---------- PAGE NAVIGATION ----------
function navigateTo(page) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(page + 'Page').classList.remove('hidden');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`.nav-link[data-page="${page}"]`)?.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        if (page) {
            navigateTo(page);
            if (page === 'profile') loadProfile();
            if (page === 'track') loadTrackPage();
        }
    });
});

// ---------- LOGIN VALIDATION ----------
function validateLoginForm() {
    let isValid = true;
    const name = document.getElementById('loginName').value.trim();
    const phone = document.getElementById('loginPhone').value.trim();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const confirmPassword = document.getElementById('loginConfirm').value.trim();
    const address = document.getElementById('loginAddress').value.trim();
    const terms = document.getElementById('termsCheckbox').checked;

    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters.';
        document.getElementById('loginName').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
        document.getElementById('loginName').classList.remove('error');
        document.getElementById('loginName').classList.add('success');
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        document.getElementById('phoneError').textContent = 'Enter a valid 10-digit phone number.';
        document.getElementById('loginPhone').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('phoneError').textContent = '';
        document.getElementById('loginPhone').classList.remove('error');
        document.getElementById('loginPhone').classList.add('success');
    }

    if (!email.includes('@') || !email.includes('.')) {
        document.getElementById('emailError').textContent = 'Enter a valid email address.';
        document.getElementById('loginEmail').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
        document.getElementById('loginEmail').classList.remove('error');
        document.getElementById('loginEmail').classList.add('success');
    }

    if (password.length < 8 || !/\d/.test(password)) {
        document.getElementById('passError').textContent = 'Password must be at least 8 characters with a number.';
        document.getElementById('loginPassword').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('passError').textContent = '';
        document.getElementById('loginPassword').classList.remove('error');
        document.getElementById('loginPassword').classList.add('success');
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmError').textContent = 'Passwords do not match.';
        document.getElementById('loginConfirm').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('confirmError').textContent = '';
        document.getElementById('loginConfirm').classList.remove('error');
        document.getElementById('loginConfirm').classList.add('success');
    }

    if (address.length < 10) {
        document.getElementById('addressError').textContent = 'Please enter a complete address (min 10 characters).';
        document.getElementById('loginAddress').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('addressError').textContent = '';
        document.getElementById('loginAddress').classList.remove('error');
        document.getElementById('loginAddress').classList.add('success');
    }

    if (!terms) {
        document.getElementById('termsError').textContent = 'You must agree to the Terms & Conditions.';
        isValid = false;
    } else {
        document.getElementById('termsError').textContent = '';
    }

    return isValid;
}

// ---------- LOGIN ----------
function showLogin(action, productId, quantity = 1) {
    pendingAction = action;
    pendingProductId = productId;
    pendingQuantity = quantity;
    loginModal.classList.remove('hidden');
    loginForm.reset();
    document.querySelectorAll('.success, .error').forEach(el => {
        el.classList.remove('success', 'error');
    });
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
}

document.getElementById('closeLogin').addEventListener('click', () => {
    loginModal.classList.add('hidden');
    pendingAction = null;
    pendingProductId = null;
    pendingQuantity = 1;
});

loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.add('hidden');
        pendingAction = null;
        pendingProductId = null;
        pendingQuantity = 1;
    }
});

document.querySelectorAll('#loginForm input, #loginForm textarea').forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('error', 'success');
        const errorEl = document.getElementById(this.id + 'Error');
        if (errorEl) errorEl.textContent = '';
    });
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateLoginForm()) {
        isLoggedIn = true;
        
        userData = {
            name: document.getElementById('loginName').value.trim(),
            phone: document.getElementById('loginPhone').value.trim(),
            email: document.getElementById('loginEmail').value.trim(),
            address: document.getElementById('loginAddress').value.trim(),
            password: document.getElementById('loginPassword').value.trim()
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        
        showToast('✅ Registration successful! Welcome to TIRTIR!');
        loginModal.classList.add('hidden');
        loginForm.reset();

        if (pendingAction && pendingProductId) {
            if (pendingAction === 'cart') {
                addToCart(pendingProductId, pendingQuantity);
            } else if (pendingAction === 'wishlist') {
                addToWishlist(pendingProductId);
            }
            pendingAction = null;
            pendingProductId = null;
            pendingQuantity = 1;
        }
    }
});

// ---------- PROFILE FUNCTIONS ----------
function loadProfile() {
    if (!isLoggedIn) {
        showToast('⚠️ Please login to view your profile.');
        navigateTo('home');
        return;
    }

    const savedData = localStorage.getItem('userData');
    if (savedData) {
        userData = JSON.parse(savedData);
    }

    document.getElementById('profileDisplayName').textContent = userData.name || 'User';
    document.getElementById('profileDisplayEmail').textContent = userData.email || 'user@example.com';
    
    document.getElementById('displayName').textContent = userData.name || 'Not set';
    document.getElementById('displayEmail').textContent = userData.email || 'Not set';
    document.getElementById('displayPhone').textContent = userData.phone || 'Not set';
    document.getElementById('displayAddress').textContent = userData.address || 'Not set';

    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        document.getElementById('profileImage').src = savedImage;
    } else {
        const initials = (userData.name || 'User').substring(0, 2).toUpperCase();
        document.getElementById('profileImage').src = `https://ui-avatars.com/api/?name=${initials}&background=ff1744&color=fff&size=150`;
    }
}

// ---------- PROFILE IMAGE UPLOAD ----------
document.getElementById('changeImageBtn').addEventListener('click', function() {
    if (!isLoggedIn) {
        showToast('⚠️ Please login to change profile image.');
        return;
    }
    document.getElementById('imageUpload').click();
});

document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageData = event.target.result;
            document.getElementById('profileImage').src = imageData;
            localStorage.setItem('profileImage', imageData);
            showToast('✅ Profile image updated successfully!');
        };
        reader.readAsDataURL(file);
    }
});

// ---------- EDIT PROFILE ----------
document.getElementById('editProfileBtn').addEventListener('click', function() {
    if (!isLoggedIn) {
        showToast('⚠️ Please login to edit your profile.');
        return;
    }
    
    document.getElementById('editName').value = userData.name || '';
    document.getElementById('editEmail').value = userData.email || '';
    document.getElementById('editPhone').value = userData.phone || '';
    document.getElementById('editAddress').value = userData.address || '';
    document.getElementById('editPassword').value = '';
    document.getElementById('editConfirmPassword').value = '';
    
    navigateTo('editProfile');
});

document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('editName').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const phone = document.getElementById('editPhone').value.trim();
    const address = document.getElementById('editAddress').value.trim();
    const password = document.getElementById('editPassword').value.trim();
    const confirmPassword = document.getElementById('editConfirmPassword').value.trim();
    
    if (name.length < 2) {
        showToast('⚠️ Name must be at least 2 characters.');
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        showToast('⚠️ Enter a valid email address.');
        return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        showToast('⚠️ Enter a valid 10-digit phone number.');
        return;
    }
    if (address.length < 10) {
        showToast('⚠️ Address must be at least 10 characters.');
        return;
    }
    
    if (password) {
        if (password.length < 8 || !/\d/.test(password)) {
            showToast('⚠️ Password must be at least 8 characters with a number.');
            return;
        }
        if (password !== confirmPassword) {
            showToast('⚠️ Passwords do not match.');
            return;
        }
        userData.password = password;
    }
    
    userData.name = name;
    userData.email = email;
    userData.phone = phone;
    userData.address = address;
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    showToast('✅ Profile updated successfully!');
    navigateTo('profile');
    setTimeout(loadProfile, 100);
});

function cancelEditProfile() {
    navigateTo('profile');
    setTimeout(loadProfile, 100);
}

// ---------- PROFILE BUTTON ----------
document.getElementById('profileBtn').addEventListener('click', function() {
    if (!isLoggedIn) {
        showToast('⚠️ Please login to view your profile.');
        return;
    }
    navigateTo('profile');
    setTimeout(loadProfile, 100);
});

// ---------- LOGOUT ----------
function logoutUser() {
    isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    userData = {
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '********'
    };
    showToast('👋 Logged out successfully!');
    navigateTo('home');
}

// ---------- TRACK PAGE ----------
function loadTrackPage() {
    if (!isLoggedIn) {
        showToast('⚠️ Please login to track your order.');
        navigateTo('home');
        return;
    }

    document.getElementById('trackOrderId').textContent = deliveryData.orderId;
    document.getElementById('trackOrderDate').textContent = deliveryData.orderDate;
    document.getElementById('trackOrderTotal').textContent = deliveryData.totalAmount;
    document.getElementById('trackPaymentMethod').textContent = deliveryData.paymentMethod;
    document.getElementById('trackOrderStatus').textContent = deliveryData.status;
    
    document.getElementById('deliveryName').textContent = deliveryData.deliveryPerson.name;
    document.getElementById('deliveryPhone').textContent = deliveryData.deliveryPerson.phone;
    document.getElementById('deliveryEmail').textContent = deliveryData.deliveryPerson.email;
    document.getElementById('deliveryVehicle').textContent = deliveryData.deliveryPerson.vehicle;
    document.getElementById('deliveryId').textContent = deliveryData.deliveryPerson.id;
    
    document.getElementById('deliveryProgress').style.width = deliveryData.progress + '%';
    document.getElementById('progressDistance').textContent = deliveryData.distance;
    document.getElementById('estimatedTime').textContent = deliveryData.estimatedTime;
    
    updateMapLocation();
}

// ---------- GOOGLE MAP INTEGRATION ----------
function updateMapLocation() {
    const mapElement = document.getElementById('googleMap');
    if (!mapElement) return;
    
    const progress = deliveryData.progress;
    let locationText = '📍 Live Location Tracking';
    let userLocation = '📍 Your Location: ' + (userData.address || 'Not set');
    
    if (progress < 25) {
        locationText = '🚚 Shop: 123 Gangnam-gu, Seoul';
    } else if (progress < 50) {
        locationText = '🚚 En Route: Passing through Hongdae';
    } else if (progress < 75) {
        locationText = '🚚 Near: Mapo District';
    } else if (progress < 100) {
        locationText = '🚚 Approaching: Your Location';
    } else {
        locationText = '✅ Delivered Successfully!';
    }
    
    mapElement.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:10px;width:100%;">
            <div style="display:flex;gap:20px;width:100%;justify-content:center;flex-wrap:wrap;">
                <div style="background:var(--bg);padding:8px 15px;border-radius:12px;border:1px solid var(--border);">
                    <i class="fas fa-store" style="color:var(--accent);margin-right:6px;"></i>
                    <span style="font-size:0.8rem;">Shop: Gangnam-gu</span>
                </div>
                <div style="background:var(--bg);padding:8px 15px;border-radius:12px;border:1px solid var(--border);">
                    <i class="fas fa-truck" style="color:#f9d71c;margin-right:6px;"></i>
                    <span style="font-size:0.8rem;">${locationText}</span>
                </div>
                <div style="background:var(--bg);padding:8px 15px;border-radius:12px;border:1px solid var(--border);">
                    <i class="fas fa-home" style="color:#00c853;margin-right:6px;"></i>
                    <span style="font-size:0.8rem;">${userLocation}</span>
                </div>
            </div>
            <div style="display:flex;gap:10px;margin-top:5px;flex-wrap:wrap;justify-content:center;">
                <span style="font-size:0.7rem;background:var(--bg);padding:2px 10px;border-radius:12px;">📱 GPS Active</span>
                <span style="font-size:0.7rem;background:var(--bg);padding:2px 10px;border-radius:12px;">🔴 Live</span>
                <span style="font-size:0.7rem;background:var(--bg);padding:2px 10px;border-radius:12px;">📡 Tracking</span>
            </div>
            <div style="font-size:0.7rem;color:var(--text-muted);margin-top:3px;">
                ⏱️ ${deliveryData.estimatedTime} remaining
            </div>
        </div>
    `;
}

// ---------- TRACK BUTTON ----------
document.getElementById('trackBtn').addEventListener('click', function() {
    if (!isLoggedIn) {
        showToast('⚠️ Please login to track your order.');
        return;
    }
    navigateTo('track');
    setTimeout(loadTrackPage, 100);
});

// ---------- UPDATE DELIVERY PROGRESS ----------
function updateDeliveryProgress() {
    if (deliveryData.progress < 100) {
        deliveryData.progress += Math.random() * 10;
        if (deliveryData.progress > 100) deliveryData.progress = 100;
        
        const distance = (100 - deliveryData.progress) / 100 * 10;
        deliveryData.distance = distance > 0 ? `${distance.toFixed(1)} km away` : '📍 Delivered';
        
        const time = Math.max(0, Math.round((100 - deliveryData.progress) / 100 * 45));
        deliveryData.estimatedTime = time > 0 ? `${time} minutes` : 'Delivered ✅';
        
        if (deliveryData.progress >= 100) {
            deliveryData.status = '📦 Out for Delivery - OTP Required';
            document.getElementById('trackOrderStatus').textContent = deliveryData.status;
        }
        
        if (document.getElementById('trackPage').classList.contains('active')) {
            document.getElementById('deliveryProgress').style.width = deliveryData.progress + '%';
            document.getElementById('progressDistance').textContent = deliveryData.distance;
            document.getElementById('estimatedTime').textContent = deliveryData.estimatedTime;
            updateMapLocation();
        }
    }
}

function startDeliverySimulation() {
    if (deliveryInterval) clearInterval(deliveryInterval);
    deliveryInterval = setInterval(updateDeliveryProgress, 3000);
}

// ---------- OTP VERIFICATION ----------
document.getElementById('verifyOtp').addEventListener('click', function() {
    const otp = document.getElementById('deliveryOtp').value.trim();
    const errorEl = document.getElementById('otpError');
    
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
        errorEl.textContent = 'Please enter a valid 6-digit OTP.';
        return;
    }
    
    if (otp === deliveryData.otp) {
        errorEl.textContent = '';
        showToast('✅ OTP verified successfully! Payment completed!');
        
        document.getElementById('trackOrderStatus').textContent = '✅ Delivered Successfully';
        document.getElementById('trackOrderStatus').style.color = '#00c853';
        document.getElementById('deliveryProgress').style.width = '100%';
        document.getElementById('progressDistance').textContent = '📍 Delivered';
        document.getElementById('estimatedTime').textContent = 'Delivered ✅';
        document.getElementById('trackPaymentMethod').textContent = '✅ Payment Completed';
        
        // Reset cart to zero after purchase
        cart = [];
        updateCartUI();
        
        // Show feedback popup after OTP verification
        setTimeout(() => {
            feedbackPopup.classList.remove('hidden');
        }, 1500);
    } else {
        errorEl.textContent = '❌ Invalid OTP. Please check your email for the correct OTP.';
    }
});

// ---------- RENDER PRODUCTS ----------
function renderProducts(category = 'all') {
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    if (grid) {
        grid.innerHTML = filtered.map(p => {
            const stars = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating));
            return `
                <div class="product-card" data-id="${p.id}">
                    <div class="image-wrapper">
                        <img src="${p.img}" alt="${p.name}" loading="lazy">
                    </div>
                    <h4>${p.name}</h4>
                    <div class="rating">${stars} ${p.rating}</div>
                    <div class="price">₹${p.price}</div>
                    <div class="quantity-section">
                        <label>Qty:</label>
                        <div class="qty-selector">
                            <button onclick="changeQuantity(${p.id}, -1)"><i class="fas fa-minus"></i></button>
                            <span class="qty-value" id="qty-${p.id}">1</span>
                            <button onclick="changeQuantity(${p.id}, 1)"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="actions">
                        <button onclick="handleAddToCartWithQty(${p.id})"><i class="fas fa-cart-plus"></i> Cart</button>
                        <button onclick="handleAddToWishlist(${p.id})"><i class="fas fa-heart"></i> Wish</button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// ---------- QUANTITY CONTROL ----------
function changeQuantity(productId, change) {
    const qtyElement = document.getElementById(`qty-${productId}`);
    if (!qtyElement) return;
    let currentQty = parseInt(qtyElement.textContent);
    let newQty = currentQty + change;
    if (newQty < 1) newQty = 1;
    if (newQty > 99) newQty = 99;
    qtyElement.textContent = newQty;
}

function getQuantity(productId) {
    const qtyElement = document.getElementById(`qty-${productId}`);
    if (!qtyElement) return 1;
    return parseInt(qtyElement.textContent) || 1;
}

// ---------- HANDLE CART/WISHLIST WITH LOGIN ----------
function handleAddToCartWithQty(id) {
    const quantity = getQuantity(id);
    if (!isLoggedIn) {
        showLogin('cart', id, quantity);
        return;
    }
    addToCart(id, quantity);
}

function handleAddToWishlist(id) {
    if (!isLoggedIn) {
        showLogin('wishlist', id, 1);
        return;
    }
    addToWishlist(id);
}

// ---------- CART ----------
function addToCart(id, quantity = 1) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty = (existing.qty || 1) + quantity;
    } else {
        cart.push({ ...product, qty: quantity });
    }
    updateCartUI();
    showToast(`🛒 ${quantity} × ${product.name} added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    renderCartPopup();
    showToast('🗑️ Item removed from cart.');
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    cartCount.textContent = totalItems;
    renderCartPopup();
}

function renderCartPopup() {
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalDiv.textContent = '';
        return;
    }
    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-details">
                <strong>${item.name}</strong>
                <br><span style="color: var(--accent);">₹${(item.price * (item.qty || 1)).toFixed(2)}</span>
                <br><small style="color: var(--text-muted);">Quantity: ${item.qty || 1}</small>
            </div>
            <div class="item-actions">
                <button class="qty-btn" onclick="updateCartQty(${item.id}, ${(item.qty || 1) - 1})"><i class="fas fa-minus"></i></button>
                <span style="min-width: 24px; text-align: center;">${item.qty || 1}</span>
                <button class="qty-btn" onclick="updateCartQty(${item.id}, ${(item.qty || 1) + 1})"><i class="fas fa-plus"></i></button>
                <button onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
    cartTotalDiv.textContent = `Total: ₹${total.toFixed(2)}`;
}

function updateCartQty(id, newQty) {
    if (newQty <= 0) { removeFromCart(id); return; }
    const item = cart.find(i => i.id === id);
    if (item) item.qty = newQty;
    updateCartUI();
    renderCartPopup();
}

// ---------- WISHLIST ----------
function addToWishlist(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    if (wishlist.some(item => item.id === id)) {
        showToast(`💔 ${product.name} already in wishlist.`);
        return;
    }
    wishlist.push({ ...product });
    updateWishlistUI();
    showToast(`❤️ ${product.name} added to wishlist!`);
}

function removeFromWishlist(id) {
    wishlist = wishlist.filter(item => item.id !== id);
    updateWishlistUI();
    renderWishPopup();
    showToast('🗑️ Item removed from wishlist.');
}

function updateWishlistUI() {
    wishCount.textContent = wishlist.length;
    renderWishPopup();
}

function renderWishPopup() {
    if (wishlist.length === 0) {
        wishItemsDiv.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }
    wishItemsDiv.innerHTML = wishlist.map(item => `
        <div class="cart-item">
            <div class="item-details">
                <strong>${item.name}</strong>
                <br><span style="color: var(--accent);">₹${item.price}</span>
            </div>
            <div class="item-actions">
                <button onclick="addToCart(${item.id}, 1); removeFromWishlist(${item.id});"><i class="fas fa-cart-plus"></i></button>
                <button onclick="removeFromWishlist(${item.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

// ---------- PAYMENT ----------
function processPayment(method) {
    if (cart.length === 0) { paymentMsg.textContent = '❌ Cart is empty!'; return; }
    const total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
    
    // Show UPI PIN for UPI payments
    if (method === 'UPI' || method === 'Google Pay' || method === 'PhonePe' || method === 'Paytm') {
        upiPinSection.classList.remove('hidden');
        paymentMsg.textContent = '';
        pinError.textContent = '';
        upiPinSection.dataset.method = method;
        return;
    }
    
    completePayment(method, total);
}

function completePayment(method, total) {
    paymentMsg.textContent = `✅ ${method} payment of ₹${total.toFixed(2)} successful!`;
    
    deliveryData.totalAmount = `₹${total.toFixed(2)}`;
    deliveryData.paymentMethod = method;
    deliveryData.orderDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    deliveryData.progress = 10;
    deliveryData.distance = '9.5 km away';
    deliveryData.estimatedTime = '45 minutes';
    deliveryData.status = '📦 Out for Delivery - OTP Required';
    
    // Generate OTP (6 digits)
    deliveryData.otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    showToast(`📧 OTP sent to your registered email: ${deliveryData.otp}`);
    
    setTimeout(() => {
        cart = [];
        updateCartUI();
        paymentMsg.textContent = '';
        cartPopup.classList.add('hidden');
        upiPinSection.classList.add('hidden');
        showCelebration(total);
        showToast('🎉 Order placed successfully! Track your order in the Track section.');
        startDeliverySimulation();
    }, 1500);
}

// ---------- UPI PAYMENT CONFIRMATION ----------
document.getElementById('confirmUpiPay').addEventListener('click', function() {
    const pin = upiPin.value.trim();
    const method = upiPinSection.dataset.method || 'UPI';
    
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        pinError.textContent = 'Please enter a valid 4-digit UPI PIN.';
        return;
    }
    
    pinError.textContent = '';
    const total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
    completePayment(method, total);
});

// ---------- PAYMENT BUTTONS ----------
document.getElementById('codPay').addEventListener('click', function() {
    processPayment('Cash on Delivery');
});

document.getElementById('upiPay').addEventListener('click', function() {
    processPayment('UPI');
});

document.getElementById('gpayPay').addEventListener('click', function() {
    processPayment('Google Pay');
});

document.getElementById('phonepePay').addEventListener('click', function() {
    processPayment('PhonePe');
});

document.getElementById('paytmPay').addEventListener('click', function() {
    processPayment('Paytm');
});

// ---------- CELEBRATION ----------
function showCelebration(total) {
    celebrationTotal.textContent = `Total Amount: ₹${total.toFixed(2)}`;
    celebrationPopup.classList.remove('hidden');
}

function closeCelebration() {
    celebrationPopup.classList.add('hidden');
    setTimeout(() => {
        navigateTo('track');
        setTimeout(loadTrackPage, 100);
    }, 500);
}

// ---------- POPUP CONTROLS ----------
function showToast(msg) {
    const old = document.querySelector('.toast-msg');
    if (old) old.remove();
    const div = document.createElement('div');
    div.className = 'toast-msg';
    div.textContent = msg;
    Object.assign(div.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--card-bg)',
        color: 'var(--text)',
        padding: '0.8rem 2rem',
        borderRadius: '30px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
        zIndex: '9999',
        transition: '0.3s',
        fontWeight: '500'
    });
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

// ---------- THEME ----------
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    sunIcon.style.opacity = isLight ? '1' : '0.5';
    moonIcon.style.opacity = isLight ? '0.5' : '1';
});

// ---------- COOKIE ----------
const cookiePopup = document.getElementById('cookiePopup');
document.getElementById('acceptCookies').addEventListener('click', () => {
    cookiePopup.classList.add('hidden');
    localStorage.setItem('cookieConsent', 'accepted');
});
document.getElementById('declineCookies').addEventListener('click', () => {
    cookiePopup.classList.add('hidden');
});
if (localStorage.getItem('cookieConsent')) cookiePopup.classList.add('hidden');

// ---------- CATEGORY TABS ----------
document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.dataset.cat;
        renderProducts(currentCategory);
        if (!document.getElementById('homePage').classList.contains('active')) {
            navigateTo('home');
        }
    });
});

// ---------- CLICK TABS ----------
document.querySelectorAll('.click-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.click-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const target = this.dataset.tab;
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        document.getElementById(`${target}Content`).classList.remove('hidden');
    });
});

// ---------- NAV DROPDOWN ----------
document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const cat = this.dataset.cat;
        navigateTo('home');
        setTimeout(() => {
            document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`.cat-tab[data-cat="${cat}"]`)?.classList.add('active');
            currentCategory = cat;
            renderProducts(cat);
        }, 300);
    });
});

// ---------- FOOTER CATEGORY LINKS ----------
document.querySelectorAll('.footer-cat-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const cat = this.dataset.cat;
        navigateTo('home');
        setTimeout(() => {
            document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`.cat-tab[data-cat="${cat}"]`)?.classList.add('active');
            currentCategory = cat;
            renderProducts(cat);
        }, 300);
    });
});

// ---------- CART / WISHLIST POPUP CONTROLS ----------
document.getElementById('cartBtn').addEventListener('click', () => {
    if (!isLoggedIn) {
        showLogin('view_cart', null);
        return;
    }
    renderCartPopup();
    cartPopup.classList.remove('hidden');
});

document.getElementById('closeCart').addEventListener('click', () => {
    cartPopup.classList.add('hidden');
    upiPinSection.classList.add('hidden');
});

document.getElementById('wishBtn').addEventListener('click', () => {
    if (!isLoggedIn) {
        showLogin('view_wishlist', null);
        return;
    }
    renderWishPopup();
    wishPopup.classList.remove('hidden');
});

document.getElementById('closeWish').addEventListener('click', () => wishPopup.classList.add('hidden'));
cartPopup.addEventListener('click', (e) => {
    if (e.target === cartPopup) {
        cartPopup.classList.add('hidden');
        upiPinSection.classList.add('hidden');
    }
});
wishPopup.addEventListener('click', (e) => {
    if (e.target === wishPopup) wishPopup.classList.add('hidden');
});

// ---------- CLEAR ----------
document.getElementById('clearCart').addEventListener('click', () => {
    cart = [];
    updateCartUI();
    renderCartPopup();
    showToast('🗑️ Cart cleared.');
});
document.getElementById('clearWish').addEventListener('click', () => {
    wishlist = [];
    updateWishlistUI();
    renderWishPopup();
    showToast('🗑️ Wishlist cleared.');
});

// ---------- HERO SHOP ----------
document.getElementById('heroShopBtn').addEventListener('click', () => {
    navigateTo('home');
    setTimeout(() => {
        document.querySelector('.product-grid')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
});

// ---------- CHATBOT ----------
const chatToggle = document.getElementById('chatToggle');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

chatToggle.addEventListener('click', () => chatBody.classList.toggle('hidden'));

function addChatMessage(msg, type = 'bot') {
    const div = document.createElement('div');
    div.className = type === 'bot' ? 'bot-msg' : 'user-msg';
    div.innerHTML = msg;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSend.addEventListener('click', () => {
    const msg = chatInput.value.trim();
    if (!msg) return;
    addChatMessage(msg, 'user');
    chatInput.value = '';
    setTimeout(() => {
        const lower = msg.toLowerCase();
        let reply = chatbotResponses.default;
        if (lower.includes('best') || lower.includes('top') || lower.includes('selling')) reply = chatbotResponses.best;
        else if (lower.includes('return') || lower.includes('refund') || lower.includes('exchange')) reply = chatbotResponses.return;
        else if (lower.includes('shipping') || lower.includes('delivery') || lower.includes('ship')) reply = chatbotResponses.shipping;
        else if (lower.includes('cruelty') || lower.includes('animal') || lower.includes('test')) reply = chatbotResponses.cruelty;
        else if (lower.includes('track') || lower.includes('order') || lower.includes('where')) reply = chatbotResponses.track;
        else if (lower.includes('payment') || lower.includes('pay') || lower.includes('card')) reply = chatbotResponses.payment;
        else if (lower.includes('time') || lower.includes('days') || lower.includes('week')) reply = chatbotResponses.delivery;
        else if (lower.includes('contact') || lower.includes('support') || lower.includes('help')) reply = chatbotResponses.contact;
        addChatMessage(reply);
    }, 500);
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') chatSend.click();
});

document.querySelectorAll('.quick-q').forEach(btn => {
    btn.addEventListener('click', function() {
        const q = this.dataset.q;
        const labels = {
            'best': 'What are your best-selling products?',
            'return': 'What is the return policy?',
            'shipping': 'Do you offer free shipping?',
            'cruelty': 'Are your products cruelty-free?',
            'track': 'How to track my order?',
            'payment': 'What payment methods do you accept?',
            'delivery': 'How long does delivery take?',
            'contact': 'How can I contact support?'
        };
        addChatMessage(labels[q] || q, 'user');
        setTimeout(() => {
            addChatMessage(chatbotResponses[q] || chatbotResponses.default);
        }, 500);
    });
});

// ---------- FEEDBACK ----------
const closeFeedback = document.getElementById('closeFeedback');
const feedbackForm = document.getElementById('feedbackForm');
const starRating = document.getElementById('starRating');
let selectedRating = 0;

closeFeedback.addEventListener('click', () => feedbackPopup.classList.add('hidden'));
feedbackPopup.addEventListener('click', (e) => {
    if (e.target === feedbackPopup) feedbackPopup.classList.add('hidden');
});

document.getElementById('feedbackLink').addEventListener('click', (e) => {
    e.preventDefault();
    feedbackPopup.classList.remove('hidden');
});

starRating.querySelectorAll('i').forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = parseInt(this.dataset.rating);
        starRating.querySelectorAll('i').forEach(s => s.classList.toggle('active', parseInt(s.dataset.rating) <= selectedRating));
        document.getElementById('ratingError').textContent = '';
    });
});

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('feedbackName').value.trim();
    if (!name) { alert('Please enter your name.'); return; }
    if (selectedRating === 0) {
        document.getElementById('ratingError').textContent = 'Please select a rating.';
        return;
    }
    showToast('🌟 Thank you for your feedback!');
    feedbackPopup.classList.add('hidden');
    feedbackForm.reset();
    selectedRating = 0;
    starRating.querySelectorAll('i').forEach(s => s.classList.remove('active'));
});

// ---------- CONTACT FORM ----------
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('📧 Message sent! We\'ll get back to you soon.');
    e.target.reset();
});

// ---------- CHECK LOGIN STATUS ON LOAD ----------
window.addEventListener('load', function() {
    const savedLogin = localStorage.getItem('isLoggedIn');
    if (savedLogin === 'true') {
        isLoggedIn = true;
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            userData = JSON.parse(savedData);
        }
    }
    
    if (deliveryData.progress > 0 && deliveryData.progress < 100) {
        startDeliverySimulation();
    }
});

// ---------- INIT ----------
renderProducts('all');
updateCartUI();
updateWishlistUI();
