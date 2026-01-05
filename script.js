// ======================
// CUSTOMIZE HERE
// ======================
const GF_NAME = "Siru";
const TOP_NAME_TEXT = "mero Siru";
const BRAND_NAME_TEXT = "Siru";
const SECRET_ANSWER = "bebu";       // what she must type to unlock
const SIGN_AS = "Yours always";

const LETTER = `Hey ${GF_NAME},

Happy birthday my love. I wish I was there with you today, but until that day comes, this website is my hug for you.

Sometimes we fight, sometimes we misunderstand… but I never want to give up on us. You matter to me more than my ego, more than distance, more than any temporary anger.

I’m proud of you. I miss you. And I love you endlessly 🤍`;

const MEMORIES = [
  { src: "photos/photo1.jpg", cap: "Us ✨" },
  { src: "photos/photo2.jpg", cap: "That smile 💛" },
  { src: "photos/photo3.jpg", cap: "Forever vibe 🌸" },
  { src: "photos/photo4.jpg", cap: "My person 🫶" }
];

// ======================
// UTIL
// ======================
function showPanel(id){
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function normalize(s){ return (s || "").trim().toLowerCase(); }
function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

// ======================
// SET NAMES
// ======================
document.getElementById("nameTop").textContent = TOP_NAME_TEXT;
document.getElementById("nameBrand").textContent = BRAND_NAME_TEXT;
document.getElementById("nameGate").textContent = GF_NAME;
document.getElementById("nameWish").textContent = GF_NAME;
document.getElementById("nameFinal").textContent = GF_NAME;

// time-based line
const hour = new Date().getHours();
const timeLine = document.getElementById("timeLine");
if (hour >= 22 || hour <= 4) timeLine.textContent = "You should be sleeping… but I’m glad you’re here 🌙";
else if (hour <= 11) timeLine.textContent = "Good morning, pretty birthday girl ☀️";
else if (hour <= 17) timeLine.textContent = "Hope your day feels soft and happy ✨";
else timeLine.textContent = "Good evening… come a little closer 😌";

// ======================
// HEARTS
// ======================
const heartsLayer = document.getElementById("heartsLayer");
const heartEmojis = ["💗","💖","💞","💘","💓"];
let heartTimer = null;

function spawnHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];
  const size = 14 + Math.random()*18;
  h.style.fontSize = `${size}px`;
  h.style.left = `${Math.random()*100}vw`;
  h.style.opacity = (0.35 + Math.random()*0.55).toFixed(2);
  const duration = 6 + Math.random()*6;
  h.style.animationDuration = `${duration}s`;
  heartsLayer.appendChild(h);
  setTimeout(()=>h.remove(), (duration+0.5)*1000);
}
function startHearts(){
  if (!heartTimer){
    heartTimer = setInterval(spawnHeart, 520);
    for(let k=0;k<6;k++) setTimeout(spawnHeart, k*140);
  }
}
function stopHearts(){
  if (heartTimer){ clearInterval(heartTimer); heartTimer = null; }
}

// ======================
// MUSIC (loop forever)
// ======================
const music = document.getElementById("bgMusic");
music.loop = true;

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const replayBtn = document.getElementById("replayBtn");
const muteBtn = document.getElementById("muteBtn");
const musicStatus = document.getElementById("musicStatus");

let musicEverStarted = false;

function setPlayingUI(isPlaying){
  playBtn.disabled = isPlaying;
  pauseBtn.disabled = !isPlaying;
  musicStatus.textContent = isPlaying ? "Music: playing 🎶 (looping)" : "Music: paused";
}

function fadeInMusic(target = 0.40, durationMs = 1200){
  const steps = 30;
  const stepTime = Math.floor(durationMs / steps);
  let v = 0;
  const inc = target / steps;
  music.volume = 0;

  const timer = setInterval(() => {
    v += inc;
    if (v >= target){
      music.volume = target;
      clearInterval(timer);
    } else {
      music.volume = v;
    }
  }, stepTime);
}

async function startMusicSoft(){
  try{
    if (!musicEverStarted){
      music.volume = 0;
      await music.play();
      fadeInMusic(0.40, 1200);
      musicEverStarted = true;
    } else {
      await music.play();
    }
    setPlayingUI(true);
  } catch(e){
    musicStatus.textContent = "Music: tap Play to start";
  }
}

playBtn.addEventListener("click", startMusicSoft);
pauseBtn.addEventListener("click", () => { music.pause(); setPlayingUI(false); });
replayBtn.addEventListener("click", async () => {
  music.currentTime = 0;
  await startMusicSoft();
});
muteBtn.addEventListener("click", () => {
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? "Unmute 🔊" : "Mute 🔇";
});

