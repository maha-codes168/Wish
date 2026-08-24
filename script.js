/* ==========================================================================
   CONFIGURATION SYSTEM
   ========================================================================== */
const birthdayConfig = {
    friendName: "Wania Jatoi",
    birthdayDate: "2026-08-25",

    heroMessage: "To the one who turned everyday moments into unforgettable adventures.",
    birthdayMessage: "Happy Birthday! Thank you for being my constant, my favorite sounding board, and the source of so much joy in my life.",
    secretMessage: "wanoo! You're getting old! But seriously, I'm forever grateful to have you in my corner. You'll always growing apart - besties forever! 🤫✨",
    birthdayLetter: `Dear Wanooo,\n\nLooking back at everything we've experienced together, I couldn't be more thankful to have you as my best friend.\n\nFrom late-night talks to spontaneous road trips, you've always been there with the best advice and genuine support.\n\nMay this year bring you endless success, health, and happiness. You deserve every great thing coming your way.\n\nHappy Birthday!`,

    songTitle: "Our Favorite Track",

    // Scene 4: 10 Customized Photo Slots with Mixed Layout Styles
    gallery: [
        { image: "images/photo1.jpg", caption: "Where the chaos began ✨", layout: "grid-feat" },
        { image: "images/photo2.jpg", caption: "Spontaneous road trips 🚗", layout: "grid-tall" },
        { image: "images/photo3.jpg", caption: "Late night coffee runs ☕", layout: "grid-std" },
        { image: "images/photo4.jpg", caption: "Polaroid moments 📸", layout: "grid-polaroid" },
        { image: "images/photo5.jpg", caption: "Unfiltered laughter 😂", layout: "grid-std" },
        { image: "images/photo6.jpg", caption: "Golden hour views 🌅", layout: "grid-wide" },
        { image: "images/photo7.jpg", caption: "Concert nights 🎶", layout: "grid-polaroid" },
        { image: "images/photo8.jpg", caption: "Core memory unlocked 🔓", layout: "grid-std" },
        { image: "images/photo9.jpg", caption: "Always laughing 💛", layout: "grid-std" },
        { image: "images/photo10.jpg", caption: "To many more years 🥂", layout: "grid-wide" }
    ],

    // Scene 5: Remember When? Flip Cards
    remember: [
        { title: "That crazy night", text: "Our crazy late-night PUBG sessions... Midnight games, endless laughs & zero sleep!.... Those nights were seriously unforgettable." },
        { title: "The secret spot", text: "Finding that quiet rooftop view and talking about our biggest life plans." },
        { title: "First roadtrip", text: "Playing the same playlist on loop for 6 hours straight without getting tired." },
        { title: "The bad idea", text: "When we decided to cook at 2 AM and almost set off the fire alarm." }
    ],

    // Scene 6: Friendship Timeline
    timeline: [
        { date: "Chapter 1", title: "The Beginning", text: "It all started with a simple friendship.... And somehow, you became one of the most special person of my life. Looking back , I'm so glad our paths crossed.", image: "images/photo1.jpg" },
        { date: "Chapter 2", title: "Our First Adventure", text: "Our little road-trip adventures From cafes to Parks, sharing food & ice-cream .... Every moment with you turned into a beautiful memory. Here's to many more adventures together!", image: "images/photo6.jpg" },
        { date: "Chapter 3", title: "The Random Chaos", text: "From random plans to complete chaos, we somehow made every moment unforgettable.", image: "images/photo3.jpg" },
        { date: "Today", title: "Your Birthday 🎂", text: "Celebrating you and another beautiful year of your journey.", image: "images/hero.jpg" }
    ],

    // Scene 7: Why You? Cards
    reasons: [
        { icon: "💗", text: "Because you understand my silence as well as my chatter." },
        { icon: "⚡", text: "Because you turn even the most boring days into an event." },
        { icon: "🛡️", text: "Because with you, I can completely be my authentic self." },
        { icon: "✨", text: "Because somehow, you always manage to turn chaos into memories." }
    ],

    // Scene 8: Quiz Questions
    quiz: [
        { question: "Who is more likely to ruin a cooking recipe?", options: ["You", "Me", "Both of us", "Neither"], correct: 1 },
        { question: "What is our ultimate go-to activity?", options: ["Late night drives", "Endless eating", "Gossiping", "All of the above"], correct: 3 },
        { question: "Who takes longer to reply to messages?", options: ["You", "Me", "Depends on the day", "We reply instantly"], correct: 0 },
        { question: "What describes our friendship best?", options: ["Pure chaos", "Wholesome & peaceful", "Unstoppable duo", "A mix of everything"], correct: 3 },
        { question: "Are we going to keep making memories?", options: ["Yes, obvious!", "100%", "Forever!", "All of the above!"], correct: 3 }
    ]
};

/* ==========================================================================
   APP CONTROLLER & INITIALIZATION
   ========================================================================== */
let currentLightboxIdx = 0;
let quizScore = 0;
let currentQuizQuestion = 0;

