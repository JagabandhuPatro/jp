/**
 * Animations
 * Handles scroll animations and intersection observers
 */

const Animations = {
    observers: {},

    /**
     * Initialize animations
     */
    init() {
        document.addEventListener('componentsLoaded', () => {
            this.initScrollAnimations();
            this.initSkillCards();
            this.initExperienceCards();
            this.initEducationCards();
            this.initProjectCards();
            this.initCertificationCards();
        });
    },

    /**
     * Create intersection observer
     */
    createObserver(options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        return new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { ...defaultOptions, ...options });
    },

    /**
     * Initialize scroll animations for sections
     */
    initScrollAnimations() {
        const sections = document.querySelectorAll('section');
        const observer = this.createObserver();

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(section);
        });

        // Add CSS for animate-in class
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    },

    /**
     * Animate skill cards
     */
    initSkillCards() {
        const skillCards = document.querySelectorAll('.skill-category-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';

                        // Animate list items
                        const listItems = entry.target.querySelectorAll('.skill-list li');
                        listItems.forEach((item, itemIndex) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            }, itemIndex * 80);
                        });
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        skillCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            // Set initial state for list items
            card.querySelectorAll('.skill-list li').forEach(li => {
                li.style.opacity = '0';
                li.style.transform = 'translateX(-20px)';
                li.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            });

            observer.observe(card);
        });
    },

    /**
     * Animate experience cards
     */
    initExperienceCards() {
        const experienceCards = document.querySelectorAll('.experience-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';

                        // Animate responsibilities
                        const responsibilities = entry.target.querySelectorAll('.responsibilities li');
                        responsibilities.forEach((item, itemIndex) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            }, itemIndex * 100);
                        });

                        // Animate tech badges
                        const badges = entry.target.querySelectorAll('.tech-badge');
                        badges.forEach((badge, badgeIndex) => {
                            setTimeout(() => {
                                badge.style.opacity = '1';
                                badge.style.transform = 'scale(1)';
                            }, 400 + (badgeIndex * 50));
                        });
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        experienceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.95)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            // Set initial state for responsibilities
            card.querySelectorAll('.responsibilities li').forEach(li => {
                li.style.opacity = '0';
                li.style.transform = 'translateX(-30px)';
                li.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });

            // Set initial state for tech badges
            card.querySelectorAll('.tech-badge').forEach(badge => {
                badge.style.opacity = '0';
                badge.style.transform = 'scale(0.8)';
                badge.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            });

            observer.observe(card);
        });
    },

    /**
     * Animate education cards
     */
    initEducationCards() {
        const educationCards = document.querySelectorAll('.education-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        educationCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    },

    /**
     * Animate project cards
     */
    initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';

                        // Animate highlights
                        const highlights = entry.target.querySelectorAll('.project-highlights li');
                        highlights.forEach((item, itemIndex) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            }, itemIndex * 100);
                        });

                        // Animate tech pills
                        const pills = entry.target.querySelectorAll('.tech-pill');
                        pills.forEach((pill, pillIndex) => {
                            setTimeout(() => {
                                pill.style.opacity = '1';
                                pill.style.transform = 'scale(1)';
                            }, 400 + (pillIndex * 60));
                        });
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) scale(0.95)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            // Set initial state for highlights
            card.querySelectorAll('.project-highlights li').forEach(li => {
                li.style.opacity = '0';
                li.style.transform = 'translateX(-20px)';
                li.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            });

            // Set initial state for tech pills
            card.querySelectorAll('.tech-pill').forEach(pill => {
                pill.style.opacity = '0';
                pill.style.transform = 'scale(0.8)';
                pill.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            });

            observer.observe(card);
        });
    },

    /**
     * Animate certification cards
     */
    initCertificationCards() {
        const certCards = document.querySelectorAll('.cert-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        certCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
};

// Initialize animations
Animations.init();
