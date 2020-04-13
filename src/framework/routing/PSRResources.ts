export class PSRResources {
    static getListURLFor(resource: string) {
        return `/app/${resource}s`;
    }

    static getCreateURLFor(resource: string) {
        return `/app/${resource}/new`;
    }

    static getResourceListURL(resource: string) {
        return `/${resource}`;
    }
}