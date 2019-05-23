let socket = io();
database = new Database(socket);

let global =
    {
        //leagues:[],
        activeLeague:null,
        //players:[],
        //teams:[],
        //rules:[],
        //trades:[],
        //events:[]//,
        activeTrade: null,
        activePlayer: null,
        activeRule: null,
        activeTeam: null,
        activeEvent: null
    };

save = function()
{
        localStorage.setItem(global.activeLeague.name, JSON.stringify(global.activeLeague));
};

load = function(key)
{
        if(key === undefined)
        {
                key = "PreAlphaLeague";
        }
        let storedLeague = JSON.parse(localStorage.getItem(key));
        let strdPlayers = storedLeague.players;
        let strdTeams = storedLeague.teams;
        let strdRules = storedLeague.rules;
        let strdEvents = storedLeague.events;
        let parsePlayers = [];
        let parseTeams = [];
        let parseRules = [];
        let parseEvents = [];


        //Rebuild teamlist
        for(let i in strdTeams)
        {
                let curTeam = strdTeams[i];
                parseTeams.push(buildTeam(curTeam.name, curTeam.oName, curTeam.players, curTeam.points))
        }
        //Rebuild playerlist
        for(let i in strdPlayers)
        {
                let curPlayer = strdPlayers[i];
                parsePlayers.push(buildPlayer(curPlayer.name, curPlayer.owner, curPlayer.img, curPlayer.points, strdTeams, parseTeams));
         }

        for(let i in strdRules)
        {
                let curRule = strdRules[i];
                parseRules.push(Rule(curRule.name, curRule.description, curRule.value));
        }
        for(let i in strdEvents)
        {
                let curEvent = strdEvents[i];
                parseEvents.push(buildEvent(curEvent.title, curEvent.date, curEvent.rules, curEvent.trades, curEvent.drops, curEvent.pickups, strdPlayers, parsePlayers,
                    strdRules, parseRules))
        }

        global.activeLeague = League(storedLeague.name, storedLeague.description);
        global.activeLeague.players = parsePlayers;
        global.activeLeague.teams = parseTeams;
        global.activeLeague.rules = parseRules;
        global.activeLeague.events = parseEvents;

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

