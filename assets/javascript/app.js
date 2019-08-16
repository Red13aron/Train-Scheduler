function getTrainData(cb) {
    localforage.getItem("train-data").then(function (result) {
        cb(result || []); //{fill in with example info later}
    });
}

function setTrainData(newTrainData, cb) {
    localforage.setItem("train-data", newTrainData).then(cb);
}

function handleTrainData(newTrainName, newDestination, newFirstArrival, newFrequency) {
    getTrainData(function (trainData) {
        trainData.push({
            trainName: newTrainName,
            destination: newDestination,
            firstArrival: newFirstArrival,
            frequency: newFrequency
        });
        console.log(trainData);
        setTrainData(trainData, updateTrainData);
    });
}

function addData() {
    document.getElementById("submitButton").addEventListener("click", function (event) {
        const trainName = document.getElementById("trainName").value;
        const destination = document.getElementById("destination").value;
        console.log(document.getElementById("firstArrival").value);
        const firstArrival = document.getElementById("firstArrival").value;
        const frequency = document.getElementById("frequency").value;
        handleTrainData(trainName, destination, firstArrival, frequency);
        console.log("addData trigger");
    })
}

addData()

function updateTrainData() {
    //get container where data is supposed to go
    const trainTable = document.getElementById("train-table");
    const trainTableBody = document.getElementById("train-table-body");

    //create element for data
    const trainTR = document.createElement("tr");
    //populate element with data
    getTrainData(function (trainData) {
        //do stuff
        const trainNameTD = document.createElement("td");
        const destinationTD = document.createElement("td");
        const frequencyTD = document.createElement("td");
        const nextArrivalTD = document.createElement("td");
        const minutesAwayTD = document.createElement("td");

        //get new employee data
        let train = trainData[trainData.length - 1];
        // Solved Mathematically
        // Test case 1:
        // 16 - 00 = 16
        // 16 % 3 = 1 (Modulus is the remainder)
        // 3 - 1 = 2 minutes away
        // 2 + 3:16 = 3:18

        // Solved Mathematically
        // Test case 2:
        // 16 - 00 = 16
        // 16 % 7 = 2 (Modulus is the remainder)
        // 7 - 2 = 5 minutes away
        // 5 + 3:16 = 3:21

        // Assumptions
        const tFrequency = train.frequency;

        // Time is 3:30 AM
        const firstTime = train.firstArrival;

        // First Time (pushed back 1 year to make sure it comes before current time)
        const firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        const currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        const diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        const tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        const tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        const nextTrainObject = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrainObject).format("hh:mm"));

        const nextTrain = moment(nextTrainObject).format("HH:mm");
        //populate with info
        trainNameTD.innerText = train.trainName;
        destinationTD.innerText = train.destination;
        frequencyTD.innerText = train.frequency;
        nextArrivalTD.innerText = nextTrain;
        minutesAwayTD.innerText = tMinutesTillTrain;

        //append td to tr
        trainTR.append(trainNameTD);
        trainTR.append(destinationTD);
        trainTR.append(frequencyTD);
        trainTR.append(nextArrivalTD);
        trainTR.append(minutesAwayTD);

        // append tr to table body
        trainTableBody.append(trainTR);
    })

    //append element ot container
}
// displayHighScores();

function renderTrainData() {
    // console.log("timer test")
    const trainTableBody = document.getElementById("train-table-body");
    getTrainData(function (trainData) {
        // console.log(employeeData);
        trainTableBody.innerHTML = "";
        for (let i = 0; i < trainData.length; i++) {
            // console.log("employee data at",i,employeeData[i]);
            const trainTR = document.createElement("tr");
            const trainNameTD = document.createElement("td");
            const destinationTD = document.createElement("td");
            const frequencyTD = document.createElement("td");
            const nextArrivalTD = document.createElement("td");
            const minutesAwayTD = document.createElement("td");

            let train = trainData[i];

            // Solved Mathematically
            // Test case 1:
            // 16 - 00 = 16
            // 16 % 3 = 1 (Modulus is the remainder)
            // 3 - 1 = 2 minutes away
            // 2 + 3:16 = 3:18

            // Solved Mathematically
            // Test case 2:
            // 16 - 00 = 16
            // 16 % 7 = 2 (Modulus is the remainder)
            // 7 - 2 = 5 minutes away
            // 5 + 3:16 = 3:21

            // Assumptions
            const tFrequency = train.frequency;

            // Time is 3:30 AM
            var firstTime = train.firstArrival;

            // First Time (pushed back 1 year to make sure it comes before current time)
            var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
            console.log(firstTimeConverted);

            // Current Time
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            // Time apart (remainder)
            var tRemainder = diffTime % tFrequency;
            console.log(tRemainder);

            // Minute Until Train
            var tMinutesTillTrain = tFrequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

            // Next Train
            const nextTrainObject = moment().add(tMinutesTillTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrainObject).format("hh:mm"));

            const nextTrain = moment(nextTrainObject).format("HH:mm");

            //populate with info
            trainNameTD.innerText = train.trainName;
            destinationTD.innerText = train.destination;
            frequencyTD.innerText = train.frequency;
            nextArrivalTD.innerText = nextTrain;
            minutesAwayTD.innerText = tMinutesTillTrain;

            //append td to tr
            trainTR.append(trainNameTD);
            trainTR.append(destinationTD);
            trainTR.append(frequencyTD);
            trainTR.append(nextArrivalTD);
            trainTR.append(minutesAwayTD);

            // append tr to table body
            trainTableBody.append(trainTR);
        }
    })
}

renderTrainData();

let renderUpdate = setInterval(renderTrainData, 60000);

