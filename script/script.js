$(function () {
  //html 구성
  const initialSounds = [
    { pos: 0, sound: 'ㄱ', select: false },
    { pos: 1, sound: 'ㄲ', select: false },
    { pos: 2, sound: 'ㄴ', select: false },
    { pos: 3, sound: 'ㄷ', select: false },
    { pos: 4, sound: 'ㄸ', select: false },
    { pos: 5, sound: 'ㄹ', select: false },
    { pos: 6, sound: 'ㅁ', select: false },
    { pos: 7, sound: 'ㅂ', select: false },
    { pos: 8, sound: 'ㅃ', select: false },
    { pos: 9, sound: 'ㅅ', select: false },
    { pos: 10, sound: 'ㅆ', select: false },
    { pos: 11, sound: 'ㅇ', select: false },
    { pos: 12, sound: 'ㅈ', select: false },
    { pos: 13, sound: 'ㅉ', select: false },
    { pos: 14, sound: 'ㅊ', select: false },
    { pos: 15, sound: 'ㅋ', select: false },
    { pos: 16, sound: 'ㅌ', select: false },
    { pos: 17, sound: 'ㅍ', select: false },
    { pos: 18, sound: 'ㅎ', select: false },
  ]
  const HANGUL_CHAR_NUM = 588
  let selected = false

  initialize()

  function initialize() {
    $('main').html(
      `<p class="information"></p>
      <ul class="setting-box"></ul>
      <textarea
      class="textInput"
      placeholder="검색할 텍스트를 입력해주세요."
      ></textarea>
      <p class="textSize"><span class="text-size">0</span>자</p>
      `
    )

    //레이아웃, 초기값 설정
    initialSounds.map(item => {
      $('.setting-box').append(`<li class='initial-sound'>${item.sound}</li>`)
    })
    $('.information').text(
      `*사용방법: 초성 글자 버튼 클릭 후, 검색을 원하는 텍스트를 아래
    입력칸에 적은 후, 검색 버튼을 누릅니다.`
    )
    // $('.textInput').val(
    //   `가까나다따라마바빠사싸아자짜차카타파하\n데이터 속성은 순 HTML 속성이기 때문에 CSS에서도 접근할 수 있다는 것에 주목하세요.`
    // )
    //글자 수 세기
    $('.textInput').on('input', e => {
      $('.text-size').text($('.textInput').val().length)
    })

    // 버튼 선택상태 확인
    $('.setting-box').on('click', e => {
      e.target.classList.toggle('clicked')
      const selectItem = e.target.innerText
      initialSounds.map(item => {
        if (item.sound === selectItem) {
          item.select = item.select === false ? true : false
        }
      })
    })
  }

  // 검사 버튼 클릭 이벤트 핸들러 (실행 후 버튼 타입변경)
  $('.btn').on('click', e => {
    if ($(e.target).data('type') === 'find') {
      handleFindBtnClick($('.textInput').val(), $(e.target))
    } else if ($(e.target).data('type') === 'back') {
      initialize()
      initializeSoundSelect()
      $(e.target).data('type', 'find')
      $(e.target).text('검색')
    }
  })

  //select상태 초기화
  function initializeSoundSelect() {
    initialSounds.map(item => {
      item.select = false
    })
  }

  //검색 버튼 컨트롤
  function handleFindBtnClick(text, btn) {
    const textArr = [...text]
    const filteredSounds = initialSounds.filter(
      initialSound => initialSound.select === true
    )
    // console.log(textArr)

    if (filteredSounds.length > 0) {
      const code = findText(textArr, filteredSounds)
      $('main').html(code)
      // console.log($('main').html())
      btn.data('type', 'back')
      btn.text('돌아가기')
    } else {
      alert('하나 이상의 초성을 선택해주세요.')
    }
  }

  // 검색 실행
  function findText(textArr, filteredSounds) {
    const findTextArr = textArr.reduce((para, textItem) => {
      //개행 처리
      if (textItem === '\n') return para + '<br/>'

      const textCode = textItem.charCodeAt(0) - 44032

      //한글 범위 바깥 문자 제외
      if (textCode < 0 || textCode > 11171) {
        return para + textItem
      } else {
        //조건에 맞는 글자 찾기
        let result = textItem
        filteredSounds.find(item => {
          if (item.pos === getPos(textCode)) {
            result = `<strong class="char-${item.pos}">${textItem}</strong>`
          }
        })
        return para + result
      }
    }, '<p class="textResult">')
    return findTextArr + '</p>'
  }

  function getPos(code) {
    return parseInt(code / HANGUL_CHAR_NUM)
  }

  // 변환 결과 출력
})
