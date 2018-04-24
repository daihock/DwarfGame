/**
 * Created by daihock on 30.09.2016.
 */
 var base = {
    player: "<div class=\"player\"></div>",
    wall: "<div class=\"wall\"></div>",
    empty: "<div class=\"empty\"></div>",

    getBase : function (str) {
        if (str === "w") {
            return this.wall;
        } else if (str === "p") {
            return this.player;
        } else {
            return this.empty;
        }
    }
};

var lab = "ww  p  w ww ww   w w  w";

function getDiv(lab) {
    var divStr = "";
    for (var i = 0; i <= lab.length; i++) {
        divStr += base.getBase(lab[i]);
    }
    return divStr;
}
var divs = "<div class='bground'>" + getDiv(lab) + "</div>";
// var bground = document.getElementsByClassName("bground");
//bground.text = divs;
document.body.innerHTML = divs;