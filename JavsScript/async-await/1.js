async function foo() {
    const result1 = await new Promise((resolve) => {
        setTimeout(() => resolve("1"), 3000);
    });
    const result2 = await new Promise((resolve) => {
        setTimeout(() => resolve("2"), 3000);
    })

    console.log(result1);
    console.log(result2);
}

foo();