// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components with error handling
  try {
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
    initializePasswordToggle()
  } catch (error) {
    console.error("Initialization error:", error)
  }

  // Remove loading screen after content is loaded
  setTimeout(() => {
    hideLoadingScreen()
  }, 1500)
})

// Function to scroll to home section
function scrollToHome() {
  try {
    const homeSection = document.getElementById("home")
    const header = document.getElementById("header")

    if (homeSection && header) {
      const headerHeight = header.offsetHeight
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
  } catch (error) {
    console.error("Error in scrollToHome:", error)
  }
}

// Password Toggle Functionality
function initializePasswordToggle() {
  try {
    const passwordToggles = document.querySelectorAll(".password-toggle")

    passwordToggles.forEach((toggle) => {
      toggle.addEventListener("click", function (e) {
        e.preventDefault()
        try {
          const targetId = this.getAttribute("data-target")
          const passwordInput = document.getElementById(targetId)
          const icon = this.querySelector("i")

          if (passwordInput && icon) {
            if (passwordInput.type === "password") {
              passwordInput.type = "text"
              icon.classList.remove("fa-eye")
              icon.classList.add("fa-eye-slash")
            } else {
              passwordInput.type = "password"
              icon.classList.remove("fa-eye-slash")
              icon.classList.add("fa-eye")
            }
          }
        } catch (error) {
          console.error("Password toggle error:", error)
        }
      })
    })
  } catch (error) {
    console.error("Error initializing password toggle:", error)
  }
}

// Gallery Modals Functionality
function initializeGalleryModals() {
  try {
    const termsLink = document.getElementById("terms-link")
    const privacyLink = document.getElementById("privacy-link")
    const termsModalOverlay = document.getElementById("terms-modal-overlay")
    const privacyModalOverlay = document.getElementById("privacy-modal-overlay")
    const termsModalClose = document.getElementById("terms-modal-close")
    const privacyModalClose = document.getElementById("privacy-modal-close")
    const acceptTermsCheckbox = document.getElementById("accept-terms")
    const acceptTermsBtn = document.getElementById("accept-terms-btn")

    // Terms & Conditions modal
    if (termsLink) {
      termsLink.addEventListener("click", (e) => {
        e.preventDefault()
        showModal("terms-modal-overlay")
      })
    }

    // Privacy Policy modal
    if (privacyLink) {
      privacyLink.addEventListener("click", (e) => {
        e.preventDefault()
        showModal("privacy-modal-overlay")
      })
    }

    // Close modals
    if (termsModalClose) {
      termsModalClose.addEventListener("click", () => hideModal("terms-modal-overlay"))
    }
    if (privacyModalClose) {
      privacyModalClose.addEventListener("click", () => hideModal("privacy-modal-overlay"))
    }

    // Close modal when clicking overlay
    if (termsModalOverlay) {
      termsModalOverlay.addEventListener("click", (e) => {
        if (e.target === termsModalOverlay) {
          hideModal("terms-modal-overlay")
        }
      })
    }

    if (privacyModalOverlay) {
      privacyModalOverlay.addEventListener("click", (e) => {
        if (e.target === privacyModalOverlay) {
          hideModal("privacy-modal-overlay")
        }
      })
    }

    // Terms acceptance functionality
    if (acceptTermsCheckbox && acceptTermsBtn) {
      acceptTermsCheckbox.addEventListener("change", (e) => {
        acceptTermsBtn.disabled = !e.target.checked
      })

      acceptTermsBtn.addEventListener("click", () => {
        hideModal("terms-modal-overlay")
        showNotification("Terms & Conditions accepted successfully!", "success")
      })
    }
  } catch (error) {
    console.error("Error initializing gallery modals:", error)
  }
}

// Loading Screen
function initializeLoadingScreen() {
  try {
    // Hide loading screen when page is fully loaded
    window.addEventListener("load", () => {
      setTimeout(hideLoadingScreen, 1000)
    })
  } catch (error) {
    console.error("Error initializing loading screen:", error)
  }
}

function hideLoadingScreen() {
  try {
    const loadingScreen = document.getElementById("loading-screen")
    if (loadingScreen) {
      loadingScreen.classList.add("hidden")
      document.body.style.overflow = "auto"
    }
  } catch (error) {
    console.error("Error hiding loading screen:", error)
  }
}

// Header Functionality
function initializeHeader() {
  try {
    const header = document.getElementById("header")
    if (!header) return

    const scrollHandler = throttle(() => {
      try {
        const currentScrollY = window.scrollY || window.pageYOffset || 0

        // Add scrolled class for background effect
        if (currentScrollY > 50) {
          header.classList.add("scrolled")
        } else {
          header.classList.remove("scrolled")
        }
      } catch (error) {
        console.error("Scroll handler error:", error)
      }
    }, 16)

    window.addEventListener("scroll", scrollHandler, { passive: true })
  } catch (error) {
    console.error("Error initializing header:", error)
  }
}

// Navigation Functionality
function initializeNavigation() {
  try {
    const navToggle = document.getElementById("nav-toggle")
    const navMenu = document.getElementById("nav-menu")
    const navLinks = document.querySelectorAll(".nav-link")

    // Mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", (e) => {
        e.preventDefault()
        try {
          navToggle.classList.toggle("active")
          navMenu.classList.toggle("active")
          document.body.classList.toggle("nav-open")
        } catch (error) {
          console.error("Nav toggle error:", error)
        }
      })
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        try {
          if (navToggle && navMenu) {
            navToggle.classList.remove("active")
            navMenu.classList.remove("active")
            document.body.classList.remove("nav-open")
          }
        } catch (error) {
          console.error("Nav link click error:", error)
        }
      })
    })

    // Smooth scrolling and active link highlighting
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        try {
          const targetId = link.getAttribute("href")
          const targetSection = document.querySelector(targetId)
          const header = document.getElementById("header")

          if (targetSection && header) {
            const headerHeight = header.offsetHeight
            const targetPosition = targetSection.offsetTop - headerHeight

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            })

            // Update active link
            updateActiveNavLink(link)
          }
        } catch (error) {
          console.error("Smooth scroll error:", error)
        }
      })
    })

    // Highlight active section on scroll
    const scrollHandler = throttle(highlightActiveSection, 100)
    window.addEventListener("scroll", scrollHandler, { passive: true })
  } catch (error) {
    console.error("Error initializing navigation:", error)
  }
}

