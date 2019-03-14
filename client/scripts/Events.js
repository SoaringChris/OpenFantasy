Event = function(title, date)
{
    let self =
        {
            title: title,
            date: date,
            rules: [],
            //trades: [],
            //drops: [],
            //pickups: []
        };

    self.addRule = function (rule) {
      self.rules.push(rule);
    };

    self.addTrade = function(trade){
        self.trades.push(trade);
    };

    self.addDrop = function(drop){
        self.drops.push(drop);
    };

    self.addPickup = function(pickup){
        self.pickups.push(pickup);
    };

        return self;
};

eventRule = function(rule, players)
{
  self = {
      rule: rule,
      players: players
  };
  return self;
};

populateEventList = function()
{
    let scroll = $("#eventScroll");
    let events = global.activeLeague.events;
    let eventNum = events.length;
    let eventRows = Math.ceil(eventNum/3);
    let html ="";

    for(let i = 0; i < eventRows; i++)
    {
        html += "<div class = 'row'>\n";
        html+="<button class ='btn btn-info col-sm-2 offset-sm-2' data-toggle='modal' data-target='#eventViewModal'" +
            " onclick='setupEventTable("+eventNum+")'>\n" +
            events[eventNum-1].title +
            "</button>";
        eventNum--;

        for(let j = 0; j < 2; j++)
            if(eventNum !== 0)
            {
                html+="<button class ='btn btn-info col-sm-2 offset-sm-1' data-toggle='modal' data-target='#eventViewModal'" +
                    " onclick='setupEventTable("+ eventNum +")'>\n" +
                    events[eventNum-1].title +
                    "</button>";
                eventNum--;
            }
        html+="</div><br>";
    }

    scroll.html(html);
};

newEvent = function(name, date)
{
    global.activeLeague.events.push(Event(name, date));
    $("#newEventName").val("");
    $("#newEventDate").val("");
    save();
    populateEventList();
};

buildEvent = function(title, date, rules, trades, drops, pickups, playerlistold, playerlistnew, rulelistold, rulelistnew)
{

    let newRules = [];
    rules.forEach(function (rule) {
        let newRule;
        for(let oldRule of rulelistold)
        {
            if(JSON.stringify(rule.rule) === JSON.stringify(oldRule))
            {
                let index = rulelistold.indexOf(oldRule);
                newRule = (rulelistnew[index]);
                break;
            }
        }
        let newPlayers = [];
        rule.players.forEach(function(player) {
           for(let oldPlayer of playerlistold)
           {
               if(JSON.stringify(player) === JSON.stringify(oldPlayer))
               {
                   let index = playerlistold.indexOf(oldPlayer);
                   newPlayers.push(playerlistnew[index]);
                   break;
               }
           }
        });
        newRules.push(eventRule(newRule, newPlayers));
    });

  let self = Event(title, date);
  self.rules = newRules;
  self.trades = trades;
  self.drops = drops;
  self.pickups = pickups;

  return self;
};

let selectedEvent;

setupEventTable = function(event)
{
    selectedEvent = global.activeLeague.events[event-1];
    $("#eventTableName").html(selectedEvent.title);
    $("#EventsHome").toggle(false);
    $("#EventsTableView").toggle(true);
    let headers = "<tr><th scope='col'></th>";
    global.activeLeague.rules.forEach(function(rule)
    {
     headers +="<th scope='col'>" + rule.name + "</th>";
    });
    $("#EventHeaders").html(headers);
    let body;
    global.activeLeague.players.forEach(function(player){
        body += "<tr><th scope='row'>" + player.name + "</th>";
        global.activeLeague.rules.forEach(function (rule) {
            body += "<td>";
            let value = 0;
            selectedEvent.rules.forEach(function(eventRule)
            {
                if(rule === eventRule.rule && eventRule.players.includes(player))
                {
                    value += parseInt(rule.value);
                }
            });
            body += value;
            body += "</td>"
        });
        $("#EventBody").html(body);
    })
};

ReturnHome = function()
{
  $("#EventsTableView").toggle(false);
  $("#EventsHome").toggle(true);
};

EventEnactPrep = function()
{
    EventEnactSelected = [];
    $("#EventEnactRules").html("<option selected>Select a Rule</option>");
  global.activeLeague.rules.forEach(function(rule, i){
     $("#EventEnactRules").append("<option data-rNo = '"+ i +"'>" + rule.name + "</option>")
  });
  let html = "";
  global.activeLeague.players.forEach(function(player,i){
      html += "<div class = 'btn-group-toggle '  onclick='EventEnactSelect(global.activeLeague.players[" + i + "])' data-toggle ='buttons'>";
      html += "<label class = 'btn btn-outline-success list-group-item list-group-item-action noCorner'>";
      html += "<input type = 'checkbox' checked autocomplete='off' value = '" + i +"'/>" + global.activeLeague.players[i].name + "</label>";
      html += "</div>"
  });
    $("#EventEnactTargetPl").html(html);

};

let EventEnactSelected = [];

 EventEnactSelect = function(player) {
    if (!EventEnactSelected.includes(player)) {
        EventEnactSelected.push(player);
    }
    else {
        EventEnactSelected.splice(EventEnactSelected.indexOf(player), 1);
    }
};

  EventEnactOnSelected = function()
  {
      let playerlist = [];
      if(EventSelectedRule === undefined)
      {
          alert("Select a rule to enact.");
          return;
      }
      EventEnactSelected.forEach(function (player) {
          EventSelectedRule.enact(player);
          playerlist.push(player);
      });
      selectedEvent.rules.push(eventRule(EventSelectedRule, playerlist));
      setupEventTable(global.activeLeague.events.indexOf(selectedEvent)+1);

  };

  let EventSelectedRule;

  EventEnactRuleChange = function(event)
  {
      let i = $("#EventEnactRules option:selected").attr("data-rNo");
      EventSelectedRule = global.activeLeague.rules[i];
  };