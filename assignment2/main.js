var slideshowImage = document.querySelector(".slideshow-image");
var images = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
  "image6.jpg",
  "image7.jpg",
  "image8.jpg",
];
var textDescription = document.querySelector(".description");
var descriptions = [
  "The Cat and the Book 1",
  "The Cat and the Book 2",
  "Cat Behind Tree 3",
  "Small Kitty 4",
  "Sleeping Kitty 5",
  "Angry Kitty 6",
  "Christmas Kitty 7",
  "Spying Kitty 8",
];
var thumbnails = [
  "images/image1-small.jpg",
  "images/image1-small.jpg",
  "images/image2-small.jpg",
  "images/image3-small.jpg",
  "images/image4-small.jpg",
  "images/image5-small.jpg",
  "images/image6-small.jpg",
  "images/image7-small.jpg",
  "images/image8-small.jpg",
];
var imageIndex = 0;

var activeThumbnail = document.getElementsByClassName("tn-image");
for (var i = 0; i < activeThumbnail.length; i++) {
  activeThumbnail[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

const rightButton = document.querySelector(".right");
const leftButton = document.querySelector(".left");

const onClick = function () {
  imageIndex = this.id;
  setImage();
};



document.getElementById("0").onclick = onClick;
document.getElementById("1").onclick = onClick;
document.getElementById("2").onclick = onClick;
document.getElementById("3").onclick = onClick;
document.getElementById("4").onclick = onClick;
document.getElementById("5").onclick = onClick;
document.getElementById("6").onclick = onClick;
document.getElementById("7").onclick = onClick;

rightButton.addEventListener("click", function () {
  nextImage();
});

leftButton.addEventListener("click", function () {
  previousImage();
});

function previousImage() {
  if (imageIndex <= 0) {
    imageIndex = images.length;
    activeThumbnail[0].className = activeThumbnail[0].className.replace(
      " active",
      ""
    );
    activeThumbnail[7].className += " active";
    imageIndex = 7;
    setImage();
    return;
  }
  imageIndex--;
  activeThumbnail[imageIndex + 1].className = activeThumbnail[
    imageIndex + 1
  ].className.replace(" active", "");

  activeThumbnail[imageIndex].className += " active";
  setImage();
}

function nextImage() {
  if (imageIndex >= images.length - 1) {
    imageIndex = 0;
    activeThumbnail[7].className = activeThumbnail[7].className.replace(
      " active",
      ""
    );
    activeThumbnail[0].className += " active";
    setImage();
    return;
  }
  imageIndex++;
  activeThumbnail[imageIndex - 1].className = activeThumbnail[
    imageIndex - 1
  ].className.replace(" active", "");
  activeThumbnail[imageIndex].className += " active";
  setImage();
}

function setImage() {
  return (
    slideshowImage.setAttribute("src", "images/" + images[imageIndex]),
    (textDescription.textContent = descriptions[imageIndex])
  );
}
