League = function(name, discription)
{
    var self =
        {
            name:name,
            discription:discription,
            teams:[],
            players:[]
        };

    self.addTeam = function(name)
    {
        self.teams.push(Team(name));
    }

    self.addPlayer = function(name, img)
    {
        self.players.push(Player(name, img))
    }

    return self;
}