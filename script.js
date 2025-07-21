// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initializeHeader()
  initializeNavigation()
  initializeAuth()
  initializeModals()
  initializeScrollEffects()
  initializeAnimations()
  initializeHowItWorks()
  initializeStatsCounter()
  initializeNewsletterForm()
  initializeLoadingScreen()
  initializeAboutSection()
  initializeGalleryModals()
  initializePasswordToggle() // Added password toggle initialization

  // Remove loading screen after content is loaded
  setTimeout(() => {
    hideLoadingScreen()
  }, 1500)
})

// Function to scroll to home section
function scrollToHome() {
  const homeSection = document.getElementById("home")
  if (homeSection) {
    const headerHeight = document.getElementById("header").offsetHeight
    const targetPosition = homeSection.offsetTop - headerHeight

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })

    // Update active nav link
    const homeLink = document.querySelector('.nav-link[href="#home"]')
    if (homeLink) {
      updateActiveNavLink(homeLink)
    }
  }
}

// Password Toggle Functionality
function initializePasswordToggle() {
  const passwordToggles = document.querySelectorAll(".password-toggle")

  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target")
      const passwordInput = document.getElementById(targetId)
      const icon = this.querySelector("i")

      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
      } else {
        passwordInput.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
      }
    })
  })
}

// Gallery Modals Functionality
function initializeGalleryModals() {
  const termsLink = document.getElementById("terms-link")
  const privacyLink = document.getElementById("privacy-link")
  const termsModalOverlay = document.getElementById("terms-modal-overlay")
  const privacyModalOverlay = document.getElementById("privacy-modal-overlay")
  const termsModalClose = document.getElementById("terms-modal-close")
  const privacyModalClose = document.getElementById("privacy-modal-close")
  const acceptTermsCheckbox = document.getElementById("accept-terms")
  const acceptTermsBtn = document.getElementById("accept-terms-btn")

  // Terms & Conditions modal
  termsLink?.addEventListener("click", (e) => {
    e.preventDefault()
    showModal("terms-modal-overlay")
  })

  // Privacy Policy modal
  privacyLink?.addEventListener("click", (e) => {
    e.preventDefault()
    showModal("privacy-modal-overlay")
  })

  // Close modals
  termsModalClose?.addEventListener("click", () => hideModal("terms-modal-overlay"))
  privacyModalClose?.addEventListener("click", () => hideModal("privacy-modal-overlay"))

  // Close modal when clicking overlay
  termsModalOverlay?.addEventListener("click", (e) => {
    if (e.target === termsModalOverlay) {
      hideModal("terms-modal-overlay")
    }
  })

  privacyModalOverlay?.addEventListener("click", (e) => {
    if (e.target === privacyModalOverlay) {
      hideModal("privacy-modal-overlay")
    }
  })

  // Terms acceptance functionality
  acceptTermsCheckbox?.addEventListener("change", (e) => {
    if (acceptTermsBtn) {
      acceptTermsBtn.disabled = !e.target.checked
    }
  })

  acceptTermsBtn?.addEventListener("click", () => {
    hideModal("terms-modal-overlay")
    showNotification("Terms & Conditions accepted successfully!", "success")
  })
}

// Loading Screen
function initializeLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen")

  // Hide loading screen when page is fully loaded
  window.addEventListener("load", () => {
    setTimeout(hideLoadingScreen, 1000)
  })
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen) {
    loadingScreen.classList.add("hidden")
    document.body.style.overflow = "auto"
  }
}

// Header Functionality
function initializeHeader() {
  const header = document.getElementById("header")

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    // Add scrolled class for background effect
    if (currentScrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Remove the hide/show functionality - header stays fixed
  })
}

// Navigation Functionality
function initializeNavigation() {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Mobile menu toggle
  navToggle?.addEventListener("click", () => {
    navToggle.classList.toggle("active")
    navMenu.classList.toggle("active")
    document.body.classList.toggle("nav-open")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle?.classList.remove("active")
      navMenu.classList.remove("active")
      document.body.classList.remove("nav-open")
    })
  })

  // Smooth scrolling and active link highlighting
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.getElementById("header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Update active link
        updateActiveNavLink(link)
      }
    })
  })

  // Highlight active section on scroll
  window.addEventListener("scroll", highlightActiveSection)
}

function updateActiveNavLink(activeLink) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
  })
  activeLink.classList.add("active")
}

