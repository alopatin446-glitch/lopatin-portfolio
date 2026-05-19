// PREMIUM AMBIENT BACKGROUND ENGINE v4.1
// Subtle sci-fi atmosphere — premium industrial AI-system feel
// Linear / Vercel aesthetic: NOT hacker UI, NOT neon soup

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

    // Mouse with soft inertia (independent from animation.js — this drives canvas only)
    let mouse = {
        x: width / 2, y: height / 2,
        targetX: width / 2, targetY: height / 2
    };
    window.addEventListener("mousemove", (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
    });

    // Scroll inertia for canvas effects
    let scrollY = 0, targetScrollY = 0;
    window.addEventListener("scroll", () => { targetScrollY = window.scrollY; });

    // HUD rings — very subtle, rotate at different speeds
    const hudRings = [
        { radius: 130, speed: 0.0028, dash: [4, 16], angle: 0, color: "rgba(16, 185, 129, 0.10)", weight: 1 },
        { radius: 270, speed: -0.0013, dash: [60, 40, 10, 40], angle: 0, color: "rgba(59, 130, 246, 0.065)", weight: 1.5 },
        { radius: 460, speed: -0.0006, dash: [120, 120], angle: 0, color: "rgba(16, 185, 129, 0.04)", weight: 1 }
    ];

    // Vertical data streams — thin, barely visible upward flows
    const dataStreams = [];
    for (let i = 0; i < 14; i++) {
        dataStreams.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 80 + 40,
            baseSpeed: Math.random() * 1 + 0.5,
            opacity: Math.random() * 0.08 + 0.03
        });
    }

    function render() {
        // Deep dark fill — same tint as --bg-main
        ctx.fillStyle = "#050507";
        ctx.fillRect(0, 0, width, height);

        // Smooth inertia
        mouse.x += (mouse.targetX - mouse.x) * 0.055;
        mouse.y += (mouse.targetY - mouse.y) * 0.055;
        scrollY += (targetScrollY - scrollY) * 0.07;

        // Parallax offset — subtle, background lags behind cursor
        const offsetX = (mouse.x - width / 2) * 0.022;
        const offsetY = (mouse.y - height / 2) * 0.022;

        const scrollFactor = scrollY * 0.0008;
        const hudScale = 1 + scrollFactor;
        const speedBoost = 1 + scrollY * 0.004;

        // ── 1. PREMIUM GLOW BLOBS ──────────────────────────
        // Screen blend: additive, non-destructive
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Blue-green glow — upper-left quadrant, follows mouse slowly
        const glow1 = ctx.createRadialGradient(
            width * 0.18 + offsetX * 0.7, height * 0.18 + offsetY * 0.7, 0,
            width * 0.18 + offsetX * 0.7, height * 0.18 + offsetY * 0.7, 380
        );
        glow1.addColorStop(0, "rgba(16, 185, 129, 0.10)");
        glow1.addColorStop(1, "transparent");
        ctx.fillStyle = glow1;
        ctx.fillRect(0, 0, width, height);

        // Blue glow — right side, follows mouse at different lag
        const glow2 = ctx.createRadialGradient(
            width * 0.82 + offsetX * 0.4, height * 0.5 + offsetY * 0.4, 0,
            width * 0.82 + offsetX * 0.4, height * 0.5 + offsetY * 0.4, 420
        );
        glow2.addColorStop(0, "rgba(59, 130, 246, 0.08)");
        glow2.addColorStop(1, "transparent");
        ctx.fillStyle = glow2;
        ctx.fillRect(0, 0, width, height);

        // Subtle center warmth — anchors depth perception
        const glowCenter = ctx.createRadialGradient(
            width * 0.5 + offsetX * 0.15, height * 0.5 + offsetY * 0.15, 0,
            width * 0.5 + offsetX * 0.15, height * 0.5 + offsetY * 0.15, 300
        );
        glowCenter.addColorStop(0, "rgba(255, 255, 255, 0.018)");
        glowCenter.addColorStop(1, "transparent");
        ctx.fillStyle = glowCenter;
        ctx.fillRect(0, 0, width, height);

        ctx.restore();

        // ── 2. STRUCTURAL GRID ─────────────────────────────
        // Ultra-thin — defines space without dominating
        ctx.strokeStyle = "rgba(255, 255, 255, 0.013)";
        ctx.lineWidth = 1;
        ctx.save();
        ctx.translate(offsetX * 0.18, offsetY * 0.18);
        const gridSize = 50;
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }
        ctx.restore();

        // ── 3. DATA STREAMS ────────────────────────────────
        // Upward byte-code flows — very sparse, barely perceivable
        dataStreams.forEach(stream => {
            stream.y -= stream.baseSpeed * speedBoost;
            if (stream.y + stream.length < 0) {
                stream.y = height + Math.random() * 20;
                stream.x = Math.random() * width;
            }
            const grad = ctx.createLinearGradient(stream.x, stream.y, stream.x, stream.y + stream.length);
            grad.addColorStop(0, `rgba(16, 185, 129, ${stream.opacity})`);
            grad.addColorStop(1, "transparent");
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(stream.x, stream.y);
            ctx.lineTo(stream.x, stream.y + stream.length);
            ctx.stroke();
        });

        // ── 4. HUD RINGS ───────────────────────────────────
        // Centered, slow-rotating dashed circles
        // Expand subtly on scroll — feels like camera pulling back
        ctx.save();
        ctx.translate(width / 2 + offsetX * 0.75, height / 2 + offsetY * 0.75);
        ctx.scale(hudScale, hudScale);

        hudRings.forEach(ring => {
            ring.angle += ring.speed * speedBoost;
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