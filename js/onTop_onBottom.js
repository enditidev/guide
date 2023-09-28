window.addEventListener("scroll", toggleScrollButton);

function toggleScrollButton() {
    var btnScrollToTop = document.getElementById("btnScrollToTop");
    var btnScrollToBottom = document.getElementById("btnScrollToBottom");
    var currentPosition = document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight;

    if (currentPosition > 500) {
        btnScrollToTop.style.display = "block";
    } else {
        btnScrollToTop.style.display = "none";
    }

    if (currentPosition > 200 && currentPosition < height - window.innerHeight - 500) {
        btnScrollToBottom.style.display = "block";
    } else {
        btnScrollToBottom.style.display = "none";
    }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function scrollToBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth"
  });
}