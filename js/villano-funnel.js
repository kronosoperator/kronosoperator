/**
 * Villano.ai - AI Sales Funnel
 * Conversational flow that profiles users and leads to offer
 */

class VillanoFunnel {
  constructor() {
    this.chatContainer = document.getElementById('chatContainer');
    this.userInput = document.getElementById('userInput');
    this.sendBtn = document.getElementById('sendBtn');
    this.loadingIndicator = document.getElementById('loadingIndicator');

    this.conversationState = {
      stage: 0,
      messageCount: 0,
      userProfile: {
        age: null,
        situation: null,
        frustration: null,
        readiness: null
      },
      responses: []
    };

    this.init();
  }

  init() {
    // Event listeners
    this.sendBtn.addEventListener('click', () => this.handleUserInput());
    this.userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleUserInput();
      }
    });

    // Focus input
    this.userInput.focus();
  }

  async handleUserInput() {
    const message = this.userInput.value.trim();

    if (!message) return;

    // Disable input
    this.userInput.disabled = true;
    this.sendBtn.disabled = true;

    // Add user message
    this.addMessage(message, 'user');
    this.userInput.value = '';

    // Store response
    this.conversationState.responses.push(message);
    this.conversationState.messageCount++;

    // Show loading
    this.showLoading();

    // Wait a bit (simulate AI thinking)
    await this.delay(1500 + Math.random() * 1000);

    // Hide loading
    this.hideLoading();

    // Get AI response based on stage
    const response = await this.getAIResponse(message);

    // Add AI message
    this.addMessage(response, 'ai');

    // Progress stage
    this.progressStage();

    // Re-enable input
    this.userInput.disabled = false;
    this.sendBtn.disabled = false;
    this.userInput.focus();

    // Check if we should transition to offer
    if (this.conversationState.stage >= 6) {
      await this.delay(2000);
      this.transitionToOffer();
    }
  }

  async getAIResponse(userMessage) {
    const stage = this.conversationState.stage;
    const lowerMessage = userMessage.toLowerCase();

    // Stage 0: Initial question about readiness
    if (stage === 0) {
      return this.getStage1Response();
    }

    // Stage 1: Age/situation question
    if (stage === 1) {
      return this.getStage2Response(lowerMessage);
    }

    // Stage 2: Frustration identification
    if (stage === 2) {
      return this.getStage3Response(lowerMessage);
    }

    // Stage 3: Challenge beliefs
    if (stage === 3) {
      return this.getStage4Response(lowerMessage);
    }

    // Stage 4: Reveal secrets
    if (stage === 4) {
      return this.getStage5Response(lowerMessage);
    }

    // Stage 5: Final hook before offer
    if (stage === 5) {
      return this.getStage6Response(lowerMessage);
    }

    return "Interesante...";
  }

  getStage1Response() {
    return `
      <p><strong>Bien. Empecemos.</strong></p>
      <p>No importa tu edad ni tu experiencia. Lo que importa es que estás aquí porque algo no funciona.</p>
      <p>Puede que tengas éxito con las mujeres, o puede que estés completamente perdido. En cualquier caso, hay cosas que nadie te ha dicho.</p>
      <p><strong>¿Cuál es tu situación actual con las mujeres?</strong></p>
      <p><em>Sé honesto. Esta conversación es privada.</em></p>
    `;
  }

  getStage2Response(userMessage) {
    // Profile based on keywords
    if (userMessage.includes('novia') || userMessage.includes('relación') || userMessage.includes('pareja')) {
      this.conversationState.userProfile.situation = 'relationship';
    } else if (userMessage.includes('soltero') || userMessage.includes('no tengo') || userMessage.includes('ninguna')) {
      this.conversationState.userProfile.situation = 'single';
    } else if (userMessage.includes('varias') || userMessage.includes('saliendo') || userMessage.includes('dating')) {
      this.conversationState.userProfile.situation = 'dating';
    }

    return `
      <p><strong>Entiendo.</strong></p>
      <p>La mayoría de hombres pasan por lo mismo. Y la razón es simple:</p>
      <p><strong>Te han mentido sobre cómo funcionan realmente las mujeres.</strong></p>
      <p>Te han dicho que seas "bueno", que seas "tú mismo", que las "respetes" (como si el respeto y la seducción fueran opuestos).</p>
      <p>Pero nadie te ha hablado de <strong>hipergamia</strong>, <strong>preselección</strong>, o por qué las mujeres <em>dicen</em> una cosa pero <em>hacen</em> otra.</p>
      <p><strong>¿Qué es lo que más te frustra en tus interacciones con mujeres?</strong></p>
    `;
  }

  getStage3Response(userMessage) {
    // Identify frustration
    if (userMessage.includes('interés') || userMessage.includes('atención')) {
      this.conversationState.userProfile.frustration = 'attraction';
    } else if (userMessage.includes('control') || userMessage.includes('respeto')) {
      this.conversationState.userProfile.frustration = 'frame';
    } else if (userMessage.includes('entiendo') || userMessage.includes('confus')) {
      this.conversationState.userProfile.frustration = 'understanding';
    }

    return `
      <p><strong>Eso es exactamente lo que pensaba.</strong></p>
      <p>Y déjame decirte algo que va a incomodarte:</p>
      <p><strong>No es tu culpa, pero SÍ es tu responsabilidad.</strong></p>
      <p>La sociedad te ha condicionado para que fracases. Te enseñaron a pedir permiso, a evitar conflictos, a ser "seguro".</p>
      <p>Pero las mujeres no se sienten atraídas por hombres "seguros". Se sienten atraídas por hombres que <strong>entienden el juego</strong> y saben jugarlo.</p>
      <p>¿Sabes cuál es la diferencia entre un hombre que tiene opciones y uno que no las tiene?</p>
    `;
  }

  getStage4Response(userMessage) {
    return `
      <p><strong>El conocimiento.</strong></p>
      <p>El hombre con opciones entiende tres cosas fundamentales:</p>
      <p>1️⃣ <strong>Las mujeres no eligen con lógica.</strong> Eligen con emoción. Tu "buen comportamiento" no genera emoción.</p>
      <p>2️⃣ <strong>La atracción no es negociable.</strong> O existe o no existe. Y sigue patrones específicos que puedes aprender.</p>
      <p>3️⃣ <strong>El poder está en quien menos necesita.</strong> Cuando dejas de perseguir, empiezas a ser perseguido.</p>
      <p><em>Esto es solo la punta del iceberg.</em></p>
      <p><strong>¿Estás listo para ir más profundo?</strong></p>
    `;
  }

  getStage5Response(userMessage) {
    const isReady = lowerMessage =>
      lowerMessage.includes('sí') ||
      lowerMessage.includes('si') ||
      lowerMessage.includes('listo') ||
      lowerMessage.includes('adelante') ||
      lowerMessage.includes('claro');

    this.conversationState.userProfile.readiness = isReady(userMessage);

    return `
      <p><strong>Perfecto.</strong></p>
      <p>Durante años he estudiado psicología evolutiva, hipergamia, teoría de juegos aplicada a la seducción, y los patrones inconscientes que las mujeres siguen.</p>
      <p>He condensado todo esto en un manual. No el típico libro de "consejos de citas". Esto es diferente.</p>
      <p><strong>El Manual del Villano</strong> contiene:</p>
      <p>📕 <strong>El libro completo en PDF</strong> - Sin censura. Sin filtros. La verdad cruda sobre seducción y poder.</p>
      <p>🧠 <strong>3 Mapas Mentales Gráficos</strong> - Visualiza los conceptos complejos de forma simple.</p>
      <p>🎧 <strong>Audios de sabiduría narrados</strong> - Para internalizarlo mientras haces otras cosas.</p>
      <p>Todo personalizado según tu perfil. Todo diseñado para convertirte en el hombre que controla sus relaciones, no al revés.</p>
      <p><strong>¿Quieres acceso completo?</strong></p>
    `;
  }

  getStage6Response(userMessage) {
    return `
      <p><strong>Es tu decisión.</strong></p>
      <p>Puedes seguir como hasta ahora, con los mismos resultados.</p>
      <p>O puedes obtener el conocimiento que cambia el juego.</p>
      <p><strong>El precio es $147 USD.</strong></p>
      <p>Menos de lo que gastas en una cita que no lleva a ningún lado.</p>
      <p>Pero la diferencia es que esto es una inversión que te sirve para toda la vida.</p>
      <p class="pulse"><strong>👇 Haz clic abajo para acceder ahora:</strong></p>
    `;
  }

  progressStage() {
    this.conversationState.stage++;
  }

  addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message fade-in`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = content;

    messageDiv.appendChild(contentDiv);
    this.chatContainer.appendChild(messageDiv);

    // Scroll to bottom
    this.scrollToBottom();
  }

  transitionToOffer() {
    // Add CTA button
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'message ai-message fade-in';
    ctaDiv.style.maxWidth = '100%';
    ctaDiv.style.width = '100%';

    const ctaContent = document.createElement('div');
    ctaContent.className = 'message-content';
    ctaContent.style.textAlign = 'center';
    ctaContent.innerHTML = `
      <a href="oferta.html" class="cta-button">
        🔥 OBTENER ACCESO COMPLETO 🔥
      </a>
      <p style="margin-top: 1rem; font-size: 0.85rem; color: var(--villain-text-dim);">
        Acceso inmediato • Pago seguro con Mercado Pago
      </p>
    `;

    ctaDiv.appendChild(ctaContent);
    this.chatContainer.appendChild(ctaDiv);

    // Disable input
    this.userInput.disabled = true;
    this.sendBtn.disabled = true;
    this.userInput.placeholder = "Conversación completada. Haz clic en el botón arriba.";

    this.scrollToBottom();
  }

  showLoading() {
    this.loadingIndicator.classList.add('active');
    this.scrollToBottom();
  }

  hideLoading() {
    this.loadingIndicator.classList.remove('active');
  }

  scrollToBottom() {
    setTimeout(() => {
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }, 100);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize funnel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.villanoFunnel = new VillanoFunnel();
});
