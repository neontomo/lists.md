const main = document.getElementsByTagName("main")[0];

const getParams = () => {
	const params = new URLSearchParams(document.location.search);
	const { id } = { id: params.get("id") };

	return { id };
};

const is = {
	import: (line) => line?.match(/^import:/),
	h1: (line) => line?.match(/^#\s/),
	h2: (line) => line?.match(/^##\s/),
	h3: (line) => line?.match(/^###\s/),
	item: (line) => line?.match(/^-(\s|)\[(\s|)\]\s/),
	description: (line) =>
		!is.item(line) && !is.import(line) && line?.match(/^-\s/),
	comment: (line) => line?.match(/^\/\/\s/),
};

const getSectionsContainer = () => {
	const sectionsContainers =
		document.getElementsByClassName("sections-container");

	if (sectionsContainers?.length) {
		return sectionsContainers[0];
	} else {
		return ce.div({ className: "sections-container" });
	}
};

const getLastSection = () => {
	const sections = document.getElementsByTagName("section");
	return sections[sections.length - 1];
};

const getFromFile = (fileName) => {
	fetch(`md/${fileName}.md`)
		.then((response) => response.text())
		.then((data) => {
			data.split("\n").forEach((line) => {
				if (is.import(line)) {
					const fileName = line?.replace(/^import:/gi, "")?.trim();

					getFromFile(fileName);
				}
				if (is.h1(line)) {
					const headingContent = line?.replace(/^#\s/gi, "")?.trim();

					if (!headingContent) return;
					ce.h1({ innerHTML: headingContent }, main);
					document.getElementsByTagName("title")[0].innerHTML =
						`tomolists - ${headingContent}`;
				}
				if (is.h2(line)) {
					const sectionsContainer = getSectionsContainer();

					const section = ce.section({}, sectionsContainer);
					ce.h2({ innerHTML: line?.replace(/^##\s/gi, "") }, section);

					main.appendChild(sectionsContainer);
				}
				if (is.h3(line))
					ce.h3({ innerHTML: line?.replace(/^###\s/gi, "") }, getLastSection());
				if (is.item(line)) {
					const checkboxContent = line
						?.replace(/^-(\s|)\[(\s|)\]\s/gi, "")
						?.trim();

					if (!checkboxContent) return;

					const container = ce.div({ className: "checkbox-container" });

					createCheckbox(container);
					ce.div({ innerHTML: checkboxContent }, container);

					getLastSection().appendChild(container);
				}
				if (is.description(line)) {
					const content = line?.replace(/^-\s/gi, "")?.trim();

					if (!content) return;

					ce.div(
						{ innerHTML: content, className: "description" },
						getLastSection(),
					);
				}
			});
		});
};

const { id } = getParams();

if (id) {
	getFromFile(id);
} else {
	fetch(`md/lists.md`)
		.then((response) => response.text())
		.then((data) => {
			ce.h1({ innerHTML: "tomolists" }, main);

			data.split("\n").forEach((line) => {
				ce.a(
					{ innerHTML: line, href: `?id=${line}`, className: "list-link" },
					main,
				);
			});
		});
}
