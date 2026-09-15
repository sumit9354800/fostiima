export type PolicyPoint = {
  id: string;
  text: string;
};

export type PolicyData = {
  title: string;
  sections: {
    id: string;
    title: string;
    points: PolicyPoint[];
  }[];
};

export const policyData: PolicyData = {
  title: "Leave Policy for FOSTIIMA Employees",

  sections: [
    {
      id: "leave-policy",
      title: "Leave Policy for FOSTIIMA Employees",
      points: [
        {
          id: "leave-1",
          text: "Leave on a specific date / period cannot be claimed as right of the employee and may be refused or curtailed by the Competent Authority, if the exigencies of work so require. Decision of the Competent Authority shall be final and binding.",
        },
        {
          id: "leave-2",
          text: "The computation of leave will commence on 1st April and end on 31st March each year. In the 1st year of service, it will be computed on a pro-rata basis from the date of joining to 31st March.",
        },
        {
          id: "leave-3",
          text: "If an employee wants to take any type of leave, it is necessary for the employee to fill a Leave Application Form, obtain sanction from the Competent Authority and submit it to HR. HR will circulate the list of employees on leave on WhatsApp and on mail on daily basis.",
        },
        {
          id: "leave-4",
          text: "Except in case of emergency, no leave should be availed without prior sanction in the prescribed Leave Application Form.",
        },
        {
          id: "leave-5",
          text: "In case of emergency leave(s), the employee should inform or call his / her HOD and also inform HR. Such leaves should however be regularized by submitting a Leave Application Form immediately on joining the duty.",
        },
        {
          id: "leave-6",
          text: "A leave request sent through SMS or WhatsApp will not be accepted. It will be considered as intimation for leave only.",
        },
        {
          id: "leave-7",
          text: "Application through an email should be regularized by submitting a Leave Application Form as soon as possible.",
        },
        {
          id: "leave-8",
          text: "If an employee does not come to the office for half a day without prior permission, he / she will be counted as being on full-day leave.",
        },
        {
          id: "leave-9",
          text: "Sandwich Leave Rule: If any employee takes leave before and after non-working days, then the intervening non-working days will also be considered as leave for the employee. For example, if Saturday and Sunday are holidays and if any employee takes leave on both Friday and Monday, then all the 4 days will be considered as leave for the employee(s).",
        },
        {
          id: "leave-10",
          text: "An employee should take prior permission from the Competent Authority before the expiry of sanctioned leave if he / she would like to seek any leave extension beyond the sanctioned leave.",
        },
        {
          id: "leave-11",
          text: "An employee on leave shall not take up any outside assignment or accept any employment during the leave period.",
        },
      ],
    },
    {
      id: "recall-from-leave",
      title: "Recall from Leave",
      points: [
        {
          id: "recall-1",
          text: "The Competent Authority may recall any granted leave, in the best interest of the Institute.",
        },
        {
          id: "recall-2",
          text: "Refusal to report for duty on being recalled from leave shall be treated as absence.",
        },
      ],
    },
  ],
};