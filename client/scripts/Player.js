Player = function(name, img)
{
    let self =
        {
            name:name,
            owner:"Unsigned",
            img:img,
            points:0
        };

    self.pickup = function(newOwner)
    {
        // if(self.owner != "Unsigned")
        //     self.owner.removePlayer(self);
        // newOwner.addPlayer(self);
        self.owner = newOwner;
        $('#pickupPlayerModal').modal('hide');
        save();
    };

    self.score = function(value)
    {
        self.points = Number(self.points) + Number(value);
        if(self.owner !== "Unsigned")
            self.owner.points = Number(self.owner.points) + Number(value);
        save()
    };

    self.drop = function()
    {
        self.owner = "Unsigned";
    };

    return self;

};

populatePlayerList = function()
{
    let scroll = $("#PlayerScroll");
    let players = global.activeLeague.players;
    let playerNum = players.length;
    let playerRows = Math.ceil(playerNum/3);
    let html ="";

    for(let i = 0; i < playerRows; i++)
    {
        html += "<div class = \"row\">\n";
        html+="<button class =\"btn btn-info col-sm-2 offset-sm-2\" data-toggle=\"modal\" data-target=\"#playerViewModal\" data-playNo = \""+(playerNum-1)+"\"" +
            " onclick=\"getPlayer(this.getAttribute('data-playNo'))\">\n" +
            players[playerNum-1].name +
            "</button>";
        playerNum--;

        for(let j = 0; j < 2; j++)
            if(playerNum !== 0)
            {
                html+="<button class =\"btn btn-info col-sm-2 offset-sm-1\" data-toggle=\"modal\" data-target=\"#playerViewModal\" data-playNo = \""+(playerNum-1)+"\"" +
                    " onclick=\"getPlayer(this.getAttribute('data-playNo'))\">\n" +
                    players[playerNum-1].name +
                    "</button>";
                playerNum--;
            }
        html+="</div><br>";
    }

    scroll.html(html);

};

newPlayer = function(name)
{
    global.activeLeague.players.push(Player(name, null));
    $("#newPlayerModal").modal('hide');
    $("#plName").val("");
    save();
    populatePlayerList();
};

getPlayer = function(pNo)
{
    console.log(pNo);
    let player = global.activeLeague.players[pNo];
    $("#playerViewModal").attr("data-pNo", pNo);
    $("#PlayerTitle").html(player.name);
    $("#PlayerName").html(player.name);
    if(player.owner !== "Unsigned") {
        $("#PlayerOwner").html(player.owner.name);
        $("#tradebutton").show();
        $("#dropbutton").show();
        $("#pickupbutton").hide();
    }
    else {
        $("#PlayerOwner").html(player.owner);
        $("#tradebutton").hide();
        $("#dropbutton").hide();
        $("#pickupbutton").show();
    }
    $("#PlayerScore").html(player.points);
};


editPlayerSave = function(pNo)
{
    global.activeLeague.players[pNo].name = $("#plNameEd").val();
    $('#editPlayerModal').modal('hide');
    save();
    populatePlayerList();
};

removePlayer = function(pNo)
{
    global.activeLeague.players.splice(pNo,1);
    $("#playerViewModal").modal('hide');
    save();
    populatePlayerList();
};

pickupPrep = function(pNo)
{
    $('#playerViewModal').modal('hide');
    $('#pickupPlayerModal').modal('show');
    $('#pickupPlayerModal').attr('data-pNo', pNo);

    //Add Teams to dropdown
    let teams = global.activeLeague.teams;
    let teamNumber = teams.length;
    let html = "";

    for(let i = 0; i < teams.length; i++)
    {
        html += "<option value = '" + i +"'>" + teams[i].name + "</option>\n";
    }
    $("#targetTm").html(html);
};

pEditPrep = function(pNo)
{
    $("#playerViewModal").modal('hide');
    $('#editPlayerModal').modal('show');
    $('#editPlayerModal').attr('data-pNo', pNo);
    let player = global.activeLeague.players[pNo];
    $("#plNameEd").val(player.name);

};



buildPlayer = function(name, owner, img, points, teamListOld, teamListNew) //For rebuilding a player from saved data
{
    let trueOwner = "Unsigned";
    for(let i in teamListOld)
    {
            if(JSON.stringify(owner) === JSON.stringify(teamListOld[i]))
            {
                trueOwner = teamListNew[i];
                break;
            }
    }

    let self = Player(name, img);
    self. owner = trueOwner;
    self.points = points;

    return self;
};