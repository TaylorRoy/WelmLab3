
$(document).ready(function () {
    $("#search").keyup(function () {
        searchHighlight($(this).val());
        searchCaret($(this).val());
        searchList($(this).val());
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
    var samples = document.querySelector("#samples");
    var about = document.querySelector("#about");
    var OFCTitle = document.querySelector("#OFCTitle");
    var footer = document.querySelector("#footer");

    //put into an array so you can loop through them searching for matching terms
    var domElements = [welmLab, home, research, navbarDropdown, tool1, tool2, samples, about, OFCTitle, footer]
    console.log(domElements)
    //if there is a search term entered- execute code

    // loop through all elements with class caret
    if (searchText) {


        //loop through all of domElements
        for (i = 0; i < domElements.length; i++) {

            //grab textContent from each domElement
            var elementText = domElements[i].textContent;

            //create a RegExp for the search term. Example /o/ig 
            var searchExp = new RegExp(searchText, "ig");

            //test if search term is true in element text in html
            var match = searchExp.test(elementText)

            //if match is true(element text contains searchExp).  Execute code.
            if (match) {

                //loop through all the page elements by id and highlight match.  Redefine elementText to new value.
                elementText = elementText.replace(searchExp, function (match) {
                    return "<span class ='highlight'>" + match + "</span>"
                })
                //grab id of domElement[i] which matched search
                var elementId = domElements[i].id

                //use template literal to add an # infront of id text to create a useable jQuery id for a specific element of DOM.
                var elementNewText = document.querySelector(`#${elementId}`)

                //set elementNewText innerHTML to text with highlighted span value. 
                elementNewText.innerHTML = elementText
            }

            // loop through domElements and remove highligh class from elements which were previously highlighted if search term no longer matches an element's text.
            else {
                //loop through all the page elements by id
                elementText = elementText.replace(searchExp, function (match) {
                    return "<span class =''>" + match + "</span>"
                })

                var elementId = domElements[i].id

                var elementNewText = document.querySelector(`#${elementId}`)

                elementNewText.innerHTML = elementText
            }//end of else

        } //end of loop

    } //end of if searchText 

    //remove highlight if you part or all of search term from search input field.
    else {
        $(".highlight").removeClass("highlight");
    }

}//end of entire function

function searchList(searchCaret) {
    var noCaret = document.getElementById("sampleTreeList").querySelectorAll(".list");
    console.log("noCaret", noCaret);
    console.log("nocaret.length", noCaret.length);

    if (searchCaret) {

        for (h = 0; h < noCaret.length; h++) {

            // grab textContent from each caret element
            var noCaretText = noCaret[h].textContent;

            //create a RegExp for the search term. Example /o/ig 
            var searchExp = new RegExp(searchCaret, "ig");

            //test if search term is true in element text in html
            var match = searchExp.test(noCaretText);

            //if match is true(element text contains searchExp).  Execute code.
            if (match) {
                console.log("in nocaret match")
                //loop through all the caret elements by id and highlight match.  Redefine caretText to new value.
                noCaretText = noCaretText.replace(searchExp, function (match) {
                    return "<span class ='highlight'>" + match + "</span>"
                });
                console.log("noCaretText", noCaretText);

                //grab id of domElement[i] which matched search
                var elementClass = noCaret[h].id;

                console.log("elementClass", elementClass);

                var noCaretID = `#${elementClass}`
                console.log("noCaretID", noCaretID);

                //use template literal to add an # infront of id text to create a useable jQuery id for a specific element of DOM.
                var noCaretNewText = document.querySelector(`#${elementClass}`);
                console.log("noCaretNewText", noCaretNewText)

                //set elementNewText innerHTML to text with highlighted span value. 
                noCaretNewText.innerHTML = noCaretText;
            }

            // loop through domElements and remove highligh class from elements which were previously highlighted if search term no longer matches an element's text.
            else {
                console.log("in caret no match")

                //loop through all the page elements by id
                noCaretText = noCaretText.replace(searchExp, function (match) {
                    return "<span class =''>" + match + "</span>"
                });

                var noCaretID = noCaret[h].id;

                var noCaretNewText = document.querySelector(`#${noCaretID}`);

                noCaretNewText.innerHTML = noCaretText;
            }//end of else        
        }//end for loop
    } //end if match 
}//end function

function searchCaret(searchCaret) {
    var caret = document.getElementById("sampleTreeList").querySelectorAll(".caret");
    var noCaret = document.getElementById("sampleTreeList").querySelectorAll(".list");
    console.log("caret", caret);
    console.log("caret.length", caret.length);
    console.log("nocaret.length", noCaret.length);

    if (searchCaret) {

        for (h = 0; h < caret.length; h++) {

            // grab textContent from each caret element
            var caretText = caret[h].textContent;

            //create a RegExp for the search term. Example /o/ig 
            var searchExp = new RegExp(searchCaret, "ig");

            //test if search term is true in element text in html
            var match = searchExp.test(caretText);

            //if match is true(element text contains searchExp).  Execute code.
            if (match) {
                console.log("in caret match")
                //loop through all the caret elements by id and highlight match.  Redefine caretText to new value.
                caretText = caretText.replace(searchExp, function (match) {
                    return "<span class ='highlight'>" + match + "</span>"
                });
                console.log("caretText", caretText);

                //grab id of domElement[i] which matched search
                var elementClass = caret[h].id;

                console.log("elementClass", elementClass);

                var caretID = `#${elementClass}`
                console.log("caretID", caretID);

                //use template literal to add an # infront of id text to create a useable jQuery id for a specific element of DOM.
                var caretNewText = document.querySelector(`#${elementClass}`);
                console.log("caretNewText", caretNewText)

                //set elementNewText innerHTML to text with highlighted span value. 
                caretNewText.innerHTML = caretText;
            }

            // loop through domElements and remove highligh class from elements which were previously highlighted if search term no longer matches an element's text.
            else {
                console.log("in caret no match")

                //loop through all the page elements by id
                caretText = caretText.replace(searchExp, function (match) {
                    return "<span class =''>" + match + "</span>"
                });

                var caretID = caret[h].id;

                var caretNewText = document.querySelector(`#${caretID}`);

                caretNewText.innerHTML = caretText;
            }//end of else        
        }//end for loop
    } //end if match 
}//end function
