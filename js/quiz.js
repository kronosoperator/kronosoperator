/**
 * Villano.ai - Progressive Revelation Quiz
 * Each question reveals the gap in the user's knowledge
 */

// Quiz State
const quizState = {
  currentQuestion: 0,
  answers: [],
  awakenessScore: 0, // How much they're realizing they're playing the wrong game
  truthsRevealed: []
};

// Quiz Questions - Each one challenges a belief
const questions = [
  {
    id: 1,
    question: "¿Por qué crees que las mujeres dicen que quieren 'un buen chico' pero terminan con otros?",
    options: [
      {
        text: "Porque no han encontrado al correcto",
        icon: "😇",
        description: "Sólo es cuestión de tiempo y paciencia",
        truth: "Eso es lo que te dijeron que creas. La realidad es que las palabras de una mujer y sus acciones viven en universos diferentes."
      },
      {
        text: "Porque dicen una cosa pero sienten otra",
        icon: "🎭",
        description: "Hay una desconexión entre lo que dicen y hacen",
        truth: "Estás empezando a ver el patrón. Pero la pregunta real es: ¿por qué existe esa desconexión? Hay reglas biológicas que nadie te ha explicado."
      },
      {
        text: "Porque 'buen chico' no significa lo que crees",
        icon: "🧠",
        description: "El concepto está deliberadamente mal definido",
        truth: "Exacto. 'Buen chico' es un código. Significa algo completamente distinto en el lenguaje femenino. Y nadie te enseñó a traducir."
      },
      {
        text: "Es una prueba para filtrar hombres débiles",
        icon: "⚡",
        description: "Separan a los que creen todo lo que dicen",
        truth: "Vas varios pasos adelante. Pero esto es solo la superficie. Hay un sistema completo operando bajo todo esto."
      }
    ]
  },
  {
    id: 2,
    question: "Un hombre exitoso, educado y atento es ignorado. Otro, sin trabajo estable y problemático, las tiene haciendo fila. ¿Por qué?",
    options: [
      {
        text: "Esas mujeres tienen problemas personales",
        icon: "🤷",
        description: "Son casos aislados de mujeres con issues",
        truth: "Esa es la explicación que te dieron para que sigas durmiendo. No son 'casos aislados'. Es un patrón universal que se repite en cada cultura."
      },
      {
        text: "El segundo genera más emoción e incertidumbre",
        icon: "🎲",
        description: "La imprevisibilidad es adictiva",
        truth: "Correcto. Pero ¿por qué la 'estabilidad' mata la atracción mientras que el 'caos' la enciende? Hay razones evolutivas que nadie menciona."
      },
      {
        text: "El primero pide permiso, el segundo toma lo que quiere",
        icon: "👑",
        description: "Es sobre dominancia y frame, no bondad",
        truth: "Ahí está. Frame y poder. Pero el 99% de hombres ni siquiera sabe que están en un juego de poder. Y pierden por default."
      },
      {
        text: "Las mujeres no valoran lo que obtienen fácilmente",
        icon: "💎",
        description: "La disponibilidad mata el deseo",
        truth: "Bingo. Economía básica aplicada a la seducción. Pero hay capas más profundas: hipergamia, preselección, psicología evolutiva. ¿Conoces esos términos?"
      }
    ]
  },
  {
    id: 3,
    question: "¿Qué crees que pasa en la mente de una mujer cuando un hombre hace TODO lo que ella pide?",
    options: [
      {
        text: "Se siente valorada y amada",
        icon: "💕",
        description: "Aprecia el esfuerzo y la atención",
        truth: "Eso es lo que 'debería' pasar en un mundo lógico. Pero el cerebro femenino no opera con lógica. Opera con biología de 200,000 años."
      },
      {
        text: "Pierde respeto y atracción por él",
        icon: "📉",
        description: "Lo ve como débil y manipulable",
        truth: "Exactamente. Y no es 'maldad'. Es programación evolutiva. Una mujer NO PUEDE sentir atracción por un hombre que ella controla. Es imposible biológicamente."
      },
      {
        text: "Lo pone a prueba con demandas más extremas",
        icon: "🔬",
        description: "Busca dónde está su límite real",
        truth: "Sí. Las 'pruebas' nunca terminan si sigues pasándolas todas. Porque inconscientemente busca un hombre que diga 'no'. Que tenga su propio frame."
      },
      {
        text: "Empieza a buscar a alguien más interesante",
        icon: "👀",
        description: "La previsibilidad total la aburre",
        truth: "Correcto. Mientras más 'disponible' y 'bueno' eres, más rápido te reemplaza. Es contraintuitivo, pero es la verdad que nadie te dice."
      }
    ]
  },
  {
    id: 4,
    question: "¿Por qué tantas mujeres tienen 'historias de exes tóxicos' pero ninguna de 'exes buenos'?",
    options: [
      {
        text: "Tienen mala suerte eligiendo",
        icon: "🍀",
        description: "No han encontrado a los correctos",
        truth: "Si fuera 'mala suerte', las estadísticas serían 50/50. Pero es 95/5. No es suerte. Es selección deliberada basada en atracción visceral."
      },
      {
        text: "Los 'buenos' no generan historias memorables",
        icon: "📖",
        description: "Lo aburrido no se recuerda",
        truth: "Exacto. Los 'buenos' no activan su sistema nervioso. Son paisaje. Los 'tóxicos' sí. Porque entienden (consciente o inconscientemente) las reglas reales."
      },
      {
        text: "Solo los 'tóxicos' llegaron a relación real",
        icon: "🎯",
        description: "Los buenos se quedaron en friendzone",
        truth: "Brutal pero cierto. Los 'buenos' nunca activaron atracción sexual. Los 'malos' sí. Y la atracción sexual no es negociable ni 'se construye con tiempo'."
      },
      {
        text: "'Tóxico' es cómo llaman a quien no pudieron controlar",
        icon: "🔥",
        description: "Etiquetan así a quien mantuvo su frame",
        truth: "Ahí está la verdad incómoda. 'Tóxico' muchas veces = 'no se dejó manipular'. Porque un hombre con opciones no tolera mierda. Y eso las vuelve locas."
      }
    ]
  },
  {
    id: 5,
    question: "Una mujer te dice: 'Necesito espacio'. ¿Qué está pasando REALMENTE?",
    options: [
      {
        text: "Necesita tiempo para pensar en la relación",
        icon: "🤔",
        description: "Está procesando sus sentimientos",
        truth: "No. Cuando una mujer dice 'necesito espacio', ya tomó la decisión. El 'espacio' es para que TÚ proceses que ya perdiste."
      },
      {
        text: "Está probando si te vuelves suplicante",
        icon: "🧪",
        description: "Ve cómo reaccionas a la distancia",
        truth: "Correcto. Es una prueba de frame. Si suplicas, confirmas que eres de bajo valor. Si desapareces, crea duda. Pero ya hay daño previo."
      },
      {
        text: "Ya hay otro hombre en la ecuación",
        icon: "👤",
        description: "El 'espacio' es para explorar opciones",
        truth: "En el 80% de casos, sí. 'Espacio' = 'quiero ver si este otro funciona sin cerrar esta puerta'. Hipergamia pura. Siempre buscan upgrade."
      },
      {
        text: "Perdiste el frame hace semanas, esto es el final",
        icon: "⚰️",
        description: "Esto es síntoma, no la causa",
        truth: "Exacto. Cuando dice 'necesito espacio' ya llevas semanas o meses perdiendo frame. Cediendo, siendo predecible, perdiendo misterio. Esto es solo el coup de grâce."
      }
    ]
  },
  {
    id: 6,
    question: "¿Qué tiene más impacto en la atracción femenina?",
    options: [
      {
        text: "Tu personalidad y sentido del humor",
        icon: "😄",
        description: "Ser divertido y auténtico",
        truth: "La personalidad importa... DESPUÉS de la atracción inicial. Pero no la crea. Es como el empaque de un producto que primero tuvo que llamar su atención."
      },
      {
        text: "Cómo te ve interactuando con otros",
        icon: "👥",
        description: "La preselección y validación social",
        truth: "Sí. Preselección. Si otras mujeres te quieren, tu valor sube exponencialmente. Es selección sexual 101. Pero hay más capas."
      },
      {
        text: "Tu indiferencia hacia su validación",
        icon: "😐",
        description: "No necesitar su aprobación",
        truth: "Oro puro. La indiferencia es afrodisíaco. Porque comunica opciones, alto valor, abundancia. Lo opuesto (necesidad) es repelente instantáneo."
      },
      {
        text: "Todas las anteriores, en orden específico",
        icon: "🎯",
        description: "Hay una jerarquía y timing exactos",
        truth: "Correcto. Hay un SISTEMA. Secuencia, timing, calibración. No es 'sé tú mismo'. Es dominar un juego con reglas específicas que nadie te enseñó."
      }
    ]
  },
  {
    id: 7,
    question: "¿Por qué las mujeres 'cambian' después de que las conquistas?",
    options: [
      {
        text: "Mostraron su verdadero yo",
        icon: "🎭",
        description: "Dejaron caer la máscara",
        truth: "Parcialmente. Pero la pregunta real es: ¿por qué TÚ dejaste de hacer lo que causó la atracción inicial? Ellas responden a tu frame, no al contrato."
      },
      {
        text: "Tú dejaste de ser un desafío",
        icon: "🏆",
        description: "Te volviste predecible y disponible",
        truth: "Exacto. Ganaste el juego y dejaste de jugar. Error fatal. La atracción femenina no es un logro permanente. Es un estado que mantienes o pierdes."
      },
      {
        text: "Empezaron a probar límites",
        icon: "🔍",
        description: "Buscan hasta dónde pueden llegar",
        truth: "Sí. Las pruebas nunca paran. Si cedes en las pequeñas, vendrán las grandes. Establecer frame desde el día 1 es no negociable."
      },
      {
        text: "No cambiaron, tú perdiste el poder",
        icon: "⚡",
        description: "Es shift de dinámica de poder",
        truth: "Ahí está todo. En relaciones, el que menos necesita tiene el poder. Si cediste ese poder (siendo 'bueno', disponible, predecible), ella TIENE que perder atracción. Es automático."
      }
    ]
  },
  {
    id: 8,
    question: "¿Cuál es la verdad más incómoda sobre las relaciones que nadie quiere decirte?",
    options: [
      {
        text: "El amor no conquista todo",
        icon: "💔",
        description: "Los sentimientos no son suficientes",
        truth: "Correcto. El 'amor' sin atracción es amistad. Y la atracción tiene reglas. Reglas que contradicen todo lo que te enseñaron."
      },
      {
        text: "Las mujeres no aman como los hombres",
        icon: "🔄",
        description: "Su amor es condicional y oportunista",
        truth: "Brutal pero cierto. El amor masculino es idealista. El femenino es hipergámico. Ella ama al hombre que eres HOY. Mañana puedes ser reemplazado. Acepta eso o sufre."
      },
      {
        text: "Ser 'bueno' es la estrategia perdedora",
        icon: "♟️",
        description: "Nice guys finish last por razones biológicas",
        truth: "Sí. Porque 'bueno' en lenguaje femenino = predecible, controlable, sin opciones, bajo valor. No es opinión. Es cómo funciona su cerebro reptiliano."
      },
      {
        text: "Todo es un juego de poder desde el día 1",
        icon: "👑",
        description: "No hay 'conexión genuina', hay estrategia",
        truth: "Welcome to the red pill. Cada interacción es negociación de poder. Frame, límites, valor. Quien lo niega, pierde. Quien lo domina, gana. Simple y oscuro."
      }
    ]
  }
];

