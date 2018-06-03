Team = function(name, oName, points)
    {
        var self =
            {
                name:name,
                oName:oName,
                players:[],
                points:points
            };

        self.addPlayer = function(player)
        {
            self.players.push(player);
        };

        self.removePlayer = function(player)
        {
            for(i in self.players)
            {
                if(self.players[i] === player)
                    self.players.splice(i, 0)
            }
        };

        return self;
    };

populateTeamList = function()
{
    var teams = global.teams;
    var teamNumber = teams.length;
    var html = "";

    for(i = 0; i < teams.length; i++)
    {
        html += "<button type = button class = \"list-group-item list-group-item-action\" data-toggle=\"modal\" data-target=\"#teamViewModal\" data-tNo = '"+i+"' + onClick='getTeam(this.getAttribute(\"data-tNo\"))'>" +
            teams[i].name +"</button>\n"
    }

    $("#TeamScroll").html(html);
};

newTeam = function()
{
    var tName = $("#tmName").val();
    var oName = $("#owName").val();
    var score = $("#tmScore").val();
    global.teams.push(Team(tName, oName, score));
    $("#newTeamModal").modal('hide');
    populateTeamList();
    $('#tmName').val("");
    $('#tmScore').val('');
    $('#owName').val("");
};

getTeam = function(tNo)
{
    var teams = global.teams;
    $("#teamViewModal").attr("data-tNo", tNo);
    $("#TeamTitle").html(teams[tNo].name);
    $("#TeamName").html(teams[tNo].name);
    $("#TeamOwner").html(teams[tNo].oName);
    $("#TeamScore").html(teams[tNo].points)
}

removeTeam = function (tNo)
{
    global.teams.splice(tNo,1);
    $("#teamViewModal").modal('hide');
    populateTeamList()
}