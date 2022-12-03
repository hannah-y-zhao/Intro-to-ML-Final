//timeout shorter for each one, 20-15-10
//p5 speech to read out story at the end
//saving images that are drawn
//separate canvas

//translate(vid.width,0) scale(-1,1) to flip video
let pages = 1;
let posArr = [];
let lineCoords;
let blanksArr = [2, 3];
let currentBlank, totalBlanks;
let tempText = "press t";
let sketchTime = 20000;
let vid;
let doodleModel, doodleResults, sketch;
let handModel, handData, index, middle;
let tempArr = [];
let madLibsArr = [
  [
    ["Someone I know recently combined "],
    [" flavored Syrup & "],
    [". Popcorn thinking it would be a nice desert. It tasted like "],
    [" and they don't recommend anyone else try it either."],
  ],
  [
    ["Hang on, the "],
    ["(s) are scratching at the "],
    [" and they'll be upset by the lack of "],
    ["(s)."],
  ],
  [
    ["Most "],
    [" attacks occur about 10 feet from the "],
    [" since that's where all the "],
    ["(s) are."],
  ],
  [
    ["I asked for some "],
    [
      "(s) for Christmas but Santa returned my letter and said I already have too many ",
    ],
    ["(s)! He gave me a(n) "],
    ["instead."],
  ],
  [
    ["Just the sight of his "],
    [" made me want to run and hide under my mom's "],
    ["... I haven't been that scared since I first saw a(n) "],
    ["."],
  ],
  [
    ["She wanted a pet "],
    [" but ended up getting a(n) "],
    [" and a(n) "],
    [" instead."],
  ],
  [
    ["Written "],
    ["(s) in instruction "],
    ["(s) are worthless since "],
    ["(s) can't read."],
  ],
  [
    ["There aren't enough "],
    ["(s) in the world to stop the "],
    [" that's coming out of his "],
    ["."],
  ],
  [
    [
      "She's been eyeing them all day and waiting to make her move like a wild ",
    ],
    [" stalking a(n) "],
    [" in the "],
    ["."],
  ],
  [
    ["He embraced his new life as a(n) "],
    [". Although he thought there would be more "],
    ["(s) involved, "],
    ["(s) are okay too."],
  ],
];

let body;
let bodyItalic;
let title;
let titleItalic;
let subtext;
let nextButton;
let cursorImg

function preload() {
  body = loadFont("assets/fonts/Regular.ttf");
  bodyItalic = loadFont("assets/fonts/Italic.ttf");
  title = loadFont("assets/fonts/Bold.ttf");
  titleItalic = loadFont("assets/fonts/BoldItalic.ttf");
  subtext = loadFont("assets/fonts/Light.ttf");

    cursorImg=loadImage("assets/pngs/cursor32.png", loadedCursor)
}

function loadedCursor(){
    console.log("cursor: " ,cursorImg)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // rectMode(CENTER)
  imageMode(CENTER);
  vid = createCapture(VIDEO); //640 x 480
  // vid.size(480,480)
  vid.hide();
  cursor(cursorImg,32,32)
  image(cursorImg,width/2,height-20)

  doodleModel = ml5.imageClassifier("DoodleNet", doodleLoaded);
  handModel = ml5.handpose(vid, handLoaded);
  handModel.on("hand", gotPose);

  nextButton = createButton("NEXT");
  nextButton.mousePressed(temp);
  nextButton.size(100, 50);
  nextButton.position(width / 2, 400);
  nextButton.style("background-color", "rgba(92,145,213,255)");
  nextButton.style("border", "none");
  nextButton.style("border-radius", "15px");
  nextButton.style("font-style", "italic");
  nextButton.style("font-family", "fonts/Italic.ttf");
  nextButton.style("color", "white");
}

function handLoaded() {
  console.log("handModel: ", handModel);
}

function doodleLoaded() {
  console.log("doodleMode: ", doodleModel);
}

function classifySketch() {
  doodleModel.classify(sketch, gotLabel);
}

function gotLabel(err, results) {
  if (err) {
    console.log(err);
  }
  if (results) {
    console.log(results);
    doodleResults = results;
  }
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
    case 1:
      page1();
      break;
    case 2:
      page2();
      break;
    case 3:
      page3();
      break;
    case 4:
      page4();
      break;
    case 5:
      page5();
      break;
    case 6:
      page6();
      break;
  }
}

function page1() {
    cursor(cursorImg,32,32)

  background(220);
  noStroke();
  fill(0);
  text(tempText, width / 2, height / 2);
  darkBlue(55, title, CENTER, "Testing Title", width / 2, 100);
}

function page2() {
  background(220);
  noStroke();
  fill(0);
  text("instructions", width / 2, height / 2);
}

