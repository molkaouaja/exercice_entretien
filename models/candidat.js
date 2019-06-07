var mongoose = require('mongoose') ;
var valid = require('validator') ;

var CandidatSchema = new mongoose.Schema({
    Nom : {type : String},
    Prenom : {type : String},
    Email : {type:String , required : true , trim : true , minlength : 1 , unique : true,
        validate : {
            validator : valid.isEmail,
            message : '{VALUE} its not a valid email'
        }} ,
    Numero : {type : Number},
    Poste : ['Stage', 'StagePFE'],
    CV : {type : String},
    Message : {type : String},
    Date_inscription : {type : Date, default : Date.now()}

}) ;

module.exports.model = mongoose.model('Candidat', CandidatSchema) ;
module.exports.schema = CandidatSchema ;