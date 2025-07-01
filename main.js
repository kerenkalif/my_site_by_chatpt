
let testimonials = [];
let index = 0;
const batchSize = 10;

function renderTestimonials() {
  const container = document.getElementById("testimonials-container");
  const end = Math.min(index + batchSize, testimonials.length);
  for (let i = index; i < end; i++) {
    const t = testimonials[i];
    const div = document.createElement("div");
    div.className = "testimonial";
    div.innerHTML = `
      <div class="meta">${t.role ? t.role + " | " : ""}${t.institution || ""}</div>
      <div class="content">${t.content}</div>
    `;
    container.appendChild(div);
  }
  index = end;
  if (index >= testimonials.length) {
    document.getElementById("loadMore").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const loadMoreBtn = document.getElementById("loadMore");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", renderTestimonials);
  }

  fetch('recommendations.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data.testimonials || !Array.isArray(data.testimonials)) {
        throw new Error("Missing or invalid 'testimonials' array in JSON.");
      }
      testimonials = data.testimonials;
      renderTestimonials();
    })
    .catch(error => {
      document.getElementById("testimonials-container").innerHTML = "<p>לא ניתן לטעון המלצות כרגע.</p>";
      console.error("שגיאה בטעינת ההמלצות:", error);
    });
});
