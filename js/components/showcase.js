define(function (require) {
   "use strict";
   
   var React = require('react'),
       GetBox = require('components/GetBox'),
       PostBox = require('components/PostBox'),
       $ = require('jquery'),
       cookie = require('cookie');
   
   return React.createClass({
      getInitialState: function(){
         return({
            getSearch: "",
	    postSearch: "",
            postData: "",
            postCategory: "",
            getCategoryResults: {},
            postCategoryResults: {},
            getResults: {},
            selectedGetCategory: "",
            selectedPostCategory: "",
	    successMessage: ""
         });
      },

      getRandomFact: function(){
         $.ajax({
            url: '/api/items/',
            method: "GET",
            success: function(data) {
                var randomId = Math.floor(Math.random() * 10) % data.count;
		this.setState({random: data.results[randomId]});
            }.bind(this),
         });
      },
 
     handleSearchChange: function(e){
        e.preventDefault();
        this.setState({getSearch: e.target.value});
         $.ajax({
            url: '/api/categories?search=' + this.state.getSearch, 
            method: "GET",
            success: function(data) {
              this.setState({getCategoryResults: data.results});
            }.bind(this),
         });
 
     },

     componentDidMount: function(){
        this.getRandomFact();
	this.getCategories();
     },
 
     getCategories: function(){
        $.ajax({
           url: '/api/categories',
           method: 'GET',
           success: function(data){
              this.setState({categories: data})
           }.bind(this),
        });
     },

     handlePostSearchChange: function(e){
        e.preventDefault();
        this.setState({postSearch: e.target.value});
        $.ajax({
           url: '/api/categories?search=' + this.state.postSearch, 
           method: "GET",
           success: function(data) {
              this.setState({postCategoryResults: data.results});
           }.bind(this)
        });
     },

     handlePostCategorySelect: function(input){
        var regex = /[0-9]+/,
            id = regex.exec(input.url);
     	this.setState({selectedPostCategory: id[0]});
     },  

     handleGetCategorySelect: function(input){
        $.ajax({
           url: '/api/items?category='+input.category,
           method: 'GET',
           success: function(data){
	      if(!data.results[0]){
                 this.setState({getResults:[{data:"Nothing about that yet. You should post something!"}]});
	      }
	      else{
                 this.setState({getResults: data.results});
              }
              }.bind(this) 
        });
     },

     handlePostDataChange: function(e){
        e.preventDefault();
        this.setState({postData: e.target.value});
     },

     postNewCategory: function(){
        var categoryToPost = this.state.postSearch;
	console.log(categoryToPost);
	$.ajax({
		url: '/api/categories/',
		method: 'POST',
		data: JSON.stringify({'category': categoryToPost, 'explicit': 'False'}),
		success: function(data){
			console.log(data);
			this.setState({successMessage: 'Success! Once your post has been approved, it will be available in the database for the world to see.'});
		}.bind(this),	
		error: function(data){
			console.log("Broken!" + data);
		}
	});
     },

     handlePost: function(data){
        var postData = this.state.postData,
            postCategory = this.state.selectedPostCategory,
            explicit = false;
        $.ajax({
           url: '/api/items/',
           method: 'POST',
           data: JSON.stringify({'category': postCategory, 'data': postData, 'explicit': 'False'}),
	   success: function(data){
           	this.setState({successMessage: 'Success! Once your post has been approved, it will appear under the category you\'ve chosen for the world to see.'});
	   }.bind(this),
           error: function(data){
              console.log("Broken!" + data);
           }
        });
     },

     render: function() {
         return(
            <div className="row" id="showcase">
	       <GetBox />
	       <PostBox />
            </div>
         );
      }
    });
});
