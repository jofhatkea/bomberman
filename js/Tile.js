/**
 * Created by holbech on 12/06/2017.
 */
class Tile extends createjs.Shape {
    constructor(width, height, x, y){
        super();
        this.passable=true;
        this.destroyable = false;
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    }
}
class Floor extends Tile {
    constructor(width, height, x, y){
        super(width, height, x, y);
        this.graphics.beginFill("lightblue").drawRect(0,0, width, height);
    }
}
class Wall extends Tile {
    constructor(width, height, x, y){
        super(width, height, x, y);
        this.graphics.beginFill("gray").drawRect(0,0, width, height);
        this.passable=false;
    }
}
class Block extends Tile {
    constructor(width, height, x, y){
        super(width, height, x, y);
        this.graphics.beginFill("brown").drawRect(0,0, width, height);
        this.passable=false;
        this.destroyable=true;
    }
}
