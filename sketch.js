let pages = 1;
let posArr = [];
let lineCoords;
let blanksArr = [2, 3];
let currentBlank;
let totalBlanks = 3;
let tempText = "press t";
let sketchTime = 20000;
let vid;
let doodleModel, doodleResults;
let handModel, handData, index, middle;
let countdownVal;
let tempArr = [];
let madLibsArr = [
  "story1",
  "story2",
  "story3",
  "story4",
  "story5",
  "story6",
  "story7",
  "story8",
  "story9",
  "story10",
];
let labelsArr = [];
let promptsArr = [
  "A Food",
  "An Animal",
  "Something you'd find in nature",
  "Something you use",
  "A form of transportation",
  "Something you'd wear",
  "A shape",
  "An Occupation",
  "A Place",
];
let currentStory;
let sketch, sketch1, sketch2, sketch3;
let label1, label2, label3;
let url1, url2, url3;
let rowHeader;

let body;
let bodyItalic;
let title;
let titleItalic;
let subtext;
let nextButton;
let cursorImg;
let timerImg;

let pg1, pg2, pg3, pg4, pg5;
let cnvs;
let timeInterval;

function preload() {
  body = loadFont("assets/fonts/Regular.ttf");
  bodyItalic = loadFont("assets/fonts/Italic.ttf");
  title = loadFont("assets/fonts/Bold.ttf");
  titleItalic = loadFont("assets/fonts/BoldItalic.ttf");
  subtext = loadFont("assets/fonts/Light.ttf");
  cursorImg = loadImage("assets/pngs/cursor100.png", loadedCursor);
  timerImg = loadImage("assets/pngs/timer.png", loadedTimer);
}

function loadedCursor() {
  console.log("cursor: ", cursorImg);
}
function loadedTimer() {
  console.log("timer: ", timerImg);
}

function setup() {
  cnvs = document.getElementById("mycanvas");
  cnvs = createCanvas(480, 480);
  cnvs.hide();
  rectMode(CORNER);
  imageMode(CORNER);
  vid = createCapture(VIDEO); //640 x 480
  // vid.size(480,480)
  vid.hide();
  cursor(cursorImg, 32, 32);
  image(cursorImg, width / 2, height - 20);

  pg1 = document.getElementById("page1");

  doodleModel = ml5.imageClassifier("DoodleNet", doodleLoaded);
  handModel = ml5.handpose(vid, handLoaded);
  handModel.on("hand", gotPose);

  selectTopic();
}

function handLoaded() {
  console.log("handModel: ", handModel);
}

function doodleLoaded() {
  console.log("doodleModel: ", doodleModel);
}

function classifySketch() {
  background(255);

  if (posArr.length > 0) {
    for (let i = 1; i < posArr.length; i++) {
      const previous = posArr[i - 1];
      const current = posArr[i];
      stroke(0);
      strokeWeight(16);

      line(previous.x, previous.y, current.x, current.y);
    }
  }
  doodleModel.classify(cnvs, gotLabel);
  console.log(cnvs);
}

function gotLabel(err, results) {
  if (err) {
    console.log(err);
  }
  if (results) {
    console.log("results: ", results);
    doodleResults = results;
  }
  console.log("labelsArr: ", labelsArr);
  console.log(
    doodleResults[0].label,
    doodleResults[1].label,
    doodleResults[2].label
  );
  labelsArr.push([
    doodleResults[0].label,
    doodleResults[1].label,
    doodleResults[2].label,
  ]);
  if (labelsArr.length == 3) {
    page5();
  }
  //   cnvs.hide();
}

function gotPose(results) {
  handData = results;
  // console.log(handData);
  if (results.length > 0) {
    index = results[0].annotations.indexFinger[3];
    middle = results[0].annotations.middleFinger[3];
  }
}

function draw() {
  switch (pages) {
    case 3:
      page3();
      break;
  }
}

function page1() {
  pg1.style.display = "flex";
}

function page2() {
  pg1.style.display = "none";
  pg2 = document.getElementById("page2");
  pg2.style.display = "flex";
}

