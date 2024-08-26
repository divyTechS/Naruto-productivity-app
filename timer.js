// // Set the initial time in seconds
// let time = 10;

// // Create a function to update the timer
// function updateTimer() {
//     // Decrement the time by 1 second
//     time--;

//     // Display the current time
//     console.log(`Time: ${time} seconds`);

//     // Check if the timer has reached 0
//     if (time === 0) {
//         // Stop the timer
//         clearInterval(timer);
//         console.log("Timer has ended");
//     }
// }

// Start the timer
const timer = setInterval(updateTimer, 1000);
// Create a function to start the stopwatch
function startStopwatch() {
    // Set the initial time in milliseconds
    let startTime = Date.now();

    // Create a function to update the stopwatch
    function updateStopwatch() {
        // Calculate the elapsed time in milliseconds
        let elapsedTime = Date.now() - startTime;

        // Convert the elapsed time to seconds
        let seconds = Math.floor(elapsedTime / 1000);

        // Display the current time
        console.log(`Stopwatch: ${seconds} seconds`);
    }

    // Update the stopwatch every 1 second
    const stopwatch = setInterval(updateStopwatch, 1000);

    // Return the stopwatch interval ID
    return stopwatch;
}

// Start the stopwatch
const stopwatch = startStopwatch();