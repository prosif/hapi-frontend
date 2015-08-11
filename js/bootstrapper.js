define (function(require) {
   'use strict';

   var $ = require('jquery'),
       _ = require('underscore'),
       React = require('react'),
       Front = require('components/front');

   return{
      run: function(){
         $(document).ready(function(){
            React.render(Front(), document.getElementById('page'));         
         });
      }
   }
});
