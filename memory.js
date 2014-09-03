var Memory = {
    pics: [], //Array f�r alla bilder som anv�nds i memoryt.

    click: 0, //Knapptryck

    clickOne: null, //Brickv�ndning 1
    clickTwo: null,

    first: null, // Bricka 1
    second: null,

    count: 0, //R�knar hur m�nga f�rs�k
    pair: 0, //Antal par

    //H�mtar array fr�n random.js
    init: function (e) {
        Memory.pics = RandomGenerator.getPictureArray(4, 4); //H�mtar getPictureArray med en matris p� 4*4 rutor.
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

    // Skapar a-element med img-taggar. 0.png �r den statiska bilden som visas d� en bricka inte �r "aktiv".
    addBrick: function (newBrick) {
        var link = document.createElement("a");
        link.className = "pics";
        link.setAttribute("href", "#");

        var image = document.createElement("img");
        image.className = "pic";
        image.setAttribute("src", "0.png");

        link.appendChild(image);

        link.onclick = function () {
            // Knapptryck har gjorts. Vid tryck p� samma bild igen ska inget h�nda.
            if (link == Memory.clickOne) {
                Memory.click = 1;
                return;
            }
            // Vid tre knapptryck
            if (Memory.clickTwo != null) {
                console.log("Calm down!");
                clearTimeout(Memory.endTimer);
                // St�nger bricka 1 respektive bricka 2
                Memory.closeBrick(Memory.clickOne);
                Memory.closeBrick(Memory.clickTwo);
                return;
            }

            // Annars �ka p� klick och visa bild i array.
            else {
                Memory.click++;
                var memPics = link.childNodes;
                memPics[0].setAttribute("src", +newBrick + ".png");
            }

            //Vid f�rsta knapptrycket p� standardbild
            if (Memory.click == 1) {
                Memory.clickOne = link; //Knapptryck 1 sparas
                Memory.first = newBrick; //V�rdet i knapptryck 1 sparas i arrayen

            }
            //D� en bild �r �ppen och en till �ppnas
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
                        Memory.closeBrick(Memory.clickOne); //St�nger f�rsta felaktiga brickan
                        Memory.closeBrick(Memory.clickTwo); //St�nger andra felaktiga brickan
                        Memory.clickOne = null;
                        Memory.clickTwo = null;
                    }, 250) //250 ms reset vid fel

                }

                //Presenterar hur m�nga f�rs�k du klarade det p�. Antingen blir Tiny Tim stolt eller besviken. Valet �r ditt.
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

    // Funktion som g�r att vald bricka �ter igen blir till "originalbilden", allts� 0.png.
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