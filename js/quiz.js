/**
 * Villano.ai - Visual Quiz Logic
 */

// Quiz State
const quizState = {
  currentQuestion: 0,
  answers: [],
  scores: {
    alpha: 0,      // Conquistador
    strategic: 0,  // Estratega
    charismatic: 0,// Carismático
    dominant: 0    // Dominante
  }
};

// Quiz Questions
const questions = [
  {
    id: 1,
    question: "¿Cómo reaccionas cuando una mujer te rechaza?",
    options: [
      {
        text: "Me retiro y busco otra oportunidad",
        icon: "🚶",
        description: "Mantienes la calma y sigues adelante",
        scores: { strategic: 3, alpha: 1 }
      },
      {
        text: "Insisto con más intensidad",
        icon: "🔥",
        description: "Ves el rechazo como un desafío a superar",
        scores: { alpha: 3, dominant: 2 }
      },
      {
        text: "Uso el humor para cambiar la dinámica",
        icon: "😏",
        description: "Transformas la situación con carisma",
        scores: { charismatic: 3, strategic: 1 }
      },
      {
        text: "No acepto un no por respuesta fácilmente",
        icon: "👑",
        description: "Eres persistente y dominante",
        scores: { dominant: 3, alpha: 2 }
      }
    ]
  },
  {
    id: 2,
    question: "En una primera cita, ¿quién lleva el control?",
    options: [
      {
        text: "Yo decido todo desde el principio",
        icon: "⚡",
        description: "Tomas el liderazgo completo",
        scores: { dominant: 3, alpha: 2 }
      },
      {
        text: "Dejamos que fluya naturalmente",
        icon: "🌊",
        description: "Prefieres equilibrio y autenticidad",
        scores: { charismatic: 2, strategic: 2 }
      },
      {
        text: "Leo la situación y me adapto",
        icon: "🧠",
        description: "Eres estratégico y observador",
        scores: { strategic: 3, charismatic: 1 }
      },
      {
        text: "Yo dirijo pero hago que parezca idea de ella",
        icon: "🎭",
        description: "Control sutil e inteligente",
        scores: { strategic: 3, dominant: 2 }
      }
    ]
  },
  {
    id: 3,
    question: "¿Qué es lo más importante en la seducción?",
    options: [
      {
        text: "Dominancia y presencia física",
        icon: "💪",
        description: "El poder y la masculinidad son clave",
        scores: { alpha: 3, dominant: 2 }
      },
      {
        text: "Inteligencia emocional y conexión",
        icon: "💭",
        description: "Entender y conectar profundamente",
        scores: { charismatic: 3, strategic: 1 }
      },
      {
        text: "Timing y estrategia perfecta",
        icon: "⏰",
        description: "Saber cuándo y cómo actuar",
        scores: { strategic: 3, alpha: 1 }
      },
      {
        text: "Control absoluto del frame",
        icon: "🎯",
        description: "Quien controla el marco, controla todo",
        scores: { dominant: 3, strategic: 2 }
      }
    ]
  },
  {
    id: 4,
    question: "Una mujer te pone a prueba con drama. ¿Qué haces?",
    options: [
      {
        text: "Ignoro completamente y sigo con lo mío",
        icon: "🚫",
        description: "No reaccionas a manipulación",
        scores: { alpha: 3, dominant: 2 }
      },
      {
        text: "Le demuestro que veo el juego",
        icon: "🔍",
        description: "Reconoces y expones la prueba",
        scores: { strategic: 3, charismatic: 1 }
      },
      {
        text: "Uso humor para desarmarla",
        icon: "😄",
        description: "Transformas tensión en atracción",
        scores: { charismatic: 3, strategic: 1 }
      },
      {
        text: "Establezco un límite claro e inmediato",
        icon: "⛔",
        description: "Impones tu frame con firmeza",
        scores: { dominant: 3, alpha: 2 }
      }
    ]
  },
  {
    id: 5,
    question: "¿Cómo manejas la tensión sexual?",
    options: [
      {
        text: "La escalo progresivamente con tacto",
        icon: "📈",
        description: "Construyes anticipación gradual",
        scores: { strategic: 3, charismatic: 1 }
      },
      {
        text: "Voy directo cuando siento el momento",
        icon: "⚡",
        description: "Actúas con decisión y confianza",
        scores: { alpha: 3, dominant: 2 }
      },
      {
        text: "Juego con ella, acerco y retiro",
        icon: "🎲",
        description: "Creas tensión con push-pull",
        scores: { strategic: 3, charismatic: 2 }
      },
      {
        text: "Tomo el control físico sutilmente",
        icon: "🤝",
        description: "Lideras con kino y presencia",
        scores: { dominant: 3, alpha: 1 }
      }
    ]
  },
  {
    id: 6,
    question: "Tu mayor ventaja con las mujeres es:",
    options: [
      {
        text: "Mi presencia y energía masculina",
        icon: "⚡",
        description: "Irradias confianza natural",
        scores: { alpha: 3, dominant: 1 }
      },
      {
        text: "Mi capacidad de leer situaciones",
        icon: "👁️",
        description: "Ves lo que otros no ven",
        scores: { strategic: 3, charismatic: 1 }
      },
      {
        text: "Mi personalidad magnética",
        icon: "✨",
        description: "Naturalmente atraes atención",
        scores: { charismatic: 3, alpha: 1 }
      },
      {
        text: "Mi capacidad de dominar el frame",
        icon: "🎯",
        description: "Controlas cualquier interacción",
        scores: { dominant: 3, strategic: 1 }
      }
    ]
  },
  {
    id: 7,
    question: "¿Cómo ves las relaciones a largo plazo?",
    options: [
      {
        text: "Yo establezco las reglas desde el inicio",
        icon: "📜",
        description: "Liderazgo claro desde día uno",
        scores: { dominant: 3, alpha: 2 }
      },
      {
        text: "Prefiero mantener opciones abiertas",
        icon: "🔓",
        description: "No te comprometes fácilmente",
        scores: { alpha: 3, strategic: 1 }
      },
      {
        text: "Busco equilibrio entre libertad y conexión",
        icon: "⚖️",
        description: "Estrategia de relación balanceada",
        scores: { strategic: 3, charismatic: 2 }
      },
      {
        text: "Construyo conexión profunda pero mantengo frame",
        icon: "🏛️",
        description: "Intimidad con liderazgo",
        scores: { charismatic: 2, dominant: 2, strategic: 1 }
      }
    ]
  },
  {
    id: 8,
    question: "Tu filosofía sobre las mujeres:",
    options: [
      {
        text: "Responden a fuerza y confianza",
        icon: "💪",
        description: "La masculinidad atrae naturalmente",
        scores: { alpha: 3, dominant: 1 }
      },
      {
        text: "Son predecibles si entiendes psicología",
        icon: "🧩",
        description: "Todo es un sistema comprensible",
        scores: { strategic: 3, alpha: 1 }
      },
      {
        text: "Cada una es única y requiere calibración",
        icon: "🎨",
        description: "Adaptabilidad y empatía",
        scores: { charismatic: 3, strategic: 1 }
      },
      {
        text: "Necesitan un líder que las domine",
        icon: "👑",
        description: "Dominancia es la clave absoluta",
        scores: { dominant: 3, alpha: 2 }
      }
    ]
  }
];

