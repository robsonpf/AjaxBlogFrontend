document.getElementById("delete-post").addEventListener("click", (event) => {
  event.preventDefault()
  // find id from href in edit link
  let url = event.target.href.split("/posts/")

  let id = url[1];
    // Delete a post by id
  axios.delete(`${baseUrl}/posts/${id}`)
  .then(result => {
    location.assign("index.html");
  })
  .catch(error => {
    console.log(error.response.data.error);
  })

})
