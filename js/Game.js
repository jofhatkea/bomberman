/**
 * Created by holbech on 12/06/2017.
 */
class Game {
    constructor(){
        this.stage = new createjs.Stage("bm");
        this.preloader = new Preloader("preload.json", this.setup.bind(this), this.stage);
        this.queue = this.preloader.queue;
        this.tiles=[];
        this.heroes=[];
        this.explosions=[];
        this.powerups=[];
    }
    setup(){
        console.log(this.queue);
        let ls = new LevelSelector(this.queue.getResult("levels"), this.levelChosen.bind(this));
        this.stage.addChild(ls);
        this.stage.update();
    }
    levelChosen(num){
        console.log(num);
        this.stage.removeAllChildren();
        let data = this.queue.getResult("levels")[num].tiles;
        this.tiles=[];
        data.forEach((r,i)=>{
            this.tiles.push([]);
            r.forEach((c,z)=>{
                let t;
                switch(data[i][z]){
                    case 0:
                        t = new Floor(50,50, z*50, i*50);
                        break;
                    case 1:
                        t = new Wall(50, 50, z*50, i*50);
                        break;
                    case 2:
                        t = new Block(50, 50, z*50, i*50);
                        break;
                }
                this.tiles[i][z]=t;
                this.stage.addChild(t);
            })
        });
        this.stage.update();
        new Countdown(3, this.startGame.bind(this));
    }
    startGame(){

        let h = new Hero("red", 55, 55, 40, 40, {
            l:65,
            u:87,
            r:68,
            d:83,
            bomb: 71
        }, this.addToStage);
        this.heroes.push(h);
        this.stage.addChild(h)

        let h2 = new Hero("blue", (this.tiles[0].length-1)*50-45, (this.tiles.length-1)*50-45, 40, 40, {
            l:37,
            u:38,
            r:39,
            d:40,
            bomb: 76
        }, this.addToStage);
        this.heroes.push(h2);
        this.stage.addChild(h2)

        createjs.Ticker.setFPS(60);
        createjs.Ticker.on('tick', this.tock.bind(this));
    }
    addToStage(displayObject){
        this.stage.addChild(displayObject);
    }
    hitTest(rect1,rect2){
        if ( rect1.x >= rect2.x + rect2.width
            || rect1.x + rect1.width <= rect2.x
            || rect1.y >= rect2.y + rect2.height
            || rect1.y + rect1.height <= rect2.y ) {
            return false;
        }
        return true;
    }
    addExplosion(bomb){
        console.log(bomb);
        let ex = new Explosion(bomb.x-5, bomb.y-5, bomb.strength);
        this.explosions.push(ex);
        this.stage.addChild(ex);
        createjs.Tween.get(ex).to({alpha: 0.6}, 1000).call(()=>{
            this.stage.removeChild(ex)
            this.explosions.splice(this.explosions.indexOf(ex),1);
            this.heroes.forEach(h=>{//move heroes to top index/layer
                this.stage.addChild(h);
            });
        });
    }
    tock(e){
        if(running){
            this.heroes.forEach(h=>{
                if(h.alive){
                    h.move(this.tiles);
                    this.powerups.forEach((p,i)=>{
                        if(this.hitTest(h, p)){
                            this.stage.removeChild(p);
                            let pu = this.powerups.splice(i,1)

                            h.upgrade(p.type);
                        }
                    })
                }
            });
            this.explosions.forEach(e=>{
                this.heroes.forEach((h, i)=>{
                    if(this.hitTest(e.up, h) || this.hitTest(e.down, h) ||this.hitTest(e.left, h) || this.hitTest(e.right, h)){
                        this.stage.removeChild(h);
                        this.heroes.splice(i,1);
                        h.alive=false;
                    }
                });
                this.powerups.forEach((p,i)=>{
                    if(this.hitTest(e.up, p) || this.hitTest(e.down, p) ||this.hitTest(e.left, p) || this.hitTest(e.right, p)) {
                        this.stage.removeChild(p);
                        this.powerups.splice(i, 1);
                    }
                })
                //TODO explosions touching bombs should trigger the explosion early
            });
            if(this.heroes.length===1){
                this.stage.addChild(new createjs.Text("We have a winner", "30px Verdana", "#FFF"));
            } else if (this.heroes.length===0){
                this.stage.addChild(new createjs.Text("Tie!!!", "30px Verdana", "#FFF"));
            }
        }
        this.stage.update(e);
    }
}
//TODO
//const GRID_SIZE
let g, running=true;
const powerupChance=10;
window.addEventListener('load', ()=>{
    "use strict";
    g = new Game();
});