// Archetypes
const archetypes = {
  alpha: {
    name: "EL CONQUISTADOR",
    icon: "⚡",
    description: "Eres un hombre de acción directa. Tu energía masculina es tu mayor activo y no tienes miedo de ir por lo que quieres. Las mujeres perciben tu confianza innata, pero a veces tu intensidad puede ser excesiva. Tu mayor desafío es aprender a calibrar y entender las dinámicas psicológicas más sutiles.",
    stats: { attraction: 85, frame: 72, emotional: 68, dominance: 79 }
  },
  strategic: {
    name: "EL ESTRATEGA",
    icon: "🧠",
    description: "Eres un maestro del timing y la lectura de situaciones. Entiendes que la seducción es un juego de ajedrez, no de fuerza bruta. Tu capacidad analítica te da ventaja, pero a veces te quedas en tu cabeza y pierdes el momento de actuar. Tu desafío es combinar tu inteligencia con más acción decisiva.",
    stats: { attraction: 75, frame: 88, emotional: 82, dominance: 71 }
  },
  charismatic: {
    name: "EL CARISMÁTICO",
    icon: "✨",
    description: "Tu personalidad magnética es tu superpoder. Sabes conectar, hacer reír, y crear química instantánea. Las mujeres disfrutan tu compañía, pero a veces eres demasiado disponible o amigable. Tu desafío es mantener la polaridad sexual y no caer en la friendzone por ser 'demasiado bueno'.",
    stats: { attraction: 88, frame: 71, emotional: 91, dominance: 65 }
  },
  dominant: {
    name: "EL DOMINANTE",
    icon: "👑",
    description: "Control del frame es tu segunda naturaleza. Sabes establecer límites, liderar, y nunca cedes tu poder. Las mujeres respetan tu liderazgo, pero a veces tu rigidez puede crear fricción innecesaria. Tu desafío es balancear tu dominancia con inteligencia emocional y flexibilidad estratégica.",
    stats: { attraction: 80, frame: 95, emotional: 73, dominance: 92 }
  }
};

