// КИБЕРНЕТИЧЕСКАЯ МАТРИЦА СИСТЕМЫ v5.0 // Advanced Deep Ambient Canvas Engine
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

    // Физика курсора мыши с глубокой инерцией доезда
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    window.addEventListener("mousemove", (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
    });

    // Координаты скролла для параллакс-смещения фона
    let scrollY = 0;
    let targetScrollY = 0;
    window.addEventListener("scroll", () => {
        targetScrollY = window.scrollY;
    });

    // Ослабленные Sci-Fi кольца HUD (Прозрачность сведена до премиального минимума)
    const hudRings = [
        { radius: 140, baseSpeed: 0.002, dash: [4, 12], angle: 0, color: "rgba(16, 185, 129, 0.04)", weight: 1 },
        { radius: 280, baseSpeed: -0.001, dash: [40, 60, 10, 30], angle: 0, color: "rgba(47, 128, 237, 0.03)", weight: 1.2 },
        { radius: 500, baseSpeed: -0.0004, dash: [100, 150], angle: 0, color: "rgba(16, 185, 129, 0.02)", weight: 1 }
    ];

    // Медленные вертикальные потоки байт-кода
    const dataStreams = [];
    for (let i = 0; i < 12; i++) {
        dataStreams.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 120 + 60,
            baseSpeed: Math.random() * 0.4 + 0.2,
            opacity: Math.random() * 0.04 + 0.015
        });
    }

    // МАТЕМАТИЧЕСКИЙ ЦИКЛ ОТРЕНДЕРИВАНИЯ ФОНА
    function renderAmbientSystem() {
        // Заливка базового графитового ядра
        ctx.fillStyle = "#050507";
        ctx.fillRect(0, 0, width, height);

        // Расчет физического затухания инерции
        mouse.x += (mouse.targetX - mouse.x) * 0.04;
        mouse.y += (mouse.targetY - mouse.y) * 0.04;
        scrollY += (targetScrollY - scrollY) * 0.06;

        // Коэффициенты смещения слоев (параллакс)
        const offsetX = (mouse.x - width / 2) * 0.025;
        const offsetY = (mouse.y - height / 2) * 0.025;
        const hudScale = 1 + scrollY * 0.0005;
        const speedBoost = 1 + scrollY * 0.002;

        // 1. RADIAL GLOW LAYERS (Живой рассеянный свет)
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Левое верхнее изумрудное пятно
        let glowEmerald = ctx.createRadialGradient(
            width * 0.25 + offsetX * 0.4, 
            height * 0.25 + offsetY * 0.4 - scrollY * 0.15, 
            0, 
            width * 0.25 + offsetX * 0.4, 
            height * 0.25 + offsetY * 0.4 - scrollY * 0.15, 
            450
        );
        glowEmerald.addColorStop(0, "rgba(16, 185, 129, 0.045)");
        glowEmerald.addColorStop(1, "transparent");
        ctx.fillStyle = glowEmerald;
        ctx.fillRect(0, 0, width, height);

        // Правое центральное приглушенно-синее пятно
        let glowMutedCyan = ctx.createRadialGradient(
            width * 0.75 + offsetX * 0.2, 
            height * 0.5 + offsetY * 0.2 - scrollY * 0.05, 
            0, 
            width * 0.75 + offsetX * 0.2, 
            height * 0.5 + offsetY * 0.2 - scrollY * 0.05, 
            500
        );
        glowMutedCyan.addColorStop(0, "rgba(47, 128, 237, 0.035)");
        glowMutedCyan.addColorStop(1, "transparent");
        ctx.fillStyle = glowMutedCyan;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        // 2. ULTRA SUBTLE INDUSTRIAL GRID (Ультратонкая сетка 40px)
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.011)";
        ctx.lineWidth = 1;
        const gridSize = 40;
        
        // Пассивный параллакс смещения сетки относительно скролла
        ctx.translate(offsetX * 0.1, (offsetY * 0.1) - (scrollY * 0.05) % gridSize);
        
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, -gridSize); ctx.lineTo(x, height + gridSize); ctx.stroke();
        }
        for (let y = -gridSize; y < height + gridSize; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }
        ctx.restore();

        // 3. МЕДЛЕННЫЕ ТЕХНИЧЕСКИЕ ПОТОКИ ДАННЫХ
        dataStreams.forEach(stream => {
            let currentSpeed = stream.baseSpeed * speedBoost;
            stream.y -= currentSpeed;
            if (stream.y + stream.length < 0) {
                stream.y = height + Math.random() * 40;
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

        // 4. СВЯЗАННЫЕ СО СКРОЛЛОМ ЭЛЕМЕНТЫ HUD ГЛУБИНЫ
        ctx.save();
        ctx.translate(width / 2 + offsetX * 0.6, height / 2 + offsetY * 0.6);
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

        requestAnimationFrame(renderAmbientSystem);
    }

    renderAmbientSystem();
});