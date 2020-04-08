export class CommunicationMediumData {
    name!: string;

    static clone(other: CommunicationMediumData) {
        let communicationMediumData = new CommunicationMediumData();
        communicationMediumData.name = other.name;
        return communicationMediumData;
    }
}