function updateActiveNavLink(activeLink) {
  try {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active")
    })
    if (activeLink) {
      activeLink.classList.add("active")
    }
  } catch (error) {
    console.error("Error updating active nav link:", error)
  }
}

function highlightActiveSection() {
  try {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")
    const scrollPosition = (window.scrollY || window.pageYOffset || 0) + 150

    sections.forEach((section) => {
      try {
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
      } catch (error) {
        console.error("Section highlight error:", error)
      }
    })
  } catch (error) {
    console.error("Error highlighting active section:", error)
  }
}

// About Section Functionality
function initializeAboutSection() {
  try {
    const aboutSection = document.getElementById("about")
    const highlightItems = document.querySelectorAll(".highlight-item")
    const aboutImage = document.querySelector(".about-image-container")

    if (!aboutSection) return

    // Check if IntersectionObserver is supported
    if ("IntersectionObserver" in window) {
      const aboutObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              try {
                // Animate highlight items with stagger effect
                highlightItems.forEach((item, index) => {
                  setTimeout(() => {
                    if (item) {
                      item.style.opacity = "1"
                      item.style.transform = "translateX(0)"
                    }
                  }, index * 200)
                })

                // Animate about image
                if (aboutImage) {
                  setTimeout(() => {
                    aboutImage.style.opacity = "1"
                    aboutImage.style.transform = "translateY(0)"
                  }, 400)
                }
              } catch (error) {
                console.error("About section animation error:", error)
              }
            }
          })
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -50px 0px",
        },
      )

      aboutObserver.observe(aboutSection)
    }

    // Set initial states for animations
    highlightItems.forEach((item) => {
      if (item) {
        item.style.opacity = "0"
        item.style.transform = "translateX(-30px)"
        item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      }
    })

    if (aboutImage) {
      aboutImage.style.opacity = "0"
      aboutImage.style.transform = "translateY(30px)"
      aboutImage.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    }

    // Add hover effects for highlight items
    highlightItems.forEach((item) => {
      if (item) {
        item.addEventListener("mouseenter", () => {
          item.style.transform = "translateX(10px) scale(1.02)"
        })

        item.addEventListener("mouseleave", () => {
          item.style.transform = "translateX(0) scale(1)"
        })
      }
    })
  } catch (error) {
    console.error("Error initializing about section:", error)
  }
}

