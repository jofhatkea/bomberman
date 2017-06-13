/**
 * Created by holbech on 13/06/2017.
 */
class Powerup extends createjs.Container {
    constructor(x,y){
        super();
        this.x=x;
        this.y=y;
        this.width=50;
        this.height=50;
        console.log(Math.floor(Math.random()*3))
        switch(Math.floor(Math.random()*3)){
            case 0:
                this.bomb();
                this.type="bomb";
                break;
            case 1:
                this.skates();
                this.type="speed";
                break;
            case 2:
                this.strength();
                this.type="strength";
                break;
        }
    }
    strength(){
        let x = new createjs.Shape();
        x.graphics.beginFill('orange').drawCircle(0,0,20);
        x.x=x.y=5;
        x.regX=x.regY=-20
        this.addChild(x);
    }
    bomb(){
        let x = new createjs.Shape();
        x.graphics.beginFill('purple').drawCircle(0,0,20);
        x.x=x.y=5;
        x.regX=x.regY=-20
        this.addChild(x);
    }
    skates(){
        let b = new createjs.Shape();
        b.graphics.beginFill("pink").drawRect(0,0, 20, 40);
        b.x=5;
        b.y=5;
        let b2 = new createjs.Shape();
        b2.graphics.beginFill("pink").drawRect(0,0, 40, 20);
        b2.x=5;
        b2.y=25;
        let c1 = new createjs.Shape();
        c1.graphics.beginFill("black").drawCircle(0,0,5);
        c1.x=10;
        c1.y=45;
        let c2 = new createjs.Shape();
        c2.graphics.beginFill("black").drawCircle(0,0,5);
        c2.x=40;
        c2.y=45;
        this.addChild(b, b2, c1, c2);
    }
}