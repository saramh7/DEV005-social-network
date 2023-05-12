/**
 * Template usado en el components/Home.js
 */
export const postTemplate = `
  <article class="post-container" id="postContainer">
    <div class="post-user-image" id="postUserImage">
      <img src="imagen" class="post-image">
    </div>
    <div class="post-body" id="postBody"> 
      <div class="post-header" id="postHeader"> 
        <div class="post-user-data">
          <div class="post-user-name"></div>
          <div class="post-user-email"></div>
        </div>
        <div class="post-options" id="postOptions">
          <div class="edit">
            <i class="fa-regular fa-pen-to-square"></i>
          </div>
          <div class="trash">
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
      <div class="post-comment" id="postComment"> 
      </div>
      <div class="post-footer" id="postFooter"> 
        <div class="post-date" id="postDate"> 
        </div>
        <div class="post-likes" id="postLikes"> 
          <div class="heart" rel="like"></div>
          <div class="like-count"></div>
        </div>
      </div>
    </div> 
  </article>
`;
