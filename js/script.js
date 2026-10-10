/* =====================================
   🌌 FONDO DE ESTRELLAS
===================================== */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let stars=[];

for(let i=0;i<180;i++){
    stars.push({
        x:Math.random()*window.innerWidth,
        y:Math.random()*window.innerHeight,
        size:Math.random()*2,
        speed:Math.random()*0.5,
        opacity:Math.random()
    });
}

function drawStars(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star=>{
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI*2);
        ctx.fill();
        star.y += star.speed;
        star.opacity += (Math.random()-.5)*0.03;

        if(star.opacity<0.2) star.opacity=.2;
        if(star.opacity>1) star.opacity=1;

        if(star.y>canvas.height){
            star.y=0;
            star.x=Math.random()*canvas.width;
        }
    });
    requestAnimationFrame(drawStars);
}

drawStars();

/* =====================================
   🔒 VERIFICACIÓN DE CONTRASEÑA
===================================== */
function checkPassword() {
    const input = document.getElementById("passwordInput");
    const errorMsg = document.getElementById("errorMsg");
    const correctPass = "010326";

    if (input.value === correctPass) {
        errorMsg.style.display = "none";
        go(1);
    } else {
        errorMsg.style.display = "block";
        input.value = "";
    }
}

document.getElementById("passwordInput")?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
});

/* =====================================
   🎬 CAMBIO DE ESCENAS
===================================== */
function go(numero){
    document.querySelectorAll(".screen").forEach(screen=>{
        screen.classList.remove("active");
    });

    setTimeout(()=>{
        const next = document.getElementById("s"+numero);
        if(next){
            next.classList.add("active");
            animateText(next);
            if(numero === 8) {
                initPuzzle(); // Inicia y mezcla el puzzle al llegar a la escena final
            }
        }
    },400);
}

/* =====================================
   ✍️ TEXTO ANIMADO
===================================== */
function animateText(section) {
    const texts = section.querySelectorAll("p");

    texts.forEach(text => {
        if (!text.dataset.original) {
            text.dataset.original = text.innerHTML;
        }
        
        const original = text.dataset.original;
        text.innerHTML = "";
        text.style.opacity = "0";
        
        setTimeout(() => {
            text.innerHTML = original;
            text.style.transition = "opacity 1s ease";
            text.style.opacity = "1";
        }, 200);
    });
}

/* =====================================
   ❤️ CORAZONES FLOTANDO
===================================== */
const hearts=[ "❤️", "💖", "💕", "💗", "💘" ];

setInterval(()=>{
    const heart = document.createElement("div");
    heart.className="heart";
    heart.innerHTML = hearts[Math.floor(Math.random()*hearts.length)];
    heart.style.left = Math.random()*100+"vw";
    heart.style.fontSize = (15 + Math.random()*35) + "px";
    heart.style.animationDuration = (4 + Math.random()*4) + "s";
    document.body.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    }, 8000);

}, 300);

/* =====================================
   🎵 MUSICA
===================================== */
const music = document.getElementById("music");
let playing=false;

function toggleMusic(){
    if(!music) return;
    if(playing){
        music.pause();
        playing=false;
    } else {
        music.play();
        playing=true;
    }
}

/* =====================================
   ⌛ CONTADOR
===================================== */
const startDate = new Date("2026-03-01T00:00:00"); 

function updateCounter(){
    const now = new Date();
    const difference = now - startDate;
    const seconds = Math.floor(difference/1000);
    const days = Math.floor(seconds/86400);
    const hours = Math.floor(seconds%86400/3600);
    const minutes = Math.floor(seconds%3600/60);
    const secs = seconds%60;

    document.getElementById("days").innerHTML=days;
    document.getElementById("hours").innerHTML=hours;
    document.getElementById("minutes").innerHTML=minutes;
    document.getElementById("seconds").innerHTML=secs;
}

setInterval(updateCounter, 1000);
updateCounter();

