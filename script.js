/* ============================
   FULL script.js (ALL additions included)
   ============================ */

// ====== CUSTOMIZE HERE ======
const GF_NAME = "Siru";
const YOUR_NAME = "Yabby";
const TOP_NAME_TEXT = "Siru";

// ✅ Unlock answer: first date you met (DD/MM/YYYY)
const SECRET_ANSWER = "21/09/2025"; // <-- CHANGE THIS to your real date

// Music
const MUSIC_VOLUME = 0.40;

// Typing speed (bigger = slower)
const TYPE_SPEED_WISH = 28;
const TYPE_SPEED_FIGHT = 34;
const TYPE_SPEED_LETTER = 30;

// ====== TEXT CONTENT ======
const WISH_FIRST_TEXT =
`It’s me… yours ${YOUR_NAME} 😌

It’s your birthday baby 🎂
Happy Birthday mero Siru…
I love you a lottttt 🤍

Today is your day.
Everything here is just for you.

Under the same moon…
I’m still with you. 🌙`;

const PAUSE_AFTER_TEXT =
`This is the pause I take sometimes…

Not because I don’t care.

But because I care too much —
and I don’t want my words to hurt you.`;

const FIGHT_TEXT =
`When we fight sometimes…
we might push each other away.

We say things we don’t fully mean.
We get hurt.
And sometimes… we don’t talk for a while.

But even in those moments —
my heart never walks away from you.

So if I ever go quiet,
or if things feel distant for a moment…
please remember —
I’m not giving up. I’m just trying to hold us together.`;

const APOLOGY_TEXT =
`I want to say one small thing…
quietly 😌

I know I’m not perfect.

I’ve hurt you sometimes —
not because I didn’t care,
but because I didn’t always know
how to express myself properly.

On your birthday,
I just want you to know one thing —
I’m trying to be better for you.

Not because you asked me to…
but because you matter to me 🤍`;

const LETTER_TEXT =
`Hey ${GF_NAME},

Happy birthday my love.
I wish I was there with you today… but until that day comes, this website is my hug for you.

Sometimes we fight, sometimes we misunderstand…
but I never want to lose you.

I’m proud of you. I miss you.
And I love you endlessly 🤍

— Yours always,
${YOUR_NAME}`;

// Memories: Q&A then 2-photo collage
const MEM_STEPS = [
  {
    title: "On your birthday, I thought about… us 💗",
    prompt: "Where do we belong?",
    options: ["Together 😌", "Far away 🥲", "In my heart 🤍"],
    replies: {
      "Together 😌": "Exactly. Even if we’re far, it’s still ‘us’ 😌💖",
      "Far away 🥲": "Distance is real… but we are more real 😌",
      "In my heart 🤍": "Always. You live there peacefully 🤍"
    },
    photos: ["photos/us1.jpg", "photos/us2.jpg"],
    caption: "Us 💗"
  },
  {
    title: "On your birthday, I remembered… your smile ✨",
    prompt: "What do I miss the most?",
    options: ["My smile 😏", "Your voice 🫶", "Everything 😌"],
    replies: {
      "My smile 😏": "Yes baby… your smile fixes my mood instantly 😭💗",
      "Your voice 🫶": "Your voice calms me… even from far 😌",
      "Everything 😌": "True… I miss everything about you 🤍"
    },
    photos: ["photos/smile1.jpg", "photos/smile2.jpg"],
    caption: "Your smile ✨"
  },
  {
    title: "On your birthday, I imagined… our vibe 🌙",
    prompt: "What are we?",
    options: ["A team 🤝", "A mess 😂", "A forever thing 😌"],
    replies: {
      "A team 🤝": "Always a team… even when we argue 😌",
      "A mess 😂": "We are a mess… but my favorite mess 😭💖",
      "A forever thing 😌": "That’s what I want… forever 😌🤍"
    },
    photos: ["photos/vibe1.jpg", "photos/vibe2.jpg"],
    caption: "Forever vibe 🌸"
  }
];

