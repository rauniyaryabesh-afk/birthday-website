/* ============================
   FULL script.js (Cute + pleasing UI)
   ============================ */

// ====== CUSTOMIZE HERE ======
const GF_NAME = "Siru";
const YOUR_NAME = "Yabby";
const SECRET_ANSWER = "21/09/2025"; // <-- CHANGE to your real date (DD/MM/YYYY)

// Music
const MUSIC_VOLUME = 0.40;

// Typing speed (bigger = slower)
const TYPE_SPEED_WISH = 28;
const TYPE_SPEED_FIGHT = 34;
const TYPE_SPEED_APOLOGY = 30;
const TYPE_SPEED_LETTER = 30;

// ====== TEXT CONTENT ======
const WISH_FIRST_TEXT =
`Hi Siru, what’s up? 😌
It’s me… yours ${YOUR_NAME} 🤍

It’s your birthday baby 🎂
Happy Birthday mero Siru…
I love you a lottttt 💗

Today is your day mero Siru.
Everything here is just for you.

Under the same moon…
I am far
BUt
I’m still with you. 🌙`;

const PAUSE_AFTER_TEXT =
`This is the silence moment in my everyday life..jaha sadhai din ma ek na ekchoti yo thought aaucha nai...

How lucky I am to have you bhanera...

I am really really lucky to have you in my life mero Siru..`;

const FIGHT_TEXT =
`When we fight sometimes…
we might push each other away.

We say things we don’t fully mean.
We get hurt.
And sometimes… we don’t talk for a while.

But even in those moments
my heart never walks away from you.

So if I ever go quiet,
or if things feel distant for a moment…
please remember
I’m not giving up. I’m just trying to hold us together.`;

const APOLOGY_TEXT =
`I want to say one small thing…
quietly 😌

I know I’m not perfect.

I’ve hurt you sometimes...sometimes bhanda ni dherei..But
not because I didn’t care,
I do care about you alot...ani sabai hurtings unintentionally ho
But still hurt is hurt and I am sorry bebu...

I love you dhereeeeiiiiiii

AND

On your birthday,
I just want you to know one thing
I’m trying to be better for you.

Not because you asked me to…
but because you matter to me 🤍`;

const LETTER_TEXT =
`Hey ${GF_NAME},

Happy birthday my love.
I wish I was there with you today…
but until that day comes...
this website is my hug for you.

Sometimes we fight....sometimes we misunderstand…
but I never want to lose you.

I’m proud of you. I miss you.
And I love you endlessly 🤍

Yours always,
${YOUR_NAME}`;

// Memories: Q&A then 2-photo collage
const MEM_STEPS = [
  {
    title: "On your birthday… I thought about us 💗",
    prompt: "Where do we belong?",
    options: ["Together 😌", "In my heart 🤍", "Everywhere 🌙"],
    replies: {
      "Together 😌": "Exactly 😌💖 even from far… it’s still ‘us’.",
      "In my heart 🤍": "Always… you live there peacefully 🤍",
      "Everywhere 🌙": "Even the moon knows about us 😭💗"
    },
    photos: ["photos/us1.jpg", "photos/us2.jpg"],
    caption: "Us 💗"
  },
  {
    title: "On your birthday… I remembered your smile ✨",
    prompt: "What do I miss the most?",
    options: ["Your smile 😌", "Your voice 🫶", "Everything 😭"],
    replies: {
      "Your smile 😌": "Yes baby… your smile fixes my mood instantly 😭💗",
      "Your voice 🫶": "Your voice calms me… even from far 😌",
      "Everything 😭": "True… I miss everything about you 🤍"
    },
    photos: ["photos/smile1.jpg", "photos/smile2.jpg"],
    caption: "Your smile ✨"
  },
  {
    title: "On your birthday… I imagined our future 🌱",
    prompt: "What are we?",
    options: ["A team 🤝", "My forever 😌", "My home 🏡"],
    replies: {
      "A team 🤝": "Always a team… even when we argue 😌",
      "My forever 😌": "That’s what I want… forever 😌🤍",
      "My home 🏡": "You feel like home to me 🥺🤍"
    },
    photos: ["photos/vibe1.jpg", "photos/vibe2.jpg"],
    caption: " vibes 🌸"
  }
];

