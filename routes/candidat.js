var express = require('express');
var router = express.Router();
var Candidat = require('../models/candidat');
const cloudinary = require('cloudinary');

router.get('/candidature', function(req,res) {
        res.render('Ajouter_candidature.twig') ;
})

cloudinary.config({
    cloud_name: 'pidev',
    api_key: '187685892358282',
    api_secret: 'rL27N346tuXqVQyA5sR1oDLFJag'
});

router.post('/candidature', function(req ,res){
    var candidat = new Candidat.model(req.body) ;
    const values = Object.values(req.body.CV) ;
    const promises = values.map(cv => cloudinary.v2.uploader.upload(cv.path))
    Promise
        .all(promises)
        .then(results => {
            results.forEach(e => {
                candidat.CV.push(e.secure_url);
            });
            candidat.save(function (err) {
                if (err)
                    res.send(err)
                else
                    res.redirect('/candidats') ;
            });
        })

    candidat.save(function (err) {
        if (err)
            res.send(err)
        else
            res.redirect('/candidats') ;
    });
}) ;

router.get('/candidats',function (req,res) {
    Candidat.model.find(function (err, liste_cand){
        if(err){
            res.send(err)
        }
        else {
            res.render('Afficher_candidats.twig', {liste : liste_cand}) ;
        }
    })
})

router.get('/profil/:id', function (req,res) {
    var idC = req.params.id ;
    Candidat.model.findById(idC).exec(function(err, cand){
        res.render('Details_candidat.twig', {candidat : cand})
    }) ;
})

router.get('/downloadCV',function (req,res) {

const http = require('http');
const fs = require('fs');
const file = fs.createWriteStream("file.pdf");
const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
    response.pipe(file);
})
}) ;

module.exports = router;
