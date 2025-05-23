  document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });


  const allBlogs = document.getElementById("allBlogsDrop");
  const topics = document.getElementById("topicDrop");
  const tags = document.getElementById("tagDrop");

  if (window.location.pathname === '/blog') {
    allBlogs.classList.add("is-selected")
  } else if (window.location.pathname === '/topics') {
    topics.classList.add("is-selected")
  } else if (window.location.pathname === '/tags') {
    tags.classList.add("is-selected")
  } else {
    allBlogs.classList.remove("is-selected")
    topics.classList.remove("is-selected")
    tags.classList.remove("is-selected")
  }

});

