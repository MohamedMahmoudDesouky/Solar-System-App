db = db.getSiblingDB("solar-system");

db.planets.insertMany([
  { id: 0, name: "Sun", description: "The Sun", image: "sun.png" },
  { id: 1, name: "Mercury", description: "Mercury Planet", image: "mercury.png" },
  { id: 2, name: "Venus", description: "Venus Planet", image: "venus.png" },
  { id: 3, name: "Earth", description: "Earth Planet", image: "earth.png" },
  { id: 4, name: "Mars", description: "Mars Planet", image: "mars.png" },
  { id: 5, name: "Jupiter", description: "Jupiter Planet", image: "jupiter.png" },
  { id: 6, name: "Saturn", description: "Saturn Planet", image: "saturn.png" },
  { id: 7, name: "Uranus", description: "Uranus Planet", image: "uranus.png" },
  { id: 8, name: "Neptune", description: "Neptune Planet", image: "neptune.png" }
]);