// Choose Ending (Idea 7)
const ENDINGS = {
  soft: {
    title: "Soft & Emotional 🤍",
    text:
`I hope today felt gentle for you.

No pressure.
No expectations.
Just love… in its calm form 🤍

Happy Birthday, ${GF_NAME}.`
  },
  funny: {
    title: "Funny & Cute 😄",
    text:
`Okay okay 😄
Enough emotions for today.

It’s your birthday —
you’re supposed to smile, not cry 😌

Go eat cake now 🎂

Happy Birthday, my favorite person.`
  },
  hopeful: {
    title: "Hopeful & Future 🌱",
    text:
`This birthday is special…
but it’s not the last one.

There are more moments,
more memories,
and more birthdays waiting for us.

I’m excited for what’s ahead —
with you 😌

Happy Birthday, ${GF_NAME}.`
  }
};

// ======================
// Helpers
// ======================
const $ = (id) => document.getElementById(id);

function show(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

async function typeText(el, text, speed=28){
  el.textContent = "";
  for (let i=0; i<text.length; i++){
    el.textContent += text[i];
    await sleep(speed);
  }
}

// ======================
// Hearts popping
// ======================
const hearts = $("hearts");
const heartEmojis = ["💗","💖","💞","💘","💓","❤️‍🔥"];
let heartTimer = null;

function spawnHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];
  const size = 14 + Math.random()*20;
  h.style.fontSize = `${size}px`;
  h.style.left = `${Math.random()*100}vw`;
  h.style.opacity = (0.35 + Math.random()*0.55).toFixed(2);
  const duration = 6 + Math.random()*7;
  h.style.animationDuration = `${duration}s`;
  hearts.appendChild(h);
  setTimeout(()=>h.remove(), (duration+0.5)*1000);
}
function startHearts(){
  if (!heartTimer){
    heartTimer = setInterval(spawnHeart, 480);
    for(let k=0;k<8;k++) setTimeout(spawnHeart, k*120);
  }
}
startHearts();

// ======================
// Music controls
// ======================
const music = $("bgMusic");
music.loop = true;
music.volume = MUSIC_VOLUME;

function setMusicMini(t){
  const el = $("musicMini");
  if (el) el.textContent = t;
}

async function startMusic(){
  try{
    await music.play();
    setMusicMini("Music: playing 🎶 (looping)");
  } catch {
    setMusicMini("Music: tap again if needed (phone rule)");
  }
}
function pauseMusic(){
  music.pause();
  setMusicMini("Music: paused");
}

$("musicPlay").addEventListener("click", startMusic);
$("musicPause").addEventListener("click", pauseMusic);

// ======================
// Set names in UI
// ======================
$("nameTop").textContent = TOP_NAME_TEXT;
$("nameGate").textContent = GF_NAME;
$("nameCake").textContent = GF_NAME;
$("nameFinal").textContent = GF_NAME;

// ======================
// Init: Screen 1 typing
// ======================
(async function init(){
  await typeText($("wishFirstTyped"), WISH_FIRST_TEXT, TYPE_SPEED_WISH);
})();

$("wishFirstNext").addEventListener("click", () => show("sWanna"));

// ======================
// Wanna screen
// ======================
$("wannaYes").addEventListener("click", () => show("sMood"));
$("wannaNo").addEventListener("click", () => show("sNope1"));

$("nopeBack1").addEventListener("click", () => show("sMood"));
$("nopeMore").addEventListener("click", () => show("sNope2"));
$("nopeBack2").addEventListener("click", () => show("sMood"));

// ======================
// Mood screen
// ======================
const moodNext = $("moodNext");
function setMoodReply(text){
  $("moodReply").textContent = text;
  moodNext.disabled = false;
}
$("mHappy").addEventListener("click", () => setMoodReply("Awww good 😌💖 Then this will make your birthday even better."));
$("mTired").addEventListener("click", () => setMoodReply("Then go slowly baby 😴🤍 I’ll be gentle today… because it’s your birthday."));
$("mAnnoyed").addEventListener("click", () => setMoodReply("I had a feeling 😌 Come… let me fix it. Today is your day, not stress day 💗"));
moodNext.addEventListener("click", () => show("sTrust"));

