/**
 * @file 您所控制的主角圆
 * @author BenzLeung(https://github.com/BenzLeung)
 * @date 2017/2/3
 * @class MasterCircle
 * Created by JetBrains PhpStorm.
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

define(['cocos', 'chipmunk', 'sprites/circles/baseCircle'], function (cc, cp, BaseCircle) {
    return BaseCircle.extend({
        circleType: 'master',
        normalFrame: null,
        lostFrame: null,
        SPEED: 300,
        ctor:function () {
            this.normalFrame = new cc.SpriteFrame('res/me.png', cc.rect(0, 0, 80, 80));
            this.lostFrame = new cc.SpriteFrame('res/me-lost.png', cc.rect(0, 0, 80, 80));
            this._super(this.normalFrame);
            if (cc.sys.isMobile && cc.sys.capabilities['touches']) {
                this.initTouch();
            }
            if (cc.sys.capabilities['keyboard']) {
                this.initKeyboard();
            }
        },
        initPosition: function () {
            var winSize = cc.director.getWinSize();
            this.setPosition(winSize.width / 2, winSize.height / 2);
        },
        initSpeed: function () {
            this.getBody().setVel(cp.vzero);
        },
        initKeyboard: function () {
            var me = this;
            var keyListener = cc.EventListener.create({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (keyCode) {
                    var body = me.getBody();
                    switch (keyCode) {
                        case cc.KEY.w:
                        case cc.KEY.up:
                            body.setVel(cp.v(0, 300));
                            break;
                        case cc.KEY.s:
                        case cc.KEY.down:
                            body.setVel(cp.v(0, -300));
                            break;
                        case cc.KEY.a:
                        case cc.KEY.left:
                            body.setVel(cp.v(-300, 0));
                            break;
                        case cc.KEY.d:
                        case cc.KEY.right:
                            body.setVel(cp.v(300, 0));
                            break;
                        case cc.KEY.space:
                            body.setVel(cp.vzero);
                            break;
                    }
                }
            });
            cc.eventManager.addListener(keyListener, this);
        },
        initTouch: function () {
            var me = this;
            var processEvent = function (event) {
                var delta = event.getDelta();
                var curPos = me.getPosition();
                curPos = cc.pAdd(curPos, delta);
                curPos = cc.pClamp(curPos, cc.visibleRect.bottomLeft, cc.visibleRect.topRight);
                me.setPosition(curPos);
                me.getBody().setVel(cp.vzero);
            };
            /*var mouseListener = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                onMouseMove: function (event) {
                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                        var delta = event.getDelta();
                        var curPos = me.getPosition();
                        var winSize = cc.director.getWinSize();
                        var thisSize = me.getContentSize();
                        var radius = thisSize.width / 2;
                        curPos = cc.pAdd(curPos, delta);
                        curPos = cc.pClamp(curPos, cc.p(radius, radius), cc.p(winSize.width - radius, winSize.height - radius));
                        me.setPosition(curPos);
                    }
                }
            });
            cc.eventManager.addListener(mouseListener, this);*/
            var touchListener = cc.EventListener.create({
                prevTouchId: -1,
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesMoved:function (touches, event) {
                    var touch = touches[0];
                    if (this.prevTouchId != touch.getID()) {
                        this.prevTouchId = touch.getID();
                    } else {
                        processEvent(touches[0]);
                    }
                }
            });
            cc.eventManager.addListener(touchListener, this);
        }
    });
});