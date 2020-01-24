var allImages = document.getElementsByTagName('img');

for (var i = 0; i < allImages.length; i++) {
  allImages[i].addEventListener('mouseover', function() {

    var thisImageHeight = this.clientHeight;
    var thisImageWidth = this.clientWidth;

  this.setAttribute('src', 'https://placedog.net/' + thisImageHeight + '/' + thisImageWidth)
  })
}