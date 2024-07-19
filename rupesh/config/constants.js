// constants.js

'use strict';

let constants = {
    ROLE: {
        SUPERADMIN: 1,
        CME: 2,
        INSTITUTE: 3,
        SUBINSTITUTE: 4,
        DOCTOR: 5,
        INTERN: 6,
        SPEAKER:7,
        PHARMACTICAL:8
    },
    REQUEST_INSTITUTE_STATUS: {
        APPROVED: "APPROVED",
        PENDING: "PENDING",
        REJECTED: "REJECTED",
    },
    COMMUNITY_TYPE: {
        INFOCUS: "INFOCUS",
        NEWS: "NEWS",
        DCONNECT: "D-CONNECT",
    },
    CREDIT_SCORE : {
        USER:1,
        SPEAKER:5
    },
    TOTAL_DAYS_OF_ACTIVITY_ABOUT_TO_CLOSE:5,
    COMMUNITY_POST_FILE_PATH: 'communitypost/',
    INSTITUTE_REJECTION_SUBJECT: 'Requested Institute Rejected.',
    INSTITUTE_APPROVAL_SUBJECT: 'Requested Institute Approved.',
    SUB_INSTITUTE_REJECTION_SUBJECT: 'Requested Sub Institute Rejected.',
    SUB_INSTITUTE_APPROVAL_SUBJECT: 'Requested Sub Institute Approved.',
    DOCUMENT_TYPE: {
        INSTITUTE: "INSTITUTE",
        SUBINSTITUTE: "SUB-INSTITUTE",
    }


};
module.exports = Object.freeze(constants); // freeze prevents changes by users
