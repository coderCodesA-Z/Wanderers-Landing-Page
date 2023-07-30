const body = document.body;
const wiper = document.createElement("div");
wiper.classList.add("wiper");

const wiperImage = document.createElement("img");
wiperImage.src = "logo.svg";

const wiperText = document.createElement("h2");
const wiperHolder = document.createElement("div");
wiperHolder.appendChild(wiperText);
wiperText.innerText = "Wiper";

wiper.appendChild(wiperImage);
wiper.appendChild(wiperHolder);

body.appendChild(wiper);

barba.use(barbaPrefetch);

barba.init({
	transitions: [
		{
			name: "next",

			custom({ current, next, trigger }) {
				return (
					(trigger.classList && trigger.classList.contains("next")) ||
					trigger === "forward"
				);
			},

			leave({ current, next, trigger }) {
				return new Promise((resolve, reject) => {
					const timeline = gsap.timeline({
						onComplete() {
							window.scrollTo(0, 0);
							current.container.remove();
							resolve();
						},
					});

					const navigation = current.container.querySelectorAll(
						"header, a.next, a.previous"
					);

					const photos = current.container.querySelectorAll("div.photos");

					timeline
						.set(wiper, { x: "-100%" })
						.set(wiperImage, { opacity: 0 })
						.set(body, { overflow: "hidden" })
						.set(wiperText, { y: "100%" })
						.to(navigation, { opacity: 0 }, 0)
						// .to(photos, { opacity: 0, x: 500 }, 0)
						.to(photos, { opacity: 0.25, x: 500 }, 0)
						.to(wiper, { x: 0 }, 0);
				});
			},
			beforeEnter({ current, next, trigger }) {
				wiperText.innerText = next.container.getAttribute("data-title");

				return new Promise((resolve, reject) => {
					const timeline = gsap.timeline({
						defaults: {
							duration: 1,
						},
						onComplete() {
							resolve();
						},
					});

					timeline
						.to(wiperImage, { opacity: 1 }, 0)
						.to(wiperText, { y: "0" }, 0)
						.to(wiperText, { y: "100%" }, 2)
						.to(wiperImage, { opacity: 0 }, 2);
				});
			},

			enter({ current, next, trigger }) {
				return new Promise((resolve, reject) => {
					const timeline = gsap.timeline({
						onComplete() {
							resolve();
						},
					});

					const navigation = next.container.querySelectorAll(
						"header, a.next, a.previous"
					);
					const photos = next.container.querySelectorAll("div.photos");
					timeline
						.set(navigation, { opacity: 0 })
						// .set(photos, { opacity: 0, x: -500 })
						.set(body, { overflow: "auto" })
						.set(photos, { opacity: 0.25, x: -500 })
						.to(navigation, { opacity: 1 }, 0)
						.to(photos, { opacity: 1, x: 0 }, 0)
						.to(wiper, { x: "100%" }, 0);
				});
			},
		},
		{
			name: "previous",
			leave({ current, next, trigger }) {
				return new Promise((resolve, reject) => {
					const timeline = gsap.timeline({
						onComplete() {
							window.scrollTo(0, 0);
							current.container.remove();
							resolve();
						},
					});

					const navigation = current.container.querySelectorAll(
						"header, a.next, a.previous"
					);

					const photos = current.container.querySelectorAll("div.photos");

					timeline
						.set(wiper, { x: "100%" })
						.set(wiperImage, { opacity: 0 })
						.set(body, { overflow: "hidden" })
						.set(wiperText, { y: "100%" })
						.to(navigation, { opacity: 0 }, 0)
						// .to(photos, { opacity: 0, x: 500 }, 0)
						.to(photos, { opacity: 0.25, x: -500 }, 0)
						.to(wiper, { x: 0 }, 0);
				});
			},
			beforeEnter({ current, next, trigger }) {
				wiperText.innerText = next.container.getAttribute("data-title");

				return new Promise((resolve, reject) => {
					const timeline = gsap.timeline({
						defaults: {
							duration: 1,
						},
						onComplete() {
							resolve();
						},
					});

					timeline
						.to(wiperImage, { opacity: 1 }, 0)
						.to(wiperText, { y: "0" }, 0)
						.to(wiperText, { y: "100%" }, 2)
						.to(wiperImage, { opacity: 0 }, 2);
				});
			},

			enter({ current, next, trigger }) {
				return new Promise((resolve, reject) => {
					const timeline = gsap.timeline({
						onComplete() {
							resolve();
						},
					});

					const navigation = next.container.querySelectorAll(
						"header, a.next, a.previous"
					);
					const photos = next.container.querySelectorAll("div.photos");
					timeline
						.set(navigation, { opacity: 0 })
						// .set(photos, { opacity: 0, x: -500 })
						.set(body, { overflow: "auto" })
						.set(photos, { opacity: 0.25, x: 500 })
						.to(navigation, { opacity: 1 }, 0)
						.to(photos, { opacity: 1, x: 0 }, 0)
						.to(wiper, { x: "-100%" }, 0);
				});
			},
		},
	],
	views: [],
	debug: true,
});
