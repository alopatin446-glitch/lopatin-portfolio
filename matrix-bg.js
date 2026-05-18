// НАУЧНО-ИНЖЕНЕРНЫЙ ИНТЕРФЕЙС HUD v4.0 // Premium Subtle Dark Background Engine
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("cyber-background");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Физика мыши с мягким доездом (инерцией)
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    window.addEventListener("mousemove", (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
    });

    // Плавная инерция скролла для колесика
    let scrollY = 0;
    let targetScrollY = 0;
    window.addEventListener("scroll", () => {
        targetScrollY = window.scrollY;
    });

    // Приглушенные Sci-Fi кольца HUD (не перегружают текст, opacity минимально)
    const hudRings = [
        { radius: 130, baseSpeed: 0.003, dash: [4, 16], angle: 0, color: "rgba(16, 185, 129, 0.08)", weight: 1 },
        { radius: 260, baseSpeed: -0.0015, dash: [60, 40, 10, 40], angle: 0, color: "rgba(59, 130, 246, 0.05)", weight: 1.5 },
        { radius: 450, baseSpeed: -0.0007, dash: [120, 120], angle: 0, color: "rgba(16, 185, 129, 0.03)", weight: 1 }
    ];

    // Едва заметные вертикальные потоки байт-кода
    const dataStreams = [];
    for (let i = 0; i < 15; i++) {
        dataStreams.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 80 + 40,
            baseSpeed: Math.random() * 1 + 0.5,
            opacity: Math.random() * 0.06 + 0.02
        });
    }

    // ВЫСОКОТЕХНОЛОГИЧНЫЙ ЦИКЛ РЕНДЕРА
    function render() {
        // Базовый цвет холста (深 - Deep Black)
        ctx.fillStyle = "#050507";
        ctx.fillRect(0, 0, width, height);

        // Интеграция плавности
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;
        scrollY += (targetScrollY - scrollY) * 0.07;

        // Расчёт параллакс-смещения (зависит от положения курсора)
        const offsetX = (mouse.x - width / 2) * 0.02;
        const offsetY = (mouse.y - height / 2) * 0.02;

        const scrollFactor = scrollY * 0.0008;
        const hudScale = 1 + scrollFactor; // Плавное расширение при скролле
        const speedBoost = 1 + scrollY * 0.004;

        // 1. ОТРИСОВКА PREMIUM GLOW (Мягкие размытые световые волны на бэкграунде)
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        
        // Зелёное приглушенное пятно сверху слева (двигается с параллаксом медленнее контента)
        let glow1 = ctx.createRadialGradient(width * 0.2 + offsetX * 0.5, height * 0.2 + offsetY * 0.5, 0, width * 0.2 + offsetX * 0.5, height * 0.2 + offsetY * 0.5, 350);
        glow1.addColorStop(0, "rgba(16, 185, 129, 0.06)");
        glow1.addColorStop(1, "transparent");
        ctx.fillStyle = glow1;
        ctx.fillRect(0, 0, width, height);

        // Синее приглушенное пятно справа по центру
        let glow2 = ctx.createRadialGradient(width * 0.8 + offsetX * 0.3, height * 0.5 + offsetY * 0.3, 0, width * 0.8 + offsetX * 0.3, height * 0.5 + offsetY * 0.3, 400);
        glow2.addColorStop(0, "rgba(59, 130, 246, 0.04)");
        glow2.addColorStop(1, "transparent");
        ctx.fillStyle = glow2;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        // 2. СВЕРХТОНКАЯ СТРУКТУРНАЯ СЕТКА (Опасити 0.03 по ТЗ)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.012)";
        ctx.lineWidth = 1;
        const gridSize = 50;
        ctx.save();
        ctx.translate(offsetX * 0.2, offsetY * 0.2); // Пассивный параллакс сетки
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }
        ctx.restore();

        // 3. МЯГКИЕ ПОТОКИ ДАННЫХ
        dataStreams.forEach(stream => {
            let currentSpeed = stream.baseSpeed * speedBoost;
            stream.y -= currentSpeed;
            if (stream.y + stream.length < 0) {
                stream.y = height + Math.random() * 20;
                stream.x = Math.random() * width;
            }
            ctx.beginPath();
            let grad = ctx.createLinearGradient(stream.x, stream.y, stream.x, stream.y + stream.length);
            grad.addColorStop(0, `rgba(16, 185, 129, ${stream.opacity})`);
            grad.addColorStop(1, "transparent");
            ctx.strokeStyle = grad;
            ctx.moveTo(stream.x, stream.y);
            ctx.lineTo(stream.x, stream.y + stream.length);
            ctx.stroke();
        });

        // 4. СВЯЗАННЫЕ СО СКРОЛЛОМ HUD КОЛЬЦА (Центрированные по экрану)
        ctx.save();
        ctx.translate(width / 2 + offsetX * 0.8, height / 2 + offsetY * 0.8);
        ctx.scale(hudScale, hudScale);

        hudRings.forEach(ring => {
            ring.angle += ring.baseSpeed * speedBoost;
            ctx.save();
            ctx.rotate(ring.angle);
            ctx.beginPath();
            ctx.arc(0, 0, ring.radius, 0, Math.PI * 2);
            ctx.setLineDash(ring.dash);
            ctx.strokeStyle = ring.color;
            ctx.lineWidth = ring.weight / hudScale;
            ctx.stroke();
            ctx.restore();
        });
        ctx.restore();

        requestAnimationFrame(render);
    }

    render();
});