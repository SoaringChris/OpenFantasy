Player = function(name, img)
{
    var self =
        {
            name:name,
            owner:"Unsigned",
            img:img,
            points:0
        };

    self.trade = function(newOwner)
    {
        // if(self.owner != "Unsigned")
        //     self.owner.removePlayer(self);
        // newOwner.addPlayer(self);
        self.owner = newOwner;
        $('#tradePlayerModal').modal('hide');
        save();
    };

    self.score = function(value)
    {
        self.points = Number(self.points) + Number(value);
        if(self.owner != "Unsigned")
            self.owner.points = Number(self.owner.points) + Number(value);
        save()
    };

    return self;

};

populatePlayerList = function()
{
    var scroll = document.getElementById("PlayerScroll");
    var players = global.players;
    var playerNum = players.length;
    var playerRows = Math.ceil(playerNum/3);
    var html ="";

    for(i = 0; i < playerRows; i++)
    {
        html += "<div class = \"row\">\n";
        html+="<button class =\"btn btn-info col-sm-2 offset-sm-2\" data-toggle=\"modal\" data-target=\"#playerViewModal\" data-playNo = \""+(playerNum-1)+"\"" +
            " onclick=\"getPlayer(this.getAttribute('data-playNo'))\">\n" +
            players[playerNum-1].name +
            "</button>";
        playerNum--;

        for(j = 0; j < 2; j++)
            if(playerNum != 0)
            {
                html+="<button class =\"btn btn-info col-sm-2 offset-sm-1\" data-toggle=\"modal\" data-target=\"#playerViewModal\" data-playNo = \""+(playerNum-1)+"\"" +
                    " onclick=\"getPlayer(this.getAttribute('data-playNo'))\">\n" +
                    players[playerNum-1].name +
                    "</button>";
                playerNum--;
            }
        html+="</div><br>";
    }

    scroll.innerHTML = html;

};

newPlayer = function(name)
{
    console.log(name);
    console.log(global.players);
    global.players.push(Player(name, null));
    $("#newPlayerModal").modal('hide');
    $("#plName").val("");
    save();
    populatePlayerList();
};

getPlayer = function(pNo)
{
    console.log(pNo);
    var player = global.players[pNo];
    $("#playerViewModal").attr("data-pNo", pNo);
    $("#PlayerTitle").html(player.name);
    $("#PlayerName").html(player.name);
    if(player.owner != "Unsigned")
        $("#PlayerOwner").html(player.owner.name);
    else
        $("#PlayerOwner").html(player.owner);
    $("#PlayerScore").html(player.points);
};


editPlayerSave = function(pNo)
{
    global.players[pNo].name = $("#plNameEd").val();
    $('#editPlayerModal').modal('hide');
    save();
    populatePlayerList();
}

removePlayer = function(pNo)
{
    global.players.splice(pNo,1);
    $("#playerViewModal").modal('hide');
    save();
    populatePlayerList();
};

tradePrep = function(pNo)
{
    $('#playerViewModal').modal('hide');
    $('#tradePlayerModal').modal('show');
    $('#tradePlayerModal').attr('data-pNo', pNo);

    //Add Teams to dropdown
    var teams = global.teams;
    var teamNumber = teams.length;
    var html = "";

    for(i = 0; i < teams.length; i++)
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
    var player = global.players[pNo];
    $("#plNameEd").val(player.name);

}


buildPlayer = function(name, owner, img, points, teamListOld, teamListNew) //For rebuilding a player from saved data
{
    var trueOwner = "Unsigned";
    for(i in teamListOld)
    {
            if(JSON.stringify(owner) === JSON.stringify(teamListOld[i]))
            {
                trueOwner = teamListNew[i];
                break;
            }
    }

    var self =
        {
            name:name,
            owner:trueOwner,
            img:img,
            points:points
        };

    self.trade = function(newOwner)
    {
        // if(self.owner != "Unsigned")
        //     self.owner.removePlayer(self);
        // newOwner.addPlayer(self);
        self.owner = newOwner;
        $('#tradePlayerModal').modal('hide');
        save();
    };

    self.score = function(value)
    {
        self.points = Number(self.points) + Number(value);
        if(self.owner != "Unsigned")
            self.owner.points = Number(self.owner.points) + Number(value);
        save()
    };

    return self;
};