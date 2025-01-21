// TIME
const timeScreen = document.getElementById("timer");
const startPauseBtn = document.getElementById("start-pause");
const imgStartPause = startPauseBtn.firstElementChild;
const spanStartPause = startPauseBtn.lastElementChild;
const musicPlay = new Audio("/sounds/play.wav");
const musicPause = new Audio("/sounds/pause.mp3");
const musicEnd = new Audio("/sounds/beep.mp3");

let timeInSeconds = 1500;
let fullTime = 1500;
let intervalId = null;

musicEnd.loop = true;
showTime();

function showTime() {
  const time = new Date(timeInSeconds * 1000);
  const formatTime = time.toLocaleString("en", {
    minute: "2-digit",
    second: "2-digit",
  });
  timeScreen.innerHTML = `${formatTime}`;
}

const regressiveCount = () => {
  showTime();
  if (timeInSeconds === 0) {
    end();
    return;
  }
  timeInSeconds -= 1;
  showTime();
};

function startPause() {
  showTime();
  if (intervalId) {
    stopRegressive();
    musicPause.play();
    spanStartPause.textContent = "Play";
    imgStartPause.src = "/images/play_arrow.png";
  } else {
    intervalId = setInterval(regressiveCount, 1000);
    musicPlay.play();
    spanStartPause.textContent = "Pause";
    imgStartPause.src = "/images/pause.png";
  }
}

function end() {
  musicEnd.play();
  alert("Time's up!");
  musicEnd.pause();
  reset(fullTime);
}

function stopRegressive() {
  clearInterval(intervalId);
  intervalId = null;
}

function reset(time) {
  stopRegressive();
  timeInSeconds = time;
  fullTime = time;
  showTime();
  spanStartPause.textContent = "Start";
  imgStartPause.src = "/images/play_arrow.png";
}

startPauseBtn.addEventListener("click", startPause);

// MUSIC BEHAVIOR
const musicFocusInput = document.getElementById("alternate-music");
const music = new Audio("/sounds/luna-rise-part-one.mp3");

music.loop = true;

musicFocusInput.addEventListener("change", () => {
  music.paused ? music.play() : music.pause();
});

// ALTERNATE CONTEXT BASE
const html = document.querySelector("html");
const contextButtons = document.querySelectorAll(".app__card-button");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");

contextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const context = button.getAttribute("data-context");
    alternateContext(context);
  });
});

function alternateContext(context) {
  html.setAttribute("data-context", context);
  banner.setAttribute("src", `/images/${context}.png`);
  alternateTitleContext(context);

  const button = document.querySelector(`.app__card-button--${context}`);
  contextButtons.forEach((button) => button.classList.remove("active"));
  button.classList.add("active");
}

function alternateTitleContext(context) {
  switch (context) {
    case "focus":
      title.innerHTML = `
                Optimize your productivity,<br>
                <strong class="app__title-strong">focus on <br>
                what matters.</strong>
            `;
      reset(1500);
      break;
    case "short-break":
      title.innerHTML = `
                How about taking a break?<br>
                <strong class="app__title-strong">Take a short break!</strong>
            `;
      reset(300);
      break;
    case "long-break":
      title.innerHTML = `
                Time to return to the surface.<br>
                    <strong class="app__title-strong">Take a long break.</strong>
            `;
      reset(900);
      break;
  }
}
