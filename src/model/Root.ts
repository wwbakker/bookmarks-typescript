import {Link} from "./Link";
import {Category} from "./Category";

export interface Root {
    children: Array<Category | Link>
}