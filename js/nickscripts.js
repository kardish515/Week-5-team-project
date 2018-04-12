function GameObject (avatar, xCoordinate, yCoordinate, type, target, direction) {
  this.avatar = avatar;
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.enemyType = type;
  this.enemyTarget = target;
  this.enemyDirection;
}

function movePattern (enemy, type, target, counter) {
  if (type === "horizontal") {
    moveNpcHorizontal(enemy);
  } else if (type === "vertical") {
    moveNpcVertical(enemy);
  } else if (type === "patrol") {
    moveNpcPatrol(enemy);
  } else if (type === "hunter") {
    if(counter%2 === 0){
      moveNpcHunter(enemy, target);
    }
  }
}

function moveNpcHunter(enemy, target) {
  var xDistance = target.xCoordinate - enemy.xCoordinate;
  var yDistance = target.yCoordinate - enemy.yCoordinate;
  if (Math.abs(xDistance) > Math.abs(yDistance)) {
    if (xDistance > 0) {
      if (notABarrier(enemy, "right") && notAWall(enemy, "right")) {
        enemy.xCoordinate += 1;
      } else if (yDistance >= 0 && notABarrier(enemy, "down") && notAWall(enemy, "down")) {
        enemy.yCoordinate += 1;
      } else if (yDistance >= 0 && notABarrier(enemy, "up") && notAWall(enemy, "up")) {
        enemy.yCoordinate -= 1;
      }
    } else if (xDistance < 0) {
      if (notABarrier(enemy, "left") && notAWall(enemy, "left")) {
        enemy.xCoordinate -= 1;
      } else if (yDistance >= 0 && notABarrier(enemy, "down") && notAWall(enemy, "down")) {
        enemy.yCoordinate += 1;
      } else if (yDistance >= 0 && notABarrier(enemy, "up") && notAWall(enemy, "up")) {
        enemy.yCoordinate -= 1;
      }
    }
  } else if (Math.abs(yDistance) > Math.abs(xDistance)) {
    if (yDistance > 0) {
      if (notABarrier(enemy, "down") && notAWall(enemy, "down")) {
        enemy.yCoordinate += 1;
      } else if (xDistance >= 0 && notABarrier(enemy, "right") && notAWall(enemy, "right")) {
        enemy.xCoordinate += 1;
      } else if (xDistance <= 0 && notABarrier(enemy, "left") && notAWall(enemy, "left")) {
        enemy.xCoordinate -= 1;
      }
    } else if (yDistance < 0) {
      if (notABarrier(enemy, "up") && notAWall(enemy, "up")) {
        enemy.yCoordinate -= 1;
      } else if (xDistance >= 0 && notABarrier(enemy, "right") && notAWall(enemy, "right")) {
        enemy.xCoordinate += 1;
      } else if (xDistance <= 0 && notABarrier(enemy, "left") && notAWall(enemy, "left")) {
        enemy.xCoordinate -= 1;
      }
    }
  } else {
    if (xDistance > 0) {
      if (notABarrier(enemy, "right") && notAWall(enemy, "right")) {
        enemy.xCoordinate += 1;
      } else if (yDistance >= 0 && notABarrier(enemy, "down") && notAWall(enemy, "down")) {
        enemy.yCoordinate += 1;
      } else if (Math.abs(yDistance) >= 0 && notABarrier(enemy, "up") && notAWall(enemy, "up")) {
        enemy.yCoordinate -= 1;
      }
    } else if (xDistance < 0) {
      if (notABarrier(enemy, "left") && notAWall(enemy, "left")) {
        enemy.xCoordinate -= 1;
      } else if (yDistance >= 0 && notABarrier(enemy, "down") && notAWall(enemy, "down")) {
        enemy.yCoordinate += 1;
      } else if (Math.abs(yDistance) >= 0 && notABarrier(enemy, "up") && notAWall(enemy, "up")) {
        enemy.yCoordinate -= 1;
      }
    }
  }
}

