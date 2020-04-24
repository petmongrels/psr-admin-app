import * as _ from "lodash";

export interface ReferenceEntity {
    id: number;
    name: string;
    description: string;
}

export class ReferenceEntities {
    static findEntityByName(referenceEntities: Array<ReferenceEntity>, name: string): ReferenceEntity {
        return _.find(referenceEntities, (referenceEntity) => referenceEntity.name === name);
    }

    static findEntitiesByName(referenceEntities: Array<ReferenceEntity>, names: string[]): ReferenceEntity[] {
        return _.filter(referenceEntities, (referenceEntity) => _.some(names, (name) => referenceEntity.name === name));
    }
}