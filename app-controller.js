document.addEventListener("DOMContentLoaded", function () {

  const submitButton = document.getElementById("submit");
  const planetInput = document.getElementById("planetID");
  const planetName = document.getElementById("planetName");
  const planetDescription = document.getElementById("planetDescription");
  const planetImage = document.getElementById("planetImage");
  const hostname = document.getElementById("hostname");

  fetch('/os')
    .then(res => res.json())
    .then(data => {
      hostname.innerText = "Pod - " + data.os;
    });

  submitButton.addEventListener("click", function () {

    const planetId = planetInput.value;

    if (planetId === "") {
      planetName.innerText = "Solar System";
      planetDescription.innerText =
        "Solar system consists of our star, the Sun, and everything bound to it by gravity.";
      planetImage.style.backgroundImage =
        "url('/images/solar-system.png')";
      return;
    }

    fetch('/planet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: planetId })
    })
      .then(res => res.json())
      .then(data => {

        if (!data || !data.name) {
          planetName.innerText = "Planet Not Found";
          planetDescription.innerText = "";
          planetImage.style.backgroundImage =
            "url('/images/solar-system.png')";
          return;
        }

        planetName.innerText = data.name;
        planetDescription.innerText = data.description;

        planetImage.style.backgroundImage =
          "url('/images/" + data.image + "')";
      })
      .catch(error => {
        console.error("Error:", error);
      });

  });

});
