import _ from 'lodash';

export class ManyToManyMap {
    private static instance: ManyToManyMap;
    private mappings: ManyToManyMapping[];

    private constructor() {
    }

    public static getInstance() {
        if (!ManyToManyMap.instance) {
            ManyToManyMap.instance = new ManyToManyMap();
        }
        return ManyToManyMap.instance;
    }

    addMappings(mapping: ManyToManyMapping[]) {
        this.mappings.push(...mapping);
    }

    newFieldIds(table: string, fieldName: string, currentFieldIds: number[]): number[] {
        return _.filter(currentFieldIds, (fieldId) => _.some(this.mappings, (mapping) => mapping.table === table && mapping.obj[fieldName] === fieldId));
    }

    removedObjectIds(table: string, fieldName: string, fieldIds: number[]) {
        return _.filter(this.mappings, (mapping) => mapping.table === table && !_.some(fieldIds, (fieldId) => mapping.obj[fieldName] === fieldId)).map((mapping) => mapping.obj["id"]);
    }

    clearMapping(table: string) {
        _.remove(this.mappings, (mapping) => mapping.table === table);
    }
}

export class ManyToManyMapping {
    table: string;
    obj: any;

    constructor(table: string, obj: any) {
        this.table = table;
        this.obj = obj;
    }
}