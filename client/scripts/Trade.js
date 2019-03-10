tradeObj = function()
{
    let self ={
        id: null,
        team1: null,
        team2: null,
        points1: 0,
        points2: 0,
        players1: [],
        players2: [],
        oPoints1: 0,
        oPoints2: 0
    };


    self.display = function(){
        let plist1 = $("#tradeList1");
        let plist2 = $("#tradeList2");
        let olist1 = $("#tradeOffer1");
        let olist2 = $("#tradeOffer2");
        let ppoint1 = $("#pointPocket1");
        let ppoint2 = $("#pointPocket2");
        let opoint1 = $("#pointOffer1");
        let opoint2 = $("#pointOffer2");

        global.activeTrade = self;

        let counter = 0;
        $("#teamSelect1").html("<option selected id = \"teamSelect1-Generic\">Select the First Team...</option>\n");
        $("#teamSelect2").html("<option selected id = \"teamSelect1-Generic\">Select the Second Team...</option>\n");
        for(let i in global.activeLeague.teams)
        {
          $("#teamSelect1").append("<option data-teamNo = \""+ i +"\" id='teamSelect1-"+ counter + "' value = '"+ counter +"'>"+global.activeLeague.teams[i].name +"</option>");
          $("#teamSelect2").append("<option data-teamNo = \""+ i +"\" id = 'teamSelect2-"+ counter + "' value = '"+ counter +"'>"+global.activeLeague.teams[i].name +"</option>");
          counter++;
        }
        if(self.team1 != null)
        {
            $("#teamSelect1").val(global.activeLeague.teams.indexOf(self.team1))
        }
        if(self.team2!= null)
        {
            $("#teamSelect2").val(global.activeLeague.teams.indexOf(self.team2))
        }

        plist1.html("");
        ppoint1.html("");
        if(self.team1 != null)
        {
            ppoint1.html(self.team1.points);
            $("#pointSelect1").attr("max",self.team1.points);

            self.team1.players().forEach(function (player, i) {
                if(!self.players1.includes(player)) {
                    plist1.append("<button data-playNo = '" + global.activeLeague.players.indexOf(self.team1.players()[i]) + "' class = \"list-group-item list-group-item-action noCorner mx-0\" onclick='offerPlayer(event, 1)'><div style = \"clear: both\"><p class = 'my-0 alignleft'>" + self.team1.players()[i].name + "</p><p class = \"my-0 alignright\"><i class=\"mt-1-5 fas fa-angle-right\"></i></p></div></button>\n");
                }
            });
        }
        else{ppoint1.html('0')}

        plist2.html("");
        ppoint2.html("");
        if(self.team2 != null)
        {
            ppoint2.html(self.team2.points);
            $("#pointSelect2").attr("max",self.team2.points);


            self.team2.players().forEach(function (player, i)
            {
                if(!self.players2.includes(player)) {
                    plist2.append("<button data-playNo = '" + global.activeLeague.players.indexOf(self.team2.players()[i]) + "' class = \"list-group-item list-group-item-action noCorner mx-0\" onclick='offerPlayer(event, 2)'><div style = \"clear: both\"><p class = \"my-0 alignleft\"><i class=\"mt-1-5 fas fa-angle-left\"></i></p><p class = 'my-0 alignright'>" + self.team2.players()[i].name + "</p></div></button>\n");
                }
            });
        }
        else{ppoint2.html('0')}

        olist2.html("");
        if(self.players2 != null)
        {
            for(let i in self.players2)
            {
                olist2.append("<button data-playNo = '"+ global.activeLeague.players.indexOf(self.players2[i]) +"' class = \"list-group-item list-group-item-action noCorner mx-0\" onclick='undoPlayerOffer(event, 2)'><div style = \"clear: both\"><p class = \"my-0 alignright\"><i class=\"mt-1-5 fas fa-angle-right\"></i></p><p class = 'my-0 alignleft'>"+ self.players2[i].name+"</p></div></button>\n");
            }
        }

        olist1.html("");
        if(self.players1 != null)
        {
            for(let i in self.players1)
            {
                olist1.append("<button data-playNo = '"+ global.activeLeague.players.indexOf(self.players1[i]) +"' class = \"list-group-item list-group-item-action noCorner mx-0\" onclick='undoPlayerOffer(event, 1)'><div style = \"clear: both\"><p class = \"my-0 alignleft\"><i class=\"mt-1-5 fas fa-angle-left\"></i></p><p class = 'my-0 alignright'>"+self.players1[i].name+"</p></div></button>\n");
            }
        }

        if(self.points1 != null)
        {
            if(self.points1 !== 0)
                opoint1.html(self.points1);
            $("#pointSelect1").html('<div class = "pointblock pt-3 mb-1 col"><p class = "mx-0 my-0 alignright">Points: ' + parseInt(self.points1,10) + '</p></div>');
        }

        if(self.points2 != null)
        {
            if(self.points2 !== 0)
            opoint2.html(self.points2);
            $("#pointSelect2").html('<div class = "pointblock pt-3 mb-1 col"><p class = "mx-0 my-0 alignright">Points: ' + parseInt(self.points2,10) + '</p></div>');
        }

    };

    self.complete = function() {
        self.players1.forEach(function (player) {
            {
                player.owner = self.team2;
            }
        });

        self.players2.forEach(function (player) {
            {
                player.owner = self.team1;
            }
        });

        self.team1.points -= self.oPoints1;
        self.team2.points -= self.oPoints2;
        self.team1.points += self.oPoints1;
        self.team2.points += self.oPoints1;

        save();
        $("#TradeModal").modal("hide");
    };


    return self;

};

newTradeFromPlayer = function(pNo){
    let trade = tradeObj();
    let player = global.activeLeague.players[pNo];
    let team = player.owner;

    trade.team1 = team;
    trade.players1.push(player);

    trade.display();

};