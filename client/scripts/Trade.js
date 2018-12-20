tradeObj = function()
{
    var self ={
        id: null,
        team1: null,
        team2: null,
        points1: 0,
        points2: 0,
        players1: [],
        players2: []
    }


    self.display = function(){
        var plist1 = $("#tradeList1");
        var plist2 = $("#tradeList2");
        var olist1 = $("#tradeOffer1");
        var olist2 = $("#tradeOffer2")
        var ppoint1 = $("#pointPocket1");
        var ppoint2 = $("#pointPocket2");
        var opoint1 = $("#pointOffer1");
        var opoinr2 = $("#pointOffer2");

        var counter = 0;
        for(i in global.teams)
        {
          $("#teamSelect1").append("<option id='teamSelect1-"+ counter + "' value = '"+ counter +"'>"+global.teams[i].name +"</option>");
          $("#teamSelect2").append("<option id = 'teamSelect2-"+ counter + "' value = '"+ counter +"'>"+global.teams[i].name +"</option>");
          counter++;
        }
        if(self.team1 != null)
        {
            $("#teamSelect1").val(global.teams.indexOf(self.team1))
        }
        if(self.team2!= null)
        {
            $("#teamSelect2").val(global.teams.indexOf(self.team2))
        }

        plist1.html("");
        ppoint1.html("");
        if(self.team1 != null)
        {
            ppoint1.html(self.team1.points);

            for(i in self.team1.players)
            {
                plist1.append("<button data-playNo = '"+ global.players.indexOf(self.team1.players[i]) +"' class = \"list-group-item list-group-item-action noCorner mx-0\"><div style = \"clear: both\"><p class = 'my-0 alignleft'>"+ self.team1.players[i].name +"</p><p class = \"my-0 alignright\"><i class=\"mt-1-5 fas fa-angle-right\"></i></p></div></button>\n");
            }
        }
        else{ppoint1.html('0')}

        plist2.html("");
        ppoint2.html("");
        if(self.team2 != null)
        {
            ppoint2.html(self.team2.points);

            for(i in self.team2.players)
            {
                plist2.append("<button data-playNo = '"+ global.players.indexOf(self.team2.players[i]) +"' class = \"list-group-item list-group-item-action noCorner mx-0\"><div style = \"clear: both\"><p class = \"my-0 alignleft\"><i class=\"mt-1-5 fas fa-angle-left\"></i></p><p class = 'my-0 alignright'>"+self.team2.players[i]+"</p></div></button>\n");
            }
        }
        else{ppoint2.html('0')}

        olist2.html("");
        if(self.players2 != null)
        {
            for(i in self.players2)
            {
                olist2.append("<button data-playNo = '"+ global.players.indexOf(self.players2[i]) +"' class = \"list-group-item list-group-item-action noCorner mx-0\" onclick='undoPlayerOffer(event, 2)'><div style = \"clear: both\"><p class = \"my-0 alignleft\"><i class=\"mt-1-5 fas fa-angle-left\"></i></p><p class = 'my-0 alignright'>"+ self.players2[i].name+"</p></div></button>\n");
            }
        }

        olist1.html("");
        if(self.players1 != null)
        {
            for(i in self.players1)
            {
                olist1.append("<button data-playNo = '"+ global.players.indexOf(self.players1[i]) +"' class = \"list-group-item list-group-item-action noCorner mx-0\" onclick='undoPlayerOffer(event, 1)'><div style = \"clear: both\"><p class = 'my-0 alignleft'>"+ self.players1[i].name +"</p><p class = \"my-0 alignright\"><i class=\"mt-1-5 fas fa-angle-right\"></i></p></div></button>\n");
            }
        }

        if(self.points1 != null)
        {
            if(self.points1 != 0)
                opoint1.html(self.points1);
            $("#pointSelect2").html('<div class = "pointblock pt-3 mb-1 col"><p class = "mx-0 my-0 alignright">Points: ' + self.points1 + '</p></div>');
        }

        if(self.points2 != null)
        {
            if(self.points2 != 0)
            opoinr2.html(self.points2);
            $("#pointSelect2").html('<div class = "pointblock pt-3 mb-1 col"><p class = "mx-0 my-0 alignright">Points: ' + self.points2 + '</p></div>');
        }

    }


    return self;

}

newTradeFromPlayer = function(pNo){
    var trade = tradeObj();
    var player = global.players[pNo];
    var team = player.owner;

    trade.team1 = team;
    trade.players1.push(player);

    trade.display();

}