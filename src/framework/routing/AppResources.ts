export class AppResources {
    static getCustomPath(custom: string) {
        return `/app/${custom}`;
    }

    static getListPath(resource: string) {
        return `/app/${resource}`;
    }

    static getCreatePath(resource: string) {
        return `/app/${resource}/new`;
    }

    static getEditPath(resource: string, id: number) {
        return `/app/${resource}/${id}`;
    }

    static getEditPathTemplate(resource: string) {
        return `/app/${resource}/:id`;
    }
}