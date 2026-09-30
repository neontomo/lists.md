const toggleCheckbox = (checkbox) => {
	const fillType = checkbox.classList[1];

	const nextFillType = {
		default: "half",
		half: "full",
		full: "default",
	}[fillType];

	checkbox.classList.replace(fillType, nextFillType);
};

const hydrateCheckboxes = () => {
	const checkboxes = document.querySelectorAll(".checkbox");
	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener("click", () => toggleCheckbox(checkbox));
	});
};

const createCheckbox = (fillType = "default", title, appendTo = undefined) => {
	const container = ce.div({ className: "checkbox-container" }, appendTo);

	const checkbox = ce.div({ className: `checkbox ${fillType}` }, container);
	checkbox.addEventListener("click", () => toggleCheckbox(checkbox));

	container.appendChild(document.createTextNode(title));

	return container;
};

const getCheckboxFillType = (line) => {
	if (line?.match(/^-(\s|)\[x\]\s/)) {
		return "full";
	} else if (line?.match(/^-(\s|)\[-\]\s/)) {
		return "half";
	}
	return "default";
};

const getCheckboxTitle = (line) => {
	return line?.replace(/- \[( |x|-|)\] (.*)$/gi, "$2")?.trim();
};