/**
 * Start Quiz
 */
function startQuiz() {
  document.getElementById('welcomeScreen').classList.remove('active');
  document.getElementById('progressContainer').style.display = 'block';
  document.getElementById('progressTotal').textContent = questions.length;

  generateQuestionScreens();
  showQuestion(0);
}

/**
 * Generate Question Screens
 */
function generateQuestionScreens() {
  const container = document.getElementById('questionScreens');

  questions.forEach((q, index) => {
    const screenDiv = document.createElement('div');
    screenDiv.className = 'quiz-screen';
    screenDiv.id = `question${index}`;

    const optionsHTML = q.options.map((opt, optIndex) => `
      <div class="option-card" onclick="selectOption(${index}, ${optIndex})">
        <div class="option-content">
          <div class="option-icon">${opt.icon}</div>
          <div class="option-text">
            <div class="option-title">${opt.text}</div>
            <div class="option-description">${opt.description}</div>
          </div>
        </div>
      </div>
    `).join('');

    screenDiv.innerHTML = `
      <div class="screen-content">
        <div class="question-container">
          <div class="question-number">Pregunta ${index + 1} de ${questions.length}</div>
          <h2 class="question-text">${q.question}</h2>
          <div class="options-grid">
            ${optionsHTML}
          </div>
        </div>
      </div>
    `;

    container.appendChild(screenDiv);

    // Add truth reveal screen after each question
    const truthDiv = document.createElement('div');
    truthDiv.className = 'quiz-screen truth-reveal';
    truthDiv.id = `truth${index}`;
    truthDiv.innerHTML = `
      <div class="screen-content">
        <div class="truth-container">
          <div class="truth-header">
            <div class="truth-icon">🔥</div>
            <h2 class="truth-title">LA VERDAD:</h2>
          </div>
          <div class="truth-text" id="truthText${index}">
            <!-- Truth will be inserted here -->
          </div>
          <button class="btn-primary btn-continue" onclick="continueToNext(${index})">
            CONTINUAR REVELACIÓN →
          </button>
        </div>
      </div>
    `;

    container.appendChild(truthDiv);
  });
}

