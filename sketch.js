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
let currentStory;
let sketch, sketch1, sketch2, sketch3;
let label1, label2, label3;
let url1, url2, url3;

let body;
let bodyItalic;
let title;
let titleItalic;
let subtext;
let nextButton;
let cursorImg;
let timerImg;

let pg1, pg2, pg3, pg5, pg6;
let cnvs;
let timeInterval

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
    cnvs=document.getElementById("p5canvas")
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

  //   nextButton = createButton("NEXT");
  //   nextButton.mousePressed(temp);
  //   nextButton.size(100, 50);
  //   nextButton.position(width / 2, 400);
  //   nextButton.style("background-color", "rgba(92,145,213,255)");
  //   nextButton.style("border", "none");
  //   nextButton.style("border-radius", "15px");
  //   nextButton.style("font-style", "italic");
  //   nextButton.style("font-family", "fonts/Italic.ttf");
  //   nextButton.style("color", "white");
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
    case 4:
      page4();
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

  if (currentBlank) {
    if (currentBlank <= totalBlanks) {
      sketchTime = 1000 * (25 - currentBlank * 5);
      // console.log("sketchTime: ",sketchTime,"; currentBlank: ", currentBlank)
    }
  }

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
    image(cursorImg, Xindex, Yindex);

    // if (posArr.length){
    //     for (let i = 1; i < posArr.length; i++) {
    //         stroke(0);
    //         strokeWeight(25);
    //         line(posArr[i].px,posArr[i].py,posArr[i].x,posArr[i].y,)
    //     }
    // }
    // console.log("index coords: ",Xindex,Yindex, "; top left: ", width / 2 - vid.height / 2,height / 2 - vid.height / 2,"; bottom right: ", width / 2 + vid.height / 2, height / 2 + vid.height / 2)
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
    } else if (Yindex >= Ymiddle && posArr.length>0&& posArr[posArr.length - 1].x > 0) {
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
  }
}

function page4() {
  background("#5c91d5");
  noStroke();
  fill(0);
  text("break", width / 2, height / 2);

  image(timerImg, width / 4, height / 2,200,200);
}

function page5() {
  pg5 = document.getElementById("page5");
  const thisStory=document.getElementById("story5")
  thisStory.style.display="block"

  pg5.style.display = "flex";
  organizeSketches();
}

function page6() {
  pg5.style.display = "none";
  pg6 = document.getElementById("page6");
  pg6.style.display = "flex";
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

function countdown(){
    let countdownVal=sketchTime
    if (countdownVal>0){
        countdownVal--
    }else if (countdownVal==0){
        clearInterval(timeInterval)
    }
    const countdownTxt=document.getElementById("countdown-text")
    countdownTxt.innerHTML=countdownVal
}

function switchPages() {
  if (pages == 1) {
    // tempText = "press t";
    page2();
    selectTopic();
    pages = 2;
  } else if (pages == 2) {
    pg2.style.display = "none";
    pg3 = document.getElementById("page3");
    pg3.style.display = "flex";
    cnvs.show();
    page3();
    pages = 3;
    timeInterval = setInterval(countdown, 1000);
  } else if (pages == 5) {
    cnvs.hide();
    page6();
  } else if (pages == 6) {
    pages = 1;

    //-------------RESET EVERYTHING HERE---------------------//
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
    // posArr.push([])
    console.log("something is happening");
    setTimeout(() => {
      page3to4();
    }, sketchTime);
  } else if (currentBlank < totalBlanks && pages == 4) {
    //   pages=3
    setTimeout(() => {
      page4to3();
    }, 3000);
    currentBlank++;
    console.log("WORK");
  } else if (currentBlank == totalBlanks && pages == 3) {
    // posArr.shift()
    console.log("posArr: ", posArr);
    // pages=5
    setTimeout(() => {
      page3to5();
    }, sketchTime);
  }
  if (pages == 3) {
    // posArr.push([])
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

      line(previous.x, previous.y, current.x, current.y);
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
  switchPages();
}

function page4to3() {
  pages = 2;
  switchPages();
}

function page3to5() {
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
  url3 = canvas.toDataURL();
  console.log(sketch3, url3);
  classifySketch();
  // page5()
}

function organizeSketches() {
  sketch1.src = url1;
  sketch2.src = url2;
  sketch3.src = url3;
  label1 = document.getElementById(currentStory.toString() + "blank1");
  label1.innerHTML = labelsArr[0][0];
  label2 = document.getElementById(currentStory.toString() + "blank2");
  label2.innerHTML = labelsArr[1][0];
  label3 = document.getElementById(currentStory.toString() + "blank3");
  label3.innerHTML = labelsArr[2][0];
}

function cycleLabels() {}

function keyPressed() {
  if (key === " ") {
    switchPages();
  }
  if (pages == 1 && key === "t") {
    selectTopic();
  }
}

function temp() {
  console.log("TEMP TEMP TEMP");
}

// function mouseDragged() {
//   if (pages == 3) {
//     if (
//       mouseX > width / 2 - vid.height / 2 &&
//       mouseX < width / 2 + vid.height / 2 &&
//       mouseY > height / 2 - vid.height / 2 &&
//       mouseY < height / 2 + vid.height / 2
//     ) {
//       lineCoords = {
//         px: pmouseX,
//         py: pmouseY,
//         x: mouseX,
//         y: mouseY,
//       };
//     //   if (posArr.length) {
//         // posArr[posArr.length - 1].push(lineCoords);
//         posArr.push(lineCoords);

//   }
//   console.log("posArr: ", posArr);
//     }
//   }
// }

function darkBlue(size, font, align, str = " ", x = 0, y = 0) {
  fill(0, 75, 168);
  textSize(size);
  textFont(font);
  textAlign(align);
  text(str, x, y);
}

function medBlue(size, font, align, str = " ", x = 0, y = 0) {
  fill(92, 145, 213);
  textSize(size);
  textFont(font);
  textAlign(align);
  text(str, x, y);
}

function lightBlue(size, font, align, str = " ", x = 0, y = 0) {
  fill(186, 215, 255);
  textSize(size);
  textFont(font);
  textAlign(align);
  text(str, x, y);
}

function white(size, font, align, str = " ", x = 0, y = 0) {
  fill(255);
  textSize(size);
  textFont(font);
  textAlign(align);
  text(str, x, y);
}

function black(size, font, align, str = " ", x = 0, y = 0) {
  fill(0);
  textSize(size);
  textFont(font);
  textAlign(align);
  text(str, x, y);
}
