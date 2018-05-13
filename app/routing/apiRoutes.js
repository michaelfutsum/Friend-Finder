var path = require('path');

// Import the list of friend entries
var friends = require('../data/friends.js');

// Exporting the API route
module.exports = function (app) {
    // All the friends 
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    // Adding a new friend
    app.post('/api/friends', function (req, res) {

        // Input given
        var userInput = req.body;

        var userResponses = userInput.scores;

        var matchName = '';
        var matchImage = '';
        var totalDifference = 80; // 

        // All of the friends on the list
        for (var i = 0; i < friends.length; i++) {
            // Compute differenes for each question
            var diff = 0;
            for (var j = 0; j < userResponses.length; j++) {
                diff += Math.abs(friends[i].scores[j] - userResponses[j]);
            }

            // If lowest difference, record the friend match
            if (diff < totalDifference) {
                totalDifference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        res.json({ status: 'OK',
                 matchName: matchName,
                matchImage: matchImage });
        
        // Adding a new user
        friends.push(userInput);
    });
};

