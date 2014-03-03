/*globals QuarryTest, Em, App */
QuarryTest.homePage = function () {
    return {
        hypervisors: QuarryTest.vmApi().hypervisors,
        myJobs: QuarryTest.jobApi().myJobs,
        cardstacks: QuarryTest.cardstackApi().cardstacks
    };
};