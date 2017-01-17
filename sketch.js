var initWidth;
var dresda,
    dresdaDrawHeight;

var moon,
    moonScale = 0.1,
    moonSize;

var bombs = [],
    explodedBombs = [],
    explodedBombsSizeRange = [10, 100],
    bombSpeed = 5,
    bombInitColor = '#ffffff',
    bombInitSize = 10,
    xPosCorrectionScale = 1,
    maxBombsCount = 100;

var starColor = '#ffffff',
    stars = [],
    starsCount = 100;


var pointillismAreaHeight = 300,
    pointillismAreaColor,
    points = [],
    pointSizeRange = [5, 10];

//var tails = [],
//    tailStartColor,
//    tailEndColor;

function preload() {
    dresda = loadImage("assets/dresda2.png");
    moon = loadImage("assets/moon.png");

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    initWidth = windowWidth;

    initStars();


    // init pointillism
    pointillismAreaColor = randomColor();

   // tailStartColor = color(0, 0, 0, 0);
    // tailEndColor = color(255, 0, 0, 255);
}

function draw() {
    /** draw background*/
    background(0, 10, 45);

    drawStars();

    drawMoon();

    drawCity();

  //  drawTails();

    drawPointillism();

    drawBombs();

    drawTouchdownBomb();
}

function drawMoon() {
    /** moonSize = 10% del lato minore */
    var canvasAr = width / height;
    if (canvasAr > 1) {
        moonSize = moonScale * height;
    } else {
        moonSize = moonScale * width;
    }

    image(moon, width / 7, height / 3, moonSize, moonSize);
}

function drawCity() {
    /** scale image to fit with width*/
    var scale = dresda.width / width;
    dresdaDrawHeight = dresda.height / scale;

    /** align image to bottom*/
    image(dresda, 0, height - dresdaDrawHeight - pointillismAreaHeight, width, dresdaDrawHeight);
}

function drawBombs() {
    for (var i = 0; i < bombs.length; i++) {
        if (bombs[i].y > height - pointillismAreaHeight) {
            var bomb = bombs[i];
            if (!bomb.color || !bomb.size) {
                // create bright color
                var newColor = lerpColor(randomColor(), color(255, 255, 255), 0.5);
                // tone to red
                bomb.color = lerpColor(newColor, color(255, 0, 0), random(0.5, 1));
                // random size
                bomb.size = random(explodedBombsSizeRange[0], explodedBombsSizeRange[1]);
            }

            if (!points[i]) {
                points[i] = {
                    x: random(0, width),
                    y: random(height - pointillismAreaHeight, height),
                    size: random(pointSizeRange[0], pointSizeRange[1]),
                    color: randomColor()
                }
            }

            fill(bomb.color);
            noStroke();
            ellipse(bomb.x * xPosCorrectionScale, height - pointillismAreaHeight, bomb.size);
        } else {
            /** bomb on the fly */
            fill(bombInitColor);
            noStroke();
            ellipse(bombs[i].x * xPosCorrectionScale, bombs[i].y, bombInitSize);
            bombs[i].y += bombSpeed;
        }
    }
}

function drawTouchdownBomb() {
    for (var i = 0; i < explodedBombs.length; i++) {
        var bomb = explodedBombs[i];
        fill(bomb.color);
        noStroke();
        ellipse(bomb.x * xPosCorrectionScale, height - pointillismAreaHeight, bomb.size);
    }
}

function initStars() {
    for (var i = 0; i < starsCount; i++) {
        stars.push({
            x: random(width),
            y: random(height)
        });
    }
}

function drawStars() {
    stroke(starColor);
    strokeWeight(1);
    for (var i = 0; i < stars.length; i++) {
        point(stars[i].x, stars[i].y);
    }
}



function drawPointillism() {
    // draw rect
    noStroke();
    fill(pointillismAreaColor);
    rect(0, height - pointillismAreaHeight, width, pointillismAreaHeight);

    // draw point
    for (var i in points) {
        var point = points[i];
        fill(point.color);
        noStroke();
        ellipse(point.x * xPosCorrectionScale, point.y, point.size);
    }
}

//function drawTails() {
//    for (var i in tails) {
//
//        var tail = tails[i];
//        var bomb = bombs[i];
//
//        for (var h = tail.start.y; h < bomb.y; h++) {
//            var inter = map(h, tail.start.y, bomb.y, 0, 1);
//            var newColor = lerpColor(tailStartColor, tailEndColor, inter);
//            stroke(newColor);
//            strokeWeight(bombInitSize);
//            line(tail.start.x, h, tail.start.x, h);
//        }
//    }
//}

function randomColor() {
    return color(random(0, 255), random(0, 255), random(0, 255));
}

function mouseClicked() {
    var obj = {x: mouseX, y: mouseY};
    bombs.push(obj);
   // tails.push;

    if (bombs.length > maxBombsCount) {
        bombs.shift();
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    xPosCorrectionScale = windowWidth / initWidth;
}