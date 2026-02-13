import { menu } from "../data/menu.data.js";

export const getMenu = (req,res) => {
    res.json(menu);
}