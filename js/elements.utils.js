const ce = {
	createElement: (elementTagName, attributes, appendTo) => {
		const element = document.createElement(elementTagName);
		Object.assign(element, attributes);

		if (appendTo) appendTo.appendChild(element);

		return element;
	},
	section: (attributes, appendTo) =>
		ce.createElement("section", attributes, appendTo),
	div: (attributes, appendTo) => ce.createElement("div", attributes, appendTo),
	a: (attributes, appendTo) => ce.createElement("a", attributes, appendTo),
	p: (attributes, appendTo) => ce.createElement("p", attributes, appendTo),
	span: (attributes, appendTo) =>
		ce.createElement("span", attributes, appendTo),
	header: (attributes, appendTo) =>
		ce.createElement("header", attributes, appendTo),
	h1: (attributes, appendTo) => ce.createElement("h1", attributes, appendTo),
	h2: (attributes, appendTo) => ce.createElement("h2", attributes, appendTo),
	h3: (attributes, appendTo) => ce.createElement("h3", attributes, appendTo),
	h4: (attributes, appendTo) => ce.createElement("h4", attributes, appendTo),
	h5: (attributes, appendTo) => ce.createElement("h5", attributes, appendTo),
	h6: (attributes, appendTo) => ce.createElement("h6", attributes, appendTo),
	img: (attributes, appendTo) => ce.createElement("img", attributes, appendTo),
	input: (attributes, appendTo) =>
		ce.createElement("input", attributes, appendTo),
	button: (attributes, appendTo) =>
		ce.createElement("button", attributes, appendTo),
	video: (attributes, appendTo) =>
		ce.createElement("video", attributes, appendTo),
	source: (attributes, appendTo) =>
		ce.createElement("source", attributes, appendTo),
};
