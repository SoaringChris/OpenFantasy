Team = function(name, oName, points)
    {
        let self =
            {
                name:name,
                oName:oName,
                //players:[],
                points:points
            };

        // self.addPlayer = function(player)
        // {
        //     self.players.push(player);
        //     save();
        // };
        //
        // self.removePlayer = function(player)
        // {
        //     for(i in self.players)
        //     {
        //         if(self.players[i] === player)
        //         {
        //             self.players.splice(i, 0);
        //             self.players[i].owner = "Unsigned";
        //             save();
        //         }
        //     }
        // };

        self.players = function () {
            let array = [];
            for(let i in global.activeLeague.players)
            {
                if(global.activeLeague.players[i].owner === self) {
                    array.push(global.activeLeague.players[i])
                }
            }
            return array;
        };

        return self;
    };

populateTeamList = function()
{
    let teams = global.activeLeague.teams;
    let teamNumber = teams.length;
    let html = "";

    for(let i = 0; i < teams.length; i++)
    {
        html += "<button type = button class = \"list-group-item list-group-item-action\" data-toggle=\"modal\" data-target=\"#teamViewModal\" data-tNo = '"+i+"' + onClick='getTeam(this.getAttribute(\"data-tNo\"))'>" +
            teams[i].name +"</button>\n"
    }

    $("#TeamScroll").html(html);
};

newTeam = function()
{
    let tName = $("#tmName").val();
    let oName = $("#owName").val();
    let points = $("#tmpoints").val();
    if(points === undefined || points == null || points === "")
        points = 0;
    global.activeLeague.teams.push(Team(tName, oName, points));
    save();
    $("#newTeamModal").modal('hide');
    populateTeamList();
    $('#tmName').val("");
    $('#tmpoints').val('');
    $('#owName').val("");
};

getTeam = function(tNo)
{
    let teams = global.activeLeague.teams;
    $("#teamViewModal").attr("data-tNo", tNo);
    $("#TeamTitle").html(teams[tNo].name);
    $("#TeamName").html(teams[tNo].name);
    $("#TeamOwner").html(teams[tNo].oName);
    $("#TeamScore").html(teams[tNo].points)
};

tEditPrep = function(tNo)
{
    $("#teamViewModal").modal('hide');
    $('#editTeamModal').modal('show');
    $('#editTeamModal').attr('data-tNo', tNo);
    let team = global.activeLeague.teams[tNo];
    $("#tmNameEd").val(team.name);
    $("#owNameEd").val(team.oName);
    $("#tmScoreEd").val(team.points);

};

editTeamSave = function(tNo)
{
    global.activeLeague.teams[tNo]=  Team($("#tmNameEd").val(), $("#owNameEd").val(), $("#tmScoreEd").val());
    $('#editTeamModal').modal('hide');
    save();
    populateTeamList();
};

removeTeam = function (tNo)
{
    global.activeLeague.teams.splice(tNo,1);
    $("#teamViewModal").modal('hide');
    save();
    populateTeamList()
};

buildTeam = function(name, oName, players, points, playerListOld, playerListNew)
{

    // let playerListFinal = [];
    // for(i in players)
    // {
    //     for(j in playerListOld)
    //     {
    //         if(players[i] === playerListOld[j])
    //         {
    //             playerListFinal.push(playerListNew[j]);
    //             break;
    //         }
    //     }
    // }
    console.log(points);
    if(points === undefined || points == null || points === "")
        points = 0;

    let self = Team(name, oName, points);

    // self.addPlayer = function(player)
    // {
    //     self.players.push(player);
    //     save();
    // };
    //
    // self.removePlayer = function(player)
    // {
    //     for(i in self.players)
    //     {
    //         if(self.players[i] === player)
    //         {
    //             self.players.splice(i, 0);
    //             self.players[i].owner = "Unsigned";
    //             save();
    //         }
    //     }
    // };

    return self;
};