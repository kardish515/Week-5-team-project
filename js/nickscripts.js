function GameObject (symbol, xCoordinate, yCoordinate, direction) {
  this.symbol = symbol;
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.direction;
}

function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function movePattern (enemy, type, hunted, counter) {
  if (type === "horizontal") {
    moveNPCHorizontal(enemy);
  }else if (type === "vertical") {
    moveNPCVertical(enemy);
  } else if (type === "hunter"){
    if(counter%2 === 0){
      moveNpcHunter(enemy, hunted);
    }
  }
}

function moveNpcHunter(enemy, hunted){
  var xDistance = hunted.xCoordinate - enemy.xCoordinate;
  var yDistance = hunted.yCoordinate - enemy.yCoordinate;
  if (Math.abs(xDistance) > Math.abs(yDistance)){
    if (xDistance > 0) {
      if (notABarrier(enemy, "right") && notAWall(enemy, "right")){
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
      if (notABarrier(enemy, "right") && notAWall(enemy, "right")){
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

function moveNPCHorizontal(enemy) {
  if (enemy.direction === "right") {
    if (enemy.xCoordinate < 9 && notAWall(enemy, "right") && notABarrier(enemy, "right")) {
      enemy.xCoordinate += 1;
    } else {
      enemy.xCoordinate -= 1;
      enemy.direction = "left";
    }
  } else {
    if (enemy.xCoordinate > 0 && notAWall(enemy, "left") && notABarrier(enemy, "left")) {
      enemy.xCoordinate -= 1;
    } else {
      enemy.xCoordinate += 1;
      enemy.direction = "right";
    }
  }
}

function moveNPCVertical(enemy) {
  if (enemy.direction === "down") {
    if (enemy.yCoordinate < 9 && notAWall(enemy, "down") && notABarrier(enemy, "down")) {
      enemy.yCoordinate += 1;
    } else {
      enemy.yCoordinate -= 1;
      enemy.direction = "up";
    }
  } else {
    if (enemy.yCoordinate > 0 && notAWall(enemy, "up") && notABarrier(enemy, "up")) {
      enemy.yCoordinate -= 1;
    } else {
      enemy.yCoordinate += 1;
      enemy.direction = "down";
    }
  }
}

// BLOCK BARRIER CHECK
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

// BORDER WALL CHECK
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

function turnCountDown(turnTimer) {
  turnTimer --;
  $(".meter-bar").last().remove();
  return turnTimer;
}

// UI Logic
function condition(player, toilet, enemies, turnTimer) {
  var returnValue = "go";
  if (player.xCoordinate === toilet.xCoordinate && player.yCoordinate === toilet.yCoordinate) {
    $("#output").text("You win, now you get to poop.");
    $(".navigation").hide();
    $(".refresh").show();
    returnValue = "stop";
  } else if (turnTimer === 0){
    $("#output").text("You ran out of time and had an accident.");
    $(".navigation").hide();
    $(".refresh").show();
    returnValue = "stop";
  }
  enemies.forEach(function(enemy){
    if (player.xCoordinate === enemy.xCoordinate && player.yCoordinate === enemy.yCoordinate) {
      $("#output").text("You lose!");
      $(".navigation").hide();
      $(".refresh").show();
      returnValue = "stop";
    }
  });
  return returnValue;
}

function redraw(objectArray){
  $("td").text("");
  objectArray.forEach(function(element){
    $(".y" + element.yCoordinate + " .x" + element.xCoordinate).html("<img src=\"img/" + element.symbol + "\">");
  });
}

function enduranceMeter(counter) {
  for (var i = 0; i < counter; i ++) {
    $("#meter").append("<div class=\"meter-bar\"></div>")
  }
}

$(document).ready(function(){
  var turnTimer = 45;
  var objectArray = [];
  var enemies= [];
  var enemy1 = new GameObject("poop.png", 1, 2);
  var enemy2 = new GameObject("hunter.gif", 4, 4);
  var enemy3 = new GameObject("poop.png", Math.floor(Math.random() * 6), 1);
  var enemy4 = new GameObject("poop.png", 4, 8);
  var player = new GameObject("player.png", 0, 0);
  var toilet = new GameObject("toilet.png", 9, 9);
  var enemyType1 = "vertical";
  var enemyType2 = "hunter";
  var enemyType3 = "horizontal"
  objectArray.push(toilet);
  objectArray.push(player);
  objectArray.push(enemy1);
  enemies.push(enemy1);
  objectArray.push(enemy2);
  enemies.push(enemy2);
  objectArray.push(enemy3);
  enemies.push(enemy3);
  objectArray.push(enemy4);
  enemies.push(enemy4);

  enduranceMeter(turnTimer);

  redraw(objectArray);
  $("button#move-left").click(function(event) {
    event.preventDefault();
    if (notAWall(player, "left") && notABarrier(player, "left")) {
      player.xCoordinate = player.xCoordinate - 1;
    }
    redraw(objectArray);
    var firstCheck = condition(player, toilet, enemies, turnTimer);
    if (firstCheck === "go") {
      movePattern(enemy1, enemyType1, toilet, turnTimer);
      movePattern(enemy2, enemyType2, player, turnTimer);
      movePattern(enemy3, enemyType3, toilet, turnTimer);
      movePattern(enemy4, enemyType3, toilet, turnTimer);
      redraw(objectArray);
    }
    turnTimer = turnCountDown(turnTimer);
    condition(player, toilet, enemies, turnTimer);
  });
  $("button#move-right").click(function(event) {
    event.preventDefault();
    if (notAWall(player, "right") && notABarrier(player, "right")) {
      player.xCoordinate = player.xCoordinate + 1;
    }
    redraw(objectArray);
    var firstCheck = condition(player, toilet, enemies, turnTimer);
    if (firstCheck === "go") {
      movePattern(enemy1, enemyType1, toilet, turnTimer);
      movePattern(enemy2, enemyType2, player, turnTimer);
      movePattern(enemy3, enemyType3, toilet, turnTimer);
      movePattern(enemy4, enemyType3, toilet, turnTimer);
      redraw(objectArray);
    }
    turnTimer = turnCountDown(turnTimer);
    condition(player, toilet, enemies, turnTimer);
    console.log(player);
    console.log(objectArray[1]);
  });
  $("button#move-up").click(function(event) {
    event.preventDefault();
    if (notAWall(player, "up") && notABarrier(player, "up")) {
      player.yCoordinate = player.yCoordinate - 1;
    }
    redraw(objectArray);
    var firstCheck = condition(player, toilet, enemies, turnTimer);
    if (firstCheck === "go") {
      movePattern(enemy1, enemyType1, toilet, turnTimer);
      movePattern(enemy2, enemyType2, player, turnTimer);
      movePattern(enemy3, enemyType3, toilet, turnTimer);
      movePattern(enemy4, enemyType3, toilet, turnTimer);
      redraw(objectArray);
    }
    turnTimer = turnCountDown(turnTimer);
    condition(player, toilet, enemies, turnTimer);
  });
  $("button#move-down").click(function(event) {
    event.preventDefault();
    if (notAWall(player, "down") && notABarrier(player, "down")) {
      player.yCoordinate = player.yCoordinate + 1;
    }
    redraw(objectArray);
    var firstCheck = condition(player, toilet, enemies, turnTimer);
    if (firstCheck === "go") {
      movePattern(enemy1, enemyType1, toilet, turnTimer);
      movePattern(enemy2, enemyType2, player, turnTimer);
      movePattern(enemy3, enemyType3, toilet, turnTimer);
      movePattern(enemy4, enemyType3, toilet, turnTimer);
      redraw(objectArray);
    }
    turnTimer = turnCountDown(turnTimer);
    condition(player, toilet, enemies, turnTimer);
  });

  $("#restart").click(function() {
    location.reload();
  });
});
