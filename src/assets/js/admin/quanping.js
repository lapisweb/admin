function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    }
    else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    }
    else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen();
    }
    else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  }
  else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

// $('.toggle-fullscreen').click(function(e) {
//   e.preventDefault();
//   toggleFullScreen();
// });
