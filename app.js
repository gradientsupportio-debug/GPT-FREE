/**
 * ChatGPT Astra 6 - Pure Mobile UI Logic
 */

// Application State
const state = {
  currentScreen: 1,
  userName: '',
  educationLevel: '',
  shareCount: 0,
  maxShares: 10
};

// DOM Elements
const screenElements = {
  1: document.getElementById('screen-1'),
  2: document.getElementById('screen-2'),
  3: document.getElementById('screen-3')
};

const shareCountDisplay = document.getElementById('share-count-display');
const unlockModal = document.getElementById('unlock-modal');

/**
 * Switch active screen view
 * @param {number} screenNumber - 1, 2, or 3
 */
function switchScreen(screenNumber) {
  if (!screenElements[screenNumber]) return;

  state.currentScreen = screenNumber;

  // Toggle active screen visibility
  Object.keys(screenElements).forEach(num => {
    if (parseInt(num) === screenNumber) {
      screenElements[num].classList.add('active');
    } else {
      screenElements[num].classList.remove('active');
    }
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Proceed from Landing Screen to Form Screen
 */
function proceedToForm() {
  switchScreen(2);
  const nameInput = document.getElementById('user-name');
  if (nameInput) {
    setTimeout(() => nameInput.focus(), 250);
  }
}

/**
 * Handle form submission on Screen 2
 * @param {Event} event 
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('user-name');
  const educationInput = document.getElementById('education-level');

  const name = nameInput.value.trim();
  const education = educationInput.value;

  if (!name || !education) {
    alert('Please enter your name and select an education level.');
    return;
  }

  state.userName = name;
  state.educationLevel = education;

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'SUBMITTING...';

  // Attempt backend sync
  try {
    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, educationLevel: education })
    });
  } catch (err) {
    // Offline or static file mode
  }

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'SUBMIT';
    switchScreen(3);
  }, 350);
}

/**
 * Register share action
 */
async function registerShare(platform) {
  if (state.shareCount < state.maxShares) {
    state.shareCount++;
    updateProgressUI();

    try {
      await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform: platform, count: state.shareCount })
      });
    } catch (e) {
      // Offline mode
    }

    if (state.shareCount >= state.maxShares) {
      setTimeout(showUnlockModal, 400);
    }
  } else {
    showUnlockModal();
  }
}

function updateProgressUI() {
  if (shareCountDisplay) {
    shareCountDisplay.textContent = state.shareCount;
  }
}

/**
 * WhatsApp share action
 */
function shareOnWhatsApp() {
  const text = encodeURIComponent(
    `🔥 Claim free access to GPT-6 Astra! Register here: ${window.location.origin}`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;

  registerShare('whatsapp');
  window.open(whatsappUrl, '_blank');
}

/**
 * Instagram share action
 */
function shareOnInstagram() {
  const shareText = `Claim free access to GPT-6 Astra at ${window.location.origin}`;

  if (navigator.share) {
    navigator.share({
      title: 'Free GPT-6 Astra',
      text: shareText,
      url: window.location.origin
    }).then(() => {
      registerShare('instagram');
    }).catch(() => {
      registerShare('instagram');
    });
  } else {
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Link copied! Share it with your friends on Instagram.');
    }).catch(() => {
      prompt('Copy link to share on Instagram:', shareText);
    });
    registerShare('instagram');
  }
}

function showUnlockModal() {
  if (unlockModal) {
    unlockModal.classList.remove('hidden');
  }
}

function closeModal() {
  if (unlockModal) {
    unlockModal.classList.add('hidden');
  }
}

// Initial status query
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/status');
    if (res.ok) {
      const data = await res.json();
      if (data.shareCount !== undefined) {
        state.shareCount = data.shareCount;
        updateProgressUI();
      }
    }
  } catch (e) {
    // Offline mode
  }
});
