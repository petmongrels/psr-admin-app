export class CommunicationMedium {
    name!: string;

    static clone(other: CommunicationMedium) {
        let communicationMedium = new CommunicationMedium();
        communicationMedium.name = other.name;
        return communicationMedium;
    }
}