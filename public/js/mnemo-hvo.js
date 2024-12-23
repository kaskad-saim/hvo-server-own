const pumpingFunc = (pump, pumpHz) => {
  if (pumpHz.innerHTML >= 5) {
    pump.style.animationPlayState = 'running';
  } else {
    pump.style.animationPlayState = 'paused';
  }
};

const pump11 = document.querySelector('.mnemo__gif-pump-1-1 img');
const pump11Hz = document.querySelector('.n1-1-hz span');

pumpingFunc(pump11, pump11Hz);

const pump12 = document.querySelector('.mnemo__gif-pump-1-2 img');
const pump12Hz = document.querySelector('.n1-2-hz span');

pumpingFunc(pump12, pump12Hz);

const pump21 = document.querySelector('.mnemo__gif-pump-2-1 img');
const pump21Hz = document.querySelector('.n2-1-hz span');

pumpingFunc(pump21, pump21Hz);

const pump22 = document.querySelector('.mnemo__gif-pump-2-2 img');
const pump22Hz = document.querySelector('.n2-2-hz span');

pumpingFunc(pump22, pump22Hz);

// Исполнительный механизм
const klapanBorderLeft = (param, color) => {
  param.style = `border-left: 10px solid ${color}`;
};

const klapanBorderRight = (param, color) => {
  param.style = `border-right: 10px solid ${color}`;
};

const im1Left = document.querySelector('.mnemo__im1-left');
const im1Right = document.querySelector('.mnemo__im1-right');
const im1Value = document.querySelector('.im1-value');

const green = 'green';
const red = 'red';

if (im1Value.innerHTML >= 5) {
  klapanBorderLeft(im1Left, green);
  klapanBorderRight(im1Right, green);
} else {
  klapanBorderLeft(im1Left, red);
  klapanBorderRight(im1Right, red);
}

// Автоматическая шкала уровня в ёмкостях

const levelObj = (minScale, maxScale, current, maxSize, level, levelPercent, minSet, maxSet) => {
  let totalScale = maxScale - minScale;
  let valueFromMin = current - minScale;
  let percentage = (valueFromMin / totalScale) * 100;
  let px = (maxSize * percentage) / 100;
  levelPercent.innerHTML = parseFloat(percentage.toFixed(0));
  level.style.height = px + 'px';

  if (levelPercent.innerHTML <= minSet || levelPercent.innerHTML >= maxSet) {
    level.style.backgroundColor = 'red';
  }
};

const levelE11 = document.querySelector('.column-e1-1__percent');
const valueE11Current = document.querySelector('.e1-1-value').innerHTML;
const levelE11Percent = document.querySelector('.span-e1-1');

const levelE12 = document.querySelector('.column-e1-2__percent');
const valueE12Current = document.querySelector('.e1-2-value').innerHTML;
const levelE12Percent = document.querySelector('.span-e1-2');

let screenWidth = window.innerWidth;

if ((levelE11, valueE11Current, levelE11Percent)) {
  levelObj(0, 1600, valueE11Current, 88, levelE11, levelE11Percent, 0, 100);
  if (screenWidth < 1280) {
    levelObj(0, 1600, valueE11Current, 70, levelE11, levelE11Percent, 0, 100);
  }
}

if ((levelE12, valueE12Current, levelE12Percent)) {
  levelObj(0, 1600, valueE12Current, 88, levelE12, levelE12Percent, 0, 100);
  if (screenWidth < 1280) {
    levelObj(0, 1600, valueE12Current, 70, levelE12, levelE12Percent, 0, 100);
  }
}

//включение/отключение всплывающих подсказок
// tooltips
const hoverNoneBtn = document.querySelector('.hover-none-btn');
const hoverElemParam = document.querySelectorAll('.mnemo__tooltip');

const toggleBtnText = () => {
  hoverNoneBtn.innerHTML =
    hoverNoneBtn.innerHTML == 'Выключить всплывающие подсказки'
      ? 'Включить всплывающие подсказки'
      : 'Выключить всплывающие подсказки';
};

