const baseUrl = `http://localhost:3000`


document.addEventListener("DOMContentLoaded", () => {
   axios.get(`${baseUrl}/posts`)
     .then(listOfPosts => {
       console.log("listOfPosts ===>",listOfPosts);
       if (listOfPosts.data.result.length > 0) {
         document.getElementById('postEditOrDelete').style.display = "block"

         console.log(document.getElementById('list-of-posts'));

         listOfPosts.data.result.forEach((post, index) => {
           console.log(post);
           const link = document.createElement("a")

           link.setAttribute("href", `#/posts/${post.id}`)
           link.classList.add("list-group-item", "list-group-item-action")
           link.textContent = post.title

          document.getElementById('list-of-posts').appendChild(link)
         })
       }
     })
})