function moveNpcPatrol(enemy) {
  if (enemy.enemyDirection === "down") {
    if (enemy.yCoordinate < 9 && notABarrier(enemy, "down") && notAWall(enemy, "down")) {
      enemy.yCoordinate +=1;
    } else {
      enemy.enemyDirection = "left";
    }
  } else if (enemy.enemyDirection === "left") {
    if (enemy.xCoordinate > 0 && notABarrier(enemy, "left") && notAWall(enemy, "left")) {
      enemy.xCoordinate -=1;
    } else {
      enemy.enemyDirection = "up";
    }
  } else if (enemy.enemyDirection === "up") {
    if (enemy.yCoordinate > 0 && notABarrier(enemy, "up") && notAWall(enemy, "up")) {
      enemy.yCoordinate -=1;
    } else {
      enemy.enemyDirection = "right";
    }
  } else if (enemy.enemyDirection === "right") {
    if (enemy.xCoordinate < 9 && notABarrier(enemy, "right") && notAWall(enemy, "right")) {
      enemy.xCoordinate +=1;
    } else {
      enemy.enemyDirection = "down";
    }
  } else {
    enemy.enemyDirection = "left";
  }
}

function moveNpcHorizontal(enemy) {
  if (enemy.enemyDirection === "right") {
    if (enemy.xCoordinate < 9 && notAWall(enemy, "right") && notABarrier(enemy, "right")) {
      enemy.xCoordinate += 1;
    } else {
      enemy.xCoordinate -= 1;
      enemy.enemyDirection = "left";
    }
  } else {
    if (enemy.xCoordinate > 0 && notAWall(enemy, "left") && notABarrier(enemy, "left")) {
      enemy.xCoordinate -= 1;
    } else {
      enemy.xCoordinate += 1;
      enemy.enemyDirection = "right";
    }
  }
}

function moveNpcVertical(enemy) {
  if (enemy.enemyDirection === "down") {
    if (enemy.yCoordinate < 9 && notAWall(enemy, "down") && notABarrier(enemy, "down")) {
      enemy.yCoordinate += 1;
    } else {
      enemy.yCoordinate -= 1;
      enemy.enemyDirection = "up";
    }
  } else {
    if (enemy.yCoordinate > 0 && notAWall(enemy, "up") && notABarrier(enemy, "up")) {
      enemy.yCoordinate -= 1;
    } else {
      enemy.yCoordinate += 1;
      enemy.enemyDirection = "down";
    }
  }
}

function notABarrier(object, direction) {
  if (direction === "left") {
    if ($(".y" + object.yCoordinate + " .x" + (object.xCoordinate - 1)).attr('class').includes("barrier")) {
      return false;
    }
    return true;
  } else if (direction === "right") {
    if ($(".y" + object.yCoordinate + " .x" + (object.xCoordinate + 1)).attr('class').includes("barrier")) {
      return false;
    }
    return true;
  } else if (direction === "up") {
    if ($(".y" + (object.yCoordinate - 1) + " .x" + object.xCoordinate).attr('class').includes("barrier")) {
      return false;
    }
    return true;
  } else if (direction === "down") {
    if ($(".y" + (object.yCoordinate + 1) + " .x" + object.xCoordinate).attr('class').includes("barrier")) {
      return false;
    }
    return true;
  }
}

function notAWall(object, direction) {
  if (direction === "left") {
    if ($(".y" + object.yCoordinate + " .x" + object.xCoordinate).attr('class').includes("wall-left")) {
      return false;
    } else {
      return true;
    }
  } else if (direction === "right") {
    if ($(".y" + object.yCoordinate + " .x" + object.xCoordinate).attr('class').includes("wall-right")) {
      return false;
    } else {
      return true;
    }
  } else if (direction === "up") {
    if ($(".y" + object.yCoordinate + " .x" + object.xCoordinate).attr('class').includes("wall-up")) {
      return false;
    } else {
      return true;
    }
  } else if (direction === "down") {
    if ($(".y" + object.yCoordinate + " .x" + object.xCoordinate).attr('class').includes("wall-down")) {
      return false;
    } else {
      return true;
    }
  }
}

function diaperCheck(player, diaper){
  if(player.xCoordinate === diaper.xCoordinate && player.yCoordinate === diaper.yCoordinate){
    return true;
  } else{
    return false;
  }
}

function diaperIncrease(player, diaper, turnCounter, turnLimit){
  turnCounter -= 15;
  meter(turnCounter, turnLimit);
  return turnCounter;
}

