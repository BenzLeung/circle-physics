/**
 * @file 用于标题画面的背景
 * @author BenzLeung(https://github.com/BenzLeung)
 * @date 2017/2/8
 * @class DemoLayer
 * Created by JetBrains PhpStorm.
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

define(
    [
        'cocos',
        'chipmunk',
        'sprites/circles/redCircle',
        'sprites/circles/blueCircle'
    ],
    function (cc, cp, RedCircle, BlueCircle) {
        return cc.Layer.extend({
            space    : null,
            ctor     : function () {
                this._super();

                this.space = new cp.Space();

                var i;
                var tmp;
                for (i = 0; i < 8; i ++) {
                    tmp = new RedCircle();
                    this.space.addBody(tmp.getBody());
                    this.space.addShape(tmp.shape);
                    this.addChild(tmp, 2);
                }
                for (i = 0; i < 15; i ++) {
                    tmp = new BlueCircle();
                    this.space.addBody(tmp.getBody());
                    this.space.addShape(tmp.shape);
                    this.addChild(tmp, 3);
                }

                this.scheduleUpdate();
            },
            update : function (dt) {
                this._super(dt);
                this.space.step(dt);
            }
        });
    }
);