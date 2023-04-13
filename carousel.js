import slides from "./slides.js"
const CAROUSEL = document.getElementsByClassName("carousel")

Array.from(CAROUSEL).forEach(carouselInit)

function carouselInit(carousel) {
	const CAROUSEL_SLIDES = carousel.querySelector(".carousel__slides")
	const BUTTON_BACK = carousel.querySelector(".carousel__backButton")
	const BUTTON_FORWARD = carousel.querySelector(".carousel__forwardButton")
	const NAVIGATION = carousel.querySelector(".carousel__navigation")

	slides.forEach(slide => {
		const DIV = document.createElement("div")
		DIV.className = "carousel__slide"
		DIV.style.backgroundImage = `url(${slide.src})`

		const CONTENT = `
			<h1 class="carousel__heading">${slide.heading}</h1>
			<p class="carousel__body">${slide.body}</p>
			<a href="${slide.buttonLink}" class="carousel__cta">${slide.buttonText}</a>
		`

		DIV.innerHTML = CONTENT
		CAROUSEL_SLIDES.append(DIV)
	})

	BUTTON_FORWARD.addEventListener("click", shuffleForward)
	BUTTON_BACK.addEventListener("click", shuffleBack)

	let index = 0;

	slides.forEach((slide, i) => {
		const BUTTON = document.createElement("button")
		BUTTON.dataset.i = i
		BUTTON.classList.add("carousel__navigationButton")
		if (i === index) BUTTON.classList.add("carousel__navigationButton--active")
		BUTTON.addEventListener("click", gotoSlide)
		NAVIGATION.append(BUTTON)
	})

	function shuffleForward() {
		index++
		if (index === slides.length) {
			index = 0;
		}
		doSlide()
	}

	function shuffleBack() {
		index--
		if (index < 0) {
			index = slides.length -1;
		}
		doSlide()
	}

	function gotoSlide(event) {
		index = parseInt(event.target.dataset.i)
		doSlide()
	}

	function doSlide() {
		CAROUSEL_SLIDES.querySelectorAll("div").forEach(div => div.style.transform = `translateX(-${index}00%)`)
		NAVIGATION.querySelectorAll("button").forEach((button, i) => i === index ? button.classList.add("carousel__navigationButton--active") : button.classList.remove("carousel__navigationButton--active"))
	}
}
