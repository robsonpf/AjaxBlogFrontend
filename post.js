document.getElementById("makeAPost").addEventListener("click", (event) => {

  // const form = document.getElementById("post-form")
  $('#post-form').fadeIn()
  const postDisplay = document.getElementById("postEditOrDelete")
  const updateView = document.querySelector("#update-form")

    postDisplay.style.display = "none"
    updateView.style.display = "none"
    // form.style.display = "block"

})
document.getElementById("create-post").addEventListener("click", (event) => {
    event.preventDefault()
    const form = document.getElementById("post-form");
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const alert = document.getElementById("alert");
    console.log("from ==>", form );
    console.log("title ==>", title);

  axios.post(`${baseUrl}/posts`, {
    title: title.value,
    content: content.value
  })
   .then(result => {
     console.log("result =>>", result.data.result);
     if (result.data.result.errors) {
       alert.style.display = "block";
       alert.textContent = result.data.result.message;
       result.data.result.errors.forEach((message, index) => {
         console.log('result.error ===>>', result.data.result.errors);
         if (index === result.data.result.errors.length -1) {
           alert.textContent += message;
         } else {
           alert.textContent += `${message}, `;
         }
       })
     }
     window.location.reload()
  })
})