// Choose Ending
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

It’s your birthday and
you’re supposed to smile not cry...hehe 😌...
Go eat cake now 🎂

Happy Birthday, my favorite person.`
  },
  hopeful: {
    title: "Hopeful & Future 🌱",
    text:
`This birthday is special…
but it’s not the last one.

There are more moments....
more memories....
and more birthdays waiting for us...

I’m excited for what’s ahead
with you.. 😌

Happy Birthday, ${GF_NAME}.`
  }
};

// ======================
// Helpers
// ======================
const $ = (id) => document.getElementById(id);
function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

function show(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetReply(el){
  if (!el) return;
  el.classList.remove("show");
  el.textContent = "";
}

async function gentleReply(el, text, delay=280){
  if (!el) return;
  resetReply(el);
  await sleep(delay);
  el.textContent = text;
  el.classList.add("show");
}

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
    heartTimer = setInterval(spawnHeart, 520);
    for(let k=0;k<8;k++) setTimeout(spawnHeart, k*140);
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
    setMusicMini("Music: tap again (phone rule) 😌");
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
$("nameTop").textContent = GF_NAME;
$("nameGate").textContent = GF_NAME;
$("nameCake").textContent = GF_NAME;
$("nameFinal").textContent = GF_NAME;

// ======================
// Start: typing
// ======================
(async function init(){
  await typeText($("wishFirstTyped"), WISH_FIRST_TEXT, TYPE_SPEED_WISH);
})();

$("wishFirstNext").addEventListener("click", () => show("sWanna"));

// ======================
// Wanna + No path
// ======================
$("wannaYes").addEventListener("click", () => show("sMood"));
$("wannaNo").addEventListener("click", () => show("sNope1"));

$("nopeBack1").addEventListener("click", () => show("sMood"));
$("nopeMore").addEventListener("click", () => show("sNope2"));
$("nopeBack2").addEventListener("click", () => show("sMood"));

// ======================
// Mood
// ======================
const moodNext = $("moodNext");
resetReply($("moodReply"));

async function setMood(text){
  await gentleReply($("moodReply"), text, 260);
  await sleep(350);
  moodNext.disabled = false;
}
$("mHappy").addEventListener("click", () => setMood("Awww 😌💖 then sayad yesle mero baby ko birthday jhan better banaula ki."));
$("mTired").addEventListener("click", () => setMood("Aww baby..bistari jumm we have enough time 😴🤍 I’ll be gentle today… it’s your day."));
$("mAnnoyed").addEventListener("click", () => setMood("Come here with me..lets hug 😌💗 today is your birthday… not stress day."));
moodNext.addEventListener("click", () => {
  moodNext.disabled = true;
  show("sTrust");
});

// ======================
// Trust
// ======================
const trustNext = $("trustNext");
resetReply($("trustMsg"));

$("tYes").addEventListener("click", async () => {
  await gentleReply($("trustMsg"), "Okay… haat samaau 😌🤍 We will go together.", 260);
  await sleep(380);
  trustNext.disabled = false;
});
$("tDepends").addEventListener("click", async () => {
  await gentleReply($("trustMsg"), "😏 Lala. I will earn it again today… my birthday girl 😌💖", 260);
  await sleep(380);
  trustNext.disabled = false;
});
trustNext.addEventListener("click", () => {
  trustNext.disabled = true;
  show("sPromise");
});

// ======================
// Promise
// ======================
const promiseNext = $("promiseNext");
resetReply($("promiseMsg"));

$("pYes").addEventListener("click", async () => {
  await gentleReply($("promiseMsg"), "😌Okay.. now lets go slowly hai baby… I made it with love for you 🎂", 280);
  await sleep(380);
  promiseNext.disabled = false;
});
$("pNo").addEventListener("click", async () => {
  await gentleReply($("promiseMsg"), "Naaiiii Siru 😭 just one promise baby… go slowly 😌", 260);
  await sleep(900);
  await gentleReply($("promiseMsg"), "Okay okay 😂 birthday girl wins… tap the button now 💖", 220);
  await sleep(360);
  promiseNext.disabled = false;
});

promiseNext.addEventListener("click", async () => {
  promiseNext.disabled = true;
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
resetReply($("gateMsg"));

$("gateInput").addEventListener("input", () => {
  let v = $("gateInput").value.replace(/\D/g, "").slice(0, 8);
  if (v.length >= 5) v = v.slice(0,2) + "/" + v.slice(2,4) + "/" + v.slice(4);
  else if (v.length >= 3) v = v.slice(0,2) + "/" + v.slice(2);
  $("gateInput").value = v;
});

$("gateBtn").addEventListener("click", async () => {
  const ansRaw = ($("gateInput").value || "").trim();
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!ansRaw){
    await gentleReply($("gateMsg"), "Type the date baby...Tha chani?? I know chhaina...Aba letter ma hera jaldi 😄", 120);
    return;
  }
  if (!datePattern.test(ansRaw)){
    await gentleReply($("gateMsg"), "Format should be DD/MM/YYYY (example: 05/12/2023) 😌", 120);
    return;
  }
  if (ansRaw === SECRET_ANSWER){
    await gentleReply($("gateMsg"), "Unlocked 💖", 120);
    await sleep(520);
    show("sCake");
  } else {
    await gentleReply($("gateMsg"), "Hmm… not that date 😌 try again", 140);
  }
});

$("gateInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") $("gateBtn").click();
});

// ======================
// Cake: tap 1 starts music, tap 2 blows candles
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

    await gentleReply($("cakeHint"), "Okay 😌 fuuu garnus candle lai ani make a wish… 🕯️", 120);
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

    await gentleReply($("cakeHint"), "Awww bebu 😭💗 wish made… keep it secret 😌", 120);
    $("cakeState").textContent = "Candles are OFF… now cake time 🍰";

    $("cakeNext").disabled = true;
    await sleep(700);
    $("cakeNext").disabled = false;
    return;
  }
});

// ======================
// Cake Cut screen
// ======================
let cutDone = false;
let pickedMe = false;
const sliceGroup = $("sliceGroup");
const cutLine = $("cutLine");

function resetCutUI(){
  cutDone = false;
  pickedMe = false;
  if (sliceGroup) sliceGroup.classList.remove("cut");
  resetReply($("cutReply"));
  $("cutJk").style.display = "none";
  $("cutNext").style.display = "none";
  $("cutNext").disabled = true;
}

function allowCutContinue(){
  if (cutDone && pickedMe){
    $("cutNext").style.display = "block";
    $("cutNext").disabled = false;
  }
}

$("cakeNext").addEventListener("click", () => {
  resetCutUI();
  show("sCut");
});

$("knifeBtn").addEventListener("click", () => {
  cutDone = true;
  if (sliceGroup) sliceGroup.classList.add("cut");
  if (cutLine){
    cutLine.classList.add("cutShine");
    setTimeout(()=>cutLine.classList.remove("cutShine"), 700);
  }
  allowCutContinue();
});

$("cakeToMe").addEventListener("click", async () => {
  pickedMe = true;
  await gentleReply($("cutReply"), "YEAHHHH 😭💗 first cake malaiiii..yumyum 😌", 180);
  $("cutJk").style.display = "none";
  await sleep(250);
  allowCutContinue();
});

$("cakeToOthers").addEventListener("click", async () => {
  pickedMe = false;
  await gentleReply($("cutReply"), "Nadeko malai??? what??? 😤", 180);
  await sleep(260);
  $("cutJk").style.display = "block";
  $("cutNext").style.display = "none";
  $("cutNext").disabled = true;
});

$("cutJk").addEventListener("click", async () => {
  await gentleReply($("cutReply"), "Hehe 😌 now choose properly…", 120);
  await sleep(380);
  // reset only the choice part (keep slice if already cut)
  pickedMe = false;
  resetReply($("cutReply"));
  $("cutJk").style.display = "none";
});

$("cutNext").addEventListener("click", async () => {
  show("sPause");
  await runPause();
});

// ======================
// Pause
// ======================
async function runPause(){
  $("pauseNext").disabled = true;
  resetReply($("pauseText"));

  for (let i=10; i>=1; i--){
    $("pauseCount").textContent = String(i);
    await sleep(820);
  }
  $("pauseCount").textContent = "🌙";
  await gentleReply($("pauseText"), PAUSE_AFTER_TEXT, 220);
  await sleep(420);
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

$("fightNext").addEventListener("click", () => {
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
  }, TYPE_SPEED_APOLOGY);
}

$("apologySkip").addEventListener("click", () => {
  if (apologyTimer) clearInterval(apologyTimer);
  $("apologyTyped").textContent = APOLOGY_TEXT;
  $("apologyNext").disabled = false;
});

$("apologyNext").addEventListener("click", () => {
  show("sChoose");
  resetReply($("chooseMsg"));
});

// ======================
// Choose each other
// ======================
$("giveUpBtn").addEventListener("click", async () => {
  await gentleReply($("chooseMsg"), "Nooooo 😭 but okay you can be mad. But I’m still here sadhaiiii 😌🤍", 220);
  await sleep(820);
  await gentleReply($("chooseMsg"), "Come… choose us baby 💖", 220);
});

$("chooseBtn").addEventListener("click", async () => {
  await gentleReply($("chooseMsg"), "Thank you 😭💗 I choose you too. Always.", 200);
  await sleep(700);
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

  resetReply($("memReply"));
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

async function chooseMemOption(opt){
  if (memAnswered) return;
  memAnswered = true;

  const step = MEM_STEPS[memIndex];
  await gentleReply($("memReply"), step.replies[opt] || "😌💖", 180);

  $("memPhoto1").style.backgroundImage = `url("${step.photos[0]}")`;
  $("memPhoto2").style.backgroundImage = `url("${step.photos[1]}")`;
  $("memCap").textContent = step.caption;

  $("memFrame").style.display = "grid";
  await sleep(350);
  $("memNext").disabled = false;
}

$("memNext").addEventListener("click", () => {
  if (memIndex < MEM_STEPS.length - 1){
    memIndex++;
    renderMemStep();
  } else {
    show("sChildhood"); // 👈 ADD THIS
  }
});

$("memPrev").addEventListener("click", () => {
  if (memIndex > 0){
    memIndex--;
    renderMemStep();
  }
});

$("memFinal").addEventListener("click", () => {
  showChildhood();
});

// ======================
// CHILDHOOD SCREEN: play clip from 20s to 40s
// ======================
const clipMusic = $("clipMusic");

// Set your childhood photo path here:
const CHILD_PHOTO = "photos/childhood.jpg"; // put your childhood photo in photos/childhood.jpg

const CLIP_START = 15; // seconds
const CLIP_END = 50;   // seconds (stop at this time)

let clipWatcher = null;

function fmtTime(sec){
  const m = Math.floor(sec/60);
  const s = Math.floor(sec%60);
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

async function playClip(){
  // pause background music so it doesn't mix
  try { music.pause(); } catch {}

  // jump to start time
  clipMusic.currentTime = CLIP_START;
  clipMusic.volume = 0.55;
  clipMusic.loop = false;

  // start playing (mobile needs a user gesture → we call from button)
  try{
    await clipMusic.play();
  } catch(e){
    // if it fails, show hint
    await gentleReply($("childMsg"), "Tap Play again baby 😌 (phone rule)", 150);
    return;
  }

  // show message + enable next at end
  $("childNext").disabled = true;
  resetReply($("childMsg"));
  await gentleReply($("childMsg"),
    "You were cute then… and you’re still my favorite person now 🥺🤍",
    180
  );

  // stop at CLIP_END
  if (clipWatcher) clearInterval(clipWatcher);
  clipWatcher = setInterval(() => {
    const t = clipMusic.currentTime;
    $("childTimer").textContent = `Clip: ${fmtTime(CLIP_START)} → ${fmtTime(CLIP_END)}  (Now: ${fmtTime(t)})`;

    if (t >= CLIP_END || clipMusic.ended){
      stopClip(true);
    }
  }, 150);
}

function stopClip(auto=false){
  if (clipWatcher) { clearInterval(clipWatcher); clipWatcher = null; }
  clipMusic.pause();

  // reset timer display
  $("childTimer").textContent = `Clip: ${fmtTime(CLIP_START)} → ${fmtTime(CLIP_END)}`;

  // allow continuing
  $("childNext").disabled = false;

  // resume bg music gently (optional)
  // If you want bg music to continue after clip ends:
  // startMusic();

  if (auto){
    // small cute line when it ends naturally
    gentleReply($("childMsg"),
      "Okay 😌 that was for our school memory… now back to birthday 🎂🤍",
      180
    );
  }
}

function showChildhood(){
  // set photo
  $("childPhoto").style.backgroundImage = `url("${CHILD_PHOTO}")`;

  // reset UI
  $("childNext").disabled = true;
  $("childTimer").textContent = `Clip: ${fmtTime(CLIP_START)} → ${fmtTime(CLIP_END)}`;
  resetReply($("childMsg"));

  show("sChildhood");
}

// Buttons
$("childPlay").addEventListener("click", playClip);
$("childStop").addEventListener("click", () => stopClip(false));
$("childNext").addEventListener("click", () => show("sEnding"));






// ======================
// Ending choice
// ======================
let selectedEndingKey = null;

async function setEnding(key){
  selectedEndingKey = key;
  const data = ENDINGS[key];
  $("endingTitle").textContent = data.title;
  await gentleReply($("endingText"), data.text, 200);
  await sleep(350);
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
  $("finalBtn").textContent = "😭💖";
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
  resetReply($("gateMsg"));

  // cake
  firstCakeTap = false;
  candlesOff = false;
  candles.classList.remove("off");
  setDot("");
  $("cakeState").textContent = "Waiting…";
  $("cakeNext").disabled = true;
  $("cakeHint").textContent = "Tap the cake once to start music 🎶";
  $("cakeHint").classList.add("show");

  // cut
  resetCutUI();

  // pause
  $("pauseCount").textContent = "10";
  resetReply($("pauseText"));
  $("pauseNext").disabled = true;

  // fight
  $("fightTyped").textContent = "";
  $("fightNext").disabled = true;

  // apology
  $("apologyTyped").textContent = "";
  $("apologyNext").disabled = true;

  // choose
  resetReply($("chooseMsg"));

  // letter
  $("letterTyped").textContent = "";
  $("letterSig").style.display = "none";
  $("letterNext").disabled = true;

  // memories
  memIndex = 0;
  renderMemStep();

  // ending
  selectedEndingKey = null;
  $("endingTitle").textContent = "Pick one 😌";
  resetReply($("endingText"));
  $("endingNext").disabled = true;

  // final
  $("finalBtn").disabled = false;
  $("finalBtn").textContent = "What? 😶";
  $("finalBox").style.display = "none";
  confetti = [];
  resizeCanvas();
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // back to start
  show("sWishFirst");
  await typeText($("wishFirstTyped"), WISH_FIRST_TEXT, TYPE_SPEED_WISH);
});