function highlightActiveSection() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")
  const scrollPosition = window.scrollY + 150

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

// About Section Functionality (NEW)
function initializeAboutSection() {
  const aboutSection = document.getElementById("about")
  const highlightItems = document.querySelectorAll(".highlight-item")
  const aboutImage = document.querySelector(".about-image-container")

  // Intersection Observer for About section animations
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate highlight items with stagger effect
          highlightItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "translateX(0)"
            }, index * 200)
          })

          // Animate about image
          if (aboutImage) {
            setTimeout(() => {
              aboutImage.style.opacity = "1"
              aboutImage.style.transform = "translateY(0)"
            }, 400)
          }
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  // Observe about section
  if (aboutSection) {
    aboutObserver.observe(aboutSection)
  }

  // Set initial states for animations
  highlightItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateX(-30px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })

  if (aboutImage) {
    aboutImage.style.opacity = "0"
    aboutImage.style.transform = "translateY(30px)"
    aboutImage.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  }

  // Add hover effects for highlight items
  highlightItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateX(10px) scale(1.02)"
    })

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateX(0) scale(1)"
    })
  })
}

// Authentication System
function initializeAuth() {
  const loginBtn = document.getElementById("login-btn")
  const signupBtn = document.getElementById("signup-btn")
  const logoutBtn = document.getElementById("logout-btn")
  const authButtons = document.getElementById("auth-buttons")
  const userProfile = document.getElementById("user-profile")
  const profileAvatar = document.getElementById("profile-avatar")
  const profileDropdown = document.getElementById("profile-dropdown")

  // Check if user is logged in (simulate with localStorage)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  updateAuthState(isLoggedIn)

  // Login button click
  loginBtn?.addEventListener("click", () => {
    showModal("login-modal-overlay")
  })

  // Signup button click
  signupBtn?.addEventListener("click", () => {
    showModal("signup-modal-overlay")
  })

  // Logout functionality
  logoutBtn?.addEventListener("click", (e) => {
    e.preventDefault()
    logout()
  })

  // Profile dropdown toggle
  profileAvatar?.addEventListener("click", () => {
    profileDropdown.classList.toggle("show")
  })

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!userProfile?.contains(e.target)) {
      profileDropdown?.classList.remove("show")
    }
  })
}

function updateAuthState(isLoggedIn) {
  const authButtons = document.getElementById("auth-buttons")
  const userProfile = document.getElementById("user-profile")

  if (isLoggedIn) {
    authButtons?.classList.add("hidden")
    userProfile?.classList.remove("hidden")
  } else {
    authButtons?.classList.remove("hidden")
    userProfile?.classList.add("hidden")
  }
}

function login(userData = null) {
  localStorage.setItem("isLoggedIn", "true")
  if (userData) {
    localStorage.setItem("userData", JSON.stringify(userData))
  }
  updateAuthState(true)
  hideAllModals()
  showNotification("Welcome back! You have successfully logged in.", "success")
}

function logout() {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("userData")
  updateAuthState(false)
  document.getElementById("profile-dropdown")?.classList.remove("show")
  showNotification("You have been logged out successfully.", "info")
}

// Modal System
function initializeModals() {
  const loginModalOverlay = document.getElementById("login-modal-overlay")
  const signupModalOverlay = document.getElementById("signup-modal-overlay")
  const loginModalClose = document.getElementById("login-modal-close")
  const signupModalClose = document.getElementById("signup-modal-close")
  const switchToSignup = document.getElementById("switch-to-signup")
  const switchToLogin = document.getElementById("switch-to-login")
  const loginForm = document.getElementById("login-form")
  const signupForm = document.getElementById("signup-form")

  // Close modal when clicking close button
  loginModalClose?.addEventListener("click", () => hideModal("login-modal-overlay"))
  signupModalClose?.addEventListener("click", () => hideModal("signup-modal-overlay"))

  // Close modal when clicking overlay
  loginModalOverlay?.addEventListener("click", (e) => {
    if (e.target === loginModalOverlay) {
      hideModal("login-modal-overlay")
    }
  })

  signupModalOverlay?.addEventListener("click", (e) => {
    if (e.target === signupModalOverlay) {
      hideModal("signup-modal-overlay")
    }
  })

  // Switch between modals
  switchToSignup?.addEventListener("click", (e) => {
    e.preventDefault()
    hideModal("login-modal-overlay")
    showModal("signup-modal-overlay")
  })

  switchToLogin?.addEventListener("click", (e) => {
    e.preventDefault()
    hideModal("signup-modal-overlay")
    showModal("login-modal-overlay")
  })

  // Handle form submissions
  loginForm?.addEventListener("submit", handleLoginSubmit)
  signupForm?.addEventListener("submit", handleSignupSubmit)

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideAllModals()
    }
  })
}

function showModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("show")
    document.body.style.overflow = "hidden"

    // Focus first input
    const firstInput = modal.querySelector('input[type="text"], input[type="email"]')
    setTimeout(() => firstInput?.focus(), 100)
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = "auto"
  }
}

function hideAllModals() {
  const modals = document.querySelectorAll(".modal-overlay")
  modals.forEach((modal) => {
    modal.classList.remove("show")
  })
  document.body.style.overflow = "auto"
}

function handleLoginSubmit(e) {
  e.preventDefault()
  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  // Simulate login validation
  if (email && password) {
    // In a real app, you would make an API call here
    setTimeout(() => {
      login({ email: email, username: "GamerPro" })
    }, 1000)

    showNotification("Logging in...", "info")
  } else {
    showNotification("Please fill in all fields.", "error")
  }
}

function handleSignupSubmit(e) {
  e.preventDefault()
  const username = document.getElementById("signup-username").value
  const email = document.getElementById("signup-email").value
  const password = document.getElementById("signup-password").value
  const confirmPassword = document.getElementById("signup-confirm-password").value

  // Basic validation
  if (!username || !email || !password || !confirmPassword) {
    showNotification("Please fill in all fields.", "error")
    return
  }

  if (password !== confirmPassword) {
    showNotification("Passwords do not match.", "error")
    return
  }

  if (password.length < 6) {
    showNotification("Password must be at least 6 characters long.", "error")
    return
  }

  // Simulate signup process
  setTimeout(() => {
    login({ email: email, username: username })
  }, 1500)

  showNotification("Creating your account...", "info")
}

// Scroll Effects
function initializeScrollEffects() {
  const backToTopBtn = document.getElementById("back-to-top")

  // Back to top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn?.classList.add("show")
    } else {
      backToTopBtn?.classList.remove("show")
    }
  })

  backToTopBtn?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Parallax effects
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-bg-img")
    const ctaBackground = document.querySelector(".cta-bg-img")
  })
}

// Animations
function initializeAnimations() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")

        // Trigger specific animations
        if (entry.target.classList.contains("feature-card")) {
          animateFeatureCard(entry.target)
        }

        if (entry.target.classList.contains("step")) {
          animateStep(entry.target)
        }
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".feature-card, .step, .section-header")
  animatedElements.forEach((el) => observer.observe(el))

  // Add CSS for animations
  addAnimationStyles()
}

function animateFeatureCard(card) {
  const delay = Array.from(card.parentNode.children).indexOf(card) * 100
  setTimeout(() => {
    card.style.transform = "translateY(0)"
    card.style.opacity = "1"
  }, delay)
}

function animateStep(step) {
  const delay = Number.parseInt(step.dataset.step) * 200
  setTimeout(() => {
    step.style.transform = "translateX(0)"
    step.style.opacity = "1"
  }, delay)
}

function addAnimationStyles() {
  // Add initial states for animations
  const style = document.createElement("style")
  style.textContent = `
        .feature-card {
            transform: translateY(50px);
            opacity: 0;
            transition: transform 0.6s ease, opacity 0.6s ease;
        }
        
        .step {
            transform: translateX(-50px);
            opacity: 0;
            transition: transform 0.6s ease, opacity 0.6s ease;
        }
        
        .section-header {
            transform: translateY(30px);
            opacity: 0;
            transition: transform 0.6s ease, opacity 0.6s ease;
        }
        
        .animate-in.section-header {
            transform: translateY(0);
            opacity: 1;
        }
    `
  document.head.appendChild(style)
}

