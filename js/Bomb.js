/**
 * Created by holbech on 13/06/2017.
 */
class Bomb extends createjs.Shape {
    constructor(x,y,callback, strength, radius=20, color="black"){
        super();
        this.graphics.beginFill(color).drawCircle(0,0, radius);
        this.regX=radius*-1;
        this.regY=radius*-1;
        this.x=x;
        this.y=y;
        this.strength=strength;
        this.pulse(callback)
    }
    pulse(callback){
        createjs.Tween.get(this).to({alpha: 0.4}, 1000).to({alpha:1}, 1000).call(()=>{
            callback(this);
        })
    }
}