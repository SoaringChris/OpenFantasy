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
        let strdLTeams = storedLeague.leagueTeams;
        let parsePlayers = [];
        let parseTeams = [];
        let parseRules = [];
        let parseEvents = [];
        let parseLTeams = [];


        //Rebuild teamlist
        for(let i in strdTeams)
        {
                let curTeam = strdTeams[i];
                parseTeams.push(buildTeam(curTeam.name, curTeam.oName, curTeam.players, curTeam.points))
        }

        for(let i in strdLTeams){
                let curLTeam = strdLTeams[i];
                parseLTeams.push(LeagueTeam(curLTeam.name, curLTeam.color));
        }

        //Rebuild playerlist
        for(let i in strdPlayers)
        {
                let curPlayer = strdPlayers[i];
                parsePlayers.push(buildPlayer(curPlayer.name, curPlayer.owner, curPlayer.img, curPlayer.points, curPlayer.team, strdTeams, parseTeams, strdLTeams, parseLTeams));
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
        global.activeLeague.leagueTeams = parseLTeams;

        populatePlayerList();
        populateEventList();
        populateRuleList();
        populateTeamList();


};
loadColorPicker = function(){
AColorPicker.from('.picker')
    .on('change', (picker, color) => {
        $('#teamColorButton').css('background-color', color);
        //$('#editTeamColorButton').css('background-color', color);
    });
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

getAccentColor = function(color){
  if(lightOrDark(color) === 'light')
  {
      return 'black'
  }
  else{
      return 'white'
  }
};