// How It Works Section
function initializeHowItWorks() {
  const progressFill = document.getElementById("progress-fill")
  const steps = document.querySelectorAll(".step")

  // Progress line animation
  window.addEventListener("scroll", () => {
    const howItWorksSection = document.getElementById("how-it-works")
    if (!howItWorksSection) return

    const sectionTop = howItWorksSection.offsetTop
    const sectionHeight = howItWorksSection.offsetHeight
    const scrollProgress = Math.max(
      0,
      Math.min(1, (window.scrollY - sectionTop + window.innerHeight / 2) / sectionHeight),
    )

    if (progressFill) {
      progressFill.style.height = `${scrollProgress * 100}%`
    }
  })

  // Step hover effects
  steps.forEach((step, index) => {
    step.addEventListener("mouseenter", () => {
      step.style.transform = "translateY(-10px) scale(1.02)"
    })

    step.addEventListener("mouseleave", () => {
      step.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Stats Counter Animation
function initializeStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number")
  let hasAnimated = false

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true
        animateCounters()
      }
    })
  })

  const statsSection = document.querySelector(".stats-counter")
  if (statsSection) {
    observer.observe(statsSection)
  }

  function animateCounters() {
    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.dataset.target)
      const duration = 2000 // 2 seconds
      const startTime = performance.now()

      function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / duration, 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(target * easeOutQuart)

        stat.textContent = formatNumber(currentValue)

        if (progress < 1) {
          requestAnimationFrame(updateCounter)
        }
      }

      requestAnimationFrame(updateCounter)
    })
  }

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K"
    }
    return num.toString()
  }
}

// Newsletter Form
function initializeNewsletterForm() {
  const newsletterForm = document.getElementById("newsletter-form")

  newsletterForm?.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = e.target.querySelector('input[type="email"]').value

    if (email) {
      // Simulate newsletter subscription
      setTimeout(() => {
        showNotification("Thank you for subscribing to our newsletter!", "success")
        e.target.reset()
      }, 1000)

      showNotification("Subscribing...", "info")
    }
  })
}

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon fas ${getNotificationIcon(type)}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `

  // Add styles if not exists
  if (!document.querySelector("#notification-styles")) {
    addNotificationStyles()
  }

  // Add to page
  document.body.appendChild(notification)

  // Show notification
  setTimeout(() => notification.classList.add("show"), 10)

  // Auto hide after 5 seconds
  setTimeout(() => hideNotification(notification), 5000)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => hideNotification(notification))
}

function hideNotification(notification) {
  notification.classList.remove("show")
  setTimeout(() => notification.remove(), 300)
}

function getNotificationIcon(type) {
  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  }
  return icons[type] || icons.info
}

function addNotificationStyles() {
  const style = document.createElement("style")
  style.id = "notification-styles"
  style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-secondary);
            border-radius: var(--radius-medium);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
            z-index: 3000;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
        }
        
        .notification-icon {
            font-size: 1.2rem;
            flex-shrink: 0;
        }
        
        .notification-success {
            border-left: 4px solid var(--accent-color);
        }
        
        .notification-success .notification-icon {
            color: var(--accent-color);
        }
        
        .notification-error {
            border-left: 4px solid #EF4444;
        }
        
        .notification-error .notification-icon {
            color: #EF4444;
        }
        
        .notification-warning {
            border-left: 4px solid #F59E0B;
        }
        
        .notification-warning .notification-icon {
            color: #F59E0B;
        }
        
        .notification-info {
            border-left: 4px solid var(--primary-color);
        }
        
        .notification-info .notification-icon {
            color: var(--primary-color);
        }
        
        .notification-message {
            flex: 1;
            color: var(--text-primary);
            font-size: 0.95rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: var(--transition-fast);
        }
        
        .notification-close:hover {
            background: var(--bg-glass);
            color: var(--text-primary);
        }
        
        @media (max-width: 480px) {
            .notification {
                left: 10px;
                right: 10px;
                max-width: none;
            }
        }
    `
  document.head.appendChild(style)
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Performance optimized scroll handler
const optimizedScrollHandler = throttle(() => {
  // Your scroll handling code here
}, 16) // ~60fps

// Error Handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
  // In production, you might want to send this to an error tracking service
})

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Service worker registration would go here
    console.log("Service Worker support detected")
  })
}

// Analytics and Tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
  // In a real application, you would send this to your analytics service
  console.log("Event tracked:", eventName, eventData)
}

// Track page load
trackEvent("page_view", {
  page: window.location.pathname,
  timestamp: new Date().toISOString(),
})

// Track button clicks
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn, button")) {
    trackEvent("button_click", {
      button_text: e.target.textContent.trim(),
      button_class: e.target.className,
    })
  }
})
