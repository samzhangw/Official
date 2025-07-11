document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS動畫
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
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

    // 平滑滾動到錨點
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // 如果是下拉選單項目且在移動設備上，不執行滾動
            if (this.closest('.nav-dropdown-content') && window.innerWidth <= 992) {
                return;
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 計算導航欄高度以調整滾動位置
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 如果在移動設備上，關閉導航選單
                if (window.innerWidth <= 992) {
                    document.querySelector('.nav-menu').classList.remove('active');
                    document.querySelector('.menu-toggle').innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // 下拉選單在移動設備上的處理
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
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
    const htmlElement = document.documentElement;

    // 檢查儲存的主題偏好或尊重系統偏好
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // 初始化主題
    function initializeTheme() {
        // 添加過渡類，但延遲添加以避免初始加載時的過渡效果
        setTimeout(() => {
            htmlElement.classList.add('theme-transition');
        }, 100);

        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
            updateThemeIcon(true);
        } else {
            updateThemeIcon(false);
        }
    }

    // 切換主題
    function toggleTheme() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        
        // 儲存主題偏好
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // 更新圖標
        updateThemeIcon(isDarkMode);
        
        // 添加切換動畫效果
        animateThemeChange(isDarkMode);
    }

    // 更新主題圖標
    function updateThemeIcon(isDarkMode) {
        if (isDarkMode) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('aria-label', '切換至淺色模式');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('aria-label', '切換至深色模式');
        }
    }

    // 主題切換動畫
    function animateThemeChange(isDarkMode) {
        // 創建一個圓形動畫元素
        const circle = document.createElement('div');
        circle.className = 'theme-toggle-circle';
        
        // 設置圓形的位置和顏色
        const toggleRect = themeToggle.getBoundingClientRect();
        const circleSize = Math.max(window.innerWidth, window.innerHeight) * 2;
        
        circle.style.position = 'fixed';
        circle.style.top = `${toggleRect.top + toggleRect.height / 2}px`;
        circle.style.left = `${toggleRect.left + toggleRect.width / 2}px`;
        circle.style.width = '0';
        circle.style.height = '0';
        circle.style.borderRadius = '50%';
        circle.style.backgroundColor = isDarkMode ? '#121212' : '#ffffff';
        circle.style.transform = 'translate(-50%, -50%)';
        circle.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        circle.style.zIndex = '-1';
        
        document.body.appendChild(circle);
        
        // 觸發動畫
        setTimeout(() => {
            circle.style.width = `${circleSize}px`;
            circle.style.height = `${circleSize}px`;
        }, 10);
        
        // 動畫結束後移除元素
        setTimeout(() => {
            document.body.removeChild(circle);
        }, 700);
    }

    // 初始化主題
    initializeTheme();

    // 添加事件監聽器
    themeToggle.addEventListener('click', toggleTheme);

    // 監聽系統主題變化
    prefersDarkScheme.addEventListener('change', (e) => {
        // 只有在用戶沒有手動設置主題時才跟隨系統
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
                updateThemeIcon(true);
            } else {
                document.body.classList.remove('dark-mode');
                updateThemeIcon(false);
            }
        }
    });
    
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
    
    // 處理聯絡表單提交
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    function handleContactFormSubmit(event) {
        event.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // 簡單驗證
        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            alert('請填寫所有必填欄位');
            return;
        }
        
        // 驗證電子郵件格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            alert('請輸入有效的電子郵件地址');
            return;
        }
        
        // 這裡可以添加hCaptcha驗證
        
        // 模擬表單提交
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 處理中...';
        
        // 模擬AJAX請求
        setTimeout(() => {
            // 重置表單
            contactForm.reset();
            
            // 顯示成功訊息
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.textContent = '您的訊息已成功發送，我們會盡快回覆您！';
            
            contactForm.prepend(successMessage);
            
            // 恢復按鈕狀態
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            // 3秒後移除成功訊息
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }, 1500);
    }
    
    // 載入區域卡片
    fetchRegionsData();
    
    function fetchRegionsData() {
        const regionsContainer = document.getElementById('region-cards');
        
        // 模擬API請求延遲
        setTimeout(() => {
            try {
                // 移除載入動畫
                const loadingSpinner = regionsContainer.querySelector('.loading-spinner');
                if (loadingSpinner) {
                    loadingSpinner.remove();
                }
                
                // 區域資料
                const regions = [
                    {
                        id: 'tyc',
                        name: '桃聯區',
                        icon: 'map-marker-alt',
                        description: '桃園市、新竹縣市聯合免試入學',
                        url: 'https://tyctw.github.io/'
                    },
                    {
                        id: 'cch',
                        name: '彰化區',
                        icon: 'school',
                        description: '彰化縣免試入學分發',
                        url: 'https://cchctw.github.io/'
                    },
                    {
                        id: 'ctt',
                        name: '中投區',
                        icon: 'landmark',
                        description: '臺中市、南投縣聯合免試入學',
                        url: 'https://ctttw.github.io/'
                    },
                    {
                        id: 'khh',
                        name: '高雄區',
                        icon: 'city',
                        description: '高雄市免試入學分發',
                        url: 'https://khhtw.github.io/'
                    },
                    {
                        id: 'tpk',
                        name: '基北區',
                        icon: 'building',
                        description: '臺北市、新北市、基隆市聯合免試入學',
                        url: 'https://tyctw.github.io/spare/'
                    },
                    {
                        id: 'tnn',
                        name: '台南區',
                        icon: 'university',
                        description: '台南市免試入學分發',
                        url: 'https://tyctw.github.io/spare/'
                    }
                ];
                
                // 創建區域卡片
                regions.forEach(region => {
                    const regionCard = createRegionCard(region);
                    regionsContainer.appendChild(regionCard);
                });
                
                // 重新初始化AOS以處理新添加的元素
                AOS.refresh();
                
            } catch (error) {
                console.error('載入區域資料時發生錯誤:', error);
                createBackupRegionCards(regionsContainer);
            }
        }, 1000);
    }
    
    function createRegionCard(region) {
        const card = document.createElement('a');
        card.href = region.url;
        card.target = '_blank';
        card.className = 'region-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', '100');
        
        card.innerHTML = `
            <div class="region-icon">
                <i class="fas fa-${region.icon}"></i>
            </div>
            <h3>${region.name}</h3>
            <p>${region.description}</p>
            <span class="btn btn-primary">立即查詢</span>
        `;
        
        return card;
    }
    
    function createBackupRegionCards(container) {
        // 移除載入動畫
        const loadingSpinner = container.querySelector('.loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.remove();
        }
        
        // 備用區域卡片
        const backupRegions = [
            { name: '桃聯區', icon: 'map-marker-alt', url: 'https://tyctw.github.io/' },
            { name: '彰化區', icon: 'school', url: 'https://cchctw.github.io/' },
            { name: '中投區', icon: 'landmark', url: 'https://ctttw.github.io/' },
            { name: '高雄區', icon: 'city', url: 'https://khhtw.github.io/' },
            { name: '基北區', icon: 'building', url: 'https://tyctw.github.io/spare/' },
            { name: '台南區', icon: 'university', url: 'https://tyctw.github.io/spare/' }
        ];
        
        backupRegions.forEach(region => {
            const card = document.createElement('a');
            card.href = region.url;
            card.target = '_blank';
            card.className = 'region-card';
            
            card.innerHTML = `
                <div class="region-icon">
                    <i class="fas fa-${region.icon}"></i>
                </div>
                <h3>${region.name}</h3>
                <p>點擊進入查詢系統</p>
                <span class="btn btn-primary">立即查詢</span>
            `;
            
            container.appendChild(card);
        });
    }
});