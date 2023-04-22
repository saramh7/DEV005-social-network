/**
 * Template usado en el components/Register.js
 */
export const loginTemplate = `
  <header>
    <img src='../images/logo.png' class='logo-inicio'>
    <label class='title'> Te Recomiendo</label>
    <label class='saludo'>Somos amantes de los libros. Ven y recomiéndanos tus favoritos</label>
  </header>
  <main>
    <input type='text' id="email" class='email'>Ingrese su email</input>
    <input type='text' id="password" class='password'>Contraseña</input>
    <button class='login-btn' id="loginBtn">Entrar</button>
    <hr>
    <button class='login-google-btn' id="loginGoogleBtn">Ingresa con Google</button>
    <label class='registro'> Aun no tienes cuenta? <a href='' id="linkRegister" class='link-register'>Regístrate aquí</a></label>
  </main>
`;
