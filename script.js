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
      move: { enable: true, speed: 0.3, random: true },
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
   * Reinicia y procesa MathJax explícitamente en la primera carga.
   */
  function resetAndRenderMath() {
    console.log("Forzando el renderizado inicial de MathJax...");
    MathJax.startup.promise
      .then(() => renderMathInContainer("explanation"))
      .catch(err => console.error("Error al reiniciar MathJax:", err));
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
    renderMathInContainer("explanation");
  }
  
  /**
   * Restaura la explicación original.
   */
  function resetPage() {
    const explanationBox = document.getElementById('explanation');
  
    explanationBox.innerHTML = `
      <strong>¡Bienvenido!</strong> Según la teoría de la relatividad especial...
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
    explanationBox.style.borderLeftColor = "#16a085";
  
    document.getElementById('reset').style.display = "none";
  
    // Renderizar MathJax después de restaurar el contenido original
    renderMathInContainer("explanation");
  }
  
  // Asignamos eventos a los botones
  document.getElementById('travel').addEventListener('click', displayResults);
  document.getElementById('reset').addEventListener('click', resetPage);
  
  // Renderizar MathJax al cargar
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(resetAndRenderMath, 100); // Retraso manual para asegurar el renderizado inicial
  });
  