// Authentication System
function initializeAuth() {
  try {
    const loginBtn = document.getElementById("login-btn")
    const signupBtn = document.getElementById("signup-btn")
    const logoutBtn = document.getElementById("logout-btn")
    const authButtons = document.getElementById("auth-buttons")
    const userProfile = document.getElementById("user-profile")
    const profileAvatar = document.getElementById("profile-avatar")
    const profileDropdown = document.getElementById("profile-dropdown")

    // Check if user is logged in (simulate with localStorage)
    let isLoggedIn = false
    try {
      isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    } catch (e) {
      console.warn("localStorage not available:", e)
    }

    updateAuthState(isLoggedIn)

    // Login button click
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        showModal("login-modal-overlay")
      })
    }

    // Signup button click
    if (signupBtn) {
      signupBtn.addEventListener("click", () => {
        showModal("signup-modal-overlay")
      })
    }

    // Logout functionality
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault()
        logout()
      })
    }

    // Profile dropdown toggle
    if (profileAvatar && profileDropdown) {
      profileAvatar.addEventListener("click", () => {
        profileDropdown.classList.toggle("show")
      })
    }

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (userProfile && profileDropdown && !userProfile.contains(e.target)) {
        profileDropdown.classList.remove("show")
      }
    })
  } catch (error) {
    console.error("Error initializing auth:", error)
  }
}

function updateAuthState(isLoggedIn) {
  try {
    const authButtons = document.getElementById("auth-buttons")
    const userProfile = document.getElementById("user-profile")

    if (isLoggedIn) {
      if (authButtons) authButtons.classList.add("hidden")
      if (userProfile) userProfile.classList.remove("hidden")
    } else {
      if (authButtons) authButtons.classList.remove("hidden")
      if (userProfile) userProfile.classList.add("hidden")
    }
  } catch (error) {
    console.error("Error updating auth state:", error)
  }
}

function login(userData = null) {
  try {
    try {
      localStorage.setItem("isLoggedIn", "true")
      if (userData) {
        localStorage.setItem("userData", JSON.stringify(userData))
      }
    } catch (e) {
      console.warn("localStorage not available:", e)
    }

    updateAuthState(true)
    hideAllModals()
    showNotification("Welcome back! You have successfully logged in.", "success")
  } catch (error) {
    console.error("Login error:", error)
  }
}

function logout() {
  try {
    try {
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("userData")
    } catch (e) {
      console.warn("localStorage not available:", e)
    }

    updateAuthState(false)
    const profileDropdown = document.getElementById("profile-dropdown")
    if (profileDropdown) {
      profileDropdown.classList.remove("show")
    }
    showNotification("You have been logged out successfully.", "info")
  } catch (error) {
    console.error("Logout error:", error)
  }
}

