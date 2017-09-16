var valid = true;

function ModelView () {
    var self = this;
	
	self.visibleRandomQuoteBlock = ko.computed(function() {
		var randomQuoteText = document.getElementById('randomQuoteText').innerHTML;
		var hasText = (randomQuoteText == "") ? 0 : 1;
		return hasText;
	});
	
	self.quotesArray = ko.observableArray([
        {	quoteAuthor: "Neil Alden Armstrong", 
			quoteLink: "https://en.wikiquote.org/wiki/Neil_Armstrong", 
			quoteText: "That's one small step for man, one giant leap for mankind."
		}
    ]);
	
	self.getQuote = function() {
		$.ajax(
        {
			dataType : "jsonp",
			jsonp : "jsonp",
			
			url : "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en",
			error : function(data) {
					alert("Error - 2");
			},
			success : function(response){
				$(".list-group").removeClass("hidden");
				document.getElementById('randomQuoteText').innerHTML = response.quoteText;
				document.getElementById('randomQuoteAuthor').innerHTML = response.quoteAuthor;
				document.getElementById('randomQuoteLink').href = response.quoteLink;
				document.getElementById('randomQuoteLink').innerHTML = "Link";
				document.getElementById('randomQuoteLink').target = "_blank";
			}
		});
	}

	self.addQuote = function() {
		quote = {
			quoteText: document.getElementById('randomQuoteText').innerHTML, 
			quoteAuthor: document.getElementById('randomQuoteAuthor').innerHTML, 
			quoteLink: document.getElementById('randomQuoteLink').href
		};
		self.repeatTest(quote.quoteLink);
		if (valid === false) {return};
  		self.quotesArray.push(new self.newQuote(quote));
	}
	
	self.newQuote = function(item){
		var self = this;
		
		self.quoteAuthor = item.quoteAuthor;
		self.quoteLink = item.quoteLink;
		self.quoteText = item.quoteText;
	}

   	self.repeatTest = function(x) {
		var array = self.quotesArray();
		for(var i = 0; i<array.length; i++)	{
			if(array[i].quoteLink === x) {
				valid = false;
				alert('This quote has already been added to Favourites');
				break;
			}
			else {
				valid = true;
			}
		}	
	} 
  }

ko.applyBindings(new ModelView());