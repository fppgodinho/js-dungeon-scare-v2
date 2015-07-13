"use strict"
class window.ControllerMain
    constructor: (@id, @data) ->
        _currentDir                     = ""
        @getDir                         = -> return _currentDir
        #
        _mainCharacterAnimations        = new createjs.SpriteSheet(@data.mainCharacter)
        _canvas                         = document.getElementById(@id)
        _stage                          = new createjs.Stage(_canvas)
        _characterAnimation             = new createjs.Sprite(_mainCharacterAnimations)
        _characterAnimation.x           = 10
        _characterAnimation.y           = 100
        _characterAnimation.framerate   = 8
        _stage.addChild(_characterAnimation)
        #
        createjs.Ticker.setFPS(32)
        createjs.Ticker.addEventListener("tick", (event) => _stage.update(event))
        document.onkeydown              = (event) => _currentDir = _switchDir(_currentDir, _characterAnimation, _keyToDir(event.keyCode), true)
        document.onkeyup                = (event) => _currentDir = _switchDir(_currentDir, _characterAnimation, _keyToDir(event.keyCode), false)
    #
    _keyToDir = (key) ->
        return switch key
            when 38, 87 then "north"
            when 40, 83 then "south"
            when 39, 68 then "east"
            when 37, 65 then "west"
            else return ""
    #
    _switchDir = (currentDir, animation, newDir, active) ->
        if active and newDir is currentDir then return currentDir
        if active and newDir isnt currentDir then currentDir = newDir
        if !active and newDir is currentDir then currentDir = ""
        switch currentDir
            when "north"    then    animation.gotoAndPlay("north")
            when "south"    then    animation.gotoAndPlay("south")
            when "east"     then    animation.gotoAndPlay("east")
            when "west"     then    animation.gotoAndPlay("west")
            else                    animation.stop()
        return currentDir
#