function page3() {
  background(220);
  imageMode(CORNER);
  push();
  translate(vid.width, 0);
  scale(-1, 1);
  image(vid, 0, 0);
  pop();

  if (handData) {
    let Yindex = index[1];
    let Ymiddle = middle[1];
    let Xindex = vid.width - index[0];
    let Xmiddle = vid.width - middle[0];
    // fill('red')
    // circle(Xindex, Yindex, 15)
    // fill('blue')
    // circle(Xmiddle, Ymiddle, 15)

    // if (posArr.length){
    //     for (let i = 1; i < posArr.length; i++) {
    //         stroke(0);
    //         strokeWeight(25);
    //         line(posArr[i].px,posArr[i].py,posArr[i].x,posArr[i].y,)
    //     }
    // }
    // console.log("index coords: ",Xindex,Yindex, "; top left: ", width / 2 - vid.height / 2,height / 2 - vid.height / 2,"; bottom right: ", width / 2 + vid.height / 2, height / 2 + vid.height / 2)
    noStroke();
    fill(255, 200);
    square(0, 0, width);
    if (
      Xindex > width / 2 - vid.height / 2 &&
      Xindex < width / 2 + vid.height / 2 &&
      Yindex > height / 2 - vid.height / 2 &&
      Yindex < height / 2 + vid.height / 2 &&
      Yindex < Ymiddle
    ) {
      // console.log('within square')
      let xy = {
        x: Xindex,
        y: Yindex,
      };
      posArr.push(xy);

      // console.log("posArr: ", posArr);
    } else if (
      Yindex >= Ymiddle &&
      posArr.length > 0 &&
      posArr[posArr.length - 1].x > 0
    ) {
      const invalid = {
        x: -1,
        y: -1,
      };
      posArr.push(invalid);
    }
    if (posArr.length > 0) {
      for (let i = 1; i < posArr.length; i++) {
        const previous = posArr[i - 1];
        const current = posArr[i];
        stroke(0);
        strokeWeight(16);

        if (previous.x >= 0 && current.x >= 0) {
          line(previous.x, previous.y, current.x, current.y);
        }
      }
    }
    imageMode(CENTER);
    image(cursorImg, Xindex, Yindex);
  }
}

function page4() {

}

function page5() {
  organizeSketches();
  cnvs.hide();

  rowHeader.style.display = "none";

  pg5 = document.getElementById("page5");
  pg5.style.display = "flex";

  const thisStory = document.getElementById(currentStory.toString());
  thisStory.style.display = "block";
}

function selectTopic() {
  currentBlank = 1;
  console.log("totalBlanks: ", totalBlanks);
  currentStory = random(madLibsArr);
  sketch1 = document.getElementById(currentStory.toString() + "img1");
  sketch2 = document.getElementById(currentStory.toString() + "img2");
  sketch3 = document.getElementById(currentStory.toString() + "img3");
  console.log(currentStory);
}

function countdown() {
  if (countdownVal > 0) {
    countdownVal--;
  } else if (countdownVal == 0) {
    clearInterval(timeInterval);
  }
  const countdownTxt = document.getElementById("countdown-text");
  countdownTxt.innerHTML = countdownVal;
}

