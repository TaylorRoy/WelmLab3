const inputSample = document.querySelector("#sampleFile", 'input[type="file"]');
const inputBackground = document.querySelector("#backgroundFile", 'input[type="file"]');
const inputDrugs = document.querySelector("#drugFile", 'input[type="file"]');
var outputFileName

//gets values of file locations, calls fileReader, and outputs an array containing sample file data and background file data.  This is then passed to organoidFoldchange function.
$(document).ready(function () {
    $("#foldchangeButton").on("click", function () {
        //grab value of output File Name
        outputFileName = $("#outputName").val().trim();

        var sample = inputSample.files[0];
        var background = inputBackground.files[0];
        var drugs = inputDrugs.files[0];
        var file = [sample, background, drugs];
        var array = [];
        // var i;

        function readmultifiles(files) {
            var reader = new FileReader();
            function readFile(index) {
                if (index >= files.length) return;
                var file = files[index];
                reader.onload = function (e) {
                    // get file content  
                    var bin = e.target.result;
                    console.log("bin", bin);
                    // do sth with bin
                    array.push(bin);

                    readFile(index + 1)
                    if (index === 2) {
                        console.log("array", array);
                        organoidFoldchange(array, outputFileName)
                    }
                }
                reader.readAsText(file);
            }
            readFile(0);
        }

        readmultifiles(file);
    });
});

