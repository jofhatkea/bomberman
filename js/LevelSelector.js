/**
 * Created by holbech on 12/06/2017.
 */
class LevelSelector extends createjs.Container {
    constructor(lvlData, callback){
        super();
        lvlData.forEach((l,i)=>{
           let x = new createjs.Shape();
           x.graphics.beginFill("#000").drawRect(0,0,50,50);
           x.x = i*55+50;
           x.y=0;
           let t = new createjs.Text(i, "30px Verdana", "#FFF");
            t.x = i*55+50;
            t.y=0;
            x.on("click", ()=>{
                callback(i);
            })
            this.addChild(x, t)
        });
    }
}