function page3() {
  // console.log('page3')
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
  image(vid, -vid.width / 8, height / 2);
  pop();

  if (handData) {
    noStroke();
    push();
    translate(vid.width, 0);
    scale(-1, 1);
    let Xindex = index[0] - (vid.width * 5) / 8;
    let Yindex = index[1] + vid.height / 4;
    let Xmiddle = middle[0] - (vid.width * 5) / 8;
    let Ymiddle = middle[1] + vid.height / 4;
    fill("red");
    circle(Xindex, Yindex, 15);
    fill("blue");
    circle(Xmiddle, Ymiddle, 15);

    if (posArr.length) {
      for (let i = 1; i < posArr.length; i++) {
        stroke(0);
        strokeWeight(25);
        line(posArr[i].px, posArr[i].py, posArr[i].x, posArr[i].y);
      }
    }
    console.log(
      "index coords: ",
      Xindex,
      Yindex,
      "; top left: ",
      width / 2 - vid.height / 2,
      height / 2 - vid.height / 2,
      "; bottom right: ",
      width / 2 + vid.height / 2,
      height / 2 + vid.height / 2
    );
    // if (
    //     Xindex > width / 2 - vid.height / 2 &&
    //     Xindex < width / 2 + vid.height / 2 &&
    //     Yindex > height / 2 - vid.height / 2 &&
    //     Yindex < height / 2 + vid.height / 2
    //     // Xindex > width / 2 - vid.height / 4 &&
    //     // Xindex < width / 2 + vid.height / 4 &&
    //     // Yindex > height / 2 - vid.height / 4 &&
    //     // Yindex < height / 2 + vid.height / 4 &&
    //     // Yindex < Ymiddle
    //   ) {
    //     console.log('within square')
    //     // let xy = {
    //     //     x: Xindex,
    //     //     y: Yindex
    //     // }
    //     // posArr.push(xy)

    //     lineCoords = {
    //       px: pmouseX,
    //       py: pmouseY,
    //       x: mouseX,
    //       y: mouseY,
    //     };
    //     if (posArr.length) {
    //       posArr[posArr.length - 1].push(lineCoords);
    //     }
    //     console.log("posArr: ", posArr);
    //   }
    //   pop()
    //   if (posArr.length>0){
    //     for (let i = 1; i < posArr.length; i++) {
    //         const previous = posArr[i - 1];
    //         const current = posArr[i];
    //         stroke(0);
    //         strokeWeight(25);

    //         line(previous.x, previous.y, current.x, current.y);

    //         // circle(current.x, current.y, 27);
    //       }
    //   }
  }

  //   if (posArr.length > 0) {
  //     for (i = 0; i < posArr[posArr.length - 1].length; i++) {
  //       stroke("black");
  //       strokeWeight(16);
  //       line(
  //         posArr[posArr.length - 1][i].px,
  //         posArr[posArr.length - 1][i].py,
  //         posArr[posArr.length - 1][i].x,
  //         posArr[posArr.length - 1][i].y
  //       );
  //     }
  //   }
}

function page4() {
  background(220);
  noStroke();
  fill(0);
  text("break", width / 2, height / 2);

  // if (currentBlank<=totalBlanks){
  //     setInterval(pages=3,3000)
  //     currentBlank++
  // } else if (currentBlank==totalBlanks){
  //     setInterval(pages=5,3000)
  // }
}

function page5() {
  background(220);
  noStroke();
  fill(0);
  text("pg 5", width / 2, height / 2);
  for (let i = 0; i < posArr.length; i++) {
    for (let j = 0; j < posArr[i].length; j++) {
      push();
      scale(0.5);
      circle(posArr[i][j].x + 500 * i, posArr[i][j].y, 5);
      pop();
    }
  }
}

function page6() {
  background(220);
  noStroke();
  fill(0);
  text("pg 6", width / 2, height / 2);
}

function selectTopic() {
  totalBlanks = random(blanksArr);
  currentBlank = 1;
  console.log("totalBlanks: ", totalBlanks);
  tempText = totalBlanks;
}

function switchPages() {
  if (pages == 6) {
    tempText = "press t";
    pages = 1;
  } else if (currentBlank <= totalBlanks && pages == 4) {
    //   pages=3
    setInterval(() => {
      pages = 3;
    }, 3000);
    currentBlank++;
    console.log("WORK");
  } else if (currentBlank <= totalBlanks && pages == 3) {
    console.log("something is happening");
    setInterval(() => {
      page3to4();
    }, sketchTime);
  } else if (currentBlank == totalBlanks && pages == 3) {
    // posArr.shift()
    console.log("posArr: ", posArr);
    // pages=5
    setInterval((pages = 5), sketchTime);
  } else {
    pages++;
  }
  if (pages == 3) {
    // posArr.push([])
  }
  console.log(pages);
  posArr = [];
}

function page3to4() {
  background(255);
  sketch = get(
    width / 2 - vid.width / 2,
    height / 2 - vid.height / 2,
    vid.width,
    vid.height
  );
  classifySketch();
  console.log(sketch);
  pages = 4;
}

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

function mouseDragged() {
  if (pages == 3) {
    if (
      mouseX > width / 2 - vid.height / 2 &&
      mouseX < width / 2 + vid.height / 2 &&
      mouseY > height / 2 - vid.height / 2 &&
      mouseY < height / 2 + vid.height / 2
    ) {
      lineCoords = {
        px: pmouseX,
        py: pmouseY,
        x: mouseX,
        y: mouseY,
      };
      //   if (posArr.length) {
      // posArr[posArr.length - 1].push(lineCoords);
      posArr.push(lineCoords);

      //   }
      console.log("posArr: ", posArr);
    }
  }
}

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
