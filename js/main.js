const milestonesData = JSON.parse(data).data

// load course milestones data

let loadMilestones = () => {
	const milestones = document.querySelector(".milestones")

	milestones.innerHTML = `${milestonesData
		.map((milestone) => {
			return `<div class="milestone border-b" id="${milestone._id}">
      <div class="flex">
        <div class="checkbox"><input type="checkbox"
				 onclick="doneMilestone(this, ${milestone._id})" /></div>
        <div onclick="openMilestone(this, ${milestone._id})">
          <p>
            ${milestone.name}
            <span><i class="fas fa-chevron-down"></i></span>
          </p>
        </div>
      </div>
      <div class="hidden_panel">
        ${milestone.modules
					.map((module) => {
						return `<div class="module border-b">
            <p>${module.name}</p>
          </div>`
					})
					.join("")}
      </div>
    </div>`
		})
		.join("")}`
}

let openMilestone = (milestoneElement, id) => {
	const hiddenPanel = milestoneElement.parentNode.nextElementSibling
	//console.log(hiddenPanel)

	// first remove prev active classes if any [other than the clicked one]

	const activePanel = document.querySelector(".active")

	if (!milestoneElement.classList.contains("show") && activePanel)
		activePanel.classList.remove("active")

	milestoneElement.classList.toggle("active")

	// first remove prev shown panels if any [other than the clicked one]

	const shownPanel = document.querySelector(".show")

	if (!hiddenPanel.classList.contains("show") && shownPanel)
		shownPanel.classList.remove("show")

	// now showing the clicked milestone panel

	hiddenPanel.classList.toggle("show")

	showMilestoneImage(id)
}

let showMilestoneImage = (id) => {
	// loading corresponding image, title, description

	const milestoneImage = document.querySelector(".milestoneImage")
	const title = document.querySelector(".title")
	const description = document.querySelector(".details")

	title.innerText = milestonesData[id].name
	description.innerText = milestonesData[id].description

	// image with transition

	milestoneImage.style.opacity = "0"
	milestoneImage.src = milestonesData[id].image
	// milestoneImage.onload = () => {
	// 	milestoneImage.style.opacity = "1"
	// }
}

// listen image load

const milestoneImage = document.querySelector(".milestoneImage")

milestoneImage.onload = () => {
	milestoneImage.style.opacity = "1"
}

let doneMilestone = (checkbox, id) => {
	const doneList = document.querySelector(".doneList")
	const mainList = document.querySelector(".milestones")

	const item = document.getElementById(id)

	if (checkbox.checked) {
		mainList.removeChild(item)
		doneList.appendChild(item)
	} else {
		doneList.removeChild(item)
		//mainList.appendChild(item)

		const temp = document.getElementById(id + 1)
		mainList.insertBefore(item, temp)
	}
}

loadMilestones()
