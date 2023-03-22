const hasMeeting = false;

const meeting = new Promise((resolve, reject) => {
    // do something 
    if(!hasMeeting){
        const meetingDetails = {
            name: 'Technical meeting',
            location: 'ggole meet',
            time: "10:00 PM",
        };
        resolve(meetingDetails);
    }else{
        reject(new Error("meeting already scheduled"));
    }
});

// multiple promise promise chaining 
const addToCalendar = (meetingDetails) => {
    const calendar = `${meetingDetails.name} has been scheduled on ${meetingDetails.location} at ${meetingDetails.time}`;
    return Promise.resolve(calendar);
}


meeting
    .then(addToCalendar)
    .then((res) => {
        // resolved data 
        console.log(res);
    })
    .catch((err) => {
        // rejected data 
        console.log(err.message);
    });


const promise1 = Promise.resolve(`Promise 1 resolved`);
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(`Promise 2 resolved`);
    }, 2000);
});

// promise1.then((res) => console.log(res));
// promise2.then((res) => console.log(res));
Promise.all([promise1, promise2]).then((res) => {
    console.log(res);
})

console.log("hello");