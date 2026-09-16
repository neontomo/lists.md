const toggleCheckbox = (checkbox) => {
        const fillType = checkbox.classList[1];

        const nextFillType = {
                default: "half",
                half: "full",
                full: "default",
        }[fillType];

        checkbox.classList.replace(fillType, nextFillType);
};

const createCheckbox = (fillType = "default", appendTo) => {
        const checkbox = ce.div({ className: `checkbox ${fillType}` }, appendTo);
        checkbox.addEventListener("click", () => toggleCheckbox(checkbox));

        return checkbox;
};
