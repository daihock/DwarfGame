/**
 * Created by daihock on 01.10.2016.
 */

var lvls = [
{ // lvl1
    lvl: [  {row: 4, text: "essss"}],
    player: {x:1, y:4},
    goal: [ {x:4, y:4}],
    finish: {x:4, y:4}
},

{//lvl2
    lvl: [  {row: 2, text: "eeeeeees"},
            {row: 3, text: "eeeeeees"},
            {row: 4, text: "eeeessss"}],
    player: {x:4, y:4},
    goal: [ {x:7, y:4}, {x:7, y:2}],
    finish: {x:7, y:2}
},

{//lvl3
    lvl: [  {row: 2, text: "eeeeeess"},
            {row: 3, text: "eeeeees"},
            {row: 4, text: "eeeeeesssss"},
            {row: 5, text: "eeeeeeeeees"},
            {row: 6, text: "eeeeeeeeees"}],
    player: {x:7, y:2},
    goal: [ {x:6, y:2}, {x:6, y:4}, {x:10, y:4},{x:10, y:6}],
    finish: {x:10, y:6}
},

{//lvl4
    lvl: [  {row: 1, text: "eeeeeeeeees"},
            {row: 2, text: "eeeeeeeeees"},
            {row: 3, text: "eeeeeeeeees"},
            {row: 4, text: "eeeeeeeessseeeeesss"},
            {row: 5, text: "eeeeeeeeseeeeeeeses"},
            {row: 6, text: "eeeeeeeesessssssses"},
            {row: 7, text: "eeeeeeeeseeeeeeeees"},
            {row: 8, text: "eeeeeeeessssssseees"},
            {row: 9, text: "eeeeeeeeeeeeeesssss"}],
    player: {x:10, y:6},
    goal: [ {x:16, y:6}, {x:16, y:4}, {x:18, y:4}, {x:18, y:9}, {x:14, y:9},
            {x:14, y:8}, {x:8, y:8}, {x:8, y:4}, {x:10, y:4}, {x:10, y:1}],
    finish: {x:10, y:1}
},

{//lvl5
    lvl: [  {row: 0, text: "eeeeeeeeeeeesssss"},
            {row: 1, text: "eeeeeeeeeessseees"},
            {row: 2, text: "eeeeeeeeeeeeeeees"},
            {row: 3, text: "eeeeeeeeeeeeeeees"},
            {row: 4, text: "eeeeeeeeeeeeesses"},
            {row: 5, text: "eeeeeeeeesssssees"},
            {row: 6, text: "eeeeeeessseeeeees"},
            {row: 7, text: "eeeeeeeseeessssss"},
            {row: 8, text: "eeeeeeeseees"},
            {row: 9, text: "eeeeeeesssss"},
            {row: 10,text: ""}],
    player: {x:10, y:1},
    goal: [ {x:12, y:1}, {x:12, y:0}, {x:16, y:0}, {x:16, y:7}, {x:11, y:7},
            {x:11, y:9}, {x:7, y:9}, {x:7, y:6}, {x:9, y:6}, {x:9, y:5}, {x:13, y:5},
            {x:13, y:4},{x:14, y:4}],
    finish: {x:14, y:4}
}

];

var base = {
    node: document.createElement('div'),
    bground: document.createElement('div'),
    curLvl: 0,
    curGoal: 0,

    getBase : function (str) {
        var newNode = this.node.cloneNode();

        if (str === "s") {
            newNode.setAttribute("class", "step");
            return newNode;
        } else if (str === "g") {
            newNode.setAttribute("class", "goal");
            return newNode;
        } else {
            newNode.setAttribute("class", "empty");
            return newNode;
        }
    }
};

var draw = lvls[base.curLvl];
drawLvl (draw);