hoverNoneBtn.addEventListener('click', () => {
  for (let i = 0; i < hoverElemParam.length; i++) {
    const item = hoverElemParam[i];
    item.classList.toggle('enabled-hover');
  }
  toggleBtnText();
});

// --------------------Модальное окно--------------------

const btnModal = document.querySelector('.btn-modal');
const modalBackground = document.querySelector('.modal-js');
const modalClose = document.querySelector('.mnemo__modal-close');
const modalActive = document.querySelector('.mnemo__modal-active');

const accordionBtn = document.querySelectorAll('.modal__accordion');
const accordionTitle = document.querySelectorAll('.modal__accordion-title');
const accordionContent = document.querySelectorAll('.modal__accordion-content');

btnModal.addEventListener('click', () => {
  modalBackground.classList.add('enabled');
  modalActive.classList.add('enabled');
});

modalClose.addEventListener('click', () => {
  modalBackground.classList.remove('enabled');
  modalActive.classList.remove('enabled');
});

modalBackground.addEventListener('click', (event) => {
  if (event.target === modalBackground) {
    modalBackground.classList.remove('enabled');
    modalActive.classList.remove('enabled');
  }
});

const dropDownDescrNull = (array) => {
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    el.style.maxHeight = null;
  }
};

for (let i = 0; i < accordionTitle.length; i++) {
  const el = accordionTitle[i];

  el.addEventListener('click', (e) => {
    e.preventDefault();
    let contentNext = el.nextElementSibling;

    if (contentNext.style.maxHeight) {
      dropDownDescrNull(accordionContent);
    } else {
      dropDownDescrNull(accordionContent);
      contentNext.style.maxHeight = contentNext.scrollHeight + 'px';
    }

    if (!el.classList.contains('enabled')) {
      for (let i = 0; i < accordionTitle.length; i++) {
        let item = accordionTitle[i];
        item.classList.remove('enabled');
      }
      el.classList.add('enabled');
    } else {
      el.classList.remove('enabled');
    }
  });
}

const downloadPassword1 = document.querySelector('.download-password-1');
const windowPassword1 = document.querySelector('.password-window-1');
const formPassword1 = document.querySelector('.password-form-1');
const passwordMK500 = '123456';
const downloadContent1 = document.querySelector('.download-content-1');
const passwordLabel1 = document.querySelector('.password-label-1');
const passwordInput1 = document.querySelector('.password-input-1');

const downloadForm = (downloadPassword, passwordWindow, form) => {
  downloadPassword.addEventListener('click', (e) => {
    e.preventDefault();
    downloadPassword.classList.add('active');
    passwordWindow.classList.add('active');
    form.classList.add('active');
  });
};

const formValue = (content, form, passwordWindow, passwordValue, nameInput, labelbox, inputbox) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = form.querySelector(`[name="password-${nameInput}"]`);
    const value = {
      password: password.value,
    };

    if (value.password === passwordValue) {
      passwordWindow.classList.remove('active');
      content.classList.add('active');
    } else {
      labelbox.classList.add('active');
      inputbox.classList.add('error');
    }
  });
};
downloadForm(downloadPassword1, windowPassword1, formPassword1);

formValue(downloadContent1, formPassword1, windowPassword1, passwordMK500, 1, passwordLabel1, passwordInput1);

const downloadPassword2 = document.querySelector('.download-password-2');
const windowPassword2 = document.querySelector('.password-window-2');
const formPassword2 = document.querySelector('.password-form-2');
const passwordDelta = '123';
const downloadContent2 = document.querySelector('.download-content-2');
const passwordLabel2 = document.querySelector('.password-label-2');
const passwordInput2 = document.querySelector('.password-input-2');

downloadForm(downloadPassword2, windowPassword2, formPassword2);

formValue(downloadContent2, formPassword2, windowPassword2, passwordDelta, 2, passwordLabel2, passwordInput2);