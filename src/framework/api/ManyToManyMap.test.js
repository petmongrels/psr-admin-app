import {ManyToManyMap, ManyToManyMapping} from "./ManyToManyMap";

it('newFieldIds', function () {
    let manyToManyMap = ManyToManyMap.getInstance();
    manyToManyMap.addMappings([new ManyToManyMapping("foo", {id: 1, other_id: 2})]);
    expect(manyToManyMap.newFieldIds("foo", "other_id", [2]).length).toEqual(0);
    expect(manyToManyMap.newFieldIds("foo", "other_id", [1]).length).toEqual(1);
});