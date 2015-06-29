"use strict";
var ControllerMain;

ControllerMain = (function() {
  var _keyToDir, _switchDir;

  function ControllerMain(id, data) {
    var _canvas, _characterAnimation, _currentDir, _mainCharacterAnimations, _stage;
    this.id = id;
    this.data = data;
    _currentDir = "";
    this.getDir = function() {
      return _currentDir;
    };
    _mainCharacterAnimations = new createjs.SpriteSheet(this.data.mainCharacter);
    _canvas = document.getElementById(this.id);
    _stage = new createjs.Stage(_canvas);
    _characterAnimation = new createjs.Sprite(_mainCharacterAnimations);
    _characterAnimation.x = 10;
    _characterAnimation.y = 100;
    _characterAnimation.framerate = 8;
    _stage.addChild(_characterAnimation);
    createjs.Ticker.setFPS(32);
    createjs.Ticker.addEventListener("tick", (function(_this) {
      return function(event) {
        return _stage.update(event);
      };
    })(this));
    document.onkeydown = (function(_this) {
      return function(event) {
        return _currentDir = _switchDir(_currentDir, _characterAnimation, _keyToDir(event.keyCode), true);
      };
    })(this);
    document.onkeyup = (function(_this) {
      return function(event) {
        return _currentDir = _switchDir(_currentDir, _characterAnimation, _keyToDir(event.keyCode), false);
      };
    })(this);
  }

  _keyToDir = function(key) {
    switch (key) {
      case 38:
      case 87:
        return "north";
      case 40:
      case 83:
        return "south";
      case 39:
      case 68:
        return "east";
      case 37:
      case 65:
        return "west";
      default:
        return "";
    }
  };

  _switchDir = function(currentDir, animation, newDir, active) {
    if (active && newDir === currentDir) {
      return currentDir;
    }
    if (active && newDir !== currentDir) {
      currentDir = newDir;
    }
    if (!active && newDir === currentDir) {
      currentDir = "";
    }
    switch (currentDir) {
      case "north":
        animation.gotoAndPlay("north");
        break;
      case "south":
        animation.gotoAndPlay("south");
        break;
      case "east":
        animation.gotoAndPlay("east");
        break;
      case "west":
        animation.gotoAndPlay("west");
        break;
      default:
        animation.stop();
    }
    return currentDir;
  };

  return ControllerMain;

})();
