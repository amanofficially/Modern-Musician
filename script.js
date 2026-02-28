document.addEventListener("DOMContentLoaded", function () {
  /* ===== MOBILE MENU START ===== */

  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");

  menuBtn.addEventListener("click", function () {
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
    } else {
      nav.classList.add("open");
    }
  });

  var allNavLinks = document.querySelectorAll(".header-nav a");

  for (var i = 0; i < allNavLinks.length; i++) {
    allNavLinks[i].addEventListener("click", function () {
      nav.classList.remove("open");
    });
  }

  /* ===== MOBILE MENU END ===== */

  /* ===== AUDIO PLAYER START ===== */

  var audio = document.getElementById("audio");
  var playBtn = document.getElementById("playBtn");
  var progressFill = document.getElementById("progressFill");
  var progressBar = document.getElementById("progressBar");
  var currentTime = document.getElementById("currentTime");
  var duration = document.getElementById("duration");

  audio.volume = 0.6;

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    var mins = Math.floor(seconds / 60);
    var secs = Math.floor(seconds % 60);
    if (secs < 10) {
      secs = "0" + secs;
    }
    return mins + ":" + secs;
  }

  playBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      playBtn.innerHTML = "&#9646;&#9646;";
    } else {
      audio.pause();
      playBtn.innerHTML = "&#9654;";
    }
  });

  audio.addEventListener("loadedmetadata", function () {
    duration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", function () {
    currentTime.textContent = formatTime(audio.currentTime);
    if (audio.duration > 0) {
      var percent = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = percent + "%";
    }
  });

  audio.addEventListener("ended", function () {
    playBtn.innerHTML = "&#9654;";
    progressFill.style.width = "0%";
    currentTime.textContent = "0:00";
  });

  progressBar.addEventListener("click", function (e) {
    var rect = progressBar.getBoundingClientRect();
    var clickX = e.clientX - rect.left;
    var percent = clickX / rect.width;
    audio.currentTime = percent * audio.duration;
    progressFill.style.width = percent * 100 + "%";
  });

  /* ===== AUDIO PLAYER END ===== */
});
