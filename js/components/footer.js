define(function (require) {
   "use strict";
   
   var React = require('react');

   return React.createClass({

      render: function(){
         return(
            <div id="footer">
               Copyright {String.fromCharCode(169)} 2015 Joseph Garcia
            </div>
         );
      }

   });

});
