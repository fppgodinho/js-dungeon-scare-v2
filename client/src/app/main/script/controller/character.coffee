"use strict"
class window.ControllerCharacter
    _sheet                  = null
    _animation              = null

    @property 'x',
        get: -> _animation.x
        set: (v) -> if v != _animation.x then _animation.x = v

    @property 'y',
        get: -> _animation.x
        set: (v) -> if v != _animation.y then _animation.y = v

    @property 'currentAnimation',
        get: -> _animation.currentAnimation
        set: (v) -> if v != _animation.currentAnimation then _animation.currentAnimation = v

    @property 'currentFrame',
        get: -> _animation.currentFrame
        set: (v) -> if v != _animation.currentFrame then _animation.currentFrame = v
    #

    constructor: (data) ->
        _sheet                  = new createjs.SpriteSheet(data)
        _animation              = new createjs.Sprite(_sheet)
        #
        @gotoAndPlay            = (frame) -> if _animation then return _animation.gotoAndPlay(frame)
        @advance                = (ms) -> if _animation then return _animation.advance(ms)
        @getData                = -> return data
        @getAnimation           = -> return _animation
    #
#
