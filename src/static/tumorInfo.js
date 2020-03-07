//javascript to handle button click, get sample name, and add to list
var idText;
var idTextArray = [];
$(document).ready(function () {
    var count = 0;

    $(this).on("click", function () {

        //get id value for button that was clicked(this)
        idText = this.activeElement.id;

        //check if idText is in idTextArray.  If -1 then not in array.
        var repeat = idTextArray.indexOf(idText);

        //create a RegExp for the search term. Example /o/ig 
        var searchExp = new RegExp(/hci/, "ig");

        //test if search term is true in element text in html
        var match = searchExp.test(idText);

        if (match && repeat < 0) {
            idTextArray.push(idText);
            console.log(idTextArray);
            //dynamically adds a <li> and <button> to <ol> 
            $("ol").prepend('<li class=' + idText + '>' + idText + '</li><button class=' + idText + ' id ="remove" data=' + idText + '>X</button>');
            // $("ol").prepend('<li class='+idText+'>' + idText + '</li><button class="btn btn-danger" id ='+idText+' data='+idText+'>X</button>');
            count++;
        }
    });
});

//javascript to handle submit button click, and send email with order.
var tumorOrderValue;
$(document).ready(function () {
    $("#submitOrder").on("click", function () {
        tumorOrderValue=$(".tumorOrderSummary").val()
        if(tumorOrderValue === ""){
            alert("empty")
        }
        console.log(tumorOrderValue)
        // tumorOrderValue = $(".tumorOrderSummary").html();
        // $('#tumorForm').attr("hidden", true);
        // $("#confirmation").attr("hidden", false);
        // console.log(tumorOrderValue);
        // var r = $('<input/>').attr({
        //     type: "button",
        //     id: "field",
        //     onClick: "location.href='./tumorOrder'",
        //     value: 'Click to Return to Tumor Order Page'
        // });
        // $("#confirmation").append(r);
    })
});

//javascript to handle remove button click.  Also allows removed samples to be readded if desired.
var buttonClass;
var removeIndex;
$(document).ready(function () {
    $(".tumorOrderSummary").on("click", "#remove", function () {
        buttonClass = this.className;
        console.log(buttonClass);
        $(`.${buttonClass}`).remove();

        removeIndex = idTextArray.indexOf(buttonClass)
        idTextArray.splice(removeIndex, 1);
    })
})

