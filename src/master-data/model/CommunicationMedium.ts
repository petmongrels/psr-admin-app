import {ReferenceEntity} from "../../framework/model/ReferenceEntity";

export class CommunicationMedium implements ReferenceEntity {
    name!: string;
    description: string;

    static clone(other: CommunicationMedium) {
        if (other) {
            let communicationMedium = new CommunicationMedium();
            communicationMedium.name = other.name;
            communicationMedium.description = other.description;
            return communicationMedium;
        }
        return other;
    }
}