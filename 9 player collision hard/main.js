let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 400;
i = 0;
i2 = 0;
gamestate = "start";
let gametimer = 1000;

let wall1 = {
  y: 175,
  h: 250,
  x: 125,
  w: 450,
};

let wall2 = {
  y: 100,
  h: 150,
  x: 500,
  w: 600,
};

let player = {
  x: 400,
  y: 300,
  w: 25,
  h: 25,
  dx: 5,
  dy: 0,
  a: 0.15,
  jumpSpeed: -0.4,
  color: "blue",
};
let player2 = {
  x: 200,
  y: 300,
  w: 25,
  h: 25,
  dx: 5.3,
  dy: 0,
  a: 0.15,
  jumpSpeed: -0.2,
  color: "red",
};

let ArrowleftKeyIsPressed = false;
let ArrowRightKeyIsPressed = false;
let ArrowUpKeyIsPressed = false;
let keyaispressed = false;
let keydIsPressed = false;
let keywIsPressed = false;

window.addEventListener("load", loop);

function handleMovement() {
  if (ArrowRightKeyIsPressed) {
    player.x += player.dx;
    checkrightcollision();
  } else if (ArrowleftKeyIsPressed) {
    player.x -= player.dx;
    checkleftcollision();
  }
  checkupanddowncollision();
  if (player.dy > 1 || player.dy < -5) {
    i2 = 1;
  }
  if (ArrowUpKeyIsPressed && i2 === 0 && player.dy < 10) {
    player.dy += player.jumpSpeed;
  }
  if (keydIsPressed) {
    player2.x += player2.dx;
    player2rightcollision();
  } else if (keyaispressed) {
    player2.x -= player2.dx;
    checkleftcollision2();
  }
  checkupanddowncollision();
  player2updown();
  if (player2.dy > 1 || player2.dy < -6) {
    i = 1;
  }
  if (keywIsPressed && i === 0 && player2.dy < 10) {
    player2.dy += player2.jumpSpeed;
  }

  if (player.x < 0) {
    player.x = 0;
  }

  if (player2.x < 0) {
    player2.x = 0;
  }

  if (player.x > cnv.width) {
    player.x = cnv.width;
  }
  if (player2.x > cnv.width) {
    player2.x = cnv.width;
  }

  if (player.x + player2.w > cnv.width) {
    player.x = cnv.width - player2.w;
  }

  if (player2.x + player2.w > cnv.width) {
    player2.x = cnv.width - player2.w;
  }

  player2.dy += player2.a;
  player.dy += player.a;
  player.y += player.dy;
  player2.y += player2.dy;

  if (player.y + player.h > cnv.height) {
    player.y = cnv.height - player.h;
    player.dy = 0;
    i2 = 0;
  }
  if (player2.y + player2.h > cnv.height) {
    player2.y = cnv.height - player2.h;
    player2.dy = 0;
    i = 0;
  }

  if (
    (player.y >= player2.y &&
      player.y <= player2.y + player2.h &&
      player.x >= player2.x &&
      player.x <= player2.w + player2.x) ||
    (player.y + player.h >= player2.y &&
      player.y + player.h <= player2.y + player2.h &&
      player.x + player.w >= player2.x &&
      player.x + player.w <= player2.w + player2.x)
  ) {
    console.log(player.y, player2.y + player2.h);
    gamestate = "player2";
  }
}

