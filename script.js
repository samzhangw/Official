document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Added: Update active class on menu items
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Create and add a close button to the menu
    const closeButton = document.createElement('div');
    closeButton.className = 'menu-close';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    navMenu.prepend(closeButton);
    
    // Add event listener to close button
    closeButton.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Handle accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            
            if(currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            item.classList.toggle('active');
        });
    });
    
    // Enhanced animations for header elements with staggered effect
    const headerElements = document.querySelectorAll('header h1, header p');
    headerElements.forEach((el, index) => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.animation = index === 0 
                ? 'fadeInDown 1.2s ease-out forwards' 
                : 'fadeInUp 1.5s ease-out forwards';
        }, index * 300);
    });
    
    // Enhanced animation for feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = `opacity 0.8s ease-out ${index * 0.2}s, transform 0.8s ease-out ${index * 0.2}s`;
        item.classList.add('animate-on-scroll');
    });
    
    // Fetch regions data from Google Apps Script
    fetchRegionsData();
    
    // Improved scroll animation
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.1;
            
            if(elementPosition < screenPosition) {
                element.classList.add('animate-visible');
            }
        });
    };
    
    // Initial check and add scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollPosition = window.scrollY;
        header.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });

    // Add touchstart event for better mobile experience
    const touchItems = document.querySelectorAll('.feature-item, .region-card, .btn, .accordion-header');
    touchItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 150);
        }, {passive: true});
    });

    // Handle dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Update icon based on current theme
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Handle back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Update copyright year automatically
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    
    // Handle quick access toggle
    const quickAccessToggle = document.querySelector('.quick-access-toggle');
    const quickAccess = document.querySelector('.quick-access');
    
    quickAccessToggle.addEventListener('click', () => {
        quickAccess.classList.toggle('active');
        
        if (quickAccess.classList.contains('active')) {
            quickAccessToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            quickAccessToggle.innerHTML = '<i class="fas fa-bolt"></i>';
        }
    });
    
    // Close quick access panel when clicking outside
    document.addEventListener('click', (e) => {
        if (quickAccess.classList.contains('active') && 
            !quickAccess.contains(e.target) && 
            !quickAccessToggle.contains(e.target)) {
            quickAccess.classList.remove('active');
            quickAccessToggle.innerHTML = '<i class="fas fa-bolt"></i>';
        }
        
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Add viewport height fix for mobile browsers
    const setMobileHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setMobileHeight();
    window.addEventListener('resize', setMobileHeight);
});

// Function to fetch regions data from Google Apps Script
function fetchRegionsData() {
    const regionCardsContainer = document.getElementById('region-cards');
    const appScriptUrl = 'https://script.google.com/macros/s/AKfycbyQMWKX71tEa4JV_9Lv1aBH5ukeWn2PrG9-pthpVKXhg6QSUFujRFQtqWRPfPGGio17/exec';
    
    fetch(appScriptUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Clear loading spinner
            regionCardsContainer.innerHTML = '';
            
            // Create region cards from the data
            data.regions.forEach(region => {
                const regionCard = createRegionCard(region);
                regionCardsContainer.appendChild(regionCard);
            });
            
            // Reinitialize animations for the new cards
            const newRegionCards = document.querySelectorAll('.region-card');
            newRegionCards.forEach((card, index) => {
                card.style.animationDelay = (index * 0.15) + 's';
                card.classList.add('animate-on-scroll');
                
                // Add floating animation
                setInterval(() => {
                    card.style.transform = 'translateY(-5px)';
                    setTimeout(() => {
                        card.style.transform = 'translateY(0)';
                    }, 1000);
                }, 3000 + (index * 1000));
            });
            
            // Trigger animation check
            const animateOnScroll = function() {
                const elements = document.querySelectorAll('.animate-on-scroll');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.1;
                    
                    if(elementPosition < screenPosition) {
                        element.classList.add('animate-visible');
                    }
                });
            };
            animateOnScroll();
        })
        .catch(error => {
            console.error('Error fetching regions data:', error);
            regionCardsContainer.innerHTML = `
                <div class="api-error">
                    <h3><i class="fas fa-exclamation-circle"></i> 無法載入區域資料</h3>
                    <p>連線至後端系統時發生錯誤，請稍後再試。</p>
                    <button class="retry-button" onclick="fetchRegionsData()">
                        <i class="fas fa-redo"></i> 重新嘗試
                    </button>
                </div>
            `;
        });
}

// Function to create a region card element
function createRegionCard(region) {
    const card = document.createElement('div');
    card.className = 'region-card';
    
    card.innerHTML = `
        <div class="region-icon">
            <i class="fas fa-map-marker-alt"></i>
        </div>
        <h3>${region.name}</h3>
        <p>${region.description}</p>
        <a href="${region.url}" class="btn" target="_blank">前往查詢</a>
    `;
    
    return card;
}