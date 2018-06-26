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
        html += "<option value = '" + i +"'>" + players[i].name + "</option>\n";
    }
    $("#targetPl").append(html);
};

removeRule = function(rNo)
{
 global.rules.splice(rNo,1);
 $("#ruleViewModal").modal('hide');
 save();
 populateRuleList();
};
