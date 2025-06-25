document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded: " + window.location.pathname);

  const cards = document.querySelectorAll(".soil-card, .distributor-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h5")?.innerText || "Unknown card";
      console.log("Card clicked: " + title);
    });
  });
});
