/**
 * Created by holbech on 13/06/2017.
 */
class ExplosionDirection extends createjs.Shape {
    constructor(dir, x,y,str){
        super();
        this.width=this.height=50;
        this.x=x;
        this.y=y;
        if(dir==="up"){
            let offset=0;
            for(var i=1; i<str+1; i++){
                let gridR = Math.floor(this.y/50)-i;
                let gridC = Math.floor(this.x/50);
                if(g.tiles[gridR][gridC].passable || g.tiles[gridR][gridC].destroyable){
                    this.height+=50;
                    offset-=50;
                    this.removeTile(gridR, gridC);
                } else {
                    break;
                }
            }
            this.y += offset;
        }

        if(dir==="down"){
            for(var i=1; i<str+1; i++){
                let gridR = Math.floor(this.y/50)+i;
                let gridC = Math.floor(this.x/50);
                if(g.tiles[gridR][gridC].passable || g.tiles[gridR][gridC].destroyable){
                    this.height+=50;
                    this.removeTile(gridR, gridC);
                } else {
                    break;
                }
            }
        }
        if(dir==="left"){
            let offset=0;
            for(var i=1; i<str+1; i++){
                let gridR = Math.floor(this.y/50);
                let gridC = Math.floor(this.x/50)-i;
                if(g.tiles[gridR][gridC].passable || g.tiles[gridR][gridC].destroyable){
                    this.width+=50;
                    offset-=50;
                    this.removeTile(gridR, gridC);
                } else {
                    break;
                }
            }
            this.x += offset;
        }
        if(dir==="right"){
            for(var i=1; i<str+1; i++){
                let gridR = Math.floor(this.y/50);
                let gridC = Math.floor(this.x/50)+i;
                if(g.tiles[gridR][gridC].passable || g.tiles[gridR][gridC].destroyable){
                    this.width+=50;
                    this.removeTile(gridR, gridC);
                } else {
                    break;
                }
            }
        }
        this.graphics.beginFill("yellow").drawRect(0,0,this.width,this.height);

    }
    removeTile(r,c){
        let f = new Floor(50,50,c*50, r*50);
        let destroyable = g.tiles[r][c].destroyable;
        g.stage.removeChild(g.tiles[r][c]);
        g.tiles[r][c]= f;
        g.stage.addChild(f);

        if(destroyable && Math.floor(Math.random()*100)<powerupChance){
            setTimeout(()=>{
                let x = new Powerup(c*50,r*50);
                g.stage.addChild(x);
                g.powerups.push(x);
            }, 1100)
        }
        //pick up pu
    }
}