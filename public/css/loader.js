document.addEventListener('DOMContentLoaded', function () {
  var carouselElems = document.querySelector('.carousel.carousel-slider');
      var carouselInstance = M.Carousel.init(carouselElems, {
          fullWidth: true,
          indicators: true
      });
 
  function moveNextCarousel() {
      var elems = document.querySelector('.carousel.carousel-slider');
      var moveRight = M.Carousel.getInstance(elems);
      moveRight.next(1);
  }
  function movePrevCarousel() {
      var elems = document.querySelector('.carousel.carousel-slider');
      var moveLeft = M.Carousel.getInstance(elems);
      moveLeft.prev(1);
  }
});
