/**
 * Template usado en el components/Login.js
 */
export const loginTemplate = `
  <header>
    <img src='../images/logo.png' class='logo-inicio'>
    <label class='title'>Te Recomiendo</label>
  </header>
  <main>
    <label class='description'>Somos amantes de los libros.<br>Ven y recomiéndanos tus favoritos!</label>
    <div class="input-login">
      <input type='text' id="email" class='email' placeholder='Ingrese su email'/>
      <input type='password' id="password" class='password' placeholder='Contraseña'/>
    </div>
    <label id="statusLogin" class="status-login"></label>
    <button class='login-btn' id="loginBtn">Entrar</button>
    <hr>
    <div class='login-google'>
      <button class='login-google-btn' id="loginGoogleBtn">Ingresa con Google</button>
      <label class='register-label' id="reguistradoBtn">Aún no tienes cuenta? <a href='' id="linkRegister" class='register-link'>Regístrate aquí</a></label>
    </div>
  </main>
`;
