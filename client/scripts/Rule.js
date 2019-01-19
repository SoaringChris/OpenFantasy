Rule = function(name, description, value)
{
    var self =
        {
            name:name,
            description:description,
            value:value
        };

        self.enact = function(player)
        {
            player.score(self.value);
            $("#enactRuleModal").modal('hide');
        };
        return self;
};

populateRuleList = function()
{
    var rules = global.rules;
    var ruleNumber = rules.length;
    var html = "";

    for(i = 0; i < rules.length; i++)
    {
        html += "<button type = button class = \"list-group-item list-group-item-action\" data-toggle=\"modal\" data-target=\"#ruleViewModal\" data-rNo = '"+i+"' + onClick='getRule(this.getAttribute(\"data-rNo\"))'>" +
            rules[i].name +"</button>\n"
    }
    $("#RuleScroll").html(html);
};

newRule = function()
{
    var name = $("#rlName").val();
    var disc = $("#rlDisc").val();
    var value = $("#rlVal").val();
    global.rules.push(Rule(name, disc, value));
    $("#newRuleModal").modal('hide');
    save();
    populateRuleList();
    $("#rlName").val("");
    $("#rlDisc").val("");
    $("#rlVal").val("");
};

getRule = function(rNo)
{
    var rule = global.rules[rNo];
    $("#ruleViewModal").attr("data-rNo",rNo);
    $("#RuleTitle").html(rule.name);
    $("#RuleDisc").html(rule.description);
    $("#RuleVal").html(rule.value);

};

rEditPrep = function(rNo)
{
    $("#ruleViewModal").modal('hide');
    $('#editRuleModal').modal('show');
    $('#editRuleModal').attr('data-rNo', rNo);
    var rule = global.rules[rNo];
    $("#rlNameEd").val(rule.name);
    $("#rlValEd").val(rule.value);
    $("#rlDiscEd").val(rule.description);

};

editRuleSave = function(rNo)
{
    global.rules[rNo]=  Rule($("#rlNameEd").val(), $("#rlDiscEd").val(), $("#rlValEd").val());
    $('#editRuleModal').modal('hide');
    save();
    populateRuleList();
};

var enactSelected = [];

enactPrep = function(rNo)
{
    $('#ruleViewModal').modal('hide');
    $('#enactRuleModal').modal('show');
    $('#enactRuleModal').attr('data-rNo', rNo);

    //Add players to dropdown
    var players = global.players;
    var playerNumber = players.length;
    var html = "";

    for(i = 0; i < players.length; i++)
    {
        html += "<div class = 'btn-group-toggle '  onclick='enactSelect(" + i + ")' data-toggle ='buttons'>";
        html += "<label class = 'btn btn-outline-success list-group-item list-group-item-action noCorner'>"
        html += "<input type = 'checkbox' checked autocomplete='off' value = '" + i +"'/>" + players[i].name + "</label>";
        html += "</div>"
    }
    $("#targetPl").append(html);
};

enactSelect = function(pNo)
{
    if(!enactSelected.includes(pNo))
    {
        enactSelected.push(pNo);
    }
    else
    {
        enactSelected.splice(enactSelected.indexOf(pNo), 1)
    }
};

enactOnSelected = function(rNo)
{
  enactSelected.forEach(function(pNo)
  {
   global.rules[rNo].enact(global.players[pNo])
  });
};

removeRule = function(rNo)
{
 global.rules.splice(rNo,1);
 $("#ruleViewModal").modal('hide');
 save();
 populateRuleList();
};
