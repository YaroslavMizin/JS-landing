let projects =
    [{
        title: "rostov-on-don, admiral",
        city: "Rostov-on-Don<br>LCD admiral",
        area: "81m 2",
        repairTime: "3.5 months",
        cost: "Upon request",
        url: "assets/section_2_slider/1.png"
    },
    {
        title: "sochi thieves",
        city: "Sochi<br>Thieves",
        area: "105m 2",
        repairTime: "4 months",
        cost: "Upon request",
        url: "assets/section_2_slider/2.png"
    },
    {
        title: "rostov-on-don patriotic",
        city: "Rostov-on-Don<br>Patriotic",
        area: "93m 2",
        repairTime: "3 months",
        cost: "Upon request",
        url: "assets/section_2_slider/3.png"
    }];

let samples = [
    { url: "assets/section_5_slider/1.jpg" },
    { url: "assets/section_5_slider/2.jpg" },
    { url: "assets/section_5_slider/3.jpg" },
    { url: "assets/section_5_slider/4.jpg" }
]

// функция работы слайдера
function initSlider(options) {
    if (!projects || !projects.length) return;
    let mediaQuery = window.matchMedia("screen and (max-width: 1199px)");

    // поиск DOM
    let sliderImages = document.querySelector(".project-image-slider");
    let mobileImages = document.querySelector(".fifth-section-mobile");
    let sliderButtons = document.querySelector(".project-data-switch");
    let sliderNavigation = document.querySelector(".dots");
    let sliderTitles = document.querySelector(".projects-navigation");
    let cityInfo = document.getElementById("city");
    let areaInfo = document.getElementById("area");
    let timeInfo = document.getElementById("repair_time");
    let costInfo = document.getElementById("cost");

    // запуск функций
    initImages(projects, sliderImages);
    initInfo();
    if(mediaQuery.matches) {
        initImages(samples, mobileImages);
        initButtons(sliderImages);
        initButtons(mobileImages);
    } else {
        initNavigation();
        initTitles();
        initButtons(sliderButtons);
    }

    if (options.autoplay) {
        initAutoplay();
    }

    // добавление массивов изображений
    function initImages(gallery, container) {
       gallery.forEach((project, index) => {
            let imageDiv = `<div class="project-image n${index} ${index === 0 ? "active" : ""}
            "style="background-image:url(${gallery[index].url});" data-index="${index}"></div>`;
            container.innerHTML += imageDiv;
        });
    }

    // функция автоматического переключения
    function initAutoplay() {
        return setInterval(() => {
            activeSlide = +sliderImages.querySelector(".active").dataset.index;
            nextSlide = activeSlide === projects.length - 1 ? 0 : activeSlide + 1;
            moveSlide(nextSlide);
        }, options.autoplayInterval);
    }

    // функция для навигации над изображением
    function initTitles() {
        projects.forEach((project, index) => {
            let title = `<button class="n${index} ${index === 0 ? "active" : ""}" data-index=${index}>${projects[index].title}</button>`;
            sliderTitles.innerHTML += title;
        });
        sliderTitles.querySelectorAll(".projects-navigation button").forEach(title => {
            title.addEventListener("click", function () {
                moveSlide(this.dataset.index);
            })
        })
    }

    // функция смены информации о слайде
    function initInfo() {
        let activeSlide = +sliderImages.querySelector(".active").dataset.index;
        cityInfo.innerHTML = projects[activeSlide].city;
        timeInfo.innerHTML = projects[activeSlide].repairTime;
        areaInfo.innerHTML = projects[activeSlide].area;
        costInfo.innerHTML = projects[activeSlide].cost;
    }

    // функция точек внизу слайдера
    function initNavigation() {
        projects.forEach((project, index) => {
            let dot = `<label class="rectangle n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></label>`;
            sliderNavigation.innerHTML += dot;
        });
        sliderNavigation.querySelectorAll(".rectangle").forEach(dot => {
            dot.addEventListener("click", function () {
                moveSlide(this.dataset.index);
            })
        })
    }

    // функция переключения слайдера
    function moveSlide(numb) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + numb).classList.add("active");
        initInfo();
        if(mediaQuery.matches) {
            mobileImages.querySelector(".active").classList.remove("active");
            mobileImages.querySelector(".n" + numb).classList.add("active");
        } else {
            sliderNavigation.querySelector(".active").classList.remove("active");
            sliderNavigation.querySelector(".n" + numb).classList.add("active");
            sliderTitles.querySelector(".active").classList.remove("active");
            sliderTitles.querySelector(".n" + numb).classList.add("active");
        }
    }

    // функция кнопок
    function initButtons(buttons) {
        buttons.querySelectorAll(".arrow").forEach(button => {
            button.addEventListener("click", function () {
                let activeSlide = +sliderImages.querySelector(".active").dataset.index;
                let nextSlide;
                if (button.classList.contains("arrow_left")) {
                    nextSlide = activeSlide === 0 ? projects.length - 1 : activeSlide - 1;
                } else {
                    nextSlide = activeSlide === projects.length - 1 ? 0 : activeSlide + 1;
                }
                moveSlide(nextSlide);
            });
        });
    }
}

let slideOptions = {
    dot: true,
    autoplay: true,
    autoplayInterval: 5000
}

// запуск слайдеров
document.addEventListener("DOMContentLoaded", () => {
    initSlider(slideOptions);
})