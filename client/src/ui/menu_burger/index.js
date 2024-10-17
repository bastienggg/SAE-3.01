import { genericRenderer } from "../../lib/utils.js";

const templateFile = await fetch("src/ui/menu_burger/template.html.inc");
const template = await templateFile.text();


let MenuBurgerView = {

    render: function (data) {
        let html = "";
        html = template;
        return html;
    }

}

export { MenuBurgerView };