// Modal System
function initializeModals() {
  try {
    const loginModalOverlay = document.getElementById("login-modal-overlay")
    const signupModalOverlay = document.getElementById("signup-modal-overlay")
    const loginModalClose = document.getElementById("login-modal-close")
    const signupModalClose = document.getElementById("signup-modal-close")
    const switchToSignup = document.getElementById("switch-to-signup")
    const switchToLogin = document.getElementById("switch-to-login")
    const loginForm = document.getElementById("login-form")
    const signupForm = document.getElementById("signup-form")

    // Close modal when clicking close button
    if (loginModalClose) {
      loginModalClose.addEventListener("click", () => hideModal("login-modal-overlay"))
    }
    if (signupModalClose) {
      signupModalClose.addEventListener("click", () => hideModal("signup-modal-overlay"))
    }

    // Close modal when clicking overlay
    if (loginModalOverlay) {
      loginModalOverlay.addEventListener("click", (e) => {
        if (e.target === loginModalOverlay) {
          hideModal("login-modal-overlay")
        }
      })
    }

    if (signupModalOverlay) {
      signupModalOverlay.addEventListener("click", (e) => {
        if (e.target === signupModalOverlay) {
          hideModal("signup-modal-overlay")
        }
      })
    }

    // Switch between modals
    if (switchToSignup) {
      switchToSignup.addEventListener("click", (e) => {
        e.preventDefault()
        hideModal("login-modal-overlay")
        showModal("signup-modal-overlay")
      })
    }

    if (switchToLogin) {
      switchToLogin.addEventListener("click", (e) => {
        e.preventDefault()
        hideModal("signup-modal-overlay")
        showModal("login-modal-overlay")
      })
    }

    // Handle form submissions
    if (loginForm) {
      loginForm.addEventListener("submit", handleLoginSubmit)
    }
    if (signupForm) {
      signupForm.addEventListener("submit", handleSignupSubmit)
    }

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hideAllModals()
      }
    })
  } catch (error) {
    console.error("Error initializing modals:", error)
  }
}

function showModal(modalId) {
  try {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.add("show")
      document.body.style.overflow = "hidden"

      // Focus first input
      const firstInput = modal.querySelector('input[type="text"], input[type="email"]')
      setTimeout(() => {
        if (firstInput) firstInput.focus()
      }, 100)
    }
  } catch (error) {
    console.error("Error showing modal:", error)
  }
}

function hideModal(modalId) {
  try {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.remove("show")
      document.body.style.overflow = "auto"
    }
  } catch (error) {
    console.error("Error hiding modal:", error)
  }
}

function hideAllModals() {
  try {
    const modals = document.querySelectorAll(".modal-overlay")
    modals.forEach((modal) => {
      modal.classList.remove("show")
    })
    document.body.style.overflow = "auto"
  } catch (error) {
    console.error("Error hiding all modals:", error)
  }
}

function handleLoginSubmit(e) {
  e.preventDefault()
  try {
    const emailInput = document.getElementById("login-email")
    const passwordInput = document.getElementById("login-password")

    if (!emailInput || !passwordInput) return

    const email = emailInput.value
    const password = passwordInput.value

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
  } catch (error) {
    console.error("Login submit error:", error)
    showNotification("Login error occurred. Please try again.", "error")
  }
}

function handleSignupSubmit(e) {
  e.preventDefault()
  try {
    const usernameInput = document.getElementById("signup-username")
    const emailInput = document.getElementById("signup-email")
    const passwordInput = document.getElementById("signup-password")
    const confirmPasswordInput = document.getElementById("signup-confirm-password")

    if (!usernameInput || !emailInput || !passwordInput || !confirmPasswordInput) return

    const username = usernameInput.value
    const email = emailInput.value
    const password = passwordInput.value
    const confirmPassword = confirmPasswordInput.value

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
  } catch (error) {
    console.error("Signup submit error:", error)
    showNotification("Signup error occurred. Please try again.", "error")
  }
}

