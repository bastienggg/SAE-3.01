import { genericRenderer } from "../../lib/utils.js";


const templateFile = await fetch("src/ui/fiche-product-color/template.html.inc");

const template = await templateFile.text();


let FicheProductColorView = {

    render: function (data) {
        let html = "";
        for (let obj of data) {
            html += genericRenderer(template, obj);
        }
        return html;
    }

}

export { FicheProductColorView };