// ======================
// Trust screen
// ======================
$("tYes").addEventListener("click", () => {
  $("trustMsg").textContent = "Okay… hold my hand. We go together 😌🤍";
  $("trustNext").disabled = false;
});
$("tDepends").addEventListener("click", () => {
  $("trustMsg").textContent = "Fair 😏 I’ll earn it again today… birthday girl 😌💖";
  $("trustNext").disabled = false;
});
$("trustNext").addEventListener("click", () => show("sPromise"));

// ======================
// Promise screen
// ======================
$("pYes").addEventListener("click", () => {
  $("promiseMsg").textContent = "Good 😌 Now go slowly… it’s your special day 🎂";
  $("promiseNext").disabled = false;
});
$("pNo").addEventListener("click", async () => {
  $("promiseMsg").textContent = "Aiyo Siru 😭 Just one promise baby… go slowly 😌";
  await sleep(900);
  $("promiseMsg").textContent = "Okay okay… birthday girl wins 😂 Tap ‘Continue’ now 💖";
  $("promiseNext").disabled = false;
});
$("promiseNext").addEventListener("click", async () => {
  show("sLoad");
  await runLoading();
  show("sGate");
});

// ======================
// Loading bar
// ======================
async function runLoading(){
  const fill = $("barFill");
  const text = $("barText");
  fill.style.width = "0%";
  text.textContent = "Loading…";

  let p = 0;
  while (p < 100){
    p += 3 + Math.random()*8;
    if (p > 100) p = 100;
    fill.style.width = p + "%";
    await sleep(120);
  }
  text.textContent = "Ready ✨";
  await sleep(450);
}

// ======================
// Gate: DD/MM/YYYY + auto slashes
// ======================
$("gateInput").addEventListener("input", () => {
  let v = $("gateInput").value.replace(/\D/g, "").slice(0, 8);
  if (v.length >= 5) v = v.slice(0,2) + "/" + v.slice(2,4) + "/" + v.slice(4);
  else if (v.length >= 3) v = v.slice(0,2) + "/" + v.slice(2);
  $("gateInput").value = v;
});

$("gateBtn").addEventListener("click", () => {
  const ansRaw = ($("gateInput").value || "").trim();
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!ansRaw){
    $("gateMsg").textContent = "Please type the date 😄";
    $("gateMsg").style.color = "var(--pink)";
    return;
  }
  if (!datePattern.test(ansRaw)){
    $("gateMsg").textContent = "Format should be DD/MM/YYYY (example: 05/12/2023)";
    $("gateMsg").style.color = "var(--pink)";
    return;
  }
  if (ansRaw === SECRET_ANSWER){
    $("gateMsg").textContent = "Unlocked 💖";
    $("gateMsg").style.color = "var(--mint)";
    setTimeout(() => show("sCake"), 600);
  } else {
    $("gateMsg").textContent = "Hmm… not that date 😌 try again";
    $("gateMsg").style.color = "var(--pink)";
  }
});

$("gateInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") $("gateBtn").click();
});

// ======================
// Cake logic: tap 1 starts music, tap 2 blows candles
// ======================
const candles = $("candles");
const dot = $("dot");
let firstCakeTap = false;
let candlesOff = false;

function setDot(mode){
  dot.classList.remove("on","done");
  if (mode === "on") dot.classList.add("on");
  if (mode === "done") dot.classList.add("done");
}

