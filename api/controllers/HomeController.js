/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const fs = require('fs');

module.exports = {
	getFreeBitcoin: function (req, res) {
    res.view('get_free_bitcoin');
  },

  getContent: function (req, res) {
    var str = fs.readFileSync('./assets/storage/content.txt', 'utf8');
    res.send(str);
  },

  admin: function (req, res) {
	  console.log(req.session);
    if (typeof(req.session.login) == 'undefined') {
      res.redirect('/login')
    } else {
      res.view('admin');
    }
  },

  login: function (req, res) {
	  if (req.param('username')) {
      if (req.param('username') === 'yeshi' && req.param('passwd') === 'houwa') {
        req.session.login = 'logged';
        res.redirect('admin');
      } else {
        res.view('login', {login: 'something wrong'});
      }
    } else {
      res.view('login', {login: 'okay'});
    }
  },

  content: async function (req, res) {
    var ctx = req.body.data;
    fs.writeFileSync('./assets/storage/content.txt', ctx);
    res.send('ok');
  }
};

