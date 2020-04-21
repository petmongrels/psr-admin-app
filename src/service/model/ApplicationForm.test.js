import {ApplicationForm, PhotographSubmission} from "./Service";

it('remove photograph submission', function () {
    let applicationForm = new ApplicationForm();
    let photographSubmission = PhotographSubmission.newInstance();
    applicationForm.photographSubmissions = [photographSubmission];
    applicationForm.removePhotographSubmission(photographSubmission);
    expect(applicationForm.photographSubmissions.length).toEqual(0);
});