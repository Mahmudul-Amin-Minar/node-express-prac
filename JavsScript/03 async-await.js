// async function returns a promise 
async function friendlyFunction(){
    return 'hello';
}

console.log(friendlyFunction());



const hasMeeting = true;

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


// meeting
//     .then(addToCalendar)
//     .then((res) => {
//         // resolved data 
//         console.log(res);
//     })
//     .catch((err) => {
//         // rejected data 
//         console.log(err.message);
//     });

async function myMeeting(){
    try{
        const meetingDetails = await meeting;
        const calendar = await addToCalendar(meetingDetails);
        console.log(calendar);
    }catch(err){
        console.log(err.message);
    }
}

myMeeting();
