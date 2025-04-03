// Products Data
const products = [
    {
        id: 1,
        name: 'Colar Veneziano',
        price: 'R$ 1.299,00',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
        description: 'Colar artesanal banhado a ouro 18k com design veneziano exclusivo',
        badge: 'Novo',
        category: 'Colares'
    },
    {
        id: 2,
        name: 'Anel Solitário Diamond',
        price: 'R$ 2.499,00',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600',
        description: 'Anel em ouro branco 18k com diamante central de 20 pontos',
        badge: 'Luxo',
        category: 'Anéis'
    },
    {
        id: 3,
        name: 'Brincos Crystal Star',
        price: 'R$ 899,00',
        image: 'https://images.unsplash.com/photo-1587467512961-120760940315?w=600',
        description: 'Brincos com cristais Swarovski em base de prata 925',
        badge: 'Destaque',
        category: 'Brincos'
    },
    {
        id: 4,
        name: 'Pulseira Charm Gold',
        price: 'R$ 1.699,00',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600',
        description: 'Pulseira em ouro 18k com pingentes personalizáveis',
        badge: 'Premium',
        category: 'Pulseiras'
    }
];

// Load Products with Animation
function loadProducts() {
    const productsGrid = document.querySelector('.products-grid');
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(20px)';
        
        productCard.innerHTML = `
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${product.price}</p>
                <button class="product-btn">Ver Detalhes</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);

        // Animate product cards
        setTimeout(() => {
            productCard.style.transition = 'all 0.6s ease';
            productCard.style.opacity = '1';
            productCard.style.transform = 'translateY(0)';
        }, 100 * index);

        // Add click event to product button
        const button = productCard.querySelector('.product-btn');
        button.addEventListener('click', () => {
            // Aqui você pode adicionar a lógica para mostrar mais detalhes do produto
            alert(`Em breve você poderá ver mais detalhes sobre ${product.name}`);
        });
    });
}

// Mobile Menu Toggle with Animation
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const spans = menuToggle.querySelectorAll('span');
    
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        
        // Animate hamburger to X
        spans.forEach((span, index) => {
            span.style.transition = 'transform 0.3s ease';
            if (navList.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
}

// Newsletter Form with Validation and Animation
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');
    
    input.addEventListener('input', () => {
        const isValid = input.checkValidity();
        button.style.opacity = isValid ? '1' : '0.7';
        button.style.transform = isValid ? 'translateY(0)' : 'translateY(2px)';
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = input.value;
        
        // Animate button on submit
        button.style.transform = 'scale(0.95)';
        setTimeout(() => button.style.transform = 'scale(1)', 100);
        
        // Show success message with animation
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = `Obrigado por se cadastrar! Em breve você receberá nossas novidades em ${email}`;
        successMessage.style.opacity = '0';
        
        form.insertAdjacentElement('afterend', successMessage);
        
        setTimeout(() => {
            successMessage.style.transition = 'opacity 0.3s ease';
            successMessage.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => successMessage.remove(), 300);
        }, 3000);
        
        form.reset();
    });
}

// Smooth Scroll with Progress Indicator
function setupSmoothScroll() {
    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                document.querySelector('.nav-list').classList.remove('active');
                // Reset hamburger menu
                const spans = document.querySelectorAll('.menu-toggle span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    });
}

// Intersection Observer for Animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupMobileMenu();
    setupNewsletterForm();
    setupSmoothScroll();
    setupScrollAnimations();
    
    // Add some CSS for new animations
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--color-secondary);
            z-index: 1001;
            transition: width 0.2s ease;
        }
        
        .success-message {
            background: rgba(46, 204, 113, 0.9);
            color: white;
            padding: 15px;
            border-radius: 30px;
            margin-top: 20px;
            text-align: center;
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .product-description {
            color: var(--color-text);
            opacity: 0.8;
            margin: 10px 0;
            font-size: 0.9rem;
        }
        
        .product-btn {
            margin-top: 15px;
            padding: 10px 25px;
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(style);
});