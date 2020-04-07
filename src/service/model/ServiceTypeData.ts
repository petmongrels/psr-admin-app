export class ServiceTypeData {
    name!: String;
    description!: String;
    references!: String;
    subTypes!: Array<ServiceSubTypeData>;

    static newInstance() {
        let serviceTypeData = new ServiceTypeData();
        serviceTypeData.subTypes = [];
        return serviceTypeData;
    }
}

export class ServiceSubTypeData {
    name!: String;
}