import { getRequest } from '../lib/api-request.js';

let CommandeData = {};

CommandeData.getALL = async function () {
    let data = await getRequest('commandes');
    return data;
}





export { CommandeData };
