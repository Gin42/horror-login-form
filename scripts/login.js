/*TO DO
Aggiungere casistiche in modod che se siamo nella modifica della password l'occhio non sbatta, così come se si è in input. 
Aggiungere animazione occhio che va verso scritta e torna al suo posto
Aggiungere maschera per login */

const FRAME_CLASS = "frame";
const MAX_FRAMES = 5;
const DELAY_RANGE = 10;
const DELAY_MIN = 1;
const DELAY_MAX = 5000;

const passInput = document.getElementById("passwordInput");
const textInput = document.getElementById("username");
const ball = document.querySelector(".ball");
const lid = document.querySelector(".lid.upper");
const originalCx = ball.getAttribute("cx");
const originalCy = ball.getAttribute("cy");
const ballRadius = parseFloat(ball.getAttribute("r"));

const pathLength = lid.getTotalLength() / 2.1;

const min = 75.65887247721354;
const max = 253.2927469889323;

let i = -1;
let pos = 1;
let currentFrame = -1;

let input = false;
let password = false;
let checked = false;

function setInput(condition) {
  input = condition;
  if (!input) {
    const elements = document.querySelectorAll(".lid.lower, .ball");
    elements.forEach((element) => (element.style.display = "block"));
  }
}

function setPass(condition) {
  password = condition;
  if (!password) {
    const elements = document.querySelectorAll(".lid.lower, .ball");
    elements.forEach((element) => (element.style.display = "block"));
  }
}

/*START OF SITE: 
- occhio grande sbatte se non c'è un input */
function blinking() {
  function animate() {
    if (i === -1) {
      updateFrame(1);
    }
    if (!input) {
      const delayInSeconds =
        Math.floor(Math.random() * DELAY_RANGE) + DELAY_MIN;
      const delayInMilliseconds = delayInSeconds * 1000;
      // Use setTimeout to schedule closeLid after a delay
      setTimeout(closeLid, delayInMilliseconds);
      // Stop the animation loop
      return;
    }
    // Request the next animation frame
    requestAnimationFrame(animate);
  }

  // Start the animation loop
  requestAnimationFrame(animate);
}

function updateFrame(increment) {
  i += increment;
  document.querySelectorAll(".frame").forEach((svg) => {
    svg.style.display = "none";
    if (svg.className.baseVal.includes(i.toString())) {
      svg.style.display = "block";
    }
  });
}

function closeLid() {
  updateFrame(1);
  if (i < MAX_FRAMES) {
    setTimeout(closeLid, 30);
  } else if (i === MAX_FRAMES) {
    setTimeout(openLid, 100);
  }
}

function openLid() {
  updateFrame(-1);
  if (i > 0) {
    setTimeout(openLid, 30);
  } else if (i === 0) {
    setTimeout(blinking, 1000);
  }
}

/*GESTIONE INPUT
- quando viene inserita la mail l'occhio deve girare */
textInput.addEventListener("input", (e) => {
  email = true;

  var textLength = textInput.value.length;
  var normalizedLength = min + (textLength / 150) * pathLength; // Assuming the maximum text length is 100 for simplicity
  if (normalizedLength > max) {
    normalizedLength = max;
  } else if (normalizedLength < min) {
    normalizedLength = min;
  }
  var point = lid.getPointAtLength(normalizedLength);

  ball.setAttribute("cx", point.x);
  ball.setAttribute("cy", point.y - ballRadius);
  console.log(ball.getAttribute("cx"), ball.getAttribute("cy"));
});

textInput.addEventListener("blur", () => {
  ball.setAttribute("cx", originalCx);
  ball.setAttribute("cy", originalCy);
});

/*GESTIONE PASSWORD
- l'occhio si chiude
- se checkato si aprono gli occhi piccoli e iniziano a blinkare
- l'occhio grande non si apre a meno che non venga riclickato l'input della mail */

document.querySelector(".pass").addEventListener("focus", (e) => {
  const elements = document.querySelectorAll(".lid.lower, .ball");
  elements.forEach((element) => (element.style.display = "none"));
  input = true;
});

//occhietti
document.querySelector(".visible").addEventListener("change", (e) => {
  document
    .querySelectorAll(".visible-icon")
    .forEach(
      (element) =>
        (element.style.display =
          element.style.display === "none" ? "block" : "none")
    );
  passInput.type = passInput.type === "password" ? "text" : "password";
  checked = !checked;
  if (checked) {
    sblinking();
  } else {
    currentFrame = -1;
    updateMask(0);
  }
});

function sblinking() {
  if (currentFrame === -1) {
    updateMask(1);
  }
  const delayInSeconds = Math.floor(Math.random() * DELAY_RANGE) + DELAY_MIN;
  const delayInMilliseconds = delayInSeconds * 1000;
  setTimeout(closeSLid, delayInMilliseconds);
}

function updateMask(increment) {
  currentFrame += increment;
  document.querySelectorAll(".tear").forEach((element) => {
    element.setAttribute(
      "mask",
      "url(#" + "maskPos" + pos++ + "Fr" + currentFrame + ")"
    );
  });
  pos = 1;
}

function closeSLid() {
  updateMask(1);
  if (currentFrame < MAX_FRAMES) {
    setTimeout(closeSLid, 30);
  } else if (currentFrame === MAX_FRAMES) {
    setTimeout(openSLid, 100);
  }
}

function openSLid() {
  updateMask(-1);
  if (currentFrame > 0) {
    setTimeout(openSLid, 30);
  } else if (currentFrame === 0) {
    setTimeout(sblinking, 1000);
  }
}

window.onload = function () {
  blinking();
};
