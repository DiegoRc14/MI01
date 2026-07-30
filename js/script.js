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
        go(1); // Avanza a la Escena 1 (Intro)
    } else {
        errorMsg.style.display = "block";
        input.value = ""; // Limpia el campo en caso de error
    }
}

// Permitir presionar la tecla "Enter" para verificar
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
        }
    },400);
}

/* =====================================
   ✍️ TEXTO ANIMADO (Seguro con HTML)
===================================== */
function animateText(section) {
    const texts = section.querySelectorAll("p");

    texts.forEach(text => {
        // Guardamos el texto sin romper los saltos de línea
        if (!text.dataset.original) {
            text.dataset.original = text.innerHTML;
        }
        
        const original = text.dataset.original;
        text.innerHTML = "";
        text.style.opacity = "0";
        
        // Aparición suave y limpia en lugar de escribir código HTML
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
// !!! AJUSTA TU FECHA DE INICIO AQUÍ !!!
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
   💝 FINAL CINEMATOGRÁFICO
===================================== */
function secret(){
    // Ocultar botones y el botón de música
    document.querySelectorAll(".btn-love, .music-btn").forEach(el=>{
        el.style.display="none";
    });

    const overlay = document.createElement("div");
    overlay.className="overlay"; // Empieza invisible en el CSS

    overlay.innerHTML=`
        <h1 class="final-title">
            Gracias por existir
        </h1>

        <p>
            Si pudiera volver al primer día...
            <br>
            volvería a elegirte.
        </p>

        <p>
            Una y otra vez.
        </p>

        <h2>
            Siempre serás tú ❤️
        </h2>

         <p>
            Porque lo nuestro no tiene un final,
            <br>
            nuestra historia continuará...
        </p>
    `;

    document.body.appendChild(overlay);

    // Activar la transición suave después de un pequeño retraso
    setTimeout(() => {
        overlay.classList.add("active");
    }, 100);

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
            heart.style.zIndex="10000"; // Por encima de la superposición negra (z-index: 9999)
            heart.style.animation = "float 4s linear forwards";
            document.body.appendChild(heart);

            setTimeout(()=>{
                heart.remove();
            },4000);

        }, i*15);
    }
}