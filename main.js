let testimonials = [];
let currentIndex = 0;
const visibleCount = 3;

function renderCarousel() {
  const container = document.getElementById("carousel");
  container.innerHTML = "";
  
  for (let i = currentIndex; i < currentIndex + visibleCount && i < testimonials.length; i++) {
    const t = testimonials[i];
    const div = document.createElement("div");
    div.className = "testimonial";
    div.innerHTML = `
      <div class="meta">${t.role ? t.role + " | " : ""}${t.institution || ""}</div>
      <div class="content">${t.content}</div>
    `;
    container.appendChild(div);
  }

  document.getElementById("prevBtn").style.display = currentIndex > 0 ? "block" : "none";
  document.getElementById("nextBtn").style.display = currentIndex + visibleCount < testimonials.length ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - visibleCount);
    renderCarousel();
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentIndex + visibleCount < testimonials.length) {
      currentIndex += visibleCount;
      renderCarousel();
    }
  });

  fetch('recommendations.json')
    .then(response => response.json())
    .then(data => {
      testimonials = data.testimonials || [];
      renderCarousel();
    })
    .catch(error => {
      console.error("שגיאה בטעינת ההמלצות:", error);
      document.getElementById("carousel").innerHTML = "<p>לא ניתן לטעון המלצות כרגע.</p>";
    });
});
