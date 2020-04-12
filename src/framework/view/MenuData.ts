import {PSRRouter} from "../routing/PSRRouter";

export class MenuData {
    private static instance: MenuData;
    root: MenuItemData;
    selectedKeys!: Array<string>;
    openKeys!: Array<string>;

    private constructor() {
        let commMedium = new MenuItemData("Comm. Mediums", "communicationMedium", [], "comm-medium");
        let masterData = new MenuItemData("Master data", "", [commMedium], "master-data");
        let services = new MenuItemData("Services", "service", [], "services");
        this.root = new MenuItemData("root", '', [services, masterData], "root");
    }

    public static getInstance(): MenuData {
        if (!MenuData.instance) {
            MenuData.instance = new MenuData();
        }

        return MenuData.instance;
    }

    public getTopItems(): Array<MenuItemData> {
        return this.root.children;
    }

    public getTopSelectedItemKeys(): Array<string> {
        return this.selectedKeys;
    }

    public getTopOpenItemKeys(): Array<string> {
        return this.openKeys;
    }

    public selectKeys(selectedKeys: Array<string>) {
        this.selectedKeys = selectedKeys;
    }

    public setOpenKeys(openKeys: Array<string>) {
        this.openKeys = openKeys;
    }
}

class MenuItemData {
    text!: string;
    private readonly _resource!: string;
    children!: Array<MenuItemData>;
    key!: string;

    constructor(text: string, resource: string, children: Array<MenuItemData>, key: string) {
        this.text = text;
        this._resource = resource;
        this.children = children;
        this.key = key;
    }

    get url(): string {
        return PSRRouter.getListURLFor(this._resource);
    }
}