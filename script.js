document.addEventListener('DOMContentLoaded', function() {
    // 設置Particles.js (如果存在)
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // 導航欄滾動效果
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 下拉選單在移動設備上的處理
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    
    if (window.innerWidth <= 992) {
        navDropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');
            
            dropdownLink.addEventListener('click', function(e) {
                // 只有在移動設備模式下才阻止默認行為
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
    }

    // 處理手風琴功能
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        // 設置內容的最大高度
        if(item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
        
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            
            if(currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.accordion-content').style.maxHeight = null;
            }
            
            item.classList.toggle('active');
            
            if(item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });
    
    // 處理深色模式切換
    const themeToggle = document.querySelector('.theme-toggle');
    
    // 檢查儲存的主題偏好或尊重系統偏好
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        updateThemeIcon();
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // 儲存主題偏好
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        
        updateThemeIcon();
    });
    
    function updateThemeIcon() {
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    // 處理回到頂部按鈕
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
    
    // 更新版權年份
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    
    // 處理快速訪問切換
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
    
    // 點擊外部關閉快速訪問面板
    document.addEventListener('click', (e) => {
        if (quickAccess.classList.contains('active') && 
            !quickAccess.contains(e.target) && 
            !quickAccessToggle.contains(e.target)) {
            quickAccess.classList.remove('active');
            quickAccessToggle.innerHTML = '<i class="fas fa-bolt"></i>';
        }
    });
    
    // 添加viewport高度修復，適用於移動瀏覽器
    const setMobileHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setMobileHeight();
    window.addEventListener('resize', setMobileHeight);

    // 獲取區域數據
    fetchRegionsData();

    // 處理選單切換
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // 處理聯繫表單提交
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', handleContactFormSubmit);

    // 滾動到區塊時的平滑效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // 只處理內部導航連結
            if (this.classList.contains('nav-link') && !this.parentElement.classList.contains('nav-dropdown')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // 如果導航選單是開啟的，關閉它
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                    
                    // 更新活動導航項目
                    document.querySelectorAll('.nav-menu a').forEach(item => {
                        item.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });

    // 滾動時更新活動導航項目
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-menu a').forEach(navItem => {
            navItem.classList.remove('active');
            if (navItem.getAttribute('href') === `#${current}`) {
                navItem.classList.add('active');
            }
        });
    });
});

// 處理聯繫表單提交
function handleContactFormSubmit(event) {
    event.preventDefault(); // 防止表單默認提交

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const hCaptchaResponse = hcaptcha.getResponse();

    if (!hCaptchaResponse) {
        alert('請完成機器人驗證。');
        return;
    }

    // Google Apps Script部署URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyQMWKX71tEa4JV_9Lv1aBH5ukeWn2PrG9-pthpVKXhg6QSUFujRFQtqWRPfPGGio17/exec';

    // 創建表單數據
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('hCaptchaResponse', hCaptchaResponse);

    // 顯示提交中狀態
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';

    fetch(scriptURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // 繞過CORS問題
    })
    .then(response => {
        console.log('Success!', response);
        alert('訊息已成功送出！'); // 通知用戶提交成功

        // 清空表單
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';

        // 重置hCaptcha
        hcaptcha.reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('訊息傳送失敗，請稍後再試。'); // 通知用戶提交失敗
    })
    .finally(() => {
        // 恢復按鈕狀態
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    });
}

// 獲取區域數據
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
            // 清除加載提示
            regionCardsContainer.innerHTML = '';
            
            // 創建區域卡片
            if (data.regions && data.regions.length > 0) {
                data.regions.forEach(region => {
                    const regionCard = createRegionCard(region);
                    regionCardsContainer.appendChild(regionCard);
                });
            } else {
                // 如果沒有數據，顯示備用卡片
                createBackupRegionCards(regionCardsContainer);
            }
        })
        .catch(error => {
            console.error('Error fetching regions data:', error);
            // 顯示錯誤信息並加載備用卡片
            regionCardsContainer.innerHTML = `<p class="error-message">無法載入區域資料，請稍後再試。</p>`;
            createBackupRegionCards(regionCardsContainer);
        });
}

// 創建區域卡片
function createRegionCard(region) {
    const card = document.createElement('div');
    card.className = 'region-card';
    
    const iconClass = region.icon || 'map-marker-alt'; // 預設圖標
    const bgColor = region.color || 'linear-gradient(135deg, #4361ee, #3a86ff)'; // 預設顏色
    
    card.innerHTML = `
        <div class="region-icon" style="background: ${bgColor}">
            <i class="fas fa-${iconClass}"></i>
        </div>
        <h3>${region.name}</h3>
        <p>${region.description || '查詢此區域內的各校分發資訊及落點預測'}</p>
        <a href="${region.url}" class="btn btn-primary" target="_blank">開始查詢</a>
    `;
    
    return card;
}

// 創建備用區域卡片
function createBackupRegionCards(container) {
    const regions = [
        {
            name: '桃聯區查詢',
            icon: 'map-marker-alt',
            color: 'linear-gradient(135deg, #4361ee, #3a86ff)',
            description: '查詢桃園市、新竹縣市的學校分發資訊',
            url: 'https://tyctw.github.io/'
        },
        {
            name: '彰化區查詢',
            icon: 'school',
            color: 'linear-gradient(135deg, #7209b7, #560bad)',
            description: '查詢彰化縣市的學校分發資訊',
            url: 'https://cchctw.github.io/'
        },
        {
            name: '中投區查詢',
            icon: 'landmark',
            color: 'linear-gradient(135deg, #f72585, #b5179e)',
            description: '查詢台中市、南投縣的學校分發資訊',
            url: 'https://ctttw.github.io/'
        },
        {
            name: '高雄區查詢',
            icon: 'city',
            color: 'linear-gradient(135deg, #f77f00, #fcbf49)',
            description: '查詢高雄市的學校分發資訊',
            url: 'https://khhtw.github.io/'
        }
    ];
    
    regions.forEach(region => {
        const card = createRegionCard(region);
        container.appendChild(card);
    });
}