/**
 * Show Question
 */
function showQuestion(index) {
  document.querySelectorAll('.quiz-screen').forEach(screen => {
    screen.classList.remove('active');
  });

  document.getElementById(`question${index}`).classList.add('active');
  updateProgress(index + 1);
}

/**
 * Update Progress
 */
function updateProgress(current) {
  document.getElementById('progressCurrent').textContent = current;
  const percentage = (current / questions.length) * 100;
  document.getElementById('progressFill').style.width = `${percentage}%`;
}

/**
 * Select Option
 */
function selectOption(questionIndex, optionIndex) {
  const question = questions[questionIndex];
  const option = question.options[optionIndex];

  // Store answer
  quizState.answers[questionIndex] = option;
  quizState.truthsRevealed.push(option.truth);

  // Calculate awakeness based on how "red pill" the answer is
  const awakenessPoints = [1, 2, 3, 4]; // Later options show more awareness
  quizState.awakenessScore += awakenessPoints[optionIndex];

  // Visual feedback
  const optionCards = document.querySelectorAll(`#question${questionIndex} .option-card`);
  optionCards.forEach(card => card.classList.remove('selected'));
  optionCards[optionIndex].classList.add('selected');

  // Show truth reveal
  setTimeout(() => {
    showTruthReveal(questionIndex, option.truth);
  }, 600);
}

