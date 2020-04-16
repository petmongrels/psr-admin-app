import * as _ from "lodash";

export interface ReferenceEntity {
    name: string;
    description: string;
}

export class ReferenceEntities {
    static findEntityByName(referenceEntities: Array<ReferenceEntity>, name: string): ReferenceEntity {
        return _.find(referenceEntities, (referenceEntity) => referenceEntity.name === name);
    }
}