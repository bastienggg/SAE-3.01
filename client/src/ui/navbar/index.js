import { genericRenderer } from "../../lib/utils.js";

const templateFile = await fetch("src/ui/navbar/template.html.inc");
const template = await templateFile.text();

let navView = {
    render: function (data) {
        let html = "";
        html = template;

        return html;
    }
}

export { navView };