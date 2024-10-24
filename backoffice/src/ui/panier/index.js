import { genericRenderer } from "../../lib/utils.js";

const templateFile = await fetch("src/ui/panier/template.html.inc");
const template = await templateFile.text();

let panierView = {
    render: function (data) {
        let html = "";
        html = template;

        return html;
    }
}

export { panierView };