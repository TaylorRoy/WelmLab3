//javascript to handle button click, get sample name, and add to list
var idText;
var idTextArray = [];
var cost = 0;
var count = 0;
$(document).ready(function () {

    $(this).on("click", function () {
        //make submit button active if a sample has been selected
        document.getElementById("submitOrder").disabled = false;
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
            cost += 750;
            //dynamically adds a <li> and <button> to <ol> 
            $("ol").append('<div id="listDiv" class=' + idText + '><li class="listItem id="orderList" >' + idText + '</li><p class="">$750.00</p><button class="btn btn-danger" id ="remove" data-data=' + idText + '>X</button></div>');
            $(".cost").text("$" + cost);
            count++;
        }
        //disable submit button if all samples were removed from order
        if(idTextArray.length === 0){
            document.getElementById("submitOrder").disabled = true;
        }
    });
});




//javascript to handle submit button click, and send email with order.
$(document).ready(function () {
    $("#submitOrder").on("click", function () {


        if (idTextArray.length === 0) {
            console.log(" in empty submit- no samples");
            $("#failedNoSamples").attr("hidden", false)
        }
        else {
            console.log("in success- samples")
            //get input ids and create object
            let contactData = {
                first_name: $("#inputFirstName").val().trim(),
                last_name: $("#inputLastName").val().trim(),
                phone_number: $("#phoneNumber").val().trim(),
                email: $("#inputEmail").val().trim(),
                po: $("#inputPO").val().trim(),
                address1: $("#inputAddress1").val().trim(),
                address2: $("#inputAddress2").val().trim(),
                city: $("#inputCity").val().trim(),
                state: $("#inputState").val().trim(),
                zip: $("#inputZip").val().trim(),
                comment: $("#inputComment").val().trim(),
                questions: $("#inputQuestions").val().trim(),
                mta: $("#inputMTA").val().trim(),
                samples: idTextArray
            }
            console.log(contactData)

            // $.post("/api/tumorOrder", contactData)
            //     .then(function (res) {
            //         console.log(res)
            //         if (res.status === 200) {
            //             console.log(res.message)
            //         }
            //     })
            //     .catch(function (err) {
            //         console.log(err)
            //     })
            // alert("Your message was sucessfully sent.  We will contact you soon.  Thanks!");

        }
    })
});


//javascript to handle remove button click.  Also allows removed samples to be readded if desired.
var buttondData;
var removeIndex;
$(document).ready(function () {
    $(".tumorOrderSummary").on("click", "#remove", function () {
        buttondData = this.dataset.data;
        $(`.${buttondData}`).remove();
        removeIndex = idTextArray.indexOf(buttondData)
        idTextArray.splice(removeIndex, 1);
        //subtracts from total if sample is removed
        cost -= 750;
        $(".cost").text("$" + cost);
    })
});

//javascript to unhide form after successful order submission
$(document).ready(function () {
    $("#confirmationButton").on("click", function () {
        $('#tumorForm').attr("hidden", false);
        $('.headerTitle').attr("hidden", false);
        $('.needs-validation').attr("hidden", false);
        $("#confirmation").attr("hidden", true);
    })
});

//disable submit button initially because no samples have been selected
$(document).ready(function () {
    console.log(idTextArray.length);
    if (idTextArray.length === 0) {
        document.getElementById("submitOrder").disabled = true;
    }
});

