Player = function(name, img)
{
    var self =
        {
            name:name,
            owner:"Unsigned",
            img:img
        };

    self.trade = function(newOwner)
    {
        if(self.owner != "Unsigned")
            self.owner.removePlayer(self);
        newOwner.addPlayer(self);
        self.owner = newOwner;
    }

    self.score = function(value)
    {
        if(self.owner != "Unsigned")
            self.owner.points += value;
    }

    return self;

}