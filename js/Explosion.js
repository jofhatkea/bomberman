/**
 * Created by holbech on 13/06/2017.
 */
class Explosion extends createjs.Container {
    constructor(x,y,str){
        super();

        this.up = new ExplosionDirection("up", x,y,str);
        this.down = new ExplosionDirection("down", x,y,str);
        this.left = new ExplosionDirection("left", x,y,str);
        this.right = new ExplosionDirection("right", x,y,str);
        this.addChild(this.up, this.left, this.right, this.down);
    }
}