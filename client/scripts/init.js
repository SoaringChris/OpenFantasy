let path = "";

let socket = io();
database = new Database(socket);

let global =
    {
        //leagues:[],
        //activeLeague:null,
        players:[],
        teams:[],
        rules:[],
        trades:[],
        events:[]//,
        //activeTrade: null,
        //activePlayer: null,
        //activeRule: null,
        //activeTeam: null,
        //activeEvent: null
    };

save = function()
{
        localStorage.setItem("PreAlphaLeague", JSON.stringify(global));
};

load = function()
{
        let storedLeague = JSON.parse(localStorage.getItem("PreAlphaLeague"));
        let strdPlayers = storedLeague.players;
        let strdTeams = storedLeague.teams;
        let strdRules = storedLeague.rules;
        let strdEvents = storedLeague.events;
        let parsePlayers = [];
        let parseTeams = [];
        let parseRules = [];
        let parseEvents = [];


        //Rebuild teamlist
        for(i in strdTeams)
        {
                let curTeam = strdTeams[i];
                parseTeams.push(buildTeam(curTeam.name, curTeam.oName, curTeam.players, curTeam.points))
        }
        //Rebuild playerlist
        for(i in strdPlayers)
        {
                let curPlayer = strdPlayers[i];
                parsePlayers.push(buildPlayer(curPlayer.name, curPlayer.owner, curPlayer.img, curPlayer.points, strdTeams, parseTeams));
         }

        for(i in strdRules)
        {
                let curRule = strdRules[i];
                parseRules.push(Rule(curRule.name, curRule.description, curRule.value));
        }
        for(i in strdEvents)
        {
                let curEvent = strdEvents[i];
                parseEvents.push(buildEvent(curEvent.title, curEvent.date, curEvent.rules, curEvent.trades, curEvent.drops, curEvent.pickups, strdPlayers, parsePlayers,
                    strdRules, parseRules))
        }

        global.players = parsePlayers;
        global.teams = parseTeams;
        global.rules = parseRules;
        global.events = parseEvents;

        populatePlayerList();
        populateEventList();
        populateRuleList();
        populateTeamList();


};

cloudSave = function(league){
        database.league.save(league, function(err, l){
                if(err){
                        console.error(err);
                        return;
                }
                localStorage.setItem("Survior", l);
    });
};

let cloudLoad = function(name){
        let l = database.league.getLeague()

};