$("cakeBtn").addEventListener("click", async () => {
  if (!firstCakeTap){
    firstCakeTap = true;
    await startMusic();
    setDot("on");

    $("cakeHint").textContent = "Blow the candle and make a wish… 😌🕯️";
    $("cakeState").textContent = "Tap again to blow the candles ✨";

    candlesOff = false;
    candles.classList.remove("off");
    $("cakeNext").disabled = true;
    return;
  }

  if (!candlesOff){
    candlesOff = true;
    candles.classList.add("off");
    setDot("done");

    $("cakeState").textContent = "✨ Wish made… keep it secret 😌";
    $("cakeHint").textContent = "Candles are OFF… now let’s cut cake 🍰";

    $("cakeNext").disabled = true;
    await sleep(900);
    $("cakeNext").disabled = false;
    return;
  }
});

// ======================
// NEW: Cake cutting + first cake question screen
// ======================
let cutDone = false;
let pickedMe = false;

const sliceGroup = $("sliceGroup");
const cutLine = $("cutLine");

function resetCakeChoice(){
  pickedMe = false;
  $("cutReply").textContent = "";
  $("cutJk").style.display = "none";
  $("cutNext").style.display = "none";
  $("cutNext").disabled = true;
}

function allowContinueIfReady(){
  if (cutDone && pickedMe){
    $("cutNext").style.display = "block";
    $("cutNext").disabled = false;
  }
}

$("knifeBtn").addEventListener("click", () => {
  cutDone = true;

  if (sliceGroup) sliceGroup.classList.add("cut");
  if (cutLine){
    cutLine.classList.add("cutShine");
    setTimeout(()=>cutLine.classList.remove("cutShine"), 700);
  }
  allowContinueIfReady();
});

$("cakeToMe").addEventListener("click", () => {
  pickedMe = true;
  $("cutReply").style.color = "var(--mint)";
  $("cutReply").textContent = "YEAHHHH 😭💗 First cake malaiiii 😌";
  $("cutJk").style.display = "none";
  allowContinueIfReady();
});

$("cakeToOthers").addEventListener("click", () => {
  pickedMe = false;
  $("cutReply").style.color = "var(--pink)";
  $("cutReply").textContent = "Hurt gareu malai 😤";
  $("cutJk").style.display = "block";
  $("cutNext").style.display = "none";
  $("cutNext").disabled = true;
});

$("cutJk").addEventListener("click", () => {
  $("cutReply").style.color = "rgba(238,242,255,0.85)";
  $("cutReply").textContent = "Hehe 😌 now choose properly…";
  setTimeout(() => resetCakeChoice(), 450);
});

$("cutNext").addEventListener("click", async () => {
  show("sPause");
  await runPause();
});

$("cakeNext").addEventListener("click", () => {
  // reset cut screen state whenever we enter
  cutDone = false;
  pickedMe = false;
  if (sliceGroup) sliceGroup.classList.remove("cut");
  resetCakeChoice();
  show("sCut");
});

// ======================
// Pause moment
// ======================
async function runPause(){
  $("pauseNext").disabled = true;
  $("pauseText").textContent = "";
  for (let i=10; i>=1; i--){
    $("pauseCount").textContent = String(i);
    await sleep(850);
  }
  $("pauseCount").textContent = "🌙";
  $("pauseText").textContent = PAUSE_AFTER_TEXT;
  $("pauseNext").disabled = false;
}

$("pauseNext").addEventListener("click", () => {
  show("sFight");
  startFightTyping();
});

// ======================
// Fight typing
// ======================
let fightTimer = null;
function startFightTyping(){
  $("fightNext").disabled = true;
  $("fightTyped").textContent = "";
  const text = FIGHT_TEXT;
  let i = 0;

  if (fightTimer) clearInterval(fightTimer);
  fightTimer = setInterval(() => {
    i++;
    $("fightTyped").textContent = text.slice(0, i);
    if (i >= text.length){
      clearInterval(fightTimer);
      fightTimer = null;
      $("fightNext").disabled = false;
    }
  }, TYPE_SPEED_FIGHT);
}

$("fightSkip").addEventListener("click", () => {
  if (fightTimer) clearInterval(fightTimer);
  $("fightTyped").textContent = FIGHT_TEXT;
  $("fightNext").disabled = false;
});