function switchPages() {
  if (pages == 1) {
    // tempText = "press t";
    const currentPrompt = document.getElementsByClassName("currentPrompt");
    for (let i = 0; i < currentPrompt.length; i++) {
      currentPrompt[i].innerHTML = random(promptsArr);
    }
    const currentBlankHTML = document.getElementById("currentBlank");
    currentBlankHTML.innerHTML = currentBlank;

    if (currentBlank) {
      if (currentBlank <= totalBlanks) {
        sketchTime = 1000 * (25 - currentBlank * 5);
        // console.log("sketchTime: ",sketchTime,"; currentBlank: ", currentBlank)
      }
    }
    const totalTime = document.getElementById("sketchTime");
    totalTime.innerHTML = sketchTime / 1000;
    pages = 2;
    page2();
    if (pg3) {
      pg3.style.display = "none";
    }
  } else if (pages == 2) {
    pg2.style.display = "none";
    pg3 = document.getElementById("page3");
    pg3.style.display = "flex";
    countdownVal = sketchTime / 1000;
    cnvs.show();
    rowHeader = document.getElementById("row-heading");
    rowHeader.style.display="flex"
    timeInterval = setInterval(countdown, 1000);
    page3();
    pages = 3;
  } else if (pages == 5) {
    pages = 1;
    pg1.style.display="flex"
    pg5.style.display="none"
  }
  console.log(
    "currentBlank: ",
    currentBlank,
    "totalBlanks: ",
    totalBlanks,
    "pages",
    pages
  );
  if (currentBlank < totalBlanks && pages == 3) {
    console.log("something is happening");
    setTimeout(() => {
      page3to4();
    }, sketchTime);
  } else if (currentBlank < totalBlanks && pages == 4) {
    setTimeout(() => {
      page4to2();
    }, 3000);
    currentBlank++;
    console.log("WORK");
  } else if (currentBlank == totalBlanks && pages == 3) {
    console.log("posArr: ", posArr);
    setTimeout(() => {
      page3to5();
    }, sketchTime);
  }
  console.log("pages", pages);
  posArr = [];
}

function page3to4() {
  background(255);

  if (posArr.length > 0) {
    for (let i = 1; i < posArr.length; i++) {
      const previous = posArr[i - 1];
      const current = posArr[i];
      stroke(0);
      strokeWeight(16);

      if (previous.x >= 0 && current.x >= 0) {
        line(previous.x, previous.y, current.x, current.y);
      }
    }
  }

  if (currentBlank == 1) {
    url1 = canvas.toDataURL();
    console.log(sketch1, url1);
  } else if (currentBlank == 2) {
    url2 = canvas.toDataURL();
    console.log(sketch2, url2);
  } else if (currentBlank == 3) {
    url3 = canvas.toDataURL();
    console.log(sketch3, url3);
  }
  classifySketch();
  pages = 4;
  rowHeader.style.display = "none";
  pg4=document.getElementById("page4")
  pg4.style.display="flex"
  cnvs.hide()
  switchPages();
}

function page4to2() {
  pages = 1;
  switchPages();
  pg4.style.display="none"
}

function page3to5() {
  background(255);

  if (posArr.length > 0) {
    for (let i = 1; i < posArr.length; i++) {
      const previous = posArr[i - 1];
      const current = posArr[i];
      stroke(0);
      strokeWeight(16);

      if (previous.x >= 0 && current.x >= 0) {
        line(previous.x, previous.y, current.x, current.y);
      }
    }
  }
  url3 = canvas.toDataURL();
  console.log(sketch3, url3);
  classifySketch();
  cnvs.hide();
  pg3.style.display = "none";
  rowHeader = document.getElementById("row-heading");
  rowHeader.style.display = "none";
  // page5()
}

function organizeSketches() {
  sketch1.src = url1;
  sketch2.src = url2;
  sketch3.src = url3;
  label1 = document.getElementById(currentStory.toString() + "blank1");
  label1.innerHTML = labelsArr[0][0];
  label1.style.display = "inline";
  label1.onclick = () => {
    cycleLabels(label1, labelsArr[0]);
  };
  label2 = document.getElementById(currentStory.toString() + "blank2");
  label2.innerHTML = labelsArr[1][0];
  label2.style.display = "inline";
  label2.onclick = () => {
    cycleLabels(label2, labelsArr[1]);
  };
  label3 = document.getElementById(currentStory.toString() + "blank3");
  label3.innerHTML = labelsArr[2][0];
  label3.style.display = "inline";
  label3.onclick = () => {
    cycleLabels(label3, labelsArr[2]);
  };
}

function cycleLabels(elem, arr) {
  const current = elem.innerText;
  const index = arr.indexOf(current);

  elem.innerHTML = arr[(index + 1) % arr.length];
}
