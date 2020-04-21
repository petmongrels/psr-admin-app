import {ReferenceEntity} from "../../framework/model/ReferenceEntity";

export class CommunicationMedium implements ReferenceEntity {
    name!: string;
    description: string;
    requiresAddress: boolean;

    static clone(other: CommunicationMedium) {
        return other && CommunicationMedium.newInstance(other.name, other.description, other.requiresAddress);
    }

    static fromResource(resource: any) {
        return CommunicationMedium.newInstance(resource["name"], resource["description"], resource["requires_address"]);
    }

    static newInstance(name: string, description: string, requiresAddress: boolean) {
        let communicationMedium = new CommunicationMedium();
        communicationMedium.name = name;
        communicationMedium.description = description;
        communicationMedium.requiresAddress = requiresAddress;
        return communicationMedium;
    }
}