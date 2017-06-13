/**
 * Created by holbech on 12/06/2017.
 */
class Countdown {
    constructor(duration, callback){
        this.element = document.createElement('h1');
        this.element.classList.add("counter")
        this.element.textContent=duration;
        document.body.appendChild(this.element);
        this.element.classList.add("highlight");
        this.element.addEventListener('animationiteration', ()=>{
            duration--;
            console.log(duration);
            if(duration===-1){
                document.body.removeChild(this.element);
                callback();
            } else {
                this.element.textContent=duration;
            }

        })
    }
}