Rule = function(name, description, value)
{
    var self =
        {
            name:name,
            description:description,
            value:value
        }

        self.enact = function(player)
        {
            player.score(self.value)
        }
}