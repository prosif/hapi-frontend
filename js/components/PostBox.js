define(function (require) {
   "use strict";
   
   var React = require('react'),
       $ = require('jquery'),
       cookie = require('cookie');
   
   return React.createClass({
      getInitialState: function(){
         return({
	    postSearch: "",
            postData: "",
            postCategory: "",
            postCategoryResults: {},
            selectedPostCategory: "",
	    successMessage: ""
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

//     componentDidMount: function(){
        //this.getRandomFact();
//	this.getCategories();
     //},
 
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
        var postCategorySearch = this.state.postSearch,
            postData = this.state.postData,
            postCategory = this.state.postCategory,
            postCategoryResults = this.state.postCategoryResults,
            selectedPostCategory = this.state.selectedPostCategory;

       	 if(postCategoryResults[0]){ 
	    var count = 0; 
	    var postCategoryResults = postCategoryResults.map(function(category){
               if(count >= 8){
                  return;
               }
               count++;
               var selectCategory = function(e){this.handlePostCategorySelect(category)}.bind(this);
               return (<div className="box-link category-result" onClick={selectCategory}>{category.category}</div>);
            }.bind(this));
         }
         else{
            var postCategoryResults = {};
         }	
       
	if(postCategorySearch && !postCategoryResults[0]){
		var secondBox = 
		<div className="box-link" onClick={this.postNewCategory}>
		Category "{postCategorySearch}" doesn't exist in the database. You can click here to create it!
		</div>
	}
	  
	else if(this.state.selectedPostCategory){
		var secondBox = 
                  <div>
		  <input type="text" className="data-box" value={postData} onChange={this.handlePostDataChange} />
                  <a className="btn btn-default" href="#" role="button" onClick={this.handlePost}>Post!</a>
                  </div>
        }	
	else{
		var secondBox = {};
	}

         return(
	       <div className="post-box">
                  <span className="search-area">
  		  Post something about...
                  <input type="text" value={postCategorySearch} onChange={this.handlePostSearchChange} />
		  </span>
		  {postCategoryResults}
		  {secondBox}  
		  {this.state.successMessage}
               </div>
         );
      }
    });
});
