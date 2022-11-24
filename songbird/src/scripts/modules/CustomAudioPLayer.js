export class CustomAudioPlayer {
  constructor(src) {
    this.src = src;
  }

  create() {
    let customPlayer = document.createElement('div');
    customPlayer.classList.add('player');
    customPlayer.innerHTML = `
        <button class="player__play-btn" disabled>
           <div class="player__play-icon paused">
           </div>
        </button>
 
        <div class="player__time">
          <div class="player__time-now"></div> / <div class="player__time-duration"></div>
        </div>
 
        <div class="player__search-container">
          <input class="player__search" type="range" min="0" value="0" step="1" disabled/>
        </div>

        <div class="player__volume-icon high"></div>
        
        <div class="player__volume-container">
          <input class="player__volume" type="range" min="0" max="1" value="1" step="0.1" disabled/>
        </div>
      `;

    const audio = new Audio(this.src),
      playBtn = customPlayer.querySelector('.player__play-btn'),
      playIcon = customPlayer.querySelector('.player__play-icon'),
      currentTime = customPlayer.querySelector('.player__time-now'),
      duration = customPlayer.querySelector('.player__time-duration'),
      searchInput = customPlayer.querySelector('.player__search'),
      volumeInput = customPlayer.querySelector('.player__volume'),
      volumeIcon = customPlayer.querySelector('.player__volume-icon');

    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    audio.onplay = () => {
      playIcon.classList.add('playing');
      playIcon.classList.remove('paused');
    };
    audio.onpause = () => {
      playIcon.classList.add('paused');
      playIcon.classList.remove('playing');
    };

    const createTimeString = (secs) => {
      let ss = Math.floor(secs),
        hh = Math.floor(ss / 3600),
        mm = Math.floor((ss - hh * 3600) / 60);
      ss = ss - hh * 3600 - mm * 60;

      if (hh > 0) {
        mm = mm < 10 ? '0' + mm : mm;
      }
      ss = ss < 10 ? '0' + ss : ss;
      return hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
    };

    audio.addEventListener('loadstart', () => {
      currentTime.innerHTML = 'Loading';
      duration.innerHTML = '';
    });

    audio.addEventListener('loadedmetadata', () => {
      currentTime.innerHTML = createTimeString(0);
      duration.innerHTML = createTimeString(audio.duration);

      searchInput.max = Math.floor(audio.duration);

      let isSearching = false;
      searchInput.addEventListener('input', () => {
        isSearching = true;
      });

      searchInput.addEventListener('change', () => {
        audio.currentTime = searchInput.value;

        if (!audio.paused) audio.play();
        isSearching = false;
      });

      audio.addEventListener('timeupdate', () => {
        if (!isSearching) {
          searchInput.value = Math.floor(audio.currentTime);
        }
      });
    });

    audio.addEventListener('timeupdate', () => {
      currentTime.innerHTML = createTimeString(audio.currentTime);
    });

    volumeInput.addEventListener('change', () => {
      audio.volume = volumeInput.value;

      if (volumeInput.value === '0') {
        volumeIcon.classList.add('muted');
        volumeIcon.classList.remove('high');
        volumeIcon.classList.remove('low');
      } else if (volumeInput.value < 0.5) {
        volumeIcon.classList.add('low');
        volumeIcon.classList.remove('high');
        volumeIcon.classList.remove('muted');
      } else {
        volumeIcon.classList.add('high');
        volumeIcon.classList.remove('low');
        volumeIcon.classList.remove('muted');
      }
    });

    volumeIcon.addEventListener('click', () => {
      if (volumeInput.value !== '0') {
        volumeInput.value = '0';
        volumeIcon.classList.add('muted');
        volumeIcon.classList.remove('high');
        volumeIcon.classList.remove('low');
      } else {
        volumeInput.value = '1';
        volumeIcon.classList.add('high');
        volumeIcon.classList.remove('low');
        volumeIcon.classList.remove('muted');
      }
    });

    audio.addEventListener('canplaythrough', () => {
      playBtn.disabled = false;
      volumeInput.disabled = false;
      searchInput.disabled = false;
    });

    audio.addEventListener('waiting', () => {
      playBtn.disabled = true;
      volumeInput.disabled = true;
      searchInput.disabled = true;
    });

    return customPlayer;
  }
}
