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
        if(self.owner != "Unsigned")
            self.owner.removePlayer(self);
        newOwner.addPlayer(self);
        self.owner = newOwner;
        save();
    };

    self.score = function(value)
    {
        self.points += value;
        if(self.owner != "Unsigned")
            self.owner.points += value;
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
        html+="<button class =\"btn btn-info col-sm-2 col-sm-offset-2\" data-toggle=\"modal\" data-target=\"#playerViewModal\" data-playNo = \""+(playerNum-1)+"\"" +
            " onclick=\"getPlayer(this.getAttribute('data-playNo'))\">\n" +
            players[playerNum-1].name +
            "</button>";
        playerNum--;

        for(j = 0; j < 2; j++)
            if(playerNum != 0)
            {
                html+="<button class =\"btn btn-info col-sm-2 col-sm-offset-1\" data-toggle=\"modal\" data-target=\"#playerViewModal\" data-playNo = \""+(playerNum-1)+"\"" +
                    " onclick='getPlayer(this.getAttribute('data-playNo'))'>\n" +
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
    $("#PlayerOwner").html(player.owner);
    $("#PlayerScore").html(player.points);
};

removePlayer = function(pNo)
{
    global.players.splice(pNo,1);
    $("#playerViewModal").modal('hide');
    save();
    populatePlayerList();
};

buildPlayer = function(name, owner, img, points) //For rebuilding a player from saved data
{
    var self =
        {
            name:name,
            owner:owner,
            img:img,
            points:points
        };

    self.trade = function(newOwner)
    {
        if(self.owner != "Unsigned")
            self.owner.removePlayer(self);
        newOwner.addPlayer(self);
        self.owner = newOwner;
        save();
    };

    self.score = function(value)
    {
        self.points += value;
        if(self.owner != "Unsigned")
            self.owner.points += value;
        save()
    };

    return self;
};