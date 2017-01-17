const audioPaths = []
for (let num of Array(10).keys()) {
  audioPaths[num] = `/assets/${num}.mp3`
}

var audio = {
  enable: false,
  playSoundFiles: function (queueNumbers) {
    if (!this.enable) {
      return;
    }

    queueNumbers = String(queueNumbers).split('')

    let audios = []
    let length = queueNumbers.length
    for (let num of queueNumbers) {
      audios.push(new Audio(audioPaths[num]))
    }
    for (let [i, aud] of audios.entries()) {
      if (i + 1 !== length) {
        let index = i // fix firefox error
        aud.addEventListener('ended', function () {
          audios[index + 1].play()
        })
      }
    }
    this.prefixAndSuffixAudios(audios)
  },

  prefixAndSuffixAudios: function (audios) {
    // Add prefix and suffix
    let length = audios.length
    let prefixAudio = new Audio('/assets/prefix.mp3')
    let suffixAudio = new Audio('/assets/suffix.mp3')

    prefixAudio.addEventListener('ended', function () {
      audios[0].play()
    })

    audios[length - 1].addEventListener('ended', function () {
      suffixAudio.play()
    })

    prefixAudio.play()
  }
}

$(function () {
  // bind audio toggle
  $('input.audio-toggle').change(function () {
    audio.enable = this.checked
  })
})
