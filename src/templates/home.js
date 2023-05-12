/**
 * Template usado en el components/Home.js-
 */
export const home = `
  <header>
    <img src='../images/logo.png' class='logo-inicio'>
    <label class='title'>Te Recomiendo</label>
  </header>
  <div class='logout'>
    <button class='logout-btn' id="logoutBtn">Salir</button>
  </div>
  <main>
    <div>
      <label class='description'>Que estás leyendo?</label>
      <textarea id="comment" name="comment"></textarea>
    </div>
    <div>
      <button class='publish-btn' id="publishBtn">Publicar</button>
      <button class='modify-btn hidden' id="modifyBtn">Modificar</button>
    </div>
    <section id='wall'></section>
  </main>
`;
