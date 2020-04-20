import {Service} from './Service';

it('JSON.parse', () => {
    let service = Service.newService();
    service.name = "foo";
    service.components[0].name = "bar";
    let deserialized = JSON.parse(JSON.stringify(service));
    expect(deserialized.name).toEqual(service.name);
    expect(deserialized.components[0].name).toEqual(service.components[0].name);
});