// ======================
// FLOW: INTRO -> LOADING -> GATE
// ======================
const intro = document.getElementById("step0");
const mainContent = document.getElementById("mainContent");

document.getElementById("promiseBtn").addEventListener("click", async () => {
  intro.classList.remove("active");
  mainContent.style.display = "block";

  startHearts();
  showPanel("stepLoading");
  await runLoading();
  showPanel("stepGate");
});

// Loading
const loadingBar = document.getElementById("loadingBar");
const loadingText = document.getElementById("loadingText");
function runLoading(){
  return new Promise((resolve) => {
    let p = 0;
    loadingText.textContent = "Loading…";
    const timer = setInterval(() => {
      p += 2 + Math.random()*6;
      if (p >= 100){
        p = 100;
        loadingBar.style.width = p + "%";
        loadingText.textContent = "Ready ✨";
        clearInterval(timer);
        setTimeout(resolve, 650);
      } else {
        loadingBar.style.width = p + "%";
      }
    }, 120);
  });
}

// Gate unlock
const secretInput = document.getElementById("secretInput");
const gateMsg = document.getElementById("gateMsg");

document.getElementById("unlockBtn").addEventListener("click", () => {
  const ans = normalize(secretInput.value);
  if (!ans){
    gateMsg.textContent = "Type something 😄";
    gateMsg.style.color = "#ff5db7";
    return;
  }
  if (ans === normalize(SECRET_ANSWER)){
    gateMsg.textContent = "Unlocked 💖";
    gateMsg.style.color = "#18b37b";
    setTimeout(() => showPanel("stepWish"), 600);
  } else {
    gateMsg.textContent = "Hmm… not that 😌 try again";
    gateMsg.style.color = "#ff5db7";
  }
});
secretInput.addEventListener("keydown", (e) => { if (e.key === "Enter") document.getElementById("unlockBtn").click(); });

// ======================
// CAKE LOGIC (NOT STUCK)
// 1st tap: start music + show blow message (candles stay ON)
// 2nd tap: candles OFF + unlock Continue
// ======================
const candles = document.getElementById("candles");
const cakeBtn = document.getElementById("cakeBtn");
const toSongBtn = document.getElementById("toSongBtn");
const wishHint = document.getElementById("wishHint");
const cakeState = document.getElementById("cakeState");
const dot = document.getElementById("dot");

let firstCakeTapDone = false;
let candlesOff = false;

function setDot(mode){
  dot.classList.remove("on","done");
  if (mode === "on") dot.classList.add("on");
  if (mode === "done") dot.classList.add("done");
}

cakeBtn.addEventListener("click", async () => {
  // Tap 1: start music and prompt wish
  if (!firstCakeTapDone){
    firstCakeTapDone = true;

    await startMusicSoft();
    setDot("on");

    wishHint.textContent = "Blow the candle and make a wish… 😌🕯️";
    cakeState.textContent = "Tap the cake again to blow the candles ✨";
    cakeState.style.color = "rgba(29,42,58,0.75)";

    // Keep candles ON
    candlesOff = false;
    candles.classList.remove("off");
    toSongBtn.disabled = true;
    return;
  }

  // Tap 2: blow candles (off) & unlock
  if (!candlesOff){
    candlesOff = true;
    candles.classList.add("off");
    setDot("done");

    cakeState.textContent = "✨ Wish made… keep it secret 😌";
    cakeState.style.color = "#18b37b";
    wishHint.textContent = "Candles are OFF… now go slowly →";

    toSongBtn.disabled = true;
    await sleep(1200);
    toSongBtn.disabled = false;
    return;
  }

  // Further taps: keep it stable
  cakeState.textContent = "Wish already made 😌💖";
  cakeState.style.color = "#18b37b";
});

// Move to song step
toSongBtn.addEventListener("click", async () => {
  showPanel("stepSong");
  await runCountdownAndEnsureMusic();
});

const countdownEl = document.getElementById("countdown");
async function runCountdownAndEnsureMusic(){
  countdownEl.textContent = "3"; await sleep(850);
  countdownEl.textContent = "2"; await sleep(850);
  countdownEl.textContent = "1"; await sleep(850);
  await startMusicSoft();
}

// ======================
// NEXT STEPS
// ======================
document.getElementById("nextToTeaseBtn").addEventListener("click", () => showPanel("stepTease"));

document.getElementById("tellMeBtn").addEventListener("click", () => {
  showPanel("stepLetter");
  startLetterTyping();
});

// Letter typing
const letterTextEl = document.getElementById("letterText");
const letterSigEl = document.getElementById("letterSig");
const toMemoriesBtn = document.getElementById("toMemoriesBtn");
const skipLetterBtn = document.getElementById("skipLetterBtn");

