Team = function(name)
    {
        var self =
            {
                name:name,
                players:[],
                points:0
            };

        self.addPlayer = function(player)
        {
            self.players.push(player);
        }

        self.removePlayer = function(player)
        {
            for(i in self.players)
            {
                if(self.players[i] === player)
                    self.players.splice(i, 0)
            }
        }

        return self;
    }