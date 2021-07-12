var form = document.getElementById("myForm");
form.addEventListener("submit", (event) => {
    console.log('testt')
  event.preventDefault();
  const address = document.getElementById("address").value;
  let fun = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/weather?address" + address
      );
      const data = await res.json();
      console.log(data);
      if (data.error) {
        console.log("error has Ouccurred");
        document.getElementById("error").textContent = data.error;
      } else {
        console.log(data.location);
        console.log(data.forecast);
        document.getElementById("location").textContent = data.location;
        document.getElementById("forecast").textContent = data.forecast;
      }
    } catch (e) {}
  };
  fun();
});

// function return promise
