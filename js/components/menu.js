define(function (require) {
   "use strict";
   
   var React = require('react');

   return React.createClass({

      render: function() {

      return(      
            <div id="top" className="row">
               <div id = "logo" className="col-md-6">
                  <img src = "static/site/images/logo.gif"></img>
                  <h1>HAPI</h1>
               </div>
               <div id = "menu-container" className="col-md-6">
                     <a href='/about-me.html' className="menu-button">About Me</a>
                     <a href='/api' className="menu-button">View the API</a>
                     <a href='http://github.com/prosif' className="menu-button" target='_blank'>Check out my Github</a>
               </div>
            </div>
         );

      }

   });

});
  
