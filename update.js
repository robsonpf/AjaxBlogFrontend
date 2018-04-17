document.getElementById("edit-post").addEventListener("click", (event) => {
  event.preventDefault();
  const listOfPosts = document.getElementById("postEditOrDelete");
  const updatePost = document.getElementById("update-form");


  listOfPosts.style.display = "none";
  updatePost.style.display = "inline";


  let url = event.target.href.split("/posts/");
  let id = url[1];

  // get a post by id
  axios.get(`${baseUrl}/posts/${id}`)
  .then(result => {
    const updateTitle = document.getElementById("update-title");
    const updateContent = document.getElementById("update-content");


    updateTitle.value = result.data.result.title;
    updateContent.value = result.data.result.content;
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
})

document.getElementById("update-post").addEventListener("click", (event) => {
  event.preventDefault();
  const updatePost = document.getElementById("update-form");
  const updateTitle = document.getElementById("update-title");
  const updateContent = document.getElementById("update-content");
  const alert = document.getElementById("alert");


  let url = window.location.href.split("/posts/");
  let id = url[1].split("/edit")[0];

  // update post by id
  axios.put(`${baseUrl}/posts/${id}`, {
    title: updateTitle.value,
    content: updateContent.value
  })
  // handle the error message
  .then(result => {
    if (result.data.result.errors) {
      alert.style.display = "block";
      alert.textContent = result.data.result.message;
      result.data.result.errors.forEach((message, index) => {

        if (index === result.data.result.errors.length - 1) {
          alert.textContent += message;
        } else {
          alert.textContent += `${message}, `
        }
        alert.style.display = "block";
      })
    } else {
      location.assign("index.html");
    }
  })
  .catch(error => {
    console.log("error", error);
  });
});
