let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PlayerSchema = new Schema({
    name: String,
    owner: Schema.Types.Mixed,
    img: {Type: String, "default": ""},
    points: Number
});

let TeamSchema = new Schema({
    name: String,
    oName: String,
    points: Number
});

let RuleSchema = new Schema({
    name: String,
    description: String,
    value: Number
});

let EventRuleSchema = new Schema({
    rule: RuleSchema,
    players: [PlayerSchema]
});

let EventSchema = new Schema({
    title: String,
    date: Date,
    rules: [EventRuleSchema]
});

let LeagueSchema = new Schema({
    //name: String,
    //description: String,
    teams: [TeamSchema],
    players: [PlayerSchema],
    events: [EventSchema],
    rules: [RuleSchema]
});

let leagueModel = new mongoose.model('league', LeagueSchema);

exports.saveLeague = (league) => {
    console.log("how far will I go" + league.toString());
    let test = leagueModel.create(league);
    //let _league = leagueModel(league);
    //let test = _league.save(function (err, book) {
        //if (err) return console.error(err);
        //console.log(book.name + " saved to bookstore collection.");
    //});
    return test;
};

exports.updateLeague = (league) => {
    return leagueModel.findOneAndUpdate({
        name: league.name
    }, league, {new: true});
};

exports.loadLeague = (name) => {
    return leagueModel.findOne({name: name});
};

