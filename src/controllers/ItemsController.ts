import { Request, Response } from "express";
import Knex from '../database/connection';
import { ValidateRequestPublicAccess } from '../global/global_functions';

class ItemsController {
    async index (request: Request, response: Response) {

        if (!ValidateRequestPublicAccess(request, response))
            return;

        const items = await Knex('items').select('*');

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: process.env.SERVER_URL + 'uploads_items/' + item.image,
            };
        });
        
        return response.json(serializedItems);
    };
}

export default ItemsController;