function checkupanddowncollision() {
  if (player.dy > 0) {
    if (
      player.y >= wall1.y - 0.1 &&
      player.y <= wall1.y + 25 &&
      player.x >= wall1.x + player.dx &&
      player.x <= wall1.w - player.dx
    ) {
      i2 = 0;
      player.dy = 0;
      player.y = wall1.y - 0.1;
      player.y -= 0.1;
    } else if (
      player.y >= wall2.y - 0.1 &&
      player.y <= wall2.y + 25 &&
      player.x >= wall2.x + player.dx &&
      player.x <= wall2.w - player.dx
    ) {
      i2 = 0;
      player.dy = 0;
      player.y = wall2.y - 0.1;
      player.y -= 0.1;
    } else if (
      player.y >= 300 - 25 &&
      player.y <= 300 + 25 &&
      player.x >= 475 - 25 + player.dx &&
      player.x <= 475 + 50 - player.dx
    ) {
      i2 = 0;
      player.dy = 0;
      player.y = 300 - 25 - 0.1;
      player.y -= 0.1;
    }
  } else {
    if (
      player.y >= wall1.y &&
      player.y <= wall1.h + 0.1 &&
      player.x >= wall1.x + player.dx &&
      player.x <= wall1.w - player.dx
    ) {
      i2 = 1;
      player.dy = 0;
      player.y = wall1.h + 0.1;
      player.y + 0.1;
    } else if (
      player.y >= wall2.y &&
      player.y <= wall2.h + 0.1 &&
      player.x >= wall2.x + player.dx &&
      player.x <= wall2.w - player.dx
    ) {
      i2 = 1;
      player.dy = 0;
      player.y = wall2.h + 0.1;
      player.y + 0.1;
    } else if (
      player.y >= 300 - 25 &&
      player.y <= 300 + 25 &&
      player.x >= 475 - 25 + player.dx &&
      player.x <= 475 + 50 - player.dx
    ) {
      i2 = 1;
      player.dy = 0;
      player.y = 25 + 300 - 0.1;
      player.y + 0.1;
    }
  }
}

function player2updown() {
  if (player2.dy > 0) {
    if (
      player2.y >= wall1.y - 0.1 &&
      player2.y <= wall1.y + 25 &&
      player2.x >= wall1.x + player2.dx &&
      player2.x <= wall1.w - player2.dx
    ) {
      i = 0;
      player2.dy = 0;
      player2.y = wall1.y - 0.1;
      player2.y -= 0.1;
    } else if (
      player2.y >= wall2.y - 0.1 &&
      player2.y <= wall2.y + 25 &&
      player2.x >= wall2.x + player2.dx &&
      player2.x <= wall2.w - player2.dx
    ) {
      i = 0;
      player2.dy = 0;
      player2.y = wall2.y - 0.1;
      player2.y -= 0.1;
    } else if (
      player2.y >= 300 - 25 &&
      player2.y <= 300 + 25 &&
      player2.x >= 475 - 25 + player2.dx &&
      player2.x <= 475 + 50 - player2.dx
    ) {
      i = 0;
      player2.dy = 0;
      player2.y = 300 - 25 - 0.1;
      player2.y -= 0.1;
    }
  } else {
    if (
      player2.y >= wall1.y &&
      player2.y <= wall1.h + 0.1 &&
      player2.x >= wall1.x + player2.dx &&
      player2.x <= wall1.w - player2.dx
    ) {
      i = 1;
      player2.dy = 0;
      player2.y = wall1.h + 0.1;
      player2.y + 0.1;
    } else if (
      player2.y >= wall2.y &&
      player2.y <= wall2.h + 0.1 &&
      player2.x >= wall2.x + player2.dx &&
      player2.x <= wall2.w - player2.dx
    ) {
      i = 1;
      player2.dy = 0;
      player2.y = wall2.h + 0.1;
      player2.y + 0.1;
    } else if (
      player2.y >= 300 - 25 &&
      player2.y <= 300 + 25 &&
      player2.x >= 475 - 25 + player2.dx &&
      player2.x <= 475 + 50 - player2.dx
    ) {
      i = 1;
      player2.dy = 0;
      player2.y = 25 + 300 + 0.1;
      player2.y + 0.1;
    }
  }
}
function checkrightcollision() {
  if (
    player.y >= wall1.y + player.dy &&
    player.y <= wall1.h + player.dy &&
    player.x >= wall1.x &&
    player.x <= wall1.w
  ) {
    player.x = wall1.x;
  } else if (
    player.y >= wall2.y + player.dy &&
    player.y <= wall2.h + player.dy &&
    player.x >= wall2.x &&
    player.x <= wall2.w
  ) {
    player.x = wall2.x;
  } else if (
    player.y >= 300 + player.dy &&
    player.y <= 25 + player.dy &&
    player.x >= 475 &&
    player.x <= 50
  ) {
    player.x = 475;
  }
}
function player2rightcollision() {
  if (
    player2.y >= wall1.y + player2.dy &&
    player2.y <= wall1.h + player2.dy &&
    player2.x >= wall1.x &&
    player2.x <= wall1.w
  ) {
    player2.x = wall1.x;
  } else if (
    player2.y >= wall2.y + player2.dy &&
    player2.y <= wall2.h + player2.dy &&
    player2.x >= wall2.x &&
    player2.x <= wall2.w
  ) {
    player2.x = wall2.x;
  }
}
function checkleftcollision() {
  if (
    player.y >= wall1.y + player.dy &&
    player.y <= wall1.h + player.dy &&
    player.x >= wall1.x &&
    player.x <= wall1.w
  ) {
    player.x = wall1.w;
  } else if (
    player.y >= wall2.y + player.dy &&
    player.y <= wall2.h + player.dy &&
    player.x >= wall2.x &&
    player.x <= wall2.w
  ) {
    player.x = wall2.w;
  }
}
function checkleftcollision2() {
  if (
    player2.y >= wall1.y + player2.dy &&
    player2.y <= wall1.h + player2.dy &&
    player2.x >= wall1.x &&
    player2.x <= wall1.w
  ) {
    player2.x = wall1.w;
  } else if (
    player2.y >= wall2.y + player2.dy &&
    player2.y <= wall2.h + player2.dy &&
    player2.x >= wall2.x &&
    player2.x <= wall2.w
  ) {
    player2.x = wall2.w;
  }
}

