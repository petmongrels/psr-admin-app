import {ReferenceEntity} from "../../framework/model/ReferenceEntity";

export class ServiceTag implements ReferenceEntity {
    id!: number;
    name!: string;
    description!: string;
}