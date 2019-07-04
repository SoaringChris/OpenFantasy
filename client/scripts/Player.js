Player = function(name, team, img)
{
    let self =
        {
            name:name,
            owner:"Unsigned",
            team: "N/A",
            img: img,
            points: 0
        };
    if(team != null){
        self.team = team;
    }

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
        let color = '#218838';
        let border = 'transparent';
        if(players[playerNum-1].team !== 'N/A'){
            color = players[playerNum-1].team.color;
            if(lightOrDark(color) === 'light'){
                border = 'black';
            }
        }
        let textColor = getAccentColor(color);

        html+="<button class =\"btn btn-info col-sm-2 offset-sm-2\" style = 'border-color: "+ border +"; background-color: "+ color +"; color: "+ textColor +";' data-toggle=\"modal\" data-target=\"#playerViewModal\" data-playNo = \""+(playerNum-1)+"\"" +
            " onclick=\"getPlayer(this.getAttribute('data-playNo'))\">\n" +
            players[playerNum-1].name +
            "</button>";
        playerNum--;

        for(let j = 0; j < 2; j++)
            if(playerNum !== 0)
            {
                color = '#218838';
                textColor = 'white';
                border = 'transparent';
                if(players[playerNum-1].team !== 'N/A'){
                    color = players[playerNum-1].team.color;
                    if(lightOrDark(color) === 'light'){
                        textColor = 'black';
                        border = 'black';
                    }
                }

                html+="<button class =\"btn btn-info col-sm-2 offset-sm-1\" style = 'border-color: + "+ border + "; background-color: "+ color +"; color: "+ textColor +";' data-toggle=\"modal\" data-target=\"#playerViewModal\" data-playNo = \""+(playerNum-1)+"\"" +
                    " onclick=\"getPlayer(this.getAttribute('data-playNo'))\">\n" +
                    players[playerNum-1].name +
                    "</button>";
                playerNum--;
            }
        html+="</div><br>";
    }

    scroll.html(html);

};

newPlayer = function(name, team)
{
    global.activeLeague.players.push(Player(name, team, null));
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
    global.activeLeague.players[pNo].team = global.activeLeague.leagueTeams[$("#plLTeamEd").val()];
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

newPlayerPrep = function()
{
    $("#plName").val("");
    let html = "<option class='outlinedText' value = '-1'>Select a team from the list</option>";
    global.activeLeague.leagueTeams.forEach(function(team, i){
        html += "<option class='outlinedText' value = '" + i + "' style = 'color: "+ team.color + ";' background-color: '" + getAccentColor(team.color) + ";'>" + team.name + "</option>\n";
    });
    $("#plLTeam").html(html)
};

pEditPrep = function(pNo)
{
    $("#playerViewModal").modal('hide');
    $('#editPlayerModal').modal('show');
    $('#editPlayerModal').attr('data-pNo', pNo);
    let player = global.activeLeague.players[pNo];
    $("#plNameEd").val(player.name);
    let html = "<option class='outlinedText' value = '-1'>Select a team from the list</option>\n";
    global.activeLeague.leagueTeams.forEach(function(team, i){
        html += "<option class='outlinedText'  value = '" + i + "' style = 'color: "+ team.color + "; background-color: "+ getAccentColor(team.color) +";'>" + team.name + "</option>\n";
    });
    $("#plLTeamEd").html(html);
    $("#plLTeamEd").val(global.activeLeague.leagueTeams.indexOf(player.team));

};



buildPlayer = function(name, owner, img, points, team, teamListOld, teamListNew, lTeamListOld, lTeamListNew) //For rebuilding a player from saved data
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
    let trueTeam = null;
    for(let i in lTeamListOld){
        if(JSON.stringify(team) === JSON.stringify(lTeamListOld[i])){
            trueTeam = lTeamListNew[i];
        }
    }

    let self = Player(name, trueTeam, img);
    self. owner = trueOwner;
    self.points = points;

    return self;
};

LeagueTeam = function(name, color)
{
    self = {
        name: name,
        color: color
    };
    return self
};

saveLTeam = function (name, color) {
    global.activeLeague.leagueTeams.push(LeagueTeam(name, color));
    save();
};

orderPlayers = function(type){
    if(type === 'LTeam'){
        return function(a, b){
            if(a.team === 'N/A')
            {
                if(b.team === 'N/A'){
                    return 0;
                }
                else{
                    return -1;
                }
            }
            if(b.team === 'N/A'){
                return 1;
            }
            let A = a.team.name.toUpperCase();
            let B = b.team.name.toUpperCase();
            if(A < B){
                return -1;
            }
            if(A > B){
                return 1;
            }
            else{
                return 0;
            }
        }
    }
    if(type === 'Owner'){
        return function(a, b){
            if(a.owner === 'Unsigned'){
                if(b.owner === 'Unsigned'){
                    return 0;
                }
                else{
                    return -1;
                }
            }
            if(b.owner === 'Unsigned'){
                return 1;
            }
            let A = a.owner.name.toUpperCase();
            let B = b.owner.name.toUpperCase();
            if(A < B){
                return -1
            }
            if(A > B){
                return 1
            }
            else{
                return 0
            }
        }
    }
};