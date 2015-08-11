define(function (require) {
   "use strict";
   
   var React = require('react');

   return React.createClass({

      render: function() {

         return(
            <div className="row" id="description">
               <p> Hey! Welcome to HAPI! This site serves as a showcase for a publicly accessible API full of stuff that makes people happy. That means jokes, cool facts, something that happened today that made you smile, or whatever else you like. This API will (hopefully) be used by developers for the websites or apps however they see fit. 
               </p>

               <p>Anybody can anonymously create a category or an item belonging to a category which will then be submitted for approval. Once the category/item is approved, it will be viewable in the <a href="/api" target="_blank">browsable API</a> for others to see. 
               </p>

               <p>This started because I made a command line tool called "motivate" where the idea was you're doing stuff on the command line and you get frustrated or tired or whatever so you type "motivate" and it spits out an inspirational quote that was funny or something. Then I thought it'd be cool if I could use an API that had a bunch of stuff I could just pull from instead of hardcoding my own quotes. The only thing I found was a Chuck Norris joke API which made me really sad so I thought I'd make my own.
               </p>
	 
               <p>
	          If you have any questions or comments, or if you just want to say hello, you can contact me at hapijoseph@gmail.com.
	       </p>

		<p>You may have noticed the site doesn't look that great. I'm not really a designer and have no idea how to make things look good but if you do and would like to help me out, please let me know!</p>
            </div>
         );
      }
   });
});
