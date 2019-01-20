import {Link} from "./Link";

export interface Category {
    caption: string,
    shortcut: string,
    children: Array<Category | Link>,
    key?: string,
}

export function isCategory(o : Category | Link): o is Category {
    return 'children' in o;
}