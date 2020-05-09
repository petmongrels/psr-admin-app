import {ReferenceEntity} from "../../framework/model/ReferenceEntity";

export class CommunicationMedium implements ReferenceEntity {
    id!: number;
    name!: string;
    description: string;
    requiresAddress: boolean;

    static clone(other: CommunicationMedium) {
        return other && CommunicationMedium.newInstance(other);
    }

    static fromResource(resource: any) {
        return CommunicationMedium.newInstance(resource);
    }

    static newInstance({id, name, description, requiresAddress}: CommunicationMedium) {
        let communicationMedium = new CommunicationMedium();
        communicationMedium.id = id;
        communicationMedium.name = name;
        communicationMedium.description = description;
        communicationMedium.requiresAddress = requiresAddress;
        return communicationMedium;
    }
}