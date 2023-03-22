function resolveAfter2Seconds(){
    console.log("Starting slow promise");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('slow');
            console.log('slow promise is done');
        }, 2000);
    });
}

function resolveAfter1Seconds(){
    console.log("Starting fast promise");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('fast');
            console.log('fast promise is done');
        }, 1000);
    });
}

async function sequentialStart(){
    console.log("==sequential start==");
    // 1. execution gets here almost instantly 
    const slow = await resolveAfter2Seconds();
    console.log(slow); // 2. this runs 2 seconds after 1.

    const fast = await resolveAfter1Seconds();
    console.log(fast); // 3. this runs 3 seconds after 1.
}

async function concurrentStart() {
    console.log('==concurrent start with await==');
    const slow = resolveAfter2Seconds(); // starts timer immediately
    const fast = resolveAfter1Seconds(); // starts timer immediately

    // 1. execution gets here almost instantly
    console.log(await slow); // 2. this runs 2 seconds after 1.
    console.log(await fast); // 2. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}

async function concurrentPromise(){
    console.log('==concurrent start with promise.all==');
    return Promise.all([resolveAfter2Seconds(), resolveAfter1Seconds()]).then(
        (message) => {
            console.log(message[0]); // slow 
            console.log(message[1]); // fast
        }
    )
}

async function parallel(){
    console.log('==parallel with await Promise.all==');
    // starts 2 jobs in parallel and wait for both of them to complete 
    await Promise.all([
        (async () => console.log(await resolveAfter2Seconds()))(),
        (async () => console.log(await resolveAfter1Seconds()))(),
    ])
}

// sequentialStart();
// concurrentStart();
// concurrentPromise();
parallel();