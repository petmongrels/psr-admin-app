import {ReferenceEntity} from "../../framework/model/ReferenceEntity";

export class CommunicationMedium implements ReferenceEntity {
    name!: string;

    static clone(other: CommunicationMedium) {
        if (other) {
            let communicationMedium = new CommunicationMedium();
            communicationMedium.name = other.name;
            return communicationMedium;
        }
        return other;
    }
}