/**
 * Template usado en el components/Register.js
 */
export const registerTemplate = `
  <header>
    <img src='../images/logo.png' class='logo-inicio'>
    <div class='logo'>
      <label class='title'>Te Recomiendo</label>
      <label class='title-description'>Somos amantes de los libros.<br>Ven y recomiéndanos tus favoritos!</label>
    </div>
  </header>
  <main>
    <div class='title-screen'>
      <label class='login-greeting'>Crea una</label>
      <label class='login-title'>Nueva Cuenta</label>
      <label class='login-description'>y obtén acceso ilimitado a nuestra red social!</label>
    </div>
    <div class="input-register">
      <input type='text' id="name" class='name' placeholder='Nombre'/>
      <input type='text' id="lastName" class='last-name' placeholder='Apellido' autocomplete="off"/>
      <input type='text' id="userEmail" class='user-email' placeholder='Email' autocomplete="off"/>
      <input type='password' id="password" class='password' placeholder='Contraseña'/>
      <input type='password' id="confirm" class='confirm' placeholder='Confirmación'/>
    </div>
    <label id="statusLogin" class="status-login"></label>
    <div class='register-button-container'>
      <button class='back-btn' id="backBtn">Volver</button>
      <button class='register-btn' id="registerBtn">Crear cuenta</button>
    </div>
 </main>
`;
