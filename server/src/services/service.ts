import { Author } from "../entities/items-response";

export default class Service {
	apiBaseUrl: string = 'https://api.mercadolibre.com';
	defaultLocation: string = 'MLA'; // Argentina
	author: Author = { name: 'Juan Camilo', lastname: 'Velandia Botello' };
}