function drawLvl (obj) {
    var str = obj.lvl;
    var curNode;
    base.bground.remove();
    base.bground = null;
    base.bground = document.createElement('div');
    base.bground.setAttribute("class", "bground");
    document.body.appendChild(base.bground);
    for (var key in str) {
        for (var i = 0; i < str[key].text.length; i++) {
            curNode = base.getBase(str[key].text[i]);
            curNode.style.left = i * 50 + "px";
            curNode.style.top = str[key].row * 50 + "px";
            //var bground = document.getElementsByClassName("bground");
            base.bground.appendChild(curNode);
        }
    }
    //draw Player
    var playerPos = obj.player;
    var playerNode = document.createElement('div');
    playerNode.setAttribute("class", "player");
    playerNode.style.left = playerPos.x * 50 + "px";
    playerNode.style.top = playerPos.y * 50 + "px";
    base.bground.appendChild(playerNode);

    //draw Goal
    var goal = obj.goal;
    for (var goalKey in goal) {
        var goalNode = base.getBase("g");
        goalNode.style.left = goal[goalKey].x * 50 + "px";
        goalNode.style.top = goal[goalKey].y * 50 + "px";
        base.bground.appendChild(goalNode);
    }

    //draw Finish
    var finishPos = obj.finish;
    var finishNode = document.createElement('div');
    finishNode.setAttribute("class", "finish");
    finishNode.style.left = finishPos.x*50 + "px";
    finishNode.style.top = finishPos.y*50 + "px";
    base.bground.appendChild(finishNode);

    window.playerNode = playerNode;
}

function steps (value) {
    if (value == 0 || value < 0) {
        var input = document.getElementsByName("input");
        input[0].value = 0;
        //noinspection JSDuplicatedDeclaration
        var button = document.getElementsByTagName("button");
        //noinspection JSDuplicatedDeclaration
        for (var i = 0; i <= 3; i++) {
            button[i].setAttribute("disabled", "1");
        }
    } else {

        window.stepsNum = value;
        //noinspection JSDuplicatedDeclaration
        var button = document.getElementsByTagName("button");
        //noinspection JSDuplicatedDeclaration
        for (var i = 0; i <= 3; i++) {
            button[i].removeAttribute("disabled");
        }
    }
}

function walk(id) {
    var check;

    if (!window.stepsNum || window.stepsNum < 0) {
        alert("Неправильное количество шагов!");
        var input = document.getElementsByName("input");
        input[0].value = 0;
        //noinspection JSDuplicatedDeclaration
        var button = document.getElementsByTagName("button");
        //noinspection JSDuplicatedDeclaration
        for (var i = 0; i <= 3; i++) {
            button[i].setAttribute("disabled", "1");
        }
        return
    }

    var stepsWalk = window.stepsNum * 50;
    if (id == "left") {//todo rewrite
        check = (parseInt(playerNode.offsetLeft) - stepsWalk) / 50;

        if (check == draw.goal[base.curGoal].x) {
            playerNode.style.left = check * 50 + "px";
            if (base.curGoal == (draw.goal.length-1)) {
                alert("Молодец!");
            }
        }
    }

    if (id == "right") {
        check = (playerNode.offsetLeft + stepsWalk);

        if (check == draw.goal[base.curGoal].x*50) {
            playerNode.style.left = check  + "px";

            if (base.curGoal == (draw.goal.length-1)) {
                nextLvl();
                base.curLvl++;
                draw = lvls[base.curLvl];
                setTimeout(function(){drawLvl(draw)}, 7000);
            }

        } else {
            wrongSteps();// todo div
            return; //todo up down
        }
    }
}

function nextLvl () {
    var grats = document.createElement('div');
    grats.setAttribute("class", "grats");
    grats.setAttribute("onclick", "closeNode('grats')");
    grats.innerHTML = "<h2 style='color: crimson; bottom: 0px; position: absolute; text-align: center; width: 100%;'>МОЛОДЕЦ!</h2>";
    document.body.appendChild(grats);
    //setTimeout(function () {closeNode('grats')}, 7000);
}

function closeNode(name) {
    var closeNode = document.getElementsByClassName(name);
    closeNode[0].remove();
}

function wrongSteps() {//todo finish
    var wrong = document.createElement('div');
    wrong.setAttribute("class", "wrong");
    wrong.setAttribute("onclick", "closeNode('wrong')");
    document.body.appendChild(wrong);
}