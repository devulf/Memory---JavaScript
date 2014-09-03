var Memory = {
    array: [], //array som inneh�ller alla bilder
    timeOut: null, //timeouten som v�nder tillbaka brickorna
    click: 0, //vilket klick du �r p�
    one: null, //inneh�ller den brickan du tryckt p�
    two: null, //den andra brickan du tryckt p�
    first: null, //sparar brickvaluet i first f�r att kunna j�mf�ra med andra klickets value
    second: null, //
    count: 0, //r�knar hur m�nga f�rs�k du har gjort
    pairs: 0, //r�knar hur m�nga par du har s� man vet n�r man vunnit
    init: function (e) { //h�mtar array
        Memory.array = RandomGenerator.getPictureArray(4, 4);
        Memory.renderMemory();
    },
    renderMemory: function () { //skriver ut dold spelplan
        var div = document.getElementById("writemem"); //h�mta div fr�n html
        for (var i = 0; i < 16; i++) {
            var brick = Memory.createBrick(Memory.array[i]); //skapa en bricka med arraynumret man �r p�
            div.appendChild(brick); //skriv ut bricka
        }
    },
    createBrick: function (brickValue) {
        //skapa a taggar till varje plats
        var paragraf = document.createElement("a");
        paragraf.className = "pic";
        paragraf.setAttribute("href", "#");
        //skapa bilder f�r varje plats
        var pic = document.createElement("img");
        pic.setAttribute("src", "0.png");
        pic.className = "pic";
        paragraf.appendChild(pic); //skriv ut bilden i a taggen
        /* ONCLICK */
        paragraf.onclick = function () {
            //om du trycker p� samma igen
            if (paragraf == Memory.one) {
                Memory.click = 1; //s�tt s� att dy �r fortfarande p� 1 klicket och returna inget
                return;
            }
            //om du trycken tredje g�ng
            if (Memory.two !== null) {
                console.log("333333");
                clearTimeout(Memory.timeOut); //avsluta timeouten
                Memory.closeBrick(Memory.one); //st�ng f�rsta �ppnade bruickan
                Memory.one = null;
                Memory.closeBrick(Memory.two);
                Memory.two = null;
                return;
            }
            //annars �ka klicket och visa bilden
            else {
                Memory.click++;
                var turnPic = paragraf.childNodes;
                turnPic[0].setAttribute("src", +brickValue + ".png");
            }
            //f�rsta klicket
            if (Memory.click < 2) {
                Memory.one = paragraf; //spara i one f�r den brickan du trykt p�
                Memory.first = brickValue; //spara valuet p� bruickan i first f�r att klunnna jh�mf�ra med second
                console.log("1111111111111");
            }
            //andra klicket
            if (Memory.click > 1) {
                Memory.two = paragraf;
                Memory.second = brickValue;
                Memory.count += 1; //�ka antalet f�rsk med 1
                console.log("222222222");
                //om man f�r par
                if (Memory.first == brickValue) {
                    Memory.one.onclick = null; //om man tryker p� en �ppen bricka ska inget h�nda
                    Memory.two.onclick = null;
                    Memory.one = null; //�terst�ll one eftesom du inte har tryck p� nt�
                    Memory.two = null;
                    Memory.pairs++; //r�kna uuppp par
                    console.log("paair");
                }
                //om det inte �r par
                if (Memory.first != Memory.second) {
                    Memory.timeOut = setTimeout(function () { //k�r en timeout
                        Memory.closeBrick(Memory.one); //som st�nger f�rsta brickan
                        Memory.closeBrick(Memory.two); //och andra
                        Memory.one = null; //�terst�ll eftersom du inte har n�gon tryckt p�
                        Memory.two = null;
                    }, 500) //efter 500 millisek
                }
                //om du �ppnat alla par
                if (Memory.pairs == 8) {
                    alert("DU �R S�MST PATTE DU KLARADE DET P� " + Memory.count + " G�NGER! JAG KLARADET DET P� 14....");
                }
                Memory.click = 0;
            }
        }
        return paragraf;
    },
    //st�ng bricka
    closeBrick: function (paragraf) {
        var closePic = paragraf.childNodes;
        closePic[0].setAttribute("src", "0.png");
    }
}
window.onload = Memory.init; 