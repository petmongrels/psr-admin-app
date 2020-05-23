import {AppResources} from "../routing/AppResources";
import {ProofsAndDocuments} from "../../proof-document/model/ProofsAndDocuments";

export class MenuData {
    private static instance: MenuData;
    root: MenuItemData;
    selectedKeys!: Array<string>;
    openKeys!: Array<string>;

    private constructor() {
        let commMedium = new MenuItemData("Comm. Mediums", "communication_medium", [], "comm-medium");
        let serviceTag = new MenuItemData("Service tags", "service_tag", [], "service-tag");
        let proofsAndDocuments = new MenuItemData("Proofs / Documents", ProofsAndDocuments.APP_RESOURCE_NAME, [], ProofsAndDocuments.APP_RESOURCE_NAME);
        let masterData = new MenuItemData("Master data", "", [commMedium, proofsAndDocuments, serviceTag], "master-data");
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
    private readonly appResource!: string;
    children!: Array<MenuItemData>;
    key!: string;

    constructor(text: string, appResource: string, children: Array<MenuItemData>, key: string) {
        this.text = text;
        this.appResource = appResource;
        this.children = children;
        this.key = key;
    }

    get url(): string {
        return AppResources.getListPath(this.appResource);
    }
}