import { genericRenderer } from "../../lib/utils.js";

const templateFile = await fetch("src/ui/popup-panier/template.html.inc");
const template = await templateFile.text();

let selectionTailleView = {
    render: function (data) {
        let html = "";
        html = template;

        return html;
    }
}

export { selectionTailleView };