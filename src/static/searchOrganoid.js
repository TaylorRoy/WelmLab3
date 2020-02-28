console.log("in search")

$(document).ready(function () {
    $("#search").keyup(function () {
        searchHighlight($(this).val())
    });
});

function searchHighlight(searchText) {

    //grab values for each section of website that has text
    var welmLab = document.querySelector("#welmLab");
    var home = document.querySelector("#home");
    var research = document.querySelector("#research");
    var navbarDropdown = document.querySelector("#navbarDropdown");
    var tool1 = document.querySelector("#tool1");
    var tool2 = document.querySelector("#tool2");
    var about = document.querySelector("#about");
    var OFCTitle = document.querySelector("#OFCTitle");
    var OFCIntro = document.querySelector("#OFCIntro");
    var OFCTitle = document.querySelector("#OFCTitle");
    var OFCFunction = document.querySelector("#OFCFunction");
    var OFCRules = document.querySelector("#OFCRules");
    var OFCRule1 = document.querySelector("#OFCRule1");
    var OFCRule3 = document.querySelector("#OFCRule3");
    var input1 = document.querySelector("#inputGroupFileAddon01");
    var input2 = document.querySelector("#inputGroup-sizing-default");
    var footer = document.querySelector("#footer");

    //put into an array so you can loop through them searching for matching terms
    var domElements = [welmLab, home, research, navbarDropdown, tool1, tool2, about, OFCTitle, OFCIntro, OFCTitle, OFCFunction, OFCRules, OFCRule1, OFCRule1, OFCRule3, input1, input2, footer];
    
    //if there is a search term entered- execute code
    if (searchText) {

        //loop through all of domElements
        for (i = 0; i < domElements.length; i++) {
            
            //grab textContent from each domElement
            var elementText = domElements[i].textContent;
            
            //create a RegExp for the search term. Example /o/ig 
            var searchExp = new RegExp(searchText, "ig");
            
            //test if search term is true in element text in html
            var match = searchExp.test(elementText);
            
            //in match is true(element text contains searchExp).  Execute code.
            if (match) {
            
                //loop through all the page elements by id and highlight match.  Redefine elementText to new value.
                elementText = elementText.replace(searchExp, function (match) {
                    return "<span class ='highlight'>" + match + "</span>"
                });
                //grab id of domElement[i] which matched search
                var elementId = domElements[i].id;
                
                //use template literal to add an # infront of id text to create a useable jQuery id for a specific element of DOM.
                var elementNewText = document.querySelector(`#${elementId}`);
                
                //set elementNewText innerHTML to text with highlighted span value. 
                elementNewText.innerHTML = elementText;;
            }
            
            // loop through domElements and remove highligh class from elements which were previously highlighted if search term no longer matches an element's text.
            else {
                 //loop through all the page elements by id
                 elementText = elementText.replace(searchExp, function (match) {
                    return "<span class =''>" + match + "</span>"
                })
                
                var elementId = domElements[i].id;
                
                var elementNewText = document.querySelector(`#${elementId}`);
                
                elementNewText.innerHTML = elementText;
            }//end of else
            
        } //end of loop
        
    } //end of if searchText 

    //remove highlight if you part or all of search term from search input field.
    else {
        $(".highlight").removeClass("highlight");
    }

};//end of entire function