/* =====================================
   🧩 LÓGICA DEL PUZZLE ROMÁNTICO
===================================== */
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const winningState = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function initPuzzle() {
    const successDiv = document.getElementById("puzzleSuccess");
    if (successDiv) successDiv.style.display = "none";
    
    const container = document.getElementById("puzzleBoard");
    if (container) container.classList.remove("solved");

    do {
        for (let i = board.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [board[i], board[j]] = [board[j], board[i]];
        }
    } while (isSolved() || !isSolvable(board));

    renderPuzzle();
}

function renderPuzzle() {
    const container = document.getElementById("puzzleBoard");
    if (!container) return;
    container.innerHTML = "";

    const solved = isSolved();

    board.forEach((val, index) => {
        const piece = document.createElement("div");
        piece.className = "puzzle-piece";
        
        // Si ya está resuelto, mostramos todas las piezas incluyendo la última con su respectivo fondo
        if (val === 8 && !solved) {
            piece.classList.add("empty");
        } else {
            const x = (val % 3) * 50; 
            const y = Math.floor(val / 3) * 50;
            piece.style.backgroundPosition = `${x}% ${y}%`;
            
            if (!solved) {
                piece.onclick = () => movePiece(index);
            }
        }
        container.appendChild(piece);
    });

    if (solved) {
        container.classList.add("solved");
    }
}

function movePiece(index) {
    const emptyIndex = board.indexOf(8);
    const row = Math.floor(index / 3);
    const emptyRow = Math.floor(emptyIndex / 3);
    const col = index % 3;
    const emptyCol = emptyIndex % 3;

    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
        board[emptyIndex] = board[index];
        board[index] = 8;
        
        renderPuzzle();

        if (isSolved()) {
            const successDiv = document.getElementById("puzzleSuccess");
            if (successDiv) successDiv.style.display = "block";
        }
    }
}

function isSolved() {
    return board.every((val, i) => val === winningState[i]);
}

function isSolvable(arr) {
    let inversions = 0;
    const cleanArr = arr.filter(v => v !== 8);
    for (let i = 0; i < cleanArr.length - 1; i++) {
        for (let j = i + 1; j < cleanArr.length; j++) {
            if (cleanArr[i] > cleanArr[j]) inversions++;
        }
    }
    return inversions % 2 === 0;
}

/* =====================================
   💝 FINAL CINEMATOGRÁFICO ELABORADO
===================================== */
function secret(){
    // Ocultar botones y el botón de música
    document.querySelectorAll(".btn-love, .music-btn").forEach(el=>{
        el.style.display="none";
    });

    // Crear el overlay cinematográfico con estructura avanzada
    const overlay = document.createElement("div");
    overlay.className="overlay-love-final";

    overlay.innerHTML=`
        <div class="final-card-content">
            <span class="final-small-tag">Para el amor de mi vida</span>
            <h1 class="final-main-title">Gracias por existir ❤️</h1>
            
            <div class="final-photo-wrapper">
                <img src="img/img5.jpg" alt="Nuestro amor" class="final-heart-photo">
            </div>

            <div class="final-romantic-text">
                <p class="fade-text">Si pudiera volver al primer día...</p>
                <p class="fade-text">volvería a elegirte una y otra vez.</p>
                <p class="fade-text highlight-text">Porque lo nuestro no tiene final, y nuestra historia continuará eternamente...</p>
            </div>

            <h2 class="final-signature">Siempre serás tú 💖</h2>
            
            <button class="btn-restart" onclick="location.reload()">Volver a vivir nuestra historia ✨</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Activar la aparición suave
    setTimeout(() => {
        overlay.classList.add("active");
    }, 150);

    // Lanzar explosión de corazones romántica
    createExplosion();
}

/* =====================================
   💖 EXPLOSION DE CORAZONES
===================================== */
function createExplosion(){
    for(let i=0; i<250; i++){
        setTimeout(()=>{
            const heart = document.createElement("div");
            heart.innerHTML="❤️";
            heart.style.position="fixed";
            heart.style.left = Math.random()*100+"vw";
            heart.style.top = "100vh";
            heart.style.fontSize = Math.random()*30+15+"px";
            heart.style.zIndex="10000";
            heart.style.animation = "float 4s linear forwards";
            document.body.appendChild(heart);

            setTimeout(()=>{
                heart.remove();
            },4000);

        }, i*15);
    }
}