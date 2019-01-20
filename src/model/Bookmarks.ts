import {Root} from "./Root";

export const bookmarks : Root = {
    children: [
        {
            caption: "Search Engines",
            shortcut: "S",
            children: [
                {
                    caption: "Google",
                    shortcut: "G",
                    href: "https://www.google.nl"
                },
                {
                    caption: "Bing",
                    shortcut: "B",
                    href: "https://www.bing.com"
                }
            ]
        }
        ]
};