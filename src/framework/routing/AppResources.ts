export class AppResources {
    static getAppURLFor(custom: string) {
        return `/app/${custom}`;
    }

    static getListURLFor(resource: string) {
        return `/app/${resource}s`;
    }

    static getCreateURLFor(resource: string) {
        return `/app/${resource}/new`;
    }

    static getAppEditURLFor(resource: string, id: number) {
        return `/app/${resource}/${id}`;
    }

    static getEditRoutePath(resource: string) {
        return `/app/${resource}/:id`;
    }
}