// After fight -> apology screen
$("fightNext").addEventListener("click", async () => {
  show("sApology");
  startApologyTyping();
});

// ======================
// Apology typing
// ======================
let apologyTimer = null;
function startApologyTyping(){
  $("apologyNext").disabled = true;
  $("apologyTyped").textContent = "";

  let i = 0;
  if (apologyTimer) clearInterval(apologyTimer);

  apologyTimer = setInterval(() => {
    i++;
    $("apologyTyped").textContent = APOLOGY_TEXT.slice(0, i);
    if (i >= APOLOGY_TEXT.length){
      clearInterval(apologyTimer);
      apologyTimer = null;
      $("apologyNext").disabled = false;
    }
  }, 30);
}

$("apologySkip").addEventListener("click", () => {
  if (apologyTimer) clearInterval(apologyTimer);
  $("apologyTyped").textContent = APOLOGY_TEXT;
  $("apologyNext").disabled = false;
});

$("apologyNext").addEventListener("click", () => {
  show("sChoose");
  $("chooseMsg").textContent = "";
});

// ======================
// Choose each other
// ======================
$("giveUpBtn").addEventListener("click", async () => {
  $("chooseMsg").style.color = "rgba(238,242,255,0.85)";
  $("chooseMsg").textContent = "I know it gets hard… but I’m still here 😌";
  await sleep(900);
  $("chooseMsg").style.color = "var(--mint)";
  $("chooseMsg").textContent = "Come… choose us 💖";
});

$("chooseBtn").addEventListener("click", async () => {
  $("chooseMsg").style.color = "var(--mint)";
  $("chooseMsg").textContent = "Thank you for choosing us. I always will. 💖";
  await sleep(850);
  show("sLetter");
  startLetterTyping();
});

// ======================
// Letter typing
// ======================
let letterTimer = null;
function startLetterTyping(){
  $("letterNext").disabled = true;
  $("letterSig").style.display = "none";
  $("letterTyped").textContent = "";

  const text = LETTER_TEXT;
  let i = 0;

  if (letterTimer) clearInterval(letterTimer);
  letterTimer = setInterval(() => {
    i++;
    $("letterTyped").textContent = text.slice(0, i);
    if (i >= text.length){
      clearInterval(letterTimer);
      letterTimer = null;
      $("letterSig").style.display = "block";
      $("letterSig").textContent = `— ${YOUR_NAME}`;
      $("letterNext").disabled = false;
    }
  }, TYPE_SPEED_LETTER);
}

$("letterSkip").addEventListener("click", () => {
  if (letterTimer) clearInterval(letterTimer);
  $("letterTyped").textContent = LETTER_TEXT;
  $("letterSig").style.display = "block";
  $("letterSig").textContent = `— ${YOUR_NAME}`;
  $("letterNext").disabled = false;
});

$("letterNext").addEventListener("click", () => {
  show("sMem");
  memIndex = 0;
  renderMemStep();
});

// ======================
// Memories
// ======================
let memIndex = 0;
let memAnswered = false;

function renderMemStep(){
  const step = MEM_STEPS[memIndex];
  memAnswered = false;

  $("memTitle").textContent = step.title;
  $("memPrompt").textContent = step.prompt;
  $("memReply").textContent = "";
  $("memFrame").style.display = "none";
  $("memNext").disabled = true;

  const optionsEl = $("memOptions");
  optionsEl.innerHTML = "";

  step.options.forEach(opt => {
    const b = document.createElement("button");
    b.className = "btn ghost";
    b.textContent = opt;
    b.addEventListener("click", () => chooseMemOption(opt));
    optionsEl.appendChild(b);
  });

  $("memFinal").style.display = (memIndex === MEM_STEPS.length - 1) ? "block" : "none";
}