function organoidFoldchange(array) {


    //takes arrays and returns a string with no \r\n. 
    //works
    var noCarraige = array[0].replace(/(\r\n|\n|\r)/gm, ",");
    var noCarraigeBaseline = array[1].replace(/(\r\n|\n|\r)/gm, ",");
    var noCarraigeDrug = array[2].replace(/(\r\n|\n|\r)/gm, ",");



    //create an array of string numbers seprarated by ,
    //works but have '',
    var splitstringarray = noCarraige.split(",");
    var baselineSplitStringArray = noCarraigeBaseline.split(",");
    var drugSplitStringArray = noCarraigeDrug.split(",");

    // //going to loop through splitstringarray and remove '', with .filter
    // //WORKS!!!  Now we have an array of string numbers with no "",
    var noWhiteSpace = splitstringarray.filter(function (value, index, arr) {
        return value != "";
    })
    var noWhiteSpaceBaseline = baselineSplitStringArray.filter(function (value, index, arr) {
        return value != "";
    })
    var noWhiteSpaceDrug = drugSplitStringArray.filter(function (value, index, arr) {
        return value != "";
    })

    console.log("noWhiteSpaceDrug", noWhiteSpaceDrug);

    //FILTER OUT STRINGS LESS THAN 4.  WORKS.  Now we have an array with strings of length greater than 4. Not doing for noWhiteSpaceDrug b/c they are not numbers
    var stringlength = noWhiteSpace.filter(function (value, index, arr) {
        return value.length >= 4;
    });
    var stringlength = noWhiteSpace.filter(function (value, index, arr) {
        return value.length >= 4;
    });
    console.log("stringlength", stringlength)

    //turn array of strings of length 4 or more into numbers and push into a new array. 
    //Still contains NaN but doesn't matter because I am finding start and finish index for each plate 
    //Not doing for noWhiteSpaceDrug b/c they are not numbers
    var numberArray = [];
    for (i = 0; i < stringlength.length; i++) {
        var number = parseFloat(stringlength[i])
        numberArray.push(number);
    }
console.log("numberArray",numberArray)
    var baselineNumberArray = [];
    for (i = 0; i < noWhiteSpaceBaseline.length; i++) {
        var baselineNumber = parseFloat(noWhiteSpaceBaseline[i])
        baselineNumberArray.push(baselineNumber);
    }
    console.log(baselineNumberArray);

    //create array that contains indexes of first and last position for all plate read data.  These values are used as start and end indexes for each plate read.  The words "fisrt" and "last" must be added to .csv file prior to running program.

    var firstLast = [];
    for (i = 0; i <= stringlength.length; i++) {
        if (stringlength[i] === "first") {
            firstLast.push(i + 1);
        }
        if (stringlength[i] === "last") {
            firstLast.push(i - 1)
        }
    }

    console.log("firstLast", firstLast)

    //holds values for each plate within an array.  Plate 1 has index 0, etc.
    var arrayPlates = [];

    //holds averages for each plate-array of arrays containing integers. Plate 1 has index 0, etc.
    var averagesArray = [];

    //use firstLast.length/2 to calculate how many plates were read
    var numberOfPlates = (firstLast.length) / 2
    console.log("#plates", numberOfPlates)
    //adds an array for each plate withing array, then loops through numberArray within specific ranges(start and finish of plate data) and pushes values to array[i-1]
    //after range is complete- removes first two values from startFinishPositionArray
    //than adds an array withing averagesArray, then loops through array[i-1] within a specific range for each row and pushes values to array[i]
    //ultimately end up with a bunch of arrays withing averagesArray- each containing 88 calculations, which is the total number of calculations for each plate read.
    function AverageForPlates() {
        for (i = 1; i <= numberOfPlates; i++) {
            arrayPlates.push([]);
            // console.log(startFinishPositionArray[0]);
            // console.log(startFinishPositionArray[1]);
            var num = 0;
            for (j = firstLast[num]; j <= firstLast[num + 1]; j++) {
                arrayPlates[i - 1].push(numberArray[j]);
            }

            //remove the first two numbers from startFinishPosition Array after they are used
            firstLast.shift();
            firstLast.shift();

            //create an array to hold averages for each plate.  Plate 1 has index 0, etc.
            averagesArray.push([])

            //get averagesfor row1
            var a = 0;
            var b = 1;
            var c = 23;
            var d = 24;

            while (a <= 20 && b <= 21 && c <= 43 && d <= 44) {

                var sum1 = (arrayPlates[i - 1][a] + arrayPlates[i - 1][b] + arrayPlates[i - 1][c] + arrayPlates[i - 1][d]);
                var average = sum1 / 4;
                // console.log("average", average);
                averagesArray[i - 1].push(average);
                a += 2;
                b += 2;
                c += 2;
                d += 2;
            }

            //get averages for row2   
            var e = 45;
            var f = 46;
            var g = 68;
            var h = 69;

            while (e <= 65 && f <= 66 && g <= 88 && h <= 89) {
                var sum2 = (arrayPlates[i - 1][e] + arrayPlates[i - 1][f] + arrayPlates[i - 1][g] + arrayPlates[i - 1][h]);
                var average = sum2 / 4;
                averagesArray[i - 1].push(average);
                e += 2;
                f += 2;
                g += 2;
                h += 2;
            }

            //get averages fro row3
            var eye = 90;
            var j = 91;
            var k = 113;
            var l = 114;

            while (eye <= 110 && j <= 111 && k <= 133 && l <= 134) {
                var sum3 = (arrayPlates[i - 1][eye] + arrayPlates[i - 1][j] + arrayPlates[i - 1][k] + arrayPlates[i - 1][l]);
                var average = sum3 / 4;
                averagesArray[i - 1].push(average);
                eye += 2;
                j += 2;
                k += 2;
                l += 2;
            }

            //get averages for row4
            var m = 135;
            var n = 136;
            var o = 158;
            var p = 159;

            while (m <= 155 && n <= 156 && o <= 178 && p <= 179) {
                var sum4 = (arrayPlates[i - 1][m] + arrayPlates[i - 1][n] + arrayPlates[i - 1][o] + arrayPlates[i - 1][p]);
                var average = sum4 / 4;
                averagesArray[i - 1].push(average);
                m += 2;
                n += 2;
                o += 2;
                p += 2;
            }

            //get averages for row5
            var q = 180;
            var r = 181;
            var s = 203;
            var t = 204;

            while (q <= 200 && r <= 201 && s <= 223 && t <= 224) {
                var sum5 = (arrayPlates[i - 1][q] + arrayPlates[i - 1][r] + arrayPlates[i - 1][s] + arrayPlates[i - 1][t]);
                var average = sum5 / 4;
                averagesArray[i - 1].push(average);
                q += 2;
                r += 2;
                s += 2;
                t += 2;
            }

            //get averages for row6
            var u = 225;
            var v = 226;
            var w = 248;
            var x = 249;

            while (u <= 245 && v <= 246 && w <= 268 && x <= 269) {
                var sum6 = (arrayPlates[i - 1][u] + arrayPlates[i - 1][v] + arrayPlates[i - 1][w] + arrayPlates[i - 1][x]);
                var average = sum6 / 4;
                averagesArray[i - 1].push(average);
                u += 2;
                v += 2;
                w += 2;
                x += 2;
            }

            //get averages for row7
            var y = 270;
            var z = 271;
            var aa = 292;
            var bb = 293;

            while (y <= 290 && z <= 291 && aa <= 312 && bb <= 313) {
                var sum7 = (arrayPlates[i - 1][y] + arrayPlates[i - 1][z] + arrayPlates[i - 1][aa] + arrayPlates[i - 1][bb]);
                var average = sum7 / 4;
                averagesArray[i - 1].push(average);
                y += 2;
                z += 2;
                aa += 2;
                bb += 2;
            }

            //get averages for row8
            var cc = 314;
            var dd = 315;
            var ee = 336;
            var ff = 337;

            while (cc <= 334 && dd <= 335 && ee <= 356 && ff <= 357) {
                var sum8 = (arrayPlates[i - 1][cc] + arrayPlates[i - 1][dd] + arrayPlates[i - 1][ee] + arrayPlates[i - 1][ff]);
                var average = sum8 / 4;
                averagesArray[i - 1].push(average);
                cc += 2;
                dd += 2;
                ee += 2;
                ff += 2;
            }
        }
    }
    console.log("averagesArray[0]",averagesArray)
    // console.log("averagesArray.length",averagesArray.length)

    // for (i=0; i<=averagesArray.length; i++){
    //     console.log(averagesArray[0][i]);
    // };

    //call function to run when you execute file
    AverageForPlates();

    //now separate into groups of 5 for each organiod.
    var averageFiveArray = [];

    var sliceFirst = 0;
    var sliceLast = 5;

    while (sliceLast <= numberOfPlates) {
        //create a new array containing 5 arrays with averages calculations for each organoid 
        var averageGroup = averagesArray.slice(sliceFirst, sliceLast);
        averageFiveArray.push(averageGroup)

        sliceFirst += 5;
        sliceLast += 5
    }

    //create an array to hold flattened AverageFiveArray
    var fiveJoinedArray = [];
    var foldchangeArray = [];
    var fold;
    for (i = 0; i < averageFiveArray.length; i++) {
        //flatten 5 arrays of 5 arrays to single array for each group of 5(ultimately have 5 arrays containing 440 averages) to make division of baseline easier
        var flattenArray = averageFiveArray[i].flat(1);

        //put each flattened array(5 total with 440 average values) into fiveJoinedArray- plate read values
        fiveJoinedArray.push(flattenArray);

        //add an array in foldchangeArray for every array in fiveJoinedArray(1 per 5 reads)
        foldchangeArray.push([]);

        //divide average values for each plate by average background to get foldchange calculation
        fiveJoinedArray[i].map(function (value) {

            fold = value / baselineNumberArray[i];
            //add all 440 foldchange values to a single array in foldchangeArray
            foldchangeArray[i].push(fold);
        })
    }

    //separate drugs into arrays groups of 11 from noWhiteSpaceDrug array for later use to insert into foldChangeArray at specidic indexes.  
    var firstTenDrugs = noWhiteSpaceDrug.splice(0, 11);
    var secondTenDrugs = noWhiteSpaceDrug.splice(0, 11);
    var thirdTenDrugs = noWhiteSpaceDrug.splice(0, 11);
    var fouthTenDrugs = noWhiteSpaceDrug.splice(0, 11);
    var fifthTenDrugs = noWhiteSpaceDrug.splice(0, 11);

    for (i = 0; i < foldchangeArray.length; i++) {


        //insert 11 drug names into foldchange array at specific indexes(every 88).  Did in backwards order so index number wouldn't get altered while inserting drug names.

        foldchangeArray[i].splice(352, 0, fifthTenDrugs[10]); //Drug50
        foldchangeArray[i].splice(352, 0, fifthTenDrugs[9]);
        foldchangeArray[i].splice(352, 0, fifthTenDrugs[8]);
        foldchangeArray[i].splice(352, 0, fifthTenDrugs[7]);
        foldchangeArray[i].splice(352, 0, fifthTenDrugs[6]);
        foldchangeArray[i].splice(352, 0, fifthTenDrugs[5]);
        foldchangeArray[i].splice(352, 0, fifthTenDrugs[4]);
        foldchangeArray[i].splice(352, 0, fifthTenDrugs[3]);
        foldchangeArray[i].splice(352, 0, fifthTenDrugs[2]);
        foldchangeArray[i].splice(352, 0, fifthTenDrugs[1]); //Drug41
        foldchangeArray[i].splice(352, 0, fifthTenDrugs[0]); //DMSO

        foldchangeArray[i].splice(264, 0, fouthTenDrugs[10]);
        foldchangeArray[i].splice(264, 0, fouthTenDrugs[9]);
        foldchangeArray[i].splice(264, 0, fouthTenDrugs[8]);
        foldchangeArray[i].splice(264, 0, fouthTenDrugs[7]);
        foldchangeArray[i].splice(264, 0, fouthTenDrugs[6]);
        foldchangeArray[i].splice(264, 0, fouthTenDrugs[5]);
        foldchangeArray[i].splice(264, 0, fouthTenDrugs[4]);
        foldchangeArray[i].splice(264, 0, fouthTenDrugs[3]);
        foldchangeArray[i].splice(264, 0, fouthTenDrugs[2]);
        foldchangeArray[i].splice(264, 0, fouthTenDrugs[1]); //Drug31
        foldchangeArray[i].splice(264, 0, fouthTenDrugs[0]); //DMSO

        foldchangeArray[i].splice(176, 0, thirdTenDrugs[10]);
        foldchangeArray[i].splice(176, 0, thirdTenDrugs[9]);
        foldchangeArray[i].splice(176, 0, thirdTenDrugs[8]);
        foldchangeArray[i].splice(176, 0, thirdTenDrugs[7]);
        foldchangeArray[i].splice(176, 0, thirdTenDrugs[6]);
        foldchangeArray[i].splice(176, 0, thirdTenDrugs[5]);
        foldchangeArray[i].splice(176, 0, thirdTenDrugs[4]);
        foldchangeArray[i].splice(176, 0, thirdTenDrugs[3]);
        foldchangeArray[i].splice(176, 0, thirdTenDrugs[2]);
        foldchangeArray[i].splice(176, 0, thirdTenDrugs[1]); //Drug21
        foldchangeArray[i].splice(176, 0, thirdTenDrugs[0]); //DMSO

        foldchangeArray[i].splice(88, 0, secondTenDrugs[10]);
        foldchangeArray[i].splice(88, 0, secondTenDrugs[9]);
        foldchangeArray[i].splice(88, 0, secondTenDrugs[8]);
        foldchangeArray[i].splice(88, 0, secondTenDrugs[7]);
        foldchangeArray[i].splice(88, 0, secondTenDrugs[6]);
        foldchangeArray[i].splice(88, 0, secondTenDrugs[5]);
        foldchangeArray[i].splice(88, 0, secondTenDrugs[4]);
        foldchangeArray[i].splice(88, 0, secondTenDrugs[3]);
        foldchangeArray[i].splice(88, 0, secondTenDrugs[2]);
        foldchangeArray[i].splice(88, 0, secondTenDrugs[1]); //Drug11
        foldchangeArray[i].splice(88, 0, secondTenDrugs[0]); //DMSO

        foldchangeArray[i].splice(0, 0, firstTenDrugs[10]);
        foldchangeArray[i].splice(0, 0, firstTenDrugs[9]);
        foldchangeArray[i].splice(0, 0, firstTenDrugs[8]);
        foldchangeArray[i].splice(0, 0, firstTenDrugs[7]);
        foldchangeArray[i].splice(0, 0, firstTenDrugs[6]);
        foldchangeArray[i].splice(0, 0, firstTenDrugs[5]);
        foldchangeArray[i].splice(0, 0, firstTenDrugs[4]);
        foldchangeArray[i].splice(0, 0, firstTenDrugs[3]);
        foldchangeArray[i].splice(0, 0, firstTenDrugs[2]);
        foldchangeArray[i].splice(0, 0, firstTenDrugs[1]); //Drug1
        foldchangeArray[i].splice(0, 0, firstTenDrugs[0]); //DMSO
    }


    //find first foldchange value after drug list and inset a \r\n before value to create a new line without whitespace in front.
    for (i = 0; i < foldchangeArray.length; i++) {
        var fcArray = foldchangeArray[i];
        for (j = 0; j < fcArray.length; j++) {

            //every 11 positions add carriage return/line break.
            if (j % 11 === 0) {
                var firstPositionValue = foldchangeArray[i][j];
                foldchangeArray[i][j] = "\r\n" + firstPositionValue;
            }
        }
    }

    alert("in ofc function")
    
    //create a .csv file for each array(5) in foldchangeArray and output using filename given in HTML DOM
    const maxFiles = numberOfPlates / 5;

    var organoidNumber = 1
    for (i = 0; i <= foldchangeArray.length; i++) {

        // fs.appendFile('OutputPlate' + organoidNumber + '.csv', foldchangeArray[i], function (err) {
        //     if (err) throw err;
        var blob = new Blob([foldchangeArray[i]], { type: "text/plain;charset=utf-8" });
        saveAs(blob, outputFileName + organoidNumber + '.csv');
        // });
        organoidNumber++;
        console.log(outputFileName + organoidNumber + '.csv');

        if (organoidNumber > maxFiles) {
            break;
        }
    }
}





