const isLocalhost = location.hostname === "localhost";
const entrypoint = isLocalhost ? "md/lists.private.md" : "md/lists.md";
const main = document.getElementsByTagName("main")[0];

let busy = false;

const makeHtml = (markdown) => {
	const markdownOptions = { tasklists: false };
	return new showdown.Converter(markdownOptions).makeHtml(markdown);
};

const getParams = () => {
	const params = new URLSearchParams(document.location.search);
	const { id } = { id: params.get("id") };

	return { id };
};

const getMarkdownFromFile = async (fileName) =>
	await fetch(`md/${fileName}.md`).then((response) => response.text());

const setTitle = (markdown) => {
	const title = markdown.split(/^# (.*)/)[1];
	if (title) document.querySelector("h1").innerHTML = title;
};

const getFromFile = async (fileName) => {
	if (busy) {
		requestAnimationFrame(() => getFromFile(fileName));
		return;
	}

	busy = true;

	const markdown = await getMarkdownFromFile(fileName);

	setTitle(markdown);

	const formattedMarkdown = markdown
		.replace(/^# (.*)\n/gi, "")
		.replace(/(^|\n)import:(.*)($|\n)/gi, (line) => {
			const importName = line.replace(/(^|\n)import:(.*)($|\n)/gi, "$2");
			getFromFile(importName);
			return "";
		})
		.replace(/- \[( |x|-|)\] .*/gi, (line) => {
			const fillType = getCheckboxFillType(line);
			const title = getCheckboxTitle(line);

			return createCheckbox(fillType, title).outerHTML;
		});

	const html = makeHtml(formattedMarkdown);
	busy = false;

	if (!html) return;
	ce.section({ innerHTML: html }, main);
};

const { id } = getParams();

if (id) {
	getFromFile(id).finally(() => {
		const checkboxes = document.querySelectorAll(".checkbox");
		checkboxes.forEach((checkbox) => {
			checkbox.addEventListener("click", () => toggleCheckbox(checkbox));
		});
	});
} else {
	fetch(entrypoint)
		.then((response) => response.text())
		.then((markdown) => {
			const listContainer = ce.div({}, main);

			markdown.split("\n").forEach((line) => {
				ce.a(
					{
						innerHTML: line,
						href: `?id=${line}`,
						className: "list-link",
					},
					listContainer,
				);
			});
		});
}
