
window.onload = function () {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const bubbles = []

    for (let i = 0; i < 3; i++) {
        bubbles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 50 + 25,
            dx: (Math.random() - 1) * 2,
            dy: (Math.random() - 1) * 2,
            c: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        });
    }

    canvas.addEventListener("click", (event) => {

        console.log(event);

        // event.clientX，event.clientY

        // bubbles.push({
        //     x: Math.random() * window.innerWidth,
        //     y: Math.random() * window.innerHeight,
        //     r: Math.random() * 50 + 25,
        //     dx: (Math.random() - 1) * 2,
        //     dy: (Math.random() - 1) * 2,
        //     c: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        // });
    });


    function anim() {

        ctx.clearRect(0, 0, innerWidth, innerHeight);

        // bubble collsions hand shake principle
        for(let i = 0; i < bubbles.length; i++){
            for(let j = i+1; j < bubbles.length; j++){

            }
        }

        bubbles.forEach((bubble, index) => {

            bubble.x += bubble.dx;
            bubble.y += bubble.dy;

            ctx.beginPath();
            ctx.fillStyle = bubble.c;
            ctx.arc(bubble.x, bubble.y, bubble.r, 0, 2 * Math.PI);
            ctx.strokeStyle = bubble.color;
            ctx.stroke();
            ctx.fill();

            if (bubble.x - bubble.r > window.innerWidth) {
                bubble.x = 0;
            }

            if (bubble.x + bubble.r < 0) {
                bubble.x = window.innerWidth;
            }

            if (bubble.y - bubble.r > window.innerHeight) {
                bubble.y = 0;
            }

            if (bubble.y + bubble.r < 0) {
                bubble.y = window.innerHeight;
            }
        });

        window.requestAnimationFrame(anim);
    }

    window.requestAnimationFrame(anim);
}
