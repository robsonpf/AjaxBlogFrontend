document.getElementById("makeAPost").addEventListener("click", (event) => {
  event.preventDefault();
  const form = document.getElementById("post-form")
  const postDisplay = document.getElementById("postEditOrDelete")
  const updateView = document.querySelector("#update-form")

  postDisplay.style.display = "none"
  updateView.style.display = "none"
  form.style.display = "block"
})

document.getElementById("create-post").addEventListener("click", (event) => {
    event.preventDefault();
    const form = document.getElementById("post-form");
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const alert = document.getElementById("alert");

    alert.style.display = "none";
    console.log("from ==>", form);
    console.log("title ==>", title);

    //create a new post
  axios.post(`${baseUrl}/posts`, {
    title: title.value,
    content: content.value
  })
    // handle the error message
    .then(result => {
    console.log("result =>>", result.data.result);
      if (result.data.result.errors) {
        alert.style.display = "block";
        alert.textContent = result.data.result.message;
        result.data.result.errors.forEach((message, index) => {

          if (index === result.data.result.errors.length -1) {
            alert.textContent += message;
          } else {
            alert.textContent += `${message}, `;
          }
          alert.style.display = "block";
        })
      } else {
        location.assign("index.html");
      }
    })
    .catch(error => {
    console.log(error);
  })
})
