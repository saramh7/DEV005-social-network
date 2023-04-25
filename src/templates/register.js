/**
 * Template usado en el components/Register.js
 */
export const registerTemplate = `
  <header>
    <img src='../images/logo.png' class='logo-inicio'>
    <label class='title'> Te Recomiendo</label>
  </header>
  <main>
    <label class='text-crea-cuenta'>Crea tu cuenta</label>
    <br>
    <div class= "div-dato-name-apellido">
    <input type='text' id="nombre" class='nombre-reguister' placeholder='Nombre'>
    <input type='text' id="apellido" class='nombre-reguister' placeholder='Apellido'>
    </div>
    <input type='text' id="email" class='email' placeholder='Correo'>
    <input type='text' id="password" class='password' placeholder='Contraseña'>
    <input type='text' id="password-reconfirmacion" class='password' placeholder='Contraseña'>
    <br>
    <button class='login-btn' id="loginBtn">Crear cuenta</button>
    <hr>
  </main>
`;
