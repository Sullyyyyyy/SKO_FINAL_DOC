let pokerChips = [];
let numChips = 12;
let chipSize = 80; // Increased chip size
let cardWidth = 300; // Doubled card width
let cardHeight = 400; // Doubled card height
let colors = [];
let bgImage;
let clickedChip = null;

// Custom text and URLs for each chip/card
let customTexts = [
    "Week 1: Introduction to coding",
    "Week 2: HTML and CSS basics",
    "Week 3: JavaScript fundamentals",
    "Week 4: Advanced JavaScript",
    "Week 5: Working with APIs",
    "Week 6: Building a project",
    "Week 7: Debugging and testing",
    "Week 8: Version control with Git",
    "Week 9: Deployment strategies",
    "Week 10: Performance optimization",
    "Week 11: Security best practices",
    "Week 12: Final project presentation"
];

let customURLs1 = [
    "https://sullyyyyyy.github.io/WEEK1_CODEWORDS/",
   "https://sullyyyyyy.github.io/WEEK2_CODEWORDS/",
  "https://sullyyyyyy.github.io/WEEK3_CODEWORDS/",
    "https://sullyyyyyy.github.io/WEEK4_CODEWORDS/",
    "https://sullyyyyyy.github.io/WEEK5_CODEWORDS/",
    "https://sullyyyyyy.github.io/WEEK6_CODEWORDS/",
 "https://sullyyyyyy.github.io/WEEK7_CODEWORDS/",
    "https://sullyyyyyy.github.io/WEEK8_CODEWORDS/",
    "https://sullyyyyyy.github.io/WEEK9_CODEWORDS/",
    "https://sullyyyyyy.github.io/WEEK10_CODEWORDS/",
    "https://sullyyyyyy.github.io/WEEK11_CODEWORDS_/",
    "https://sullyyyyyy.github.io/WEEK12-13_CODEWORDS/",
];

let customURLs2 = [
    "https://github.com/Sullyyyyyy/CODEWORDDS-W1",
    "https://github.com/Sullyyyyyy/WEEK2_CODEWORDS",
    "https://github.com/Sullyyyyyy/WEEK3_CODEWORDS",
    "https://github.com/Sullyyyyyy/WEEK4_CODEWORDS",
    "https://github.com/Sullyyyyyy/WEEK5_CODEWORDS",
    "https://github.com/Sullyyyyyy/WEEK6_CODEWORDS",
    "https://github.com/Sullyyyyyy/WEEK7_CODEWORDS",
    "https://github.com/Sullyyyyyy/WEEK8_CODEWORDS",
    "https://github.com/Sullyyyyyy/WEEK9_CODEWORDS",
    "https://github.com/Sullyyyyyy/WEEK10_CODEWORDS",
    "https://github.com/Sullyyyyyy/WEEK11_CODEWORDS_",
    "https://github.com/Sullyyyyyy/WEEK12-13_CODEWORDS",
];

function preload() {
    bgImage = loadImage('data/T1.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont('Arial'); // Set a more readable font
    let angleStep = TWO_PI / numChips;
    let radius = min(width, height) / 3; // Adjusted radius for larger chips

    // Generate random colors for each chip
    for (let i = 0; i < numChips; i++) {
        colors.push(color(random(255), random(255), random(255)));
    }

    // Position the chips in a circle
    for (let i = 0; i < numChips; i++) {
        let angle = i * angleStep;
        let x = width / 2 + cos(angle) * radius;
        let y = height / 2 + sin(angle) * radius;
        let tooltipText = customTexts[i]; // Custom text for each chip
        let url1 = customURLs1[i]; // Custom URL 1 for each chip
        let url2 = customURLs2[i]; // Custom URL 2 for each chip
        pokerChips.push(new PokerChip(x, y, chipSize, colors[i], i + 1, tooltipText, url1, url2));
    }
}

function draw() {
    drawPokerTable();
    for (let chip of pokerChips) {
        chip.show();
    }
    if (clickedChip) {
        showCard(clickedChip);
    }
}

function drawPokerTable() {
    background(34, 139, 34); // Green felt color
    fill(0, 100, 0);
    ellipse(width / 2, height / 2, min(width, height) * 0.8, min(width, height) * 0.5); // Poker table shape
}

function mousePressed() {
    for (let chip of pokerChips) {
        if (chip.isClicked(mouseX, mouseY)) {
            clickedChip = chip;
            break;
        }
    }
}

function showCard(chip) {
    let cardX = width / 2 - cardWidth / 2;
    let cardY = height / 2 - cardHeight / 2;

    fill(255); // White card background
    stroke(0); // Black border
    rect(cardX, cardY, cardWidth, cardHeight, 10); // Card shape with rounded corners
    fill(0); // Black text
    textAlign(CENTER, CENTER);
    textSize(40); // Increased font size for number
    text(chip.number, cardX + cardWidth / 2, cardY + cardHeight / 4); // Draw the number at the top of the card
    textSize(24); // Increased font size for custom text
    textAlign(LEFT, TOP);
    textWrap(WORD);
    text(chip.text, cardX + 20, cardY + cardHeight / 2, cardWidth - 40); // Draw the custom text within the card boundaries

    // Draw the clickable URLs
    fill(0, 0, 255); // Blue color for the URL
    textAlign(CENTER, CENTER);
    textSize(20);
    text("CODE", cardX + cardWidth / 2, cardY + cardHeight - 80);
    text("GitHub Link"  , cardX + cardWidth / 2, cardY + cardHeight - 40);

    // Check if the mouse is over the first URL
    if (mouseX > cardX + cardWidth / 2 - 100 && mouseX < cardX + cardWidth / 2 + 100 &&
        mouseY > cardY + cardHeight - 100 && mouseY < cardY + cardHeight - 60) {
        cursor(HAND);
        if (mouseIsPressed) {
            window.open(chip.url1, "_blank");
        }
    }
    // Check if the mouse is over the second URL
    else if (mouseX > cardX + cardWidth / 2 - 100 && mouseX < cardX + cardWidth / 2 + 100 &&
        mouseY > cardY + cardHeight - 60 && mouseY < cardY + cardHeight - 20) {
        cursor(HAND);
        if (mouseIsPressed) {
            window.open(chip.url2, "_blank");
        }
    } else {
        cursor(ARROW);
    }
}

class PokerChip {
    constructor(x, y, size, color, number, text, url1, url2) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.number = number;
        this.text = text; // Custom text property
        this.url1 = url1; // Custom URL 1 property
        this.url2 = url2; // Custom URL 2 property
    }

    show() {
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
        fill(255);
        ellipse(this.x, this.y, this.size * 0.8, this.size * 0.8);
        fill(this.color);
        ellipse(this.x, this.y, this.size * 0.6, this.size * 0.6);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(20);
        text(this.number, this.x, this.y);
    }

    isClicked(mx, my) {
        let d = dist(mx, my, this.x, this.y);
        return d < this.size / 2;
    }
}
