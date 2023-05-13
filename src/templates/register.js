/**
 * Template usado en el components/Register.js
 */
export const registerTemplate = `
  <header>
    <img src='../images/logo.png' class='logo-inicio'>
    <label class='title'>Te Recomiendo</label>
  </header>
  <main>
    <label class='description'>Crea tu cuenta</label>
    <div id="clearRegister" class="input-register">
      <input type='text' id="name" class='name' placeholder='Nombre'/>
      <input type='text' id="lastName" class='last-name' placeholder='Apellido' autocomplete="off"/>
      <input type='text' id="userEmail" class='user-email' placeholder='Email' autocomplete="off"/>
      <input type='password' id="password" class='password' placeholder='Contraseña'/>
      <input type='password' id="confirm" class='confirm' placeholder='Confirmación'/>
    </div>
    <label id="statusLogin" class="status-login"></label>
    <button class='register-btn' id="registerBtn">Crea tu cuenta</button>
   
 </main>
`;
