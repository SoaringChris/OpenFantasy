var global =
    {
        //leagues:[],
        //activeLeague:null,
        players:[],
        teams:[],
        rules:[]
    };

save = function()
{
        localStorage.setItem("PreAlphaLeague", JSON.stringify(global));
};

load = function()
{
        var storedLeague = JSON.parse(localStorage.getItem("PreAlphaLeague"));
        var strdPlayers = storedLeague.players;
        var strdTeams = storedLeague.teams;
        var strdRules = storedLeague.rules;
        var parsePlayers = [];
        var parseTeams = [];
        var parseRules = [];



        //Rebuild teamlist
        for(i in strdTeams)
        {
                var curTeam = strdTeams[i];
                parseTeams.push(buildTeam(curTeam.name, curTeam.oName, curTeam.players, curTeam.points))
        }
        //Rebuild playerlist
        for(i in strdPlayers)
        {
                var curPlayer = strdPlayers[i];
                parsePlayers.push(buildPlayer(curPlayer.name, curPlayer.owner, curPlayer.img, curPlayer.points, strdTeams, parseTeams));
         }

        for(i in strdRules)
        {
                var curRule = strdRules[i];
                parseRules.push(Rule(curRule.name, curRule.description, curRule.value));
        }

        global.players = parsePlayers;
        global.teams = parseTeams;
        global.rules = parseRules;


};

