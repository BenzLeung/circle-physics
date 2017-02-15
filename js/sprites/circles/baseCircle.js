/**
 * @file 基本的圈
 * @author BenzLeung(https://github.com/BenzLeung)
 * @date 2017/2/3
 * @class BaseCircle
 * Created by JetBrains PhpStorm.
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

define(['cocos', 'chipmunk'], function (cc, cp) {
    return cc.PhysicsSprite.extend({
        circleType: 'base',
        SPEED: 200,
        shape: null,
        ctor: function (pngName) {
            this._super(pngName);

            var radius = this.getContentSize().width / 2;
            if (cc.sys.isMobile) {
                this.setScale(0.66);
                radius = radius * 0.66;
            }

            var body = new cp.Body(0.001, cp.momentForCircle(0.001, 0, radius, cp.vzero));
            body.sprite = this;
            this.setBody(body);

            this.shape = new cp.CircleShape(body, radius, cp.vzero);
            // 弹性
            this.shape.setElasticity(1);
            // 摩擦力
            this.shape.setFriction(0);

            this.initPosition();
            this.initSpeed();
            this.scheduleUpdate();
        },
        initPosition: function () {
            var winSize = cc.director.getWinSize();
            var thisSize = this.getBoundingBox();
            var radius = thisSize.width / 2;
            this.setPosition(winSize.width + radius * 6, winSize.height + radius * 6);
        },
        initSpeed: function () {
            var speedX = cc.randomMinus1To1();
            var speedY = cc.randomMinus1To1();

            this.getBody().setVel(cp.v(speedX * this.SPEED, speedY * this.SPEED));
        },
        update: function (dt) {
            this._super(dt);
            var isHitWall = false;
            var thisSize = this.getBoundingBox();
            var radius = thisSize.width / 2;
            var x = this.getPositionX();
            var y = this.getPositionY();

            var speedVel = this.getBody().getVel();
            var speedX = speedVel.x;
            var speedY = speedVel.y;

            if (x < cc.visibleRect.left.x + radius) {
                speedX = Math.abs(speedX);
                isHitWall = true;
            }
            if (y < cc.visibleRect.bottom.y + radius) {
                speedY = Math.abs(speedY);
                isHitWall = true;
            }
            if (x > cc.visibleRect.right.x - radius) {
                speedX = -Math.abs(speedX);
                isHitWall = true;
            }
            if (y > cc.visibleRect.top.y - radius) {
                speedY = -Math.abs(speedY);
                isHitWall = true;
            }

            if (isHitWall) {
                this.getBody().setVel(cp.v(speedX, speedY));
            }
        }
    });
});