function pantsCheck(player, pants){
  if(player.xCoordinate === pants.xCoordinate && player.yCoordinate === pants.yCoordinate){
    $("#pants-meter").width("100%");
    return true;
  } else{
    return false;
  }
}

// USER INTERFACE LOGIC
function triggerInterrupt(player, toilet, enemies, turnCounter, turnLimit, check) {
  var interrupt = false;
  if (player.xCoordinate === toilet.xCoordinate && player.yCoordinate === toilet.yCoordinate) {
    $("#game-over h4").html("Whew, you win! Don't forget to flush.");
    $("#navigation").hide();
    $("#game-over").show();
    interrupt = true;
  } else if (turnCounter === turnLimit + 1) {
    $("#game-over h4").html("You ran out of time and had an accident.");
    $("#navigation").hide();
    $("#game-over").show();
    interrupt = true;
  }
  enemies.forEach(function(enemy) {
    if (player.xCoordinate === enemy.xCoordinate && player.yCoordinate === enemy.yCoordinate && check === false) {
      $("#game-over h4").html("You lose!");
      $("#navigation").hide();
      $("#game-over").show();
      interrupt = true;
    }
  });
  return interrupt;
}

function positionGameObjects(array) {
  $("td").text("");
  array.forEach(function(element) {
    $(".y" + element.yCoordinate + " .x" + element.xCoordinate).html("<img src=\"img/" + element.avatar + "\">");
  });
}

function meter(turnCounter, turnLimit) {
  var percentileWidth = turnCounter / turnLimit * 100;
  if (percentileWidth >= 40 && percentileWidth < 70) {
    $("#meter").addClass("warning");
  } else if (percentileWidth >= 70) {
    $("#meter").addClass("danger");
  }
  $("#meter").width(percentileWidth + "%");
}

function pantsMeter(pantsPower) {
  var meterWidthMax = 660;
  var unitWidth = parseInt($("#pants-meter").width()) / pantsPower;
  pantsPower --;
  var percentileWidth = unitWidth * pantsPower / 660 * 100;
  if (percentileWidth >= 40 && percentileWidth < 70) {
    $("#pants-meter").addClass("warning");
  } else if (percentileWidth < 40) {
    $("#pants-meter").addClass("danger");
  }
  $("#pants-meter").width(percentileWidth + "%");
  return pantsPower;
}

