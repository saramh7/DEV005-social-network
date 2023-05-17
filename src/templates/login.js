/**
 * Template usado en el components/Login.js
 */
import { logo } from '../components/Images.js';

export const loginTemplate = `
  <header>
    <img src=${logo} class='logo-inicio'>
    <div class='logo'>
      <label class='title'>Te Recomiendo</label>
      <label class='title-description'>Somos amantes de los libros.<br>Ven y recomiéndanos tus favoritos!</label>
    </div>
  </header>
  <main>
      <div class='title-screen'>
        <label class='login-greeting'>Bienvenido</label>
        <label class='login-title'>Ingresa Ahora</label>
        <label class='login-description'>Ingresa con tu cuenta para continuar</label>
      </div>
      <form class='login-form' onsubmit="event.preventDefault();">
        <div class="input-login">
          <input type='text' id="email" class='email' placeholder='Ingrese su email'/>
          <input type='password' id="password" class='password' placeholder='Contraseña'/>
        </div>
        <label id="statusLogin" class="status-login"></label>
        <button class='login-btn' id="loginBtn">Entrar</button>
      </form>
    <div class='login-google'>
      <label class='login-google-label'>Puedes ingresar con Social Media</label>
      <button class='login-google-btn' id="loginGoogleBtn">Ingresa con Google&nbsp;&nbsp;<i class="fa-brands fa-google"></i></button>
      <label class='new-account-label'>Aún no tienes cuenta? <a href='/register' id="linkRegister" class='new-account-link'>Regístrate ahora</a></label>
    </div>
  </main>
`;
