const galleryItems = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];

// Разбей задание на несколько подзадач:
// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.

const refs = {
    galleryContainer: document.querySelector('ul.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    modalClose: document.querySelector('[data-action="close-lightbox"]'),
    imgModal: document.querySelector('img.lightbox__image'),
    closeBackdrop: document.querySelector('.lightbox__overlay'),
    galleryArrowLeft: document.querySelector('.lightbox__arrow-left'),
    galleryArrowRight: document.querySelector('.lightbox__arrow-right'),

}

const galleryMarkup = galleryCollection(galleryItems);
refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
function galleryCollection(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item">
        <a class="gallery__link" href="${preview}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`}).join('');


}
// Реализация делегирования на галерее ul.js - gallery и получение url большого изображения.
refs.galleryContainer.addEventListener('click', onOpenModalClick)
refs.modalClose.addEventListener('click', closeModalClick)
refs.modalClose.addEventListener('keyword', closeModalClick)
refs.closeBackdrop.addEventListener('click', onBackdropClick)
refs.galleryArrowLeft.addEventListener('click', onClickArrowLeft)
refs.galleryArrowRight.addEventListener('click', onClickArrowRight)

// Открытие модального окна по клику на элементе галереи.
function onOpenModalClick(event) {
    window.addEventListener('keydown', onEscapePress)
    event.preventDefault();
    refs.modal.classList.add('is-open')
    const target = event.target;
    onOpenImgModal(event.target.dataset.source, event.target.alt)


}

// Подмена значения атрибута src элемента img.lightbox__image.
function onOpenImgModal(src, alt) {
    refs.imgModal.src = src;
    refs.imgModal.alt = alt;
    flipping()
}

function flipping(evt) {
    if (
        evt.target.classList.contains('lightbox__overlay') ||
        evt.target.dataset.action === 'close-lightbox'
    )
        closeModal();
    if (
        evt.target.classList.contains('lightbox__image') ||
        evt.target.dataset.type === 'next'
    )
        onClickArrowRight();
    if (evt.target.dataset.type === 'prev') onClickArrowLeft();

};



function onEscapePress(event) {
    const ESC_KEY_CODE = 'Escape';
    if (event.code === ESC_KEY_CODE) {
        closeModalClick()
    }
}
// Закрытие модального окна по клику на кнопку button[data - action= "close-lightbox"].
function closeModalClick(event) {
    refs.modal.classList.remove('is-open')
    onOpenImgModal('', '')
}
function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
        closeModalClick()
    }
    console.log(event)
}
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
//Сделать перелистывание фото

function clickSearchRules(src) {

    const searchRules = galleryItems.indexOf(galleryItems.find(el => el.original === refs.imgModal.src));
    console.log(searchRules)

}

function onClickArrowRight(src) {
    let currentImgIndex = clickSearchRules(refs.imgModal.getAttribute('src'));
    if (currentImgIndex === galleryItems.length - 1) {
        return currentImgIndex = -1;
    }
    onOpenImgModal(
        galleryItems[currentImgIndex + 1].original,
        galleryItems[currentImgIndex + 1].description,
    );

    console.log(currentImgIndex)
}

function onClickArrowLeft() {
    let currentImgIndex = clickSearchRules(refs.imgModal.getAttribute('src'));
    if (currentImgIndex == 0) {
        onOpenImgModal(
            galleryItems[currentImgIndex - 1].original,
            galleryItems[currentImgIndex - 1].description,
        );
    } else {
        currentImgIndex = galleryItems.length;
    }
    console.log(currentImgIndex)
}
function onKeyDown(e) {
    if (!modal.classList.contains('is-open')) return;
    switch (e.code) {
        case 'Escape':
            closeModalClick();
            break;
        case 'ArrowLeft':
            onClickArrowLeft();
            break;
        case 'ArrowRight':
            onClickArrowRight();
            break;
    }
}