$(document).ready(function() {
  var check = false;
  var pantsPower = 0;
  var turnCounter = 0;
  var turnLimit = 45;
  var gameObjects = [];
  var enemies = [];
  var player = new GameObject("player.png", 0, 0);
  var toilet = new GameObject("toilet.png", 9, 9);
  var diaper = new GameObject("diaper.jpg", 9, 5);
  var pants = new GameObject("pants.gif", 1, 0);
  var enemy1 = new GameObject("poop.png", 1, 2, "hunter", player);
  var enemy2 = new GameObject("poop.png", 4, 4, "hunter", player);
  var enemy3 = new GameObject("poop.png", Math.floor(Math.random() * 6), 1, "horizontal");
  var enemy4 = new GameObject("poop.png", 4, 8, "hunter", player);
  var enemy5 = new GameObject("poop.png", 9, 6, "hunter", player);
  var enemy6 = new GameObject("poop.png", 8, 8, "hunter", player);
  var enemy7 = new GameObject("poop.png", 2, 7, "hunter", player);
  var enemy8 = new GameObject("poop.png", 5, 5, "hunter", player);
  var enemy9 = new GameObject("poop.png", 7, 0, "hunter", player);
  gameObjects.push(toilet);
  gameObjects.push(player);
  gameObjects.push(enemy1);
  gameObjects.push(enemy2);
  gameObjects.push(enemy3);
  gameObjects.push(enemy4);
  gameObjects.push(enemy5);
  gameObjects.push(enemy6);
  gameObjects.push(enemy7);
  gameObjects.push(enemy8);
  gameObjects.push(enemy9);
  gameObjects.push(diaper);
  gameObjects.push(pants);
  enemies.push(enemy1);
  enemies.push(enemy2);
  enemies.push(enemy3);
  enemies.push(enemy4);
  enemies.push(enemy5);
  enemies.push(enemy6);
  enemies.push(enemy7);
  enemies.push(enemy8);
  enemies.push(enemy9);

  positionGameObjects(gameObjects);

  function progressTurn() {
    positionGameObjects(gameObjects);
    if (triggerInterrupt(player, toilet, enemies, turnCounter, turnLimit, check) === false) {
      movePattern(enemy1, enemy1.enemyType, enemy1.enemyTarget, turnCounter);
      movePattern(enemy2, enemy2.enemyType, enemy2.enemyTarget, turnCounter);
      movePattern(enemy3, enemy3.enemyType, enemy3.enemyTarget, turnCounter);
      movePattern(enemy4, enemy4.enemyType, enemy4.enemyTarget, turnCounter);
      movePattern(enemy5, enemy5.enemyType, enemy5.enemyTarget, turnCounter);
      movePattern(enemy6, enemy6.enemyType, enemy6.enemyTarget, turnCounter);
      movePattern(enemy7, enemy7.enemyType, enemy7.enemyTarget, turnCounter);
      movePattern(enemy8, enemy8.enemyType, enemy8.enemyTarget, turnCounter);
      movePattern(enemy9, enemy9.enemyType, enemy9.enemyTarget, turnCounter);
      positionGameObjects(gameObjects);
    }
    turnCounter ++;
    if(pantsPower > 0 && check === true){
      pantsPower = pantsMeter(pantsPower);
    }
    meter(turnCounter, turnLimit);
    triggerInterrupt(player, toilet, enemies, turnCounter, turnLimit, check);
  }

  function playerMove(direction) {
    if (direction === "left") {
      if (player.xCoordinate > 0 && notAWall(player, "left") && notABarrier(player, "left")) {
        player.xCoordinate = player.xCoordinate - 1;
      }
    } else if (direction === "right") {
      if (player.xCoordinate < 9 && notAWall(player, "right") && notABarrier(player, "right")) {
        player.xCoordinate = player.xCoordinate + 1;
      }
    } else if (direction === "up") {
      if (player.yCoordinate > 0 && notAWall(player, "up") && notABarrier(player, "up")) {
        player.yCoordinate = player.yCoordinate - 1;
      }
    } else if (direction === "down") {
      if (player.yCoordinate < 9 && notAWall(player, "down") && notABarrier(player, "down")) {
        player.yCoordinate = player.yCoordinate + 1;
      }
    }
    progressTurn();
  }

  // Mouse Navigation
  $("#navigation button").click(function() {
    var playerDirection = $(this).attr("id");
    playerMove(playerDirection);
    if(diaperCheck(player, diaper)){
      turnCounter = diaperIncrease(player, diaper, turnCounter, turnLimit);
      diaper.xCoordinate = "";
      diaper.yCoordinate = "";
      positionGameObjects(gameObjects);
    }
    if(pantsCheck(player, pants)){
      check = true;
      pantsCounter = 10;
      pants.xCoordinate = "";
      pants.yCoordinate = "";
      positionGameObjects(gameObjects);
    }
    if(pantsPower === 0){
      check = false;
    }
  });

  // Arrow Key Navigation
  $(document).keydown(function(e){
    if (triggerInterrupt(player, toilet, enemies, turnCounter, turnLimit, check)) {
      return;
    } else if (e.keyCode === 37) {
       playerMove("left")
    } else if (e.keyCode === 39) {
       playerMove("right")
    } else if (e.keyCode === 38) {
       playerMove("up")
    } else if (e.keyCode === 40) {
       playerMove("down")
    }
    if(diaperCheck(player, diaper)){
      turnCounter = diaperIncrease(player, diaper, turnCounter, turnLimit);
      diaper.xCoordinate = "";
      diaper.yCoordinate = "";
      positionGameObjects(gameObjects);
    }
    if(pantsCheck(player, pants)){
      check = true;
      pantsPower = 10;
      pants.xCoordinate = "";
      pants.yCoordinate = "";
      positionGameObjects(gameObjects);
    }
    if(pantsPower === 0){
      check = false;
    }
  });

  $("#restart").click(function() {
    location.reload();
  });
});
