window.onload = function () {

    let width = 5;
    let height = 5;

    const can = this.document.querySelector("#can");
    const ctx = can.getContext("2d");

    const charParent = this.document.querySelector("#charParent");

    can.width = window.innerWidth;
    can.height = window.innerHeight;

    let dx = window.innerWidth / (width + 1);
    let dy = window.innerHeight / (height + 1);

    let pos = [];

    for (let i = 0; i < width; i++) {

        if (i % 2 == 0) {
            for (let j = 0; j < height; j++) {
                let x = (i + 0.75) * dx;
                let y = (j + 0.75) * dy;
                pos.push({ x, y });
                ctx.beginPath();
                ctx.arc(x, y, 40, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
        else {
            for (let j = height - 1; j > -1; j--) {
                let x = (i + 0.75) * dx;
                let y = (j + 0.75) * dy;
                pos.push({ x, y });
                ctx.beginPath();
                ctx.arc(x, y, 40, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
    }

    let charList = [];

    for (let i = 0; i < 2; i++) {
        let div = this.document.createElement("div");
        div.classList.add("char");
        let img = this.document.createElement("img");
        img.src = "./character/toad.png";
        img.alt = "img not found";
        div.appendChild(img);
        charParent.appendChild(div);
        charList.push(div);
    }


    ctx.beginPath();
    ctx.moveTo(pos[0].x, pos[0].y);
    
    for(let i = 0; i < pos.length; i++){
        ctx.lineTo(pos[i].x, pos[i].y);
    }

    ctx.stroke();

    console.log(pos);

    const setPos = (div, x, y) => {
        div.style.left = x + "px";
        div.style.top = y + "px";
    }

    let index = 0;
    this.setInterval(()=>{
        let p = pos[index];
        setPos(charList[0], p.x, p.y);
        index++;
        if(index >= pos.length){
            index = 0; 
        }
    }, 1000);
}