document.addEventListener("DOMContentLoaded", () => {
    bindConfigData();
    initParticleCanvas();
    renderGallery();
    renderRememberCards();
    renderTimeline();
    renderReasons();
    renderQuiz();
    initInteractions();
    initAudio();
});

/* Bind Configuration values to DOM */
function bindConfigData() {
    document.getElementById("intro-friend-name").textContent = birthdayConfig.friendName;
    document.getElementById("final-friend-greeting").textContent = `Happy Birthday, ${birthdayConfig.friendName} 🎂`;
    document.getElementById("nav-logo-text").textContent = `${birthdayConfig.friendName}'s Day ✨`;
    document.getElementById("hero-custom-message").textContent = birthdayConfig.heroMessage;
    document.getElementById("player-song-title").textContent = birthdayConfig.songTitle;
    document.getElementById("letter-body-text").textContent = birthdayConfig.birthdayLetter;
}

/* ==========================================================================
   SCENE 1 & 2 INTRO TRANSITIONS
   ========================================================================== */
document.getElementById("scene-1-next").addEventListener("click", () => {
    document.getElementById("scene-1").classList.add("hidden");
    document.getElementById("scene-2").classList.remove("hidden");
});

document.getElementById("scene-2-next").addEventListener("click", () => {
    const introScreen = document.getElementById("intro-screen");
    const mainContent = document.getElementById("main-content");
    const nav = document.getElementById("main-nav");

    introScreen.classList.add("fade-out");
    mainContent.classList.remove("content-hidden");
    nav.classList.remove("hidden");

    setTimeout(() => introScreen.style.display = "none", 1000);

    // Try playing background audio
    const audio = document.getElementById("bg-audio");
    audio.play().catch(() => console.log("User gesture required for audio playback"));
});

/* Mobile Menu Navigation Toggle */
const hamburgerBtn = document.getElementById("hamburger-btn");
const navLinks = document.getElementById("nav-links");

hamburgerBtn.addEventListener("click", () => navLinks.classList.toggle("active"));
document.querySelectorAll(".nav-item").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("active"));
});

/* ==========================================================================
   RENDERERS FOR DYNAMIC SECTIONS
   ========================================================================== */
/* Render Mixed Layout Gallery */
function renderGallery() {
    const grid = document.getElementById("mixed-gallery-grid");
    grid.innerHTML = "";

    birthdayConfig.gallery.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = `gallery-card ${item.layout}`;
        card.innerHTML = `
            <img src="${item.image}" alt="Memory" onerror="this.src='https://picsum.photos/600/600?random=${index}'">
            <div class="gallery-card-info">
                <span>${item.caption}</span>
            </div>
        `;
        card.addEventListener("click", () => openLightbox(index));
        grid.appendChild(card);
    });
}