/**
 * Show Truth Reveal
 */
function showTruthReveal(questionIndex, truthText) {
  // Hide question
  document.querySelectorAll('.quiz-screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Show truth
  document.getElementById(`truthText${questionIndex}`).innerHTML = `
    <p>${truthText}</p>
  `;
  document.getElementById(`truth${questionIndex}`).classList.add('active');
}

/**
 * Continue to Next
 */
function continueToNext(currentIndex) {
  if (currentIndex < questions.length - 1) {
    showQuestion(currentIndex + 1);
  } else {
    showAnalyzing();
  }
}

/**
 * Show Analyzing Screen
 */
function showAnalyzing() {
  document.querySelectorAll('.quiz-screen').forEach(screen => {
    screen.classList.remove('active');
  });

  document.getElementById('progressContainer').style.display = 'none';
  document.getElementById('analyzingScreen').classList.add('active');

  // Analyzing messages
  const messages = [
    "Analizando nivel de consciencia...",
    "Detectando patrones de pensamiento...",
    "Calculando grado de programación social...",
    "Identificando gaps de conocimiento...",
    "Generando diagnóstico personalizado..."
  ];

  let messageIndex = 0;
  const statusElement = document.getElementById('analyzingStatus');

  const interval = setInterval(() => {
    messageIndex++;
    if (messageIndex < messages.length) {
      statusElement.textContent = messages[messageIndex];
    } else {
      clearInterval(interval);
      setTimeout(() => {
        showResults();
      }, 1000);
    }
  }, 800);
}

/**
 * Show Results
 */
function showResults() {
  document.querySelectorAll('.quiz-screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Calculate awakeness level
  const maxScore = questions.length * 4; // 4 is max points per question
  const awakenessPercentage = (quizState.awakenessScore / maxScore) * 100;

  let diagnosis, awakeness, icon, gapPercentage;

  if (awakenessPercentage < 30) {
    diagnosis = "COMPLETAMENTE DORMIDO";
    awakeness = "Matrix Total";
    icon = "😴";
    gapPercentage = "85-90%";
  } else if (awakenessPercentage < 60) {
    diagnosis = "EMPEZANDO A DESPERTAR";
    awakeness = "Bluepill con dudas";
    icon = "🤔";
    gapPercentage = "60-75%";
  } else if (awakenessPercentage < 85) {
    diagnosis = "PARCIALMENTE CONSCIENTE";
    awakeness = "Redpill incompleto";
    icon = "👁️";
    gapPercentage = "35-50%";
  } else {
    diagnosis = "ALTO NIVEL DE CONSCIENCIA";
    awakeness = "Casi allá";
    icon = "🔥";
    gapPercentage = "15-25%";
  }

  // Update results screen
  document.getElementById('archetypeIcon').textContent = icon;
  document.getElementById('archetypeName').textContent = diagnosis;
  document.getElementById('archetypeDescription').innerHTML = `
    <strong>Nivel de Consciencia:</strong> ${awakeness}<br><br>

    Has visto algunas piezas del puzzle, pero te falta el mapa completo.

    <strong>Estás operando con el ${100 - parseInt(gapPercentage)}% de la información.</strong>
    El ${gapPercentage} restante es la diferencia entre seguir luchando o dominar el juego.
  `;

  // Update stats to reflect gaps
  const stats = [
    { label: "Entiendes las reglas reales", value: Math.min(awakenessPercentage, 90) },
    { label: "Conoces la psicología femenina", value: Math.min(awakenessPercentage - 10, 85) },
    { label: "Dominas el frame y poder", value: Math.min(awakenessPercentage - 5, 88) },
    { label: "Sabes jugar el juego", value: Math.min(awakenessPercentage + 5, 92) }
  ];

  stats.forEach((stat, index) => {
    const statNum = index + 1;
    document.getElementById(`stat${statNum}`).textContent = `${Math.round(stat.value)}%`;
    document.getElementById(`statBar${statNum}`).style.width = `${stat.value}%`;
    document.querySelector(`#statBar${statNum}`).closest('.stat-bar').querySelector('.stat-label span').textContent = stat.label;
  });

  document.getElementById('resultsScreen').classList.add('active');

  setTimeout(() => {
    animateStats();
  }, 500);
}

/**
 * Animate Stats
 */
function animateStats() {
  const bars = document.querySelectorAll('.stat-progress-fill');
  bars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}

/**
 * Show Offer
 */
function showOffer() {
  window.location.href = 'oferta.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('Villano.ai - Progressive Revelation Quiz initialized');
});
