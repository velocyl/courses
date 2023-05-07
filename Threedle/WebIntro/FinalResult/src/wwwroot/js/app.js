const data = await new Promise((resolve, reject) => {
    fetch("./data/source.json")
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
});

console.log(data);

// We're loaded! Say hello!
console.log("Hello from app.js!");