// Scroll Effects
function initializeScrollEffects() {
  try {
    const backToTopBtn = document.getElementById("back-to-top")

    // Back to top button
    const scrollHandler = throttle(() => {
      try {
        const scrollY = window.scrollY || window.pageYOffset || 0
        if (backToTopBtn) {
          if (scrollY > 300) {
            backToTopBtn.classList.add("show")
          } else {
            backToTopBtn.classList.remove("show")
          }
        }
      } catch (error) {
        console.error("Scroll effect error:", error)
      }
    }, 100)

    window.addEventListener("scroll", scrollHandler, { passive: true })

    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  } catch (error) {
    console.error("Error initializing scroll effects:", error)
  }
}

// Animations
function initializeAnimations() {
  try {
    // Check if IntersectionObserver is supported
    if (!("IntersectionObserver" in window)) {
      console.warn("IntersectionObserver not supported")
      return
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          try {
            entry.target.classList.add("animate-in")

            // Trigger specific animations
            if (entry.target.classList.contains("feature-card")) {
              animateFeatureCard(entry.target)
            }

            if (entry.target.classList.contains("step")) {
              animateStep(entry.target)
            }
          } catch (error) {
            console.error("Animation trigger error:", error)
          }
        }
      })
    }, observerOptions)

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(".feature-card, .step, .section-header")
    animatedElements.forEach((el) => {
      if (el) observer.observe(el)
    })

    // Add CSS for animations
    addAnimationStyles()
  } catch (error) {
    console.error("Error initializing animations:", error)
  }
}

function animateFeatureCard(card) {
  try {
    if (!card || !card.parentNode) return
    const delay = Array.from(card.parentNode.children).indexOf(card) * 100
    setTimeout(() => {
      if (card) {
        card.style.transform = "translateY(0)"
        card.style.opacity = "1"
      }
    }, delay)
  } catch (error) {
    console.error("Feature card animation error:", error)
  }
}

function animateStep(step) {
  try {
    if (!step) return
    const stepNumber = step.dataset.step
    const delay = stepNumber ? Number.parseInt(stepNumber) * 200 : 0
    setTimeout(() => {
      if (step) {
        step.style.transform = "translateX(0)"
        step.style.opacity = "1"
      }
    }, delay)
  } catch (error) {
    console.error("Step animation error:", error)
  }
}

function addAnimationStyles() {
  try {
    // Check if styles already added
    if (document.querySelector("#animation-styles")) return

    const style = document.createElement("style")
    style.id = "animation-styles"
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
  } catch (error) {
    console.error("Error adding animation styles:", error)
  }
}

// How It Works Section
function initializeHowItWorks() {
  try {
    const progressFill = document.getElementById("progress-fill")
    const steps = document.querySelectorAll(".step")

    // Progress line animation
    const scrollHandler = throttle(() => {
      try {
        const howItWorksSection = document.getElementById("how-it-works")
        if (!howItWorksSection || !progressFill) return

        const sectionTop = howItWorksSection.offsetTop
        const sectionHeight = howItWorksSection.offsetHeight
        const scrollY = window.scrollY || window.pageYOffset || 0
        const windowHeight = window.innerHeight

        const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop + windowHeight / 2) / sectionHeight))

        progressFill.style.height = `${scrollProgress * 100}%`
      } catch (error) {
        console.error("Progress line error:", error)
      }
    }, 16)

    window.addEventListener("scroll", scrollHandler, { passive: true })

    // Step hover effects
    steps.forEach((step, index) => {
      if (step) {
        step.addEventListener("mouseenter", () => {
          step.style.transform = "translateY(-10px) scale(1.02)"
        })

        step.addEventListener("mouseleave", () => {
          step.style.transform = "translateY(0) scale(1)"
        })
      }
    })
  } catch (error) {
    console.error("Error initializing how it works:", error)
  }
}

