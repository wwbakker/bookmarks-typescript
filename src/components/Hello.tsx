import * as React from "react";
import {Link} from "../model/Link";
import {Category, isCategory} from "../model/Category";
import {Root} from "../model/Root";
import {bookmarks} from "../model/Bookmarks";


export const Option = (option : Category | Link) => <li key={option.key}>{option.caption} ({option.shortcut})</li>

export class BookmarkNavigator extends React.Component<{}, CurrentTreePosition> {

    constructor(props: any) {
        super(props);
        this.state = new CurrentTreePositionHelper(bookmarks);
        document.onkeydown = (keyDown) => this.keyDownHandler(keyDown);
    }

    private keyDownHandler(keyDown : KeyboardEvent) {
        const treePositionHelper = this.getTreePositionHelper();
        if (keyDown.code === "Backspace") {
            this.setState(treePositionHelper.goBack())
        }else {
            const selectedChild = treePositionHelper.children.find(child => child.shortcut.toUpperCase() === keyDown.code.substring(3))
            if (selectedChild !== undefined && isCategory(selectedChild)) {
                this.setState(treePositionHelper.drillDown(selectedChild))
            }
        }
    }

    public getTreePositionHelper() {
        return CurrentTreePositionHelper.fromCurrentTreePosition(this.state);
    }

    render(): React.ReactNode {
        return <ul>
            {this.getTreePositionHelper().children.map(Option)}
        </ul>;
    }
}

interface CurrentTreePosition {
    root : Root,
    currentPath : Array<Category>,
}

export class CurrentTreePositionHelper implements CurrentTreePosition{
    constructor(public root : Root,
                public currentPath : Array<Category> = []) {
    }

    private keyPrefix() {
        return this.currentPath.length === 0 ? "" : this.currentPath.map(o => o.shortcut)
    }

    private addUniqueKey(o : Category | Link) : Category | Link{
        return Object.assign({key: this.keyPrefix() + o.shortcut}, o);
    }

    get children(): Array<Category | Link> {
        return (this.currentPath.length === 0 ?
            this.root.children :
            this.currentPath[this.currentPath.length - 1].children)
            .map((k) => this.addUniqueKey(k));
    }

    public drillDown(toCategory : Category) : CurrentTreePosition {
        return new CurrentTreePositionHelper(this.root, this.currentPath.concat([toCategory]));
    }

    public goBack() : CurrentTreePosition {
        return this.currentPath.length === 0 ?
            this :
            new CurrentTreePositionHelper(this.root, this.currentPath.slice(0, this.currentPath.length - 1));
    }

    public static fromCurrentTreePosition(currentTreePosition : CurrentTreePosition) : CurrentTreePositionHelper {
        return new CurrentTreePositionHelper(currentTreePosition.root, currentTreePosition.currentPath)
    }
}