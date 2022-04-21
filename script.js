$(function () {
  //html 구성
  const initialSounds = [
    { sound: 'ㄱ', select: false },
    { sound: 'ㄴ', select: false },
    { sound: 'ㄷ', select: false },
    { sound: 'ㄹ', select: false },
    { sound: 'ㅁ', select: false },
    { sound: 'ㅂ', select: false },
    { sound: 'ㅅ', select: false },
    { sound: 'ㅇ', select: false },
    { sound: 'ㅈ', select: false },
    { sound: 'ㅊ', select: false },
    { sound: 'ㅋ', select: false },
    { sound: 'ㅌ', select: false },
    { sound: 'ㅍ', select: false },
    { sound: 'ㅎ', select: false },
    { sound: 'ㄲ', select: false },
    { sound: 'ㄸ', select: false },
    { sound: 'ㅃ', select: false },
    { sound: 'ㅆ', select: false },
    { sound: 'ㅉ', select: false },
  ]

  initialSounds.map(item => {
    $('.setting-box').append(`<li class='initial-sound'>${item.sound}</li>`)
  })

  // 버튼 선택상태 확인
  $('.setting-box').on('click', e => {
    e.target.classList.toggle('clicked')
    const selectItem = e.target.innerText
    initialSounds.map(item => {
      if (item.sound === selectItem) {
        item.select = item.select === false ? true : false
        console.log(e.target.innerText, item)
      }
    })
  })

  // 검사 버튼 클릭 이벤트 핸들러

  // 검사 실행

  // 변환 결과 출력
})
