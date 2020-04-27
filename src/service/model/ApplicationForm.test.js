import {ApplicationForm, PhotographSubmission} from "./Service";

it('remove photograph submission', function () {
    let applicationForm = new ApplicationForm();
    let photographSubmission = PhotographSubmission.newInstance();
    applicationForm.photographSubmissions = [photographSubmission];
    ApplicationForm.removePhotographSubmission(applicationForm, photographSubmission);
    expect(applicationForm.photographSubmissions.length).toEqual(0);
});