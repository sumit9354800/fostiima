export type PrivacyPolicyContactDetail = {
  label: string;
  value: string;
  href?: string;
};

export type PrivacyPolicySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  points?: string[];
  footerParagraphs?: string[];
  contactDetails?: PrivacyPolicyContactDetail[];
};

export type PrivacyPolicyData = {
  title: string;
  lastUpdated: string;
  introduction: string;
  sections: PrivacyPolicySection[];
};

export const privacyPolicyData: PrivacyPolicyData = {
  title: "Privacy Policy for Fostiima Business School",
  lastUpdated: "4 November 2026",
  introduction:
    'This Privacy Policy explains how Fostiima Business School ("we", "us" or "our") collects, uses, shares and protects personal data when you use https://www.fostiima.org/. Please read it before using our website or giving us any information.',
  sections: [
    {
      id: "information-we-collect",
      title: "Information we collect",
      paragraphs: [
        "We collect only what we need. Depending on how you use our website, this may include:",
      ],
      points: [
        "Contact details, such as your name, email address and phone number, when you fill in a form, place an order or contact us.",
        "Account details, such as your username and password, when you create an account. Passwords are stored in a protected, hashed form.",
        "Payment details when you buy something. Payments are handled by our payment provider. We do not see or store your full card number, CVV or UPI PIN.",
        "Messages, reviews, feedback and anything else you send us.",
        "Technical data sent automatically by your browser, such as your IP address, browser and device type, pages you visit and the time of your visit.",
      ],
    },
    {
      id: "how-we-use-your-information",
      title: "How we use your information",
      points: [
        "To provide our services, process orders and payments, and deliver what you bought.",
        "To create and manage your account.",
        "To reply to your messages and give customer support.",
        "To understand how our website is used, fix problems and improve it.",
        "To keep our website secure and prevent fraud or misuse.",
        "To meet our legal obligations, such as keeping tax and accounting records.",
      ],
    },
    {
      id: "why-we-are-allowed-to-use-it",
      title: "Why we are allowed to use it",
      paragraphs: [
        "We use personal data with your consent, which you can withdraw at any time, or for other purposes the law allows, such as completing a purchase you asked for or meeting a legal obligation.",
      ],
    },
    {
      id: "who-we-share-it-with",
      title: "Who we share it with",
      paragraphs: [
        "We share personal data only with people who need it to run our business:",
      ],
      points: [
        "Our website hosting and IT service providers, who store data on our behalf.",
        "Payment providers (our payment gateway) to process your payments.",
        "Government authorities, courts or law enforcement, when the law requires it.",
      ],
      footerParagraphs: [
        "They may use it only to provide their services to us. We do not sell your personal data.",
      ],
    },
    {
      id: "how-long-we-keep-it",
      title: "How long we keep it",
      paragraphs: [
        "We keep personal data only as long as we need it for the purposes above or as the law requires, for example for tax and accounting records. After that we delete or anonymise it.",
      ],
    },
    {
      id: "how-we-protect-it",
      title: "How we protect it",
      paragraphs: [
        "We use reasonable security measures, such as HTTPS encryption, access controls and trusted service providers. No website is completely secure, but if a data breach affects you, we will inform you and the authorities as the law requires.",
      ],
    },
    {
      id: "your-rights-under-indian-law",
      title: "Your rights under Indian law",
      paragraphs: [
        "The Digital Personal Data Protection Act, 2023 gives you the following rights. These provisions take full effect on 13 May 2027, and we are following them from now. You have the right to:",
      ],
      points: [
        "Get a summary of the personal data we hold about you and how we use it, and the names of those we have shared it with.",
        "Ask us to correct, complete, update or erase your personal data.",
        "Withdraw your consent at any time, as easily as you gave it. This does not affect anything we did before you withdrew it.",
        "Nominate another person to exercise your rights if you die or are unable to do so.",
        "Have your grievance handled by us. If you are not satisfied with our response, you can complain to the Data Protection Board of India.",
      ],
      footerParagraphs: [
        "To use any of these rights, email us at admissions@fostiima.org or contact our Grievance Officer below. We will reply within 90 days.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "Our website is not meant for anyone under 18, and we do not knowingly collect their personal data. If you believe a child has given us personal data, contact us and we will delete it.",
      ],
    },
    {
      id: "changes-to-this-policy",
      title: "Changes to this policy",
      paragraphs: [
        'We may update this Privacy Policy from time to time. We will post the new version on this page with a new "Last updated" date, and tell you about important changes by email or a notice on our website.',
      ],
    },
    {
      id: "contact-us",
      title: "Contact us",
      paragraphs: [
        "If you have any questions about this Privacy Policy, contact Fostiima Business School:",
      ],
      contactDetails: [
        {
          label: "Email",
          value: "admissions@fostiima.org",
          href: "mailto:admissions@fostiima.org",
        },
        {
          label: "Phone",
          value: "+917678391245",
          href: "tel:+917678391245",
        },
        {
          label: "Address",
          value: "Plot No. HAF-1, Dwarka Sector 9,, New Delhi, 110077",
        },
        {
          label: "Website",
          value: "https://www.fostiima.org/",
          href: "https://www.fostiima.org/",
        },
      ],
    },
    {
      id: "grievance-officer",
      title: "Grievance Officer",
      paragraphs: [
        "For complaints about your personal data, you can contact our Grievance Officer:",
      ],
      contactDetails: [
        {
          label: "Name",
          value: "Mr. Rajeeva Kansal",
        },
        {
          label: "Email",
          value: "rajeeva.kansal@fostiima.org",
          href: "mailto:rajeeva.kansal@fostiima.org",
        },
      ],
      footerParagraphs: [
        "We will acknowledge your complaint within 48 hours and try to resolve it within 30 days.",
      ],
    },
  ],
};

