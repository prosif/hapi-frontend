define (function(require) {
   'use strict';

   var Menu = require('components/menu'),
       Showcase = require('components/showcase'),
       About = require('components/about'),
       Footer = require('components/footer'),
       React = require('react');

   return React.createClass({

      render: function() {
         return(
         <div id = "home">
            <Menu />
            <Showcase />
            <About />
            <Footer />
         </div>
        );
      }

   });

});
