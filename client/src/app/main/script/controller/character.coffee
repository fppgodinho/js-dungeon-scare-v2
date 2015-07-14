"use strict"
class window.ControllerCharacter
    constructor: (data) ->
        _sheet                  = new createjs.SpriteSheet(data)
        _animation              = new createjs.Sprite(_sheet)
        _animation.framerate    = data.framerate
        #
        @addGetterSetter 'x',
            -> _animation.x,
            (v) -> if v != _animation.x then _animation.x = v
        #
        @addGetterSetter 'y',
            -> _animation.y,
            (v) -> if v != _animation.y then _animation.y = v
        #
        @addGetterSetter 'currentAnimation',
            -> _animation.currentAnimation,
            (v) -> if v != _animation.currentAnimation then _animation.currentAnimation = v
        #
        @addGetterSetter 'currentFrame',
            -> _animation.currentFrame,
            (v) -> if v != _animation.currentFrame then _animation.currentFrame = v
        #
        @addGetterSetter 'paused',
            -> _animation.paused,
            (v) -> if v != _animation.paused then _animation.paused = v
        #
        @addGetterSetter 'framerate',
            -> _animation.framerate,
            (v) -> if v != _animation.framerate then _animation.framerate = v
        #
        @getData                = -> return data
        @getAnimation           = -> return _animation
        #
        @gotoAndPlay            = (frame) -> if _animation then return _animation.gotoAndPlay(frame)
        @advance                = (ms) -> if _animation then return _animation.advance(ms)
        @play                   = -> if _animation then _animation.paused = false
        @stop                   = -> if _animation then _animation.paused = true
    #
#
