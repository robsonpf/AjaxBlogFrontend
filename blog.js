const baseUrl = `http://localhost:3000`


document.addEventListener("DOMContentLoaded", () => {
   axios.get(`${baseUrl}/posts`)
    .then(listOfPosts => {
      if (listOfPosts.data.result.length > 0) {
        document.getElementById('postEditOrDelete').style.display = "block";


        listOfPosts.data.result.forEach((post, index) => {
          const link = document.createElement("a");

          link.setAttribute("href", `#/posts/${post.id}`);
          link.classList.add("list-group-item", "list-group-item-action");
          link.textContent = post.title;

          link.addEventListener("click", showPost)
          if (index === 0) {
            link.classList.add("active");
            document.getElementById("post-title").textContent = post.title;
            document.getElementById("post-content").textContent = post.content;
          }
          document.getElementById('list-of-posts').appendChild(link);
      })
    }
  })
});


const showPost = (event) => {
  document.getElementById("sidebar").querySelector(".active").classList.remove("active")
  document.getElementById("alert").style.display = "none";
  document.getElementById("post-form").style.display = "none";
  document.getElementById("update-form").style.display = "none";
  document.getElementById("postEditOrDelete").style.display = "block";

  let sidebarTab = event.target;
  sidebarTab.classList.add("active");
  let url = sidebarTab.href.split("#/posts/");
  let id = url[1];

  axios.get(`${baseUrl}/posts/${id}`)
    .then(result => {
      const postTitle = document.getElementById("post-title");
      const postContent = document.getElementById("post-content");
      const updatePost = document.getElementById("edit-post");
      const deletePost = document.getElementById("delete-post");
      
      postTitle.textContent = result.data.result.title;
      postContent.textContent = result.data.result.content;
      updatePost.href = `#/posts/${result.data.result.id}`;
      deletePost.href = `#/posts/${result.data.result.id}`;
    })
    .catch(error => {
      console.log(error.response.data.error);
    })
}
