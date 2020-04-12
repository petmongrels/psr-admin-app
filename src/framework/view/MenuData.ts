export class MenuData {
    private static instance: MenuData;
    root: MenuItemData;
    selectedKeys!: Array<string>;
    openKeys!: Array<string>;

    private constructor() {
        let commMedium = new MenuItemData("Comm. Mediums", "/communicationMediums", [], "comm-medium");
        let masterData = new MenuItemData("Master data", "", [commMedium], "master-data");
        let services = new MenuItemData("Services", "/services", [], "services");
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
    link!: string;
    children!: Array<MenuItemData>;
    key!: string;

    constructor(text: string, link: string, children: Array<MenuItemData>, key: string) {
        this.text = text;
        this.link = link;
        this.children = children;
        this.key = key;
    }
}