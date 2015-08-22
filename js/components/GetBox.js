define(function (require) {
   "use strict";
   
   var React = require('react'),
       $ = require('jquery'),
       cookie = require('cookie');
   
   return React.createClass({
      getInitialState: function(){
         return({
            getSearch: "",
            getCategoryResults: {},
            getResults: {},
            selectedGetCategory: "",
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

     render: function() {
	var getCategorySearch = this.state.getSearch,
            getCategoryResults = this.state.getCategoryResults,
	    selectedGetCategory = this.state.selectedGetCategory;

        if(getCategoryResults[0]){
	    var count = 0; 
            var getCategories = getCategoryResults.map(function(category){
                if(count >= 8){
	            return;
	        }
                count++;
	        var selectCategory = function(e){this.handleGetCategorySelect(category)}.bind(this);
                return (<div className="box-link category-result" onClick={selectCategory}>{category.category}</div>);
            }.bind(this));
        }
	else{
            var getCategories = {};
        }
	 
	if(!this.state.categories || !this.state.random){
            return(<p>Loading...</p>);
        }
	
	if(this.state.getResults[0]){
	    var getResults = this.state.getResults.map(function(result){
	        return <li className="result">{result.data}</li>
	    });
	}	
	else{
	    var getResults = {};
	}	

        return(
            <div className = "get-box">
	        <span className="random-box">
                    <p>A randomly selected <span className="random-category">{this.state.random.category} item</span>: {this.state.random.data}</p>
	        </span>
                <div>
	            <span className="search-area">
		        Give me something about...
                        <input type="text" value={getCategorySearch} onChange={this.handleSearchChange} />
	            </span>
		    {getCategories}
		    {getResults}
                </div>
            </div>
         );
      }
    });
});
