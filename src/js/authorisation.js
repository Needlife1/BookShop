document.addEventListener('DOMContentLoaded', function () {
  const authModal = document.getElementById('authModal');
  const openModalBtn = document.querySelector('.sign-in-button');
  const authFormClose = document.querySelector('.auth-form-close');
  const signupLink = document.getElementById('signup-link');
  const signinLink = document.getElementById('signin-link');
  const signupForm = document.getElementById('signup-form');
  const signinForm = document.getElementById('signin-form');
  const submitButton = document.querySelector('.btn-sign-up');
  const mobileSignInButton = document.getElementById('sign-in-button');

  mobileSignInButton.addEventListener('click', function () {
    openAuthModal(authModal);
  });

  const LOCAL_STORAGE_KEY = "user";
  
  function loadSavedUserOnStartup() {
    var userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (userData) {
      replaceSignupButtonWithUserCircle(userData);
      authModal.style.display = 'none';
    };
  };
  
  loadSavedUserOnStartup();

  openModalBtn.addEventListener('click', function () {
    openAuthModal(authModal);
  });

  authFormClose.addEventListener('click', function () {
    authModal.style.display = 'none';
  });

  signupLink.addEventListener('click', function (event) {
    event.preventDefault();
    updateButtonText('Sign up');
  });

  signinLink.addEventListener('click', function (event) {
    event.preventDefault();
    updateButtonText('Sign in');
  });

  signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
      name,
      email,
      password,
    };

    saveUserData(userData);

     replaceSignupButtonWithUserCircle(userData);
     replaceMobileSignupButtonWithUserCircle(userData)

    authModal.style.display = 'none';
    this.reset();
  });

  function openAuthModal(modal) {
    modal.style.display = 'block';
  }

  function saveUserData(userData) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
  }

  function updateButtonText(action) {
    if (submitButton) {
      submitButton.textContent = action;
    }
  }

  function replaceSignupButtonWithUserCircle(user) {
    const signupButton = document.getElementById('sign-in-button-main'); 
    signupButton.style.display = 'none';

    const userCircle = document.createElement('div');
    userCircle.classList.add('user-circle');
    userCircle.textContent = user.name.charAt(0).toUpperCase();

    const rightHeader = document.querySelector('.right-col'); 
    rightHeader.appendChild(userCircle);
}

function replaceMobileSignupButtonWithUserCircle(user) {
  const mobileSignupButton = document.getElementById('sign-in-button'); 
  mobileSignupButton.style.display = 'none';
}
});
 



