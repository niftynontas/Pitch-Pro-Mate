// Voice input button
const startRecordBtn = document.getElementById('start-record-btn');
const userInput = document.getElementById('userInput');

startRecordBtn.addEventListener('click', () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Sorry, your browser does not support speech recognition.');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    userInput.value = speechToText;
  };

  recognition.onerror = (event) => {
    alert('Error occurred in speech recognition: ' + event.error);
  };
});

// Submit button with realistic AI feedback
document.getElementById('submitBtn').addEventListener('click', () => {
  const userInputField = document.getElementById('userInput');
  const pitch = userInputField.value.trim();
  const tone = document.getElementById('tone').value;
  const chatWindow = document.getElementById('chatWindow');
  const loadingDiv = document.getElementById('loading');

  if (!pitch) {
    alert('Please type or speak your sales pitch first!');
    return;
  }

  // Show user's pitch in chat
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'user-msg';
  userMsgDiv.textContent = pitch;
  chatWindow.appendChild(userMsgDiv);

  // Clear input
  userInputField.value = '';

  // Show loading
  loadingDiv.style.display = 'block';

  setTimeout(() => {
    loadingDiv.style.display = 'none';

    // Feedback options for variety
    const feedbackOptions = [
      "Your opening is strong — it grabs attention nicely.",
      "Try to make your key benefits stand out a bit more.",
      "Your closing could be more impactful — aim to leave a lasting impression.",
      "The tone feels approachable, great for building trust.",
      "Consider being a bit more concise for greater clarity.",
      "Excellent use of persuasive language — it sells well.",
      "You sound confident — that's essential in sales!",
      "Adding a question for the customer could boost engagement.",
      "A call to action at the end would make your pitch more complete.",
      "You maintained good energy throughout — well done!"
    ];

    const randomFeedback1 = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
    const randomFeedback2 = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];

    // Keyword-specific feedback
    let extraFeedback = "";
    const lowerPitch = pitch.toLowerCase();

    if (lowerPitch.includes('affordable')) {
      extraFeedback += "\n\nLove that you emphasized affordability — that's a key selling point!";
    }
    if (lowerPitch.includes('eco')) {
      extraFeedback += "\n\nSustainability focus is great — customers care about that!";
    }
    if (lowerPitch.includes('fast')) {
      extraFeedback += "\n\nQuick service is always attractive to buyers — good mention!";
    }
    if (lowerPitch.includes('innovative')) {
      extraFeedback += "\n\nHighlighting innovation helps show you're offering something unique.";
    }
    document.getElementById('clearChatBtn').addEventListener('click', () => {
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.innerHTML = '';  // Clear all messages
});
    // Final AI feedback
    const feedback = `Based on your pitch in a "${tone}" tone:\n\n- ${randomFeedback1}\n- ${randomFeedback2}${extraFeedback}\n\nKeep practicing to perfect your delivery!`;

    // Show AI feedback in chat
    const aiMsgDiv = document.createElement('div');
    aiMsgDiv.className = 'ai-msg';
    aiMsgDiv.textContent = feedback;
    chatWindow.appendChild(aiMsgDiv);

    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 1000); // 1-second delay to simulate thinking
});
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('night-mode');
  
  if (document.body.classList.contains('night-mode')) {
    themeLabel.textContent = 'Night Mode';
  } else {
    themeLabel.textContent = 'Day Mode';
  }
});

document.getElementById('getTipsBtn').addEventListener('click', () => {
  const tips = [
    "🎤 Tone:\n- Speak with energy and enthusiasm — it shows you care about your product.\n- Match your tone to your audience — friendly for casual, formal for professional settings.",
    
    "💡 Clarity:\n- Keep your language simple and avoid complicated jargon — clear is better than clever.\n- Focus on one main idea — don't overload your listener with too many messages.",
    
    "🏗️ Structure:\n- Start strong with a hook — grab attention in the first few seconds.\n- Finish with a clear call to action — tell the listener exactly what you want them to do next.",
    
    "💪 Confidence:\n- Believe in your solution — your confidence convinces the customer to trust you.\n- Practice beforehand — preparation reduces nerves and makes your pitch smoother.",
    
    "👀 Body Language:\n- Smile and maintain good posture — it makes you appear approachable and credible.\n- Use hand gestures naturally — they help emphasize key points without being distracting."
  ];

  const chatWindow = document.getElementById('chatWindow');

  tips.forEach(tip => {
    const tipDiv = document.createElement('div');
    tipDiv.className = 'ai-msg';
    tipDiv.textContent = tip;
    chatWindow.appendChild(tipDiv);
  });

  chatWindow.scrollTop = chatWindow.scrollHeight;
});