function reset() {
  gamestate = "start";
  player.x = 600;
  player2.x = 300;
  player.y = 300;
  player2.y = 300;
  gametimer = 1000;
}
function loop() {
  if (gamestate === "game") {
    handleMovement();
    drawbasic();
    gametimer--;
    if (gametimer < 0) {
      gamestate = "player1";
    }
  } else if (gamestate === "start") {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.font = "40px Consolas";
    ctx.fillStyle = "black";
    ctx.fillText("Click to start game", 100, cnv.height / 2);
  } else if (gamestate === "player1") {
    ctx.font = "40px Consolas";
    ctx.fillStyle = "blue";
    ctx.fillText("Blue Wins", 100, cnv.height / 2);
    setTimeout(reset, 2000);
  } else if (gamestate === "player2") {
    ctx.font = "40px Consolas";
    ctx.fillStyle = "red";
    ctx.fillText("Red Wins", 100, cnv.height / 2);
    setTimeout(reset, 2000);
  }

  requestAnimationFrame(loop);
}
function drawbasic() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  ctx.font = "40px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText(`Time left:${Math.floor(gametimer / 20)}`, 10, 40);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.fillStyle = "grey";
  ctx.fillRect(150, 200, 300, 50);
  ctx.fillRect(475, 300, 50, 25);
  ctx.fillRect(525, 125, 75, 25);
  ctx.fillStyle = player2.color;
  ctx.fillRect(player2.x, player2.y, player2.w, player2.h);
}
function player1win() {
  drawbasic();
  ctx.fillStyle = "blue";
  ctx.fillText("Blue Wins", cnv.width / 2, cnv.height / 2);
}

function player2win() {
  drawbasic();
  ctx.fillStyle = "red";
  ctx.fillText("Red Wins", cnv.width / 2, cnv.height / 2);
}

document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);
document.addEventListener("click", clicked);

function clicked() {
  console.log(player.y, player2.y + player2.ha);
  if (gamestate === "start") {
    gamestate = "game";
  }
}

function keydownHandler(event) {
  if (event.code == "KeyA") {
    ArrowleftKeyIsPressed = true;
  } else if (event.code == "KeyD") {
    ArrowRightKeyIsPressed = true;
  } else if (event.code == "KeyW") {
    ArrowUpKeyIsPressed = true;
  }

  if (event.code == "ArrowLeft") {
    keyaispressed = true;
  } else if (event.code == "ArrowRight") {
    keydIsPressed = true;
  } else if (event.code == "ArrowUp") {
    keywIsPressed = true;
  }
}

function keyupHandler(event) {
  if (event.code == "KeyA") {
    ArrowleftKeyIsPressed = false;
  } else if (event.code == "KeyD") {
    ArrowRightKeyIsPressed = false;
  } else if (event.code == "KeyW") {
    ArrowUpKeyIsPressed = false;
    i2 = 1;
  }

  if (event.code == "ArrowLeft") {
    keyaispressed = false;
  } else if (event.code == "ArrowRight") {
    keydIsPressed = false;
  } else if (event.code == "ArrowUp") {
    keywIsPressed = false;
    i = 1;
  }
}
