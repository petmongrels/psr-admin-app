export class RoutingHelper {
    static isEdit(id: any) {
        return id && id !== "new";
    }
}