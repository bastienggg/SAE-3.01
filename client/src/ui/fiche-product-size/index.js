import { genericRenderer } from "../../lib/utils.js";


const templateFile = await fetch("src/ui/fiche-product-size/template.html.inc");

const template = await templateFile.text();


let FicheProductSizeView = {

    render: function (data) {
        let html = "";
        for (let obj of data) {
            html += genericRenderer(template, obj);
        }
        return html;
    }

}

export { FicheProductSizeView };