let typingTimer = null;
let typedDone = false;

function startLetterTyping(){
  typedDone = false;
  toMemoriesBtn.disabled = true;
  letterSigEl.style.display = "none";
  letterTextEl.textContent = "";

  const full = LETTER;
  let idx = 0;

  if (typingTimer) clearInterval(typingTimer);
  typingTimer = setInterval(() => {
    idx++;
    letterTextEl.textContent = full.slice(0, idx);

    if (idx >= full.length){
      typedDone = true;
      letterSigEl.style.display = "block";
      letterSigEl.textContent = `— ${SIGN_AS}`;
      toMemoriesBtn.disabled = false;
      clearInterval(typingTimer);
      typingTimer = null;
    }
  }, 22);
}

skipLetterBtn.addEventListener("click", () => {
  if (!typedDone){
    if (typingTimer) clearInterval(typingTimer);
    letterTextEl.textContent = LETTER;
    letterSigEl.style.display = "block";
    letterSigEl.textContent = `— ${SIGN_AS}`;
    toMemoriesBtn.disabled = false;
    typedDone = true;
  }
});

toMemoriesBtn.addEventListener("click", () => {
  showPanel("stepMemories");
  renderMemory();
});

// Memories
const memoryPhoto = document.getElementById("memoryPhoto");
const memoryCaption = document.getElementById("memoryCaption");
const toFinalBtn = document.getElementById("toFinalBtn");
let memIndex = 0;

function renderMemory(){
  const item = MEMORIES[memIndex];
  memoryPhoto.style.backgroundImage = `url("${item.src}")`;
  memoryCaption.textContent = item.cap;
  toFinalBtn.style.display = (memIndex === MEMORIES.length - 1) ? "block" : "none";
}

document.getElementById("nextMemBtn").addEventListener("click", () => {
  memIndex = Math.min(memIndex + 1, MEMORIES.length - 1);
  renderMemory();
});
document.getElementById("prevMemBtn").addEventListener("click", () => {
  memIndex = Math.max(memIndex - 1, 0);
  renderMemory();
});
toFinalBtn.addEventListener("click", () => showPanel("stepFinal"));

// Final confetti
const whatBtn = document.getElementById("whatBtn");
const finalMsg = document.getElementById("finalMsg");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resizeCanvas);

let confetti = [];
function makeConfetti(){
  resizeCanvas();
  confetti = Array.from({length: 160}).map(() => ({
    x: Math.random()*canvas.width,
    y: -20 - Math.random()*canvas.height,
    r: 2 + Math.random()*4,
    vx: -1 + Math.random()*2,
    vy: 2 + Math.random()*4.5,
    rot: Math.random()*Math.PI,
    vr: -0.1 + Math.random()*0.2
  }));
}
function drawConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confetti.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fillRect(-p.r, -p.r, p.r*2.2, p.r*1.4);
    ctx.restore();
  });
  confetti = confetti.filter(p => p.y < canvas.height + 30);
  if(confetti.length) requestAnimationFrame(drawConfetti);
}

whatBtn.addEventListener("click", () => {
  finalMsg.style.display = "block";
  whatBtn.disabled = true;
  whatBtn.textContent = "💖";
  makeConfetti();
  drawConfetti();
});

// Restart + stop hearts
document.getElementById("restartBtn").addEventListener("click", () => {
  // Hide main, show intro
  mainContent.style.display = "none";
  intro.classList.add("active");

  // Reset panels
  showPanel("stepLoading");
  loadingBar.style.width = "0%";
  loadingText.textContent = "Loading…";

  // Gate
  gateMsg.textContent = "";
  secretInput.value = "";

  // Cake state
  firstCakeTapDone = false;
  candlesOff = false;
  candles.classList.remove("off");
  wishHint.textContent = "Tap the cake to begin 🎶";
  cakeState.textContent = "Waiting…";
  cakeState.style.color = "";
  setDot("");

  toSongBtn.disabled = true;

  // Letter
  if (typingTimer) clearInterval(typingTimer);
  letterTextEl.textContent = "";
  letterSigEl.style.display = "none";
  toMemoriesBtn.disabled = true;
  typedDone = false;

  // Memories
  memIndex = 0;
  toFinalBtn.style.display = "none";

  // Final
  finalMsg.style.display = "none";
  whatBtn.disabled = false;
  whatBtn.textContent = "What?";

  confetti = [];
  resizeCanvas();
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Music
  music.pause();
  setPlayingUI(false);
  muteBtn.textContent = music.muted ? "Unmute 🔊" : "Mute 🔇";
});

document.getElementById("stopHeartsBtn").addEventListener("click", stopHearts);
