let testimonials = [];
let currentIndex = 0;

function renderTestimonials() {
  const container = document.getElementById("testimonials-container");
  container.innerHTML = "";

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  visibleTestimonials.forEach((t, idx) => {
    const div = document.createElement("div");
    div.className = "testimonial-card";
    const number = currentIndex + idx + 1;

    /*const metaText = t.role
      ? t.institution
        ? `${t.role} | ${t.institution}`
        : `${t.role}`
      : t.institution || "";*/

    const metaText = `
  <div class="role">${t.role || ""}</div>
  <div class="institution">${t.institution || ""}</div>
`;


  div.innerHTML = `
      <div class="testimonial-number">#${number}</div>
      <div class="testimonial-meta">${metaText}</div>
      <div class="testimonial-content">${t.content}</div>
    `;

    const contentDiv = div.querySelector(".testimonial-content");

    contentDiv.addEventListener("scroll", () => {
      const isScrolledToBottom =
        contentDiv.scrollTop + contentDiv.clientHeight >= contentDiv.scrollHeight - 1;

      if (isScrolledToBottom) {
        contentDiv.classList.add("scrolled");
      } else {
        contentDiv.classList.remove("scrolled");
      }
    });
    
    container.appendChild(div);
  });
}


document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentIndex + 3 < testimonials.length) {
    currentIndex += 3;
    renderTestimonials();
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentIndex - 3 >= 0) {
    currentIndex -= 3;
    renderTestimonials();
  }
});

fetch("./recommendations.json")
  .then((response) => response.json())
  .then((data) => {
    testimonials = data.testimonials;
    renderTestimonials();
  })
  .catch((error) => {
    document.getElementById("testimonials-container").innerHTML =
      "<p>לא ניתן לטעון המלצות.</p>";
    console.error("Error loading testimonials:", error);
  });
