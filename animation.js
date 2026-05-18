document.addEventListener("DOMContentLoaded", () => {
    // 1. СИМУЛЯЦИЯ РАБОТЫ СИСТЕМЫ В HEADER
    const sysCodeEl = document.getElementById("sys-code");
    if (sysCodeEl) {
        setInterval(() => {
            const operations = ["CRM_LOG_PARSE", "DB_INDEX_OK", "LLM_PROMPT_SENT", "ERR_LOSS_PREVENTED", "SYS_ALIVE"];
            const randomOp = operations[Math.floor(Math.random() * operations.length)];
            const hex = Math.random().toString(16).substring(2, 8).toUpperCase();
            sysCodeEl.innerText = `[${randomOp} // 0x${hex}]`;
        }, 2500);
    }

    // 2. ИНТЕРАКТИВНЫЙ РАСЧЕТНЫЙ МОДУЛЬ (Внутри кейса мягких окон)
    const specBlock = document.querySelector(".case-architecture-spec");
    if (specBlock) {
        specBlock.style.cursor = "pointer";
        specBlock.addEventListener("mousemove", (e) => {
            const rect = specBlock.getBoundingClientRect();
            const x = Math.floor(e.clientX - rect.left);
            const y = Math.floor(e.clientY - rect.top);
            
            let liveLine = document.getElementById("live-calc-coordinates");
            if (!liveLine) {
                liveLine = document.createElement("div");
                liveLine.id = "live-calc-coordinates";
                liveLine.style.color = "var(--accent-blue)";
                liveLine.style.marginTop = "4px";
                specBlock.appendChild(liveLine);
            }
            liveLine.innerText = `[МЫШЬ_ТРЕКИНГ] X: ${x}px // Y: ${y}px`;
        });
    }

    // 3. SCROLL REVEAL ДЛЯ БЛОКОВ ПО ТЗ (СЕТКА + КАРТОЧКИ + МАНИФЕСТ)
    const blocksToReveal = document.querySelectorAll('.section-block, .hero-cinematic-slide, .manifesto-block');
    
    blocksToReveal.forEach((block, index) => {
        block.classList.add('reveal-hidden');
        block.style.setProperty('--stagger-delay', `${index * 0.08}s`); // Каскадный stagger запуск
    });

    // Функция запуска анимации цифр, когда они доезжают до экрана
    function animateMetrics() {
        const metrics = document.querySelectorAll(".metric-num");
        metrics.forEach(metric => {
            const finalValue = parseInt(metric.innerText);
            if (isNaN(finalValue)) return;
            
            let startValue = 0;
            const duration = 1200;
            const stepTime = Math.max(Math.floor(duration / (finalValue / 5)), 15);
            
            const timer = setInterval(() => {
                startValue += Math.ceil(finalValue / 40);
                if (startValue >= finalValue) {
                    metric.innerText = finalValue + "+";
                    if (finalValue === 17 || finalValue === 24) metric.innerText = finalValue; // Без плюсов для фиксированных параметров
                    clearInterval(timer);
                } else {
                    metric.innerText = startValue + "+";
                }
            }, stepTime);
        });
    }

    let metricsAnimated = false;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                
                // Если в поле зрения попал профиль с метриками, триггерим счётчики один раз
                if (entry.target.classList.contains('hero-profile') && !metricsAnimated) {
                    animateMetrics();
                    metricsAnimated = true;
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.02,
        rootMargin: "0px 0px -30px 0px"
    });

    blocksToReveal.forEach(block => revealObserver.observe(block));
});