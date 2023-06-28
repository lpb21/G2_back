//const { dataDealerMsSQL } = require("../models/dealer");

const headerMenu = async (req, res) => {
    try {
      const menuHeader = {
        pushmenuLink : "http://newep.lge.com/portal/main/portalMain.do",
        homeText : "Home",
        homeLink : "index.html",
        contactText : "Contact",
        contactLink : "#",
        lgPortalText : "LG Portal",
        lgPortalLink : "http://newep.lge.com/portal/main/portalMain.do"
      };


        const resultDataMenu = {
            data: menuHeader
        }
        for (let i in menuHeader) {
            //console.log(i + ': ' + menuHeader[i]);
          }
      return res.send(resultDataMenu);
    } catch (err) {
      res.status(400).send({
        mns: err.message
      })
    } 
  };
  
  module.exports = {
    headerMenu,
  };