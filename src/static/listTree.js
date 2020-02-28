$(document).ready(function () {
   //function called everytime search option is changed
   var selectVal;
   function selectValue() {

       selectVal = $('.custom-select').val();

       //can click on everything
       if (selectVal === "1") {
           var toggler = document.getElementsByClassName("caret");
           console.log("toggler.length done only", toggler.length)
           var i;

           for (i = 0; i < toggler.length; i++) {
               toggler[i].addEventListener("click", function () {
                   this.parentElement.querySelector(".nested").classList.toggle("active");
                   this.classList.toggle("caret-down");
                   this.style.backgroundColor = "#FFFFFF"
               });

           }
       }

       //only expands done
       if (selectVal === "2") {
           var toggler = document.getElementsByClassName("caret");
           console.log("toggler.length done only", toggler.length)
           var i;
           var togglerText;
           var doneExp = new RegExp("done", "i");
           var sampleExp = new RegExp("sample", "i");

           // sample one
           $("#sample1").on("click", function () {

               for (i = 0; i < 43; i++) {
                   togglerText = toggler[i].textContent;
                   togglerID = toggler[i].id;
                   var matchDone = doneExp.test(togglerText)
                   var sampleDone = sampleExp.test(togglerText)
                   var idMatch = sampleExp.test(togglerID)

                   if (matchDone || sampleDone) {

                       toggler[i].parentElement.querySelector(".nested").classList.toggle("active");
                       toggler[i].classList.toggle("caret-down");
                       //highlight with "done" with green
                       // toggler[i].style.backgroundColor = "#7df583"
                   }
               };
           })

           // sample two
           $("#sample2").on("click", function () {
            
               for (i = 43; i < 85; i++) {
                   togglerText = toggler[i].textContent;
                   console.log(togglerText)
                   togglerID = toggler[i].id;
                   var matchDone = doneExp.test(togglerText)
                   var sampleDone = sampleExp.test(togglerText)
                   var idMatch = sampleExp.test(togglerID)

                   if (matchDone || sampleDone) {
                    console.log("in sample2 match")
                       toggler[i].parentElement.querySelector(".nested").classList.toggle("active");
                       toggler[i].classList.toggle("caret-down");
                       //highlight with "done" with green
                       // toggler[i].style.backgroundColor = "#7df583"
                   }
               };
           })

           // sample three
           $("#sample3").on("click", function () {
        
               for (i = 86; i < 129; i++) {
                   togglerText = toggler[i].textContent;
                   togglerID = toggler[i].id;
                   var matchDone = doneExp.test(togglerText)
                   var sampleDone = sampleExp.test(togglerText)
                   var idMatch = sampleExp.test(togglerID)

                   if (matchDone || sampleDone) {

                       toggler[i].parentElement.querySelector(".nested").classList.toggle("active");
                       toggler[i].classList.toggle("caret-down");
                       //highlight with "done" with green
                       // toggler[i].style.backgroundColor = "#7df583"
                   }
               };
           })
       }

       //expand entire tree
       if (selectVal === "3") {

           var toggler = document.getElementsByClassName("caret");
           var i;
           var togglerText;
           var doneExp = new RegExp("done", "i");
           var sampleExp = new RegExp("sample", "i");

           // sample one
           $("#sample1").on("click", function () {

               for (i = 0; i < 43; i++) {
                   togglerText = toggler[i].textContent;
                   var matchDone = doneExp.test(togglerText);
                   var sampleDone = sampleExp.test(togglerText);

                   if (matchDone === true || matchDone === false || sampleDone) {

                       toggler[i].parentElement.querySelector(".nested").classList.toggle("active");
                       toggler[i].classList.toggle("caret-down");
                       toggler[i].style.backgroundColor = "#FFFFFF"
                   }
               };
           })

           // sample two
           $("#sample2").on("click", function () {

               for (i = 43; i < 86; i++) {
                   togglerText = toggler[i].textContent;
                   var matchDone = doneExp.test(togglerText);
                   var sampleDone = sampleExp.test(togglerText);

                   if (matchDone === true || matchDone === false || sampleDone) {

                       toggler[i].parentElement.querySelector(".nested").classList.toggle("active");
                       toggler[i].classList.toggle("caret-down");
                       toggler[i].style.backgroundColor = "#FFFFFF"
                   }
               };
           })

           // sample three
           $("#sample3").on("click", function () {

               for (i = 86; i < 129; i++) {
                   togglerText = toggler[i].textContent;
                   var matchDone = doneExp.test(togglerText);
                   var sampleDone = sampleExp.test(togglerText);

                   if (matchDone === true || matchDone === false || sampleDone) {

                       toggler[i].parentElement.querySelector(".nested").classList.toggle("active");
                       toggler[i].classList.toggle("caret-down");
                       toggler[i].style.backgroundColor = "#FFFFFF"
                   }
               };
           })
       }
   }

   //automatically grab search value if nothing was selelcted 
   selectValue();
});