function chooseMemOption(opt){
  if (memAnswered) return;
  memAnswered = true;

  const step = MEM_STEPS[memIndex];
  $("memReply").textContent = step.replies[opt] || "😌💖";

  $("memPhoto1").style.backgroundImage = `url("${step.photos[0]}")`;
  $("memPhoto2").style.backgroundImage = `url("${step.photos[1]}")`;
  $("memCap").textContent = step.caption;

  $("memFrame").style.display = "grid";
  $("memNext").disabled = false;
}

$("memNext").addEventListener("click", () => {
  if (memIndex < MEM_STEPS.length - 1){
    memIndex++;
    renderMemStep();
  }
});
$("memPrev").addEventListener("click", () => {
  if (memIndex > 0){
    memIndex--;
    renderMemStep();
  }
});

// after memories -> ending choice
$("memFinal").addEventListener("click", () => show("sEnding"));

// ======================
// Ending choice (Idea 7)
// ======================
let selectedEndingKey = null;

function setEnding(key){
  selectedEndingKey = key;
  const data = ENDINGS[key];
  $("endingTitle").textContent = data.title;
  $("endingText").textContent = data.text;
  $("endingNext").disabled = false;
}
$("endSoft").addEventListener("click", () => setEnding("soft"));
$("endFunny").addEventListener("click", () => setEnding("funny"));
$("endHopeful").addEventListener("click", () => setEnding("hopeful"));

$("endingNext").addEventListener("click", () => show("sFinal"));

// ======================
// Final: confetti + restart + music toggle
// ======================
const canvas = $("confetti");
const ctx = canvas.getContext("2d");
let confetti = [];

function resizeCanvas(){
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resizeCanvas);

function makeConfetti(){
  resizeCanvas();
  confetti = Array.from({length: 170}).map(() => ({
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
  if (confetti.length) requestAnimationFrame(drawConfetti);
}

$("finalBtn").addEventListener("click", () => {
  $("finalBtn").disabled = true;
  $("finalBtn").textContent = "💖";
  $("finalBox").style.display = "block";
  makeConfetti();
  drawConfetti();
});

$("musicToggle").addEventListener("click", async () => {
  if (music.paused){
    await startMusic();
    $("musicToggle").textContent = "Pause Music";
  } else {
    pauseMusic();
    $("musicToggle").textContent = "Play Music";
  }
});

$("restart").addEventListener("click", async () => {
  // gate
  $("gateInput").value = "";
  $("gateMsg").textContent = "";

  // cake
  firstCakeTap = false;
  candlesOff = false;
  candles.classList.remove("off");
  setDot("");
  $("cakeHint").textContent = "Tap the cake once to start music 🎶";
  $("cakeState").textContent = "Waiting…";
  $("cakeNext").disabled = true;

  // cut
  cutDone = false;
  pickedMe = false;
  if (sliceGroup) sliceGroup.classList.remove("cut");
  resetCakeChoice();
  $("cutReply").textContent = "";

  // pause
  $("pauseCount").textContent = "10";
  $("pauseText").textContent = "";
  $("pauseNext").disabled = true;

  // fight
  $("fightTyped").textContent = "";
  $("fightNext").disabled = true;

  // apology
  $("apologyTyped").textContent = "";
  $("apologyNext").disabled = true;

  // choose
  $("chooseMsg").textContent = "";

  // letter
  $("letterTyped").textContent = "";
  $("letterSig").style.display = "none";
  $("letterNext").disabled = true;

  // memories
  memIndex = 0;
  renderMemStep();

  // ending
  selectedEndingKey = null;
  $("endingTitle").textContent = "Choose your ending 🌙";
  $("endingText").textContent = "";
  $("endingNext").disabled = true;

  // final
  $("finalBtn").disabled = false;
  $("finalBtn").textContent = "What?";
  $("finalBox").style.display = "none";
  confetti = [];
  resizeCanvas();
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // back to start
  show("sWishFirst");
  await typeText($("wishFirstTyped"), WISH_FIRST_TEXT, TYPE_SPEED_WISH);
});