// Stats Counter Animation
function initializeStatsCounter() {
  try {
    const statNumbers = document.querySelectorAll(".stat-number")
    let hasAnimated = false

    if (!("IntersectionObserver" in window)) {
      // Fallback for browsers without IntersectionObserver
      animateCounters()
      return
    }

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
      try {
        statNumbers.forEach((stat) => {
          if (!stat || !stat.dataset.target) return

          const target = Number.parseInt(stat.dataset.target)
          if (isNaN(target)) return

          const duration = 2000 // 2 seconds
          const startTime = performance.now()

          function updateCounter(currentTime) {
            try {
              const elapsedTime = currentTime - startTime
              const progress = Math.min(elapsedTime / duration, 1)

              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4)
              const currentValue = Math.floor(target * easeOutQuart)

              if (stat) {
                stat.textContent = formatNumber(currentValue)
              }

              if (progress < 1) {
                requestAnimationFrame(updateCounter)
              }
            } catch (error) {
              console.error("Counter update error:", error)
            }
          }

          requestAnimationFrame(updateCounter)
        })
      } catch (error) {
        console.error("Counter animation error:", error)
      }
    }

    function formatNumber(num) {
      try {
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1) + "M"
        } else if (num >= 1000) {
          return (num / 1000).toFixed(0) + "K"
        }
        return num.toString()
      } catch (error) {
        console.error("Number format error:", error)
        return num.toString()
      }
    }
  } catch (error) {
    console.error("Error initializing stats counter:", error)
  }
}

// Newsletter Form
function initializeNewsletterForm() {
  try {
    const newsletterForm = document.getElementById("newsletter-form")

    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault()
        try {
          const emailInput = e.target.querySelector('input[type="email"]')
          if (!emailInput) return

          const email = emailInput.value

          if (email) {
            // Simulate newsletter subscription
            setTimeout(() => {
              showNotification("Thank you for subscribing to our newsletter!", "success")
              e.target.reset()
            }, 1000)

            showNotification("Subscribing...", "info")
          }
        } catch (error) {
          console.error("Newsletter submit error:", error)
          showNotification("Subscription error. Please try again.", "error")
        }
      })
    }
  } catch (error) {
    console.error("Error initializing newsletter form:", error)
  }
}

// Notification System
function showNotification(message, type = "info") {
  try {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification")
    existingNotifications.forEach((notification) => {
      if (notification) notification.remove()
    })

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
    setTimeout(() => {
      if (notification) notification.classList.add("show")
    }, 10)

    // Auto hide after 5 seconds
    setTimeout(() => hideNotification(notification), 5000)

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close")
    if (closeBtn) {
      closeBtn.addEventListener("click", () => hideNotification(notification))
    }
  } catch (error) {
    console.error("Notification error:", error)
  }
}

function hideNotification(notification) {
  try {
    if (notification) {
      notification.classList.remove("show")
      setTimeout(() => {
        if (notification && notification.parentNode) {
          notification.remove()
        }
      }, 300)
    }
  } catch (error) {
    console.error("Hide notification error:", error)
  }
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
  try {
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
  } catch (error) {
    console.error("Error adding notification styles:", error)
  }
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

// Error Handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
  // In production, you might want to send this to an error tracking service
})

// Unhandled promise rejection handling
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason)
  e.preventDefault() // Prevent the default browser behavior
})

// Analytics and Tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
  try {
    // In a real application, you would send this to your analytics service
    console.log("Event tracked:", eventName, eventData)
  } catch (error) {
    console.error("Tracking error:", error)
  }
}

// Track page load
try {
  trackEvent("page_view", {
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
  })
} catch (error) {
  console.error("Page view tracking error:", error)
}

// Track button clicks
document.addEventListener("click", (e) => {
  try {
    if (e.target && (e.target.matches(".btn") || e.target.matches("button"))) {
      trackEvent("button_click", {
        button_text: e.target.textContent ? e.target.textContent.trim() : "",
        button_class: e.target.className || "",
      })
    }
  } catch (error) {
    console.error("Button click tracking error:", error)
  }
})
