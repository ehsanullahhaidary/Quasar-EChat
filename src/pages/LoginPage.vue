<template>
  <div class="login-wrapper">
    <div class="login">
      <!-- login left side (form) -->
      <div class="login-left">
        <!-- App name at top of form -->
        <span class="login__app-name">Ehsan To Do</span>

        <!-- form with two inputs and a button -->
        <form action="" class="login_form" @submit.prevent>
          <span
            class="sign-in-button input-width"
            :class="{
              'input-round-error':
                errorType === 'bothEmpty' || errorType === 'userEmpty',
            }"
          >
            <!-- UserName input -->
            <input
              type="text"
              v-model="userName"
              placeholder="UserName"
              class="login_input"
              :class="{
                'error-input':
                  errorType === 'bothEmpty' || errorType === 'userEmpty',
              }"
            />
          </span>
          <span
            class="sign-in-button input-width"
            :class="{
              'input-round-error':
                errorType === 'bothEmpty' || errorType === 'passwordEmpty',
            }"
          >
            <!-- Password input -->
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="login_input"
              :class="{
                'error-input':
                  errorType === 'bothEmpty' || errorType === 'passwordEmpty',
              }"
            />
          </span>

          <!-- form submit button -->
          <button @click="loginSubmit()" class="sign-in-button button-width">
            Log in
          </button>
        </form>

        <!--  -->
        <span class="login__sign-in-text"
          >Sign in with your UserName <br />and Password.
        </span>

        <!-- app logo/company logo -->
        <img
          src="../assets/e_logo.jpg"
          alt="Company logo"
          class="login__logo"
        />
      </div>

      <!-- the picture on right side of login section -->
      <div class="login-right">
        <img
          src="../assets/login-image.jpg"
          alt="Login Image"
          class="login__image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// user Name and Password object
const user = {
  userName: "Ehsanullah",
  password: "12345",
};

const userName = ref("");
const password = ref("");
const errorType = ref("");
const router = useRouter();
// form validation logic
function loginSubmit() {
  if (userName.value === "" && password.value === "") {
    errorType.value = "bothEmpty";
  } else if (userName.value === "") {
    errorType.value = "userEmpty";
  } else if (password.value === "") {
    errorType.value = "passwordEmpty";
  } else if (
    userName.value === user.userName &&
    password.value === user.password
  ) {
    localStorage.setItem("userName", userName.value);
    localStorage.setItem("password", password.value);
    router.push({ path: "/" });
  } else {
    errorType.value = "bothEmpty";
  }
}
</script>
<style>
/* main wrapper for login page */
.login-wrapper {
  white-space: nowrap;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    60deg,
    hsl(328deg 100% 85%) 0%,
    hsl(320deg 70% 84%) 14%,
    hsl(303deg 43% 83%) 26%,
    hsl(271deg 41% 84%) 37%,
    hsl(232deg 47% 86%) 48%,
    hsl(210deg 64% 83%) 57%,
    hsl(200deg 77% 81%) 65%,
    hsl(194deg 87% 78%) 73%,
    hsl(190deg 94% 74%) 83%,
    hsl(187deg 100% 69%) 100%
  );
}

/* login form wrapper */
.login {
  width: 900px;
  height: 600px;
  max-height: 90%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
}

/* picture on right of login */
.login-right {
  height: 100%;
  width: 60%;
  flex-shrink: 0;
  z-index: 2;
}

/* left login side (app name, form and logo) */
.login-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  flex-shrink: 0;
  height: 100%;
  width: 40%;
  z-index: 2;
  background-color: #fff;
}

/* app name */
.login__app-name {
  font-size: 40px;
  font-family: inherit;
  font-weight: 300;
  color: #363636;
  letter-spacing: 1px;
  margin-top: 40px;
  margin-bottom: auto;
}

/* form */
.login_form {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 20px;
}

/* image at right of login */
.login__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

/* text bellow form */
.login__sign-in-text {
  font-size: 20px;
  letter-spacing: 1px;
  text-align: center;
  color: #7a7a7a;
  margin-top: 10px;
  font-weight: 200;
}

/* company/app logo */
.login__logo {
  width: 55px;
  border-radius: 7px;
  margin-top: auto;
  margin-bottom: 30px;
  pointer-events: none;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
}

/* CSS of Inputs and Button
  and the light arrount them starts here*/
.sign-in-button {
  padding: 0.4em 0em;
  width: 80%;
  max-width: 300px;
  border: none;
  outline: none;
  color: #7a7a7a;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 5px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.sign-in-button:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  animation: glowing-sign-in-button 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 5px;
}

@keyframes glowing-sign-in-button {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.sign-in-button:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  left: 0;
  top: 0;
  border-radius: 5px;
}

/* CSS of Inputs and Button
  and the light arrount them ends here*/

.input-width {
  padding: 0;
}

/* inputs */
.input-width input {
  border-radius: 5px;
  border: 0;
  outline: none;
  padding: 10px 10px;
  color: #363636;
  width: 100%;
  height: 100%;
}

/* input when erro occures */
.error-input {
  background-color: rgb(255, 210, 210);
}

/* input border when erro occures */
.input-round-error::before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #ff0000,
    #ff00c8
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  animation: glowing-sign-in-button 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 5px;
}

/* media for medium and small screens */
@media (max-width: 950px) {
  .login-wrapper {
    background: white;
  }

  .login {
    overflow: unset;
    box-shadow: none;
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
    align-items: stretch;
    justify-content: stretch;
    overflow-y: scroll;
  }

  .login-right {
    display: none;
  }

  .login-left {
    gap: 25px;
    width: 100%;
    flex-shrink: 0;
    border: none;
    padding-right: 0;
    z-index: 2;
    background-color: #fff;
    border-radius: 5px;
  }

  .login__app-name {
    margin-top: 40px;
  }
}
</style>
