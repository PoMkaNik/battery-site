// nav change bottom-border anf bottom corner radius on scroll
// get initial position of the element
const navigationElement = $('.navigation');
const bannerElement = $('#banner');

// assign scroll event listener
$(window).scroll(function () {
  // get current position
  const currentScroll = $(window).scrollTop();

  if (currentScroll >= bannerElement.height()) {
    // apply border-bottom, border-radius
    navigationElement.css({
      // scroll to that element or below it
      'border-bottom': '1px solid gray',
      'border-radius': '15px',
    });
  } else {
    navigationElement.css({
      // if you scroll above it
      // remove changes in css
      'border-bottom': 'none',
      'border-radius': '15px 15px 0 0',
    });
  }
});

// text [2V, 6V, 8V, 12V] rotation
const TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  const that = this;
  let delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  const elements = document.getElementsByClassName('txt-rotate');
  for (let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute('data-rotate');
    const period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};