var Memory = {
    array: [], //array som innehåller alla bilder
    timeOut: null, //timeouten som vänder tillbaka brickorna
    click: 0, //vilket klick du är på
    one: null, //innehåller den brickan du tryckt på
    two: null, //den andra brickan du tryckt på
    first: null, //sparar brickvaluet i first för att kunna jämföra med andra klickets value
    second: null, //
    count: 0, //räknar hur många försök du har gjort
    pairs: 0, //räknar hur många par du har så man vet när man vunnit
    init: function (e) { //hämtar array
        Memory.array = RandomGenerator.getPictureArray(4, 4);
        Memory.renderMemory();
    },
    renderMemory: function () { //skriver ut dold spelplan
        var div = document.getElementById("writemem"); //hämta div från html
        for (var i = 0; i < 16; i++) {
            var brick = Memory.createBrick(Memory.array[i]); //skapa en bricka med arraynumret man är på
            div.appendChild(brick); //skriv ut bricka
        }
    },
    createBrick: function (brickValue) {
        //skapa a taggar till varje plats
        var paragraf = document.createElement("a");
        paragraf.className = "pic";
        paragraf.setAttribute("href", "#");
        //skapa bilder för varje plats
        var pic = document.createElement("img");
        pic.setAttribute("src", "0.png");
        pic.className = "pic";
        paragraf.appendChild(pic); //skriv ut bilden i a taggen
        /* ONCLICK */
        paragraf.onclick = function () {
            //om du trycker på samma igen
            if (paragraf == Memory.one) {
                Memory.click = 1; //sätt så att dy ör fortfarande på 1 klicket och returna inget
                return;
            }
            //om du trycken tredje gång
            if (Memory.two !== null) {
                console.log("333333");
                clearTimeout(Memory.timeOut); //avsluta timeouten
                Memory.closeBrick(Memory.one); //stäng första öppnade bruickan
                Memory.one = null;
                Memory.closeBrick(Memory.two);
                Memory.two = null;
                return;
            }
            //annars öka klicket och visa bilden
            else {
                Memory.click++;
                var turnPic = paragraf.childNodes;
                turnPic[0].setAttribute("src", +brickValue + ".png");
            }
            //första klicket
            if (Memory.click < 2) {
                Memory.one = paragraf; //spara i one för den brickan du trykt på
                Memory.first = brickValue; //spara valuet på bruickan i first för att klunnna jhämföra med second
                console.log("1111111111111");
            }
            //andra klicket
            if (Memory.click > 1) {
                Memory.two = paragraf;
                Memory.second = brickValue;
                Memory.count += 1; //öka antalet försk med 1
                console.log("222222222");
                //om man får par
                if (Memory.first == brickValue) {
                    Memory.one.onclick = null; //om man tryker på en öppen bricka ska inget hända
                    Memory.two.onclick = null;
                    Memory.one = null; //återställ one eftesom du inte har tryck på ntå
                    Memory.two = null;
                    Memory.pairs++; //räkna uuppp par
                    console.log("paair");
                }
                //om det inte är par
                if (Memory.first != Memory.second) {
                    Memory.timeOut = setTimeout(function () { //kör en timeout
                        Memory.closeBrick(Memory.one); //som stänger första brickan
                        Memory.closeBrick(Memory.two); //och andra
                        Memory.one = null; //återställ eftersom du inte har någon tryckt på
                        Memory.two = null;
                    }, 500) //efter 500 millisek
                }
                //om du öppnat alla par
                if (Memory.pairs == 8) {
                    alert("DU ÄR SÄMST PATTE DU KLARADE DET PÅ " + Memory.count + " GÅNGER! JAG KLARADET DET PÅ 14....");
                }
                Memory.click = 0;
            }
        }
        return paragraf;
    },
    //stäng bricka
    closeBrick: function (paragraf) {
        var closePic = paragraf.childNodes;
        closePic[0].setAttribute("src", "0.png");
    }
}
window.onload = Memory.init; 