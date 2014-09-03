var Memory = {
    pics: [],


    init: function (e) {
        Memory.pics = RandomGenerator.getPictureArray(4, 4);
    }

    renderMemory: function(){
    var div = document.getElementById("memshow");

      // Renders all messages.
        for (var i = 0; i < 16; ++i) {
            var brick = Memory.addBrick(Memory.pics[i]);
        }
        div.appendChild(brick);
    }

    addBrick: function(){

    }


    }
}

window.onload = Memory.init;