/* Render Remember When Flip Cards */
function renderRememberCards() {
    const container = document.getElementById("remember-grid");
    container.innerHTML = "";

    birthdayConfig.remember.forEach(item => {
        const card = document.createElement("div");
        card.className = "flip-card";
        card.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-front">
                    <h3>Remember when...</h3>
                    <p style="margin-top: 10px; color: var(--accent-pink); font-weight:600;">${item.title}</p>
                </div>
                <div class="flip-back">
                    <p>${item.text}</p>
                </div>
            </div>
        `;
        card.addEventListener("click", () => card.classList.toggle("flipped"));
        container.appendChild(card);
    });
}

/* Render Friendship Timeline */
function renderTimeline() {
    const container = document.getElementById("timeline-flow");
    container.innerHTML = "";

    birthdayConfig.timeline.forEach((item, index) => {
        const side = index % 2 === 0 ? "left" : "right";
        const node = document.createElement("div");
        node.className = `timeline-node ${side}`;
        node.innerHTML = `
            <div class="timeline-card">
                <span class="badge">${item.date}</span>
                <h3 style="margin: 5px 0;">${item.title}</h3>
                <p style="color: var(--text-muted); font-size:0.9rem;">${item.text}</p>
                ${item.image ? `<img src="${item.image}" class="timeline-img" alt="Timeline memory" onerror="this.style.display='none'">` : ''}
            </div>
        `;
        container.appendChild(node);
    });
}

/* Render Reasons Cards */
function renderReasons() {
    const container = document.getElementById("reasons-grid");
    container.innerHTML = "";

    birthdayConfig.reasons.forEach(item => {
        const card = document.createElement("div");
        card.className = "reason-card";
        card.innerHTML = `
            <div class="reason-icon">${item.icon}</div>
            <p>${item.text}</p>
        `;
        container.appendChild(card);
    });
}

/* ==========================================================================
   SCENE 8: QUIZ LOGIC
   ========================================================================== */
function renderQuiz() {
    const container = document.getElementById("quiz-body");
    if (currentQuizQuestion >= birthdayConfig.quiz.length) {
        showQuizResults();
        return;
    }

    const q = birthdayConfig.quiz[currentQuizQuestion];
    container.innerHTML = `
        <h3 style="margin-bottom: 1.5rem;">Question ${currentQuizQuestion + 1}/${birthdayConfig.quiz.length}: ${q.question}</h3>
        <div class="quiz-options">
            ${q.options.map((opt, idx) => `<button class="quiz-option-btn" onclick="handleQuizAnswer(${idx})">${opt}</button>`).join('')}
        </div>
    `;
}

function handleQuizAnswer(selectedIndex) {
    if (selectedIndex === birthdayConfig.quiz[currentQuizQuestion].correct) {
        quizScore++;
    }
    currentQuizQuestion++;
    renderQuiz();
}

function showQuizResults() {
    const container = document.getElementById("quiz-body");
    let resultText = "";

    if (quizScore >= 4) {
        resultText = "Okayyy, BESTIE status confirmed! 😭💗 You know us inside out.";
        triggerConfetti();
    } else if (quizScore >= 2) {
        resultText = "Not bad! But we definitely need to make more memories apparently. 😂";
    } else {
        resultText = "Fake bestie detected! 💀 Just kidding, let's fix this score next year!";
    }

    container.innerHTML = `
        <div style="text-align:center;">
            <h2>Quiz Complete! 🎉</h2>
            <p style="font-size: 1.5rem; margin: 1rem 0; color: var(--accent-pink);">Score: ${quizScore}/${birthdayConfig.quiz.length}</p>
            <p style="color: var(--text-muted);">${resultText}</p>
            <button class="btn-glow" onclick="resetQuiz()" style="margin-top:1.5rem;">Try Again ↻</button>
        </div>
    `;
}

function resetQuiz() {
    quizScore = 0;
    currentQuizQuestion = 0;
    renderQuiz();
}

/* ==========================================================================
   LIGHTBOX MODAL
   ========================================================================== */
const lightbox = document.getElementById("lightbox-modal");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCap = document.getElementById("lightbox-caption");

function openLightbox(index) {
    currentLightboxIdx = index;
    updateLightbox();
    lightbox.classList.add("active");
}

function updateLightbox() {
    const item = birthdayConfig.gallery[currentLightboxIdx];
    lightboxImg.src = item.image;
    lightboxCap.textContent = item.caption;
}

document.getElementById("lightbox-close").addEventListener("click", () => lightbox.classList.remove("active"));
document.getElementById("lightbox-prev").addEventListener("click", () => {
    currentLightboxIdx = (currentLightboxIdx - 1 + birthdayConfig.gallery.length) % birthdayConfig.gallery.length;
    updateLightbox();
});
document.getElementById("lightbox-next").addEventListener("click", () => {
    currentLightboxIdx = (currentLightboxIdx + 1) % birthdayConfig.gallery.length;
    updateLightbox();
});

/* ==========================================================================
   INTERACTIVE HANDLERS (Cake, Envelope, Modals)
   ========================================================================== */
function initInteractions() {
    // Cake Candle Blow
    document.getElementById("blow-candles-btn").addEventListener("click", () => {
        document.querySelectorAll(".flame").forEach(f => f.classList.add("out"));
        document.getElementById("cake-wish-message").classList.remove("hidden");
        triggerConfetti();
    });

    // Modals
    const secretModal = document.getElementById("secret-modal");
    const letterModal = document.getElementById("letter-modal");

    document.getElementById("open-secret-btn").addEventListener("click", () => {
        secretModal.classList.add("active");
        typewriterSecretText();
    });

    document.getElementById("secret-close").addEventListener("click", () => secretModal.classList.remove("active"));

    document.getElementById("open-letter-btn").addEventListener("click", () => letterModal.classList.add("active"));
    document.getElementById("letter-close").addEventListener("click", () => letterModal.classList.remove("active"));

    // Replay Story
    document.getElementById("replay-story-btn").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function typewriterSecretText() {
    const container = document.getElementById("secret-typewriter-text");
    const text = birthdayConfig.secretMessage;
    container.textContent = "";
    let i = 0;

    function type() {
        if (i < text.length) {
            container.textContent += text.charAt(i);
            i++;
            setTimeout(type, 30);
        }
    }
    type();
}

/* ==========================================================================
   AUDIO PLAYER CONTROLLER
   ========================================================================== */
function initAudio() {
    const audio = document.getElementById("bg-audio");
    const playBtn = document.getElementById("play-pause-btn");
    const vol = document.getElementById("volume-slider");

    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    vol.addEventListener("input", (e) => {
        audio.volume = e.target.value;
    });
}

/* ==========================================================================
   CANVAS ANIMATIONS (PARTICLES & CONFETTI)
   ========================================================================== */
function initParticleCanvas() {
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1,
            d: Math.random() * 0.5 + 0.2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.beginPath();
        particles.forEach(p => {
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            p.y -= p.d;
            if (p.y < 0) p.y = canvas.height;
        });
        ctx.fill();
        requestAnimationFrame(draw);
    }
    draw();
}

function triggerConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let pieces = [];
    const colors = ["#ff3366", "#7928ca", "#00f2fe", "#ffd700", "#ff80ab"];

    for (let i = 0; i < 80; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            vy: Math.random() * 3 + 2,
            vx: Math.random() * 2 - 1
        });
    }

    let frames = 0;
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            p.y += p.vy;
            p.x += p.vx;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });

        frames++;
        if (frames < 150) requestAnimationFrame(render);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    render();
}