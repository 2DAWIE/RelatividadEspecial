// Configuración de partículas
particlesJS('particles-js', {
    particles: {
      number: {
        value: 200,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.7, random: true },
      size: { value: 1.5, random: true },
      move: { enable: true, speed: 3.0, random: true },
      line_linked: { enable: false }
    },
    interactivity: {
      events: {
        onhover: { enable: false },
        onclick: { enable: false }
      }
    },
    retina_detect: true
  });
  
  /**
   * Calcula el tiempo dilatado según la relatividad especial.
   */
  function calculateRelativisticTime(velocity, time) {
    return time / Math.sqrt(1 - velocity ** 2);
  }
  
  /**
   * Renderiza las fórmulas de MathJax en un contenedor específico.
   * @param {string} containerId - El ID del contenedor donde procesar las fórmulas.
   */
  function renderMathInContainer(containerId) {
    if (window.MathJax) {
      const container = document.getElementById(containerId);
      MathJax.typesetPromise([container])
        .then(() => console.log(`MathJax renderizado en #${containerId}`))
        .catch(err => console.error(`Error al renderizar MathJax en #${containerId}:`, err));
    } else {
      console.error("MathJax no está cargado.");
    }
  }
  
  /**
   * Forzar el renderizado inicial al cargar la página.
   */
  function renderInitialMath() {
    console.log("Renderizando fórmulas iniciales...");
    const explanationBox = document.getElementById('explanation');
  
    // Aseguramos que el contenido inicial incluye los delimitadores de MathJax
    explanationBox.innerHTML = `
      Según la <a href="/relatividad.html">Relatividad Especial</a> cuanto más rápido te muevas más lento transcurrirá el tiempo para ti en comparación con un observador estacionario.
      <div class="mathjax-equation">
        \\[
        t' = \\frac{t}{\\sqrt{1 - \\frac{v^2}{c^2}}}
        \\]
      </div>
      Donde:
      <ul>
        <li>\\(t'\\): Tiempo percibido por el observador estacionario.</li>
        <li>\\(t\\): Tiempo percibido por el viajero.</li>
        <li>\\(v\\): Velocidad del objeto (fracción de \\(c\\)).</li>
        <li>\\(c\\): Velocidad de la luz (\\(299,792,458 \\, \\text{m/s}\\)).</li>
      </ul>
    `;
  
    // Renderizar MathJax para el contenido inicial
    setTimeout(() => renderMathInContainer("explanation"), 100);
  }
  
  /**
   * Muestra los resultados del viaje.
   */
  function displayResults() {
    const velocity = parseFloat(document.getElementById('velocity-slider').value);
    const travelTime = parseFloat(document.getElementById('travel-time').value);
  
    if (velocity <= 0 || velocity >= 1 || travelTime <= 0) {
      alert("Por favor, introduce valores válidos.");
      return;
    }
  
    const relativisticTime = calculateRelativisticTime(velocity, travelTime);
    const explanationBox = document.getElementById('explanation');
  
    explanationBox.innerHTML = `
      <div>¡Viaje completado!</div>
      <div>Velocidad: ${Math.round(velocity * 100)}% de c</div>
      <div>Tiempo del viajero: ${travelTime} años</div>
      <div>Tiempo del observador: ${relativisticTime.toFixed(2)} años</div>
      <div class="mathjax-equation">
        \\[
        t' = \\frac{${travelTime}}{\\sqrt{1 - (${velocity})^2}}
        \\]
      </div>
    `;
    explanationBox.style.borderLeftColor = "#e67e22";
  
    document.getElementById('reset').style.display = "inline-block";
  
    // Renderizar MathJax después de actualizar el contenido dinámico
    setTimeout(() => renderMathInContainer("explanation"), 50);
  }
  
  /**
   * Restaura la explicación original.
   */
  function resetPage() {
    renderInitialMath();
    document.getElementById('reset').style.display = "none";
  }
  
  // Asignamos eventos a los botones
  document.getElementById('travel').addEventListener('click', displayResults);
  document.getElementById('reset').addEventListener('click', resetPage);
  
  // Renderizar MathJax al cargar
  document.addEventListener("DOMContentLoaded", renderInitialMath);

const slider = document.getElementById('velocity-slider');
const display = document.getElementById('velocity-display');

slider.addEventListener('input', () => {
  const velocity = slider.value;
  display.textContent = velocity;
});
