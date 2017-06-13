/**
 * Created by holbech on 12/06/2017.
 */
class Hero extends createjs.Shape {
    constructor(color,x,y, width, height, keycodes, addToStage){
        super();
        this.graphics.beginFill(color).drawRect(0,0,width, height);
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.keys = {
            l:false,
            r:false,
            u:false,
            d:false
        }
        this.maxBombs=1;
        this.activeBombs=[];
        this.speed=2;
        this.bombStrength=1;
        this.alive=true;
        this.addToStage=addToStage;
        window.addEventListener('keyup', e=>{
           switch(e.keyCode){
               case keycodes.u:
                   this.keys.u=false;
                   break;
               case keycodes.r:
                   this.keys.r=false;
                   break;
               case keycodes.d:
                   this.keys.d=false;
                   break;
               case keycodes.l:
                   this.keys.l=false;
                   break;
           }
        });
        window.addEventListener('keydown', e=>{
            switch(e.keyCode){
                case keycodes.u:
                    this.keys.u=!false;
                    break;
                case keycodes.r:
                    this.keys.r=!false;
                    break;
                case keycodes.d:
                    this.keys.d=!false;
                    break;
                case keycodes.l:
                    this.keys.l=!false;
                    break;
                case keycodes.bomb:
                    if(this.alive){
                        this.placeBomb();
                    }
                    break;
            }
        });
    }
    willHit(rect2){
        if ( this.nextX >= rect2.x + rect2.width
            || this.nextX + this.width <= rect2.x
            || this.nextY >= rect2.y + rect2.height
            || this.nextY + this.height <= rect2.y )
        {
            return false;
        }
        return true;
    }
    upgrade(what){
        switch(what){
            case "bomb":
                this.maxBombs++;
                break;
            case "speed":
                this.speed++;
                break;
            case "strength":
                this.bombStrength++;
                break;
        }
    }
    move(blocks){
        this.nextX=this.x;
        this.nextY=this.y;
        if(this.keys.l){
            this.nextX-=this.speed;
        }
        if(this.keys.r){
            this.nextX+=this.speed;
        }
        if(this.keys.u){
            this.nextY-=this.speed;
        }
        if(this.keys.d){
            this.nextY+=this.speed;
        }
        let canWalk = true;

        blocks.some(row=>{
            row.forEach(b=>{
                if(b.passable){//skip all passable blocks
                    return false;
                }
                if(this.willHit(b)){
                    canWalk = false;
                    return true;//since we're using some, it should short circuit the loop, not sure it works with the double loop though
                }
            });
        });
        if(canWalk){
            this.x=this.nextX;
            this.y=this.nextY;
        }
    }
    bombExploded(b){
        //console.log(b);
        let i = this.activeBombs.indexOf(b);
        let x = this.activeBombs.splice(i,1);
        g.stage.removeChild(b)//todo, callback from Game, or should it be public? should I pass in the entire object?
        g.addExplosion(b);
    }
    placeBomb(){
        if(this.activeBombs.length<this.maxBombs){
            let x = Math.round(this.x/50)*50+5;
            let y = Math.round(this.y/50)*50+5;
            console.log(x,y)
            let b = new Bomb(x, y, this.bombExploded.bind(this), this.bombStrength);
            this.activeBombs.push(b);
            this.addToStage(b);
        }
    }
}