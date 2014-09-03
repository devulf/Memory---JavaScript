var Memory = {
    pics: [], //Array för alla bilder som används i memoryt.

    click: 0, //Knapptryck

    clickOne: null, //Brickvändning 1
    clickTwo: null,

    first: null, // Bricka 1
    second: null,

    count: 0, //Räknar hur många försök
    pair: 0, //Antal par

    //Hämtar array från random.js
    init: function (e) {
        Memory.pics = RandomGenerator.getPictureArray(4, 4); //Hämtar getPictureArray med en matris på 4*4 rutor.
        Memory.renderMemory();
    },

    // Loopar igenom bilderna i arrayen inuti "memshow" i HTML-dokumentet. Totalt 16 "aktiva" brickor.
    renderMemory: function () {
        var div = document.getElementById("memshow");
        for (var i = 0; i < 16; i++) {
            var brick = Memory.addBrick(Memory.pics[i]);
            div.appendChild(brick);
        }
    },

    // Skapar a-element med img-taggar. 0.png är den statiska bilden som visas då en bricka inte är "aktiv".
    addBrick: function (newBrick) {
        var link = document.createElement("a");
        link.className = "pics";
        link.setAttribute("href", "#");

        var image = document.createElement("img");
        image.className = "pic";
        image.setAttribute("src", "0.png");

        link.appendChild(image);

        link.onclick = function () {
            // Knapptryck har gjorts. Vid tryck på samma bild igen ska inget hända.
            if (link == Memory.clickOne) {
                Memory.click = 1;
                return;
            }
            // Vid tre knapptryck
            if (Memory.clickTwo != null) {
                console.log("Calm down!");
                clearTimeout(Memory.endTimer);
                // Stänger bricka 1 respektive bricka 2
                Memory.closeBrick(Memory.clickOne);
                Memory.closeBrick(Memory.clickTwo);
                return;
            }

            // Annars öka på klick och visa bild i array.
            else {
                Memory.click++;
                var memPics = link.childNodes;
                memPics[0].setAttribute("src", +newBrick + ".png");
            }

            //Vid första knapptrycket på standardbild
            if (Memory.click == 1) {
                Memory.clickOne = link; //Knapptryck 1 sparas
                Memory.first = newBrick; //Värdet i knapptryck 1 sparas i arrayen

            }
            //Då en bild är öppen och en till öppnas
            if (Memory.click == 2) {
                Memory.clickTwo = link;
                Memory.second = newBrick;
                Memory.count += 1;

                //Par
                if (Memory.first == newBrick) {
                    Memory.clickOne.onclick = null;
                    Memory.clickTwo.onclick = null;
                    Memory.clickOne = null;
                    Memory.clickTwo = null;
                    Memory.pair++;
                    console.log("Pair!");
                }
                // Fel, inte par
                if (Memory.first != newBrick) {
                    Memory.timerEnd = setTimeout(function () {
                        Memory.closeBrick(Memory.clickOne); //Stänger första felaktiga brickan
                        Memory.closeBrick(Memory.clickTwo); //Stänger andra felaktiga brickan
                        Memory.clickOne = null;
                        Memory.clickTwo = null;
                    }, 250) //250 ms reset vid fel

                }

                //Presenterar hur många försök du klarade det på. Antingen blir Tiny Tim stolt eller besviken. Valet är ditt.
                if (Memory.pair == 8 && Memory.count < 25) {
                    alert("You've made Tiny Tim proud in " + Memory.count + " tries!");
                }
                else if (Memory.pair == 8 && Memory.count > 25) {
                    alert("Tiny Tim is dissapointed. You needed " + Memory.count + " tries..");
                }

                Memory.click = 0;

            }
        }

        return link;

    },

    // Funktion som gör att vald bricka åter igen blir till "originalbilden", alltså 0.png.
    closeBrick: function (link) {
        if (closePic == null || Memory.clickOne != Memory.click) {
            var closePic = link.childNodes;
            closePic[0].setAttribute("src", "0.png");
        }
        else {
            return;
        }
    }

}

window.onload = Memory.init;