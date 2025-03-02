document.addEventListener('DOMContentLoaded', function() {
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
    
    // Remove all animation-related code
    
    // Remove header elements animations
    const headerElements = document.querySelectorAll('header h1, header p');
    headerElements.forEach((el, index) => {
        el.style.opacity = '1';
        el.style.animation = 'none';
    });
    
    // Remove intro section animations
    const introTitle = document.querySelector('.intro h2');
    const introDesc = document.querySelector('.intro > p');
    if (introTitle && introDesc) {
        [introTitle, introDesc].forEach((el, index) => {
            el.style.opacity = '1';
            el.style.animation = 'none';
        });
    }
    
    // Remove feature items animations
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '1';
        item.style.transform = 'none';
        item.style.transition = 'none';
        item.classList.remove('animate-on-scroll');
    });
    
    // Remove intro items animations
    const introItems = document.querySelectorAll('.intro-item');
    introItems.forEach((item, index) => {
        item.style.opacity = '1';
        item.style.transform = 'none';
        item.style.transition = 'none';
        item.classList.remove('animate-on-scroll');
    });
    
    // Remove scroll animation functionality
    
    // Remove parallax effect
    window.removeEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.style.backgroundPosition = 'center center';
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
    });
    
    // Add viewport height fix for mobile browsers
    const setMobileHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setMobileHeight();
    window.addEventListener('resize', setMobileHeight);

    // Fetch regions data from Google Apps Script
    fetchRegionsData();

    // Handle menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', handleContactFormSubmit);
});

// Function to handle contact form submission
function handleContactFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Replace with your Google Apps Script deployment URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyQMWKX71tEa4JV_9Lv1aBH5ukeWn2PrG9-pthpVKXhg6QSUFujRFQtqWRPfPGGio17/exec';

    // Create form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    fetch(scriptURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Bypass CORS issues in client-side scripts
    })
    .then(response => {
        console.log('Success!', response);
        alert('訊息已成功送出！'); // Notify the user of successful submission

        // Clear the form
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('訊息傳送失敗，請稍後再試。'); // Notify the user of submission failure
    });
}

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
            
            // Remove animations for the new cards
            const newRegionCards = document.querySelectorAll('.region-card');
            newRegionCards.forEach((card, index) => {
                card.style.animationDelay = '0s';
                card.classList.remove('animate-on-scroll');
                
                // Remove floating animation
                clearInterval(); // Clear any animation intervals
                card.style.transform = 'none';
            });
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

// Function to create a region card element with enhanced design
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