/**
 * Start Quiz
 */
function startQuiz() {
  // Hide welcome screen
  document.getElementById('welcomeScreen').classList.remove('active');

  // Show progress bar
  document.getElementById('progressContainer').style.display = 'block';

  // Update progress
  document.getElementById('progressTotal').textContent = questions.length;

  // Generate question screens
  generateQuestionScreens();

  // Show first question
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
  });
}

/**
 * Show Question
 */
function showQuestion(index) {
  // Hide all screens
  document.querySelectorAll('.quiz-screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Show current question
  document.getElementById(`question${index}`).classList.add('active');

  // Update progress
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

  // Add scores
  Object.keys(option.scores).forEach(key => {
    quizState.scores[key] += option.scores[key];
  });

  // Visual feedback
  const optionCards = document.querySelectorAll(`#question${questionIndex} .option-card`);
  optionCards.forEach(card => card.classList.remove('selected'));
  optionCards[optionIndex].classList.add('selected');

  // Move to next question or show results
  setTimeout(() => {
    if (questionIndex < questions.length - 1) {
      showQuestion(questionIndex + 1);
    } else {
      showAnalyzing();
    }
  }, 500);
}

/**
 * Show Analyzing Screen
 */
function showAnalyzing() {
  // Hide all screens
  document.querySelectorAll('.quiz-screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Hide progress bar
  document.getElementById('progressContainer').style.display = 'none';

  // Show analyzing screen
  document.getElementById('analyzingScreen').classList.add('active');

  // Simulate analyzing process
  const messages = [
    "Procesando perfil psicológico...",
    "Analizando patrones de respuesta...",
    "Identificando arquetipo dominante...",
    "Calculando potencial seductor...",
    "Generando análisis personalizado..."
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
  // Calculate dominant archetype
  const archetype = calculateArchetype();

  // Hide all screens
  document.querySelectorAll('.quiz-screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Populate results
  document.getElementById('archetypeIcon').textContent = archetype.icon;
  document.getElementById('archetypeName').textContent = archetype.name;
  document.getElementById('archetypeDescription').textContent = archetype.description;

  // Update stats
  document.getElementById('stat1').textContent = `${archetype.stats.attraction}%`;
  document.getElementById('statBar1').style.width = `${archetype.stats.attraction}%`;

  document.getElementById('stat2').textContent = `${archetype.stats.frame}%`;
  document.getElementById('statBar2').style.width = `${archetype.stats.frame}%`;

  document.getElementById('stat3').textContent = `${archetype.stats.emotional}%`;
  document.getElementById('statBar3').style.width = `${archetype.stats.emotional}%`;

  document.getElementById('stat4').textContent = `${archetype.stats.dominance}%`;
  document.getElementById('statBar4').style.width = `${archetype.stats.dominance}%`;

  // Show results screen
  document.getElementById('resultsScreen').classList.add('active');

  // Animate stats
  setTimeout(() => {
    animateStats();
  }, 500);
}

/**
 * Calculate Archetype
 */
function calculateArchetype() {
  const scores = quizState.scores;

  // Find highest score
  let maxScore = 0;
  let dominantType = 'alpha';

  Object.keys(scores).forEach(type => {
    if (scores[type] > maxScore) {
      maxScore = scores[type];
      dominantType = type;
    }
  });

  return archetypes[dominantType];
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

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Villano.ai Quiz initialized');
});
