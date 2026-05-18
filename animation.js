document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // ТИП А: СТАТИЧЕСКИ БЕЗОПАСНЫЙ CONTENT REVEAL
    // ==========================================
    const revealElements = document.querySelectorAll(".reveal-element");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target); // Срабатывает строго один раз
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px" // Легкое упреждение анимации
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // ==========================================
    // ТИП Б: BACKGROUND & ARTIFACT PARALLAX MOTION
    // (Применяется только к декоративным слоям!)
    // ==========================================
    
    // Проверяем, не включен ли у пользователя режим экономии движений
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 968;

    if (!prefersReducedMotion && !isMobile) {
        window.addEventListener("scroll", () => {
            const scrolled = window.scrollY;

            // 1. Параллакс фоновых сфер
            const orbs = document.querySelectorAll(".parallax-glow-orb");
            orbs.forEach(orb => {
                const velocity = parseFloat(orb.getAttribute("data-velocity")) || 0.1;
                // Двигаем только фон с помощью чистой 3D матрицы (не ломая верстку)
                orb.style.transform = `translate3d(0, ${scrolled * velocity}px, 0)`;
            });

            // 2. Параллакс парящих UI фрагментов в Hero
            const shards = document.querySelectorAll(".floating-ui-shard");
            shards.forEach(shard => {
                const velocity = parseFloat(shard.getAttribute("data-velocity")) || 0.2;
                shard.style.transform = `translate3d(0, ${-scrolled * velocity}px, 0)`;
            });
        });
        
        // Интерактивное смещение парящих слоев от мыши (Subtle Mouse Parallax)
        const heroScene = document.querySelector(".hero-scene");
        if (heroScene) {
            heroScene.addEventListener("mousemove", (e) => {
                const { clientX, clientY } = e;
                const width = window.innerWidth;
                const height = window.innerHeight;
                
                // Вычисляем отклонение от центра экрана (-0.5 до 0.5)
                const moveX = (clientX / width) - 0.5;
                const moveY = (clientY / height) - 0.5;
                
                const shards = document.querySelectorAll(".floating-ui-shard");
                shards.forEach((shard, index) => {
                    const factor = (index + 1) * 10; // Степень глубины слоя
                    shard.style.left = `calc(${shard.offsetLeft}px + ${moveX * factor}px)`;
                    shard.style.top = `calc(${shard.offsetTop}px + ${moveY * factor}px)`;
                });
            });
        }
    }
});