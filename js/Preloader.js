/**
 * Created by holbech on 12/06/2017.
 */
class Preloader {
    constructor(manifest, callback, stage){
        this.queue = new createjs.LoadQueue(true);
        this.queue.loadManifest(manifest);
        this.callback = callback;
        this.stage=stage;
        this.queue.on("progress", this.progress.bind(this));
        this.queue.on("complete", this.cleanUp.bind(this));
    }
    progress(e){
        this.stage.update(e);
    }
    cleanUp(e){
        this.stage.removeAllChildren();
        this.stage.update(e);
        this.callback();
    }
}