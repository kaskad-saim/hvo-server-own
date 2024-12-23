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

const levelTitanE21 = document.querySelector('.column-e2-1__percent-titan');
const valueTitanE21Current = document.querySelector('.titan-e2-1-value').innerHTML;
const levelTitanE21Percent = document.querySelector('.titan-span-e2-1');

const levelMidaE21 = document.querySelector('.column-e2-1__percent-mida');
const valueMidaE21Current = document.querySelector('.mida-e2-1-value').innerHTML;
const levelMidaE21Percent = document.querySelector('.mida-span-e2-1');

const levelTitanE22 = document.querySelector('.column-e2-2__percent-titan');
const valueTitanE22Current = document.querySelector('.titan-e2-2-value').innerHTML;
const levelTitanE22Percent = document.querySelector('.titan-span-e2-2');

const levelMidaE22 = document.querySelector('.column-e2-2__percent-mida');
const valueMidaE22Current = document.querySelector('.mida-e2-2-value').innerHTML;
const levelMidaE22Percent = document.querySelector('.mida-span-e2-2');

let screenWidth = window.innerWidth;

if ((levelTitanE21, valueTitanE21Current, levelTitanE21Percent)) {
  levelObj(0, 1600, valueTitanE21Current, 88, levelTitanE21, levelTitanE21Percent, 0, 100);
  if (screenWidth < 1280) {
    levelObj(0, 1600, valueTitanE21Current, 75, levelTitanE21, levelTitanE21Percent, 0, 100);
  }
}

if ((levelMidaE21, valueMidaE21Current, levelMidaE21Percent)) {
  levelObj(0, 1600, valueMidaE21Current, 88, levelMidaE21, levelMidaE21Percent, 0, 100);
  if (screenWidth < 1280) {
    levelObj(0, 1600, valueMidaE21Current, 75, levelMidaE21, levelMidaE21Percent, 0, 100);
  }
}

if ((levelTitanE22, valueTitanE22Current, levelTitanE22Percent)) {
  levelObj(0, 1600, valueTitanE22Current, 88, levelTitanE22, levelTitanE22Percent, 0, 100);
  if (screenWidth < 1280) {
    levelObj(0, 1600, valueTitanE22Current, 75, levelTitanE22, levelTitanE22Percent, 0, 100);
  }
}

if ((levelMidaE22, valueMidaE22Current, levelMidaE22Percent)) {
  levelObj(0, 1600, valueMidaE22Current, 88, levelMidaE22, levelMidaE22Percent, 0, 100);
  if (screenWidth < 1280) {
    levelObj(0, 1600, valueMidaE22Current, 75, levelMidaE22, levelMidaE22Percent, 0, 100);
  }
}

// Вкл/откл анимации насосов

const pumpingFunc = (pump, pumpHz) => {
  if (pumpHz.innerHTML >= 5) {
    pump.style.animationPlayState = 'running';
  } else {
    pump.style.animationPlayState = 'paused';
  }
};

const pump41 = document.querySelector('.mnemo__gif-pump-4-1 img');
const pump41Hz = document.querySelector('.n4-1-hz span');

pumpingFunc(pump41, pump41Hz);

const pump42 = document.querySelector('.mnemo__gif-pump-4-2 img');
const pump42Hz = document.querySelector('.n4-2-hz span');

pumpingFunc(pump42, pump42Hz);

const pump51 = document.querySelector('.mnemo__gif-pump-5-1 img');
const pump51Hz = document.querySelector('.n5-1-hz span');

pumpingFunc(pump51, pump51Hz);

const pump52 = document.querySelector('.mnemo__gif-pump-5-2 img');
const pump52Hz = document.querySelector('.n5-2-hz span');

pumpingFunc(pump52, pump52Hz);

const pump61 = document.querySelector('.mnemo__gif-pump-6-1 img');
const pump61Hz = document.querySelector('.n6-1-hz span');

pumpingFunc(pump61, pump61Hz);

const pump62 = document.querySelector('.mnemo__gif-pump-6-2 img');
const pump62Hz = document.querySelector('.n6-2-hz span');

pumpingFunc(pump62, pump62Hz);

const pump63 = document.querySelector('.mnemo__gif-pump-6-3 img');
const pump63Hz = document.querySelector('.n6-3-hz span');

pumpingFunc(pump63, pump63Hz);

// Исполнительный механизм

const klapanBorderLeft = (param, color) => {
  param.style = `border-left: 12px solid ${color}`;
};

const klapanBorderRight = (param, color) => {
  param.style = `border-right: 12px solid ${color}`;
};

const im2Left = document.querySelector('.mnemo__im2-left');
const im2Right = document.querySelector('.mnemo__im2-right');
const im2Value = document.querySelector('.im2-value');

const green = 'green';
const red = 'red';

if (im2Value.innerHTML >= 5) {
  klapanBorderLeft(im2Left, green);
  klapanBorderRight(im2Right, green);
} else {
  klapanBorderLeft(im2Left, red);
  klapanBorderRight(im2Right, red);
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
