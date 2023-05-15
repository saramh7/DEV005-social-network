/**
 * Template usado en el components/Home.js-
 */
export const home = `
  <header>
    <img src='../images/logo.png' class='logo-inicio'>
    <label class='title'>Te Recomiendo</label>
  </header>
  <div class='logout'>
    <button class='logout-btn' id="logoutBtn"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
  </div>
  <main>
    <div class='home-post-container'>
      <label class='home-post-title'>Que estás leyendo?</label>
      <textarea class='home-post-comment' id="comment" name="comment" maxlength="300"></textarea>
      <div id="the-count" class='home-post-counter'>
        <span id="current">0</span>
        <span id="maximum">/ 300</span>
      </div>
    </div>
    <div class='home-button-container'>
      <button class='publish-btn' id="publishBtn">Publicar</button>
      <button class='modify-btn hidden' id="modifyBtn">Modificar</button>
    </div>
    <label id="statusWall" class="status-wall"></label>
    <section id='wall'></section>
  </main>
`;
