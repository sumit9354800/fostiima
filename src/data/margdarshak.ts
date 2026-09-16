export type MargdarshakTabId =
  | "margdarshak-1"
  | "margdarshak-2"
  | "margdarshak-3"
  | "margdarshak-4";

export type TableRow = string[];

export type ImageItem = {
  src: string;
  alt: string;
};

export type EditionData = {
  id: MargdarshakTabId;
  title: string;
  paragraphs: string[];
  sections: {
    title: string;
    paragraphs?: string[];
    list?: string[];
    table?: {
      headers: string[];
      rows: TableRow[];
    };
    images?: ImageItem[];
  }[];
};

export const margdarshakTabs = [
  {
    id: "margdarshak-1",
    label: "Margdarshak 1",
  },
  {
    id: "margdarshak-2",
    label: "Margdarshak 2",
  },
  {
    id: "margdarshak-3",
    label: "Margdarshak 3",
  },
  {
    id: "margdarshak-4",
    label: "Margdarshak 4",
  },
] satisfies {
  id: MargdarshakTabId;
  label: string;
}[];

export const aboutMargdarshak = {
  title: "About Margdarshak",
  paragraphs: [
    "We strongly believe that we the founders of FOSTIIMA Business School would not have been what we are today but for the inspirational role played by our IIM-A faculty in shaping our careers and our lives.. If today FOSTIIMSA is playing a role in nation building it is because of them.",

    "The names and memories of our faculty mentors like Prof Ravi Mathai, Prof Samuel Paul, Dr Kamala Chowdhry Prof Ishwar Dayal,,Prof S K Bhattacharya, Prof Pulin Garg etc. are permanently etched in our minds and several global thought leaders like C K Prahlad, Raghuram Rajan owe their success to their talent being identified, honed and nurtured by these mentors",

    "With the passage of time, as FOSTIIMA grew, the products of IIMA were becoming high flyers in the corporate sector and were making a name for themselves. At the same time, FOSTIIMA realized that the faculty that molded and nurtured them remained unknown.",

    "Such a situation was not prevalent in USA and the West.",

    "As a gesture of repaying our debt of gratitude to our IIM-A faculty we have instituted awards, titled MARGDARSHAK AWARDS, in their memory in the domain of Human Resource Management. MARGDARSHAK AWARDS honour the leading HR professionals. It’s commonplace to see Indian managers in leading positions in the international sphere.",
  ],
};

const margdarshak1Images: ImageItem[] = [
  "DSC_0031-scaled.jpg",
  "DSC_0038-scaled.jpg",
  "DSC_0040-scaled.jpg",
  "DSC_0042-min-scaled.jpg",
  "DSC_0045-min-scaled.jpg",
  "DSC_0055-min-scaled.jpg",
  "DSC_0088-min-scaled.jpg",
  "IMG_0103-min-scaled.jpg",
  "IMG_0116-min-scaled.jpg",
].map((name) => ({
  src: `https://fostiima.org/uploaded_files/cms/margdarshak/${name}`,
  alt: `Margdarshak 1 event photograph - ${name}`,
}));

const margdarshak2Images: ImageItem[] = [
  "DSC_1469-min-scaled.jpg",
  "DSC_1480-min-scaled.jpg",
  "DSC_1482-min-scaled.jpg",
  "DSC_1540-min-scaled.jpg",
  "DSC_1547-min-scaled.jpg",
  "DSC_1557-min-scaled.jpg",
  "DSC_1565-min-scaled.jpg",
  "DSC_1576-min-scaled.jpg",
  "DSC_1583-min-scaled.jpg",
  "DSC_1592-min-scaled.jpg",
  "DSC_1597-min-scaled.jpg",
  "DSC_1602-min-scaled.jpg",
  "DSC_1610-min-scaled.jpg",
  "DSC_1614-min-scaled.jpg",
  "DSC_1632-min-scaled.jpg",
  "DSC_1645-min-scaled.jpg",
  "DSC_1653-min-scaled.jpg",
  "DSC_1669-min-scaled.jpg",
  "DSC_1708-min-scaled.jpg",
  "DSC_1710-min-scaled.jpg",
  "DSC_1717-min-scaled.jpg",
].map((name) => ({
  src: `https://fostiima.org/uploaded_files/cms/margdarshak/${name}`,
  alt: `Margdarshak 2 event photograph - ${name}`,
}));

const margdarshak3Images: ImageItem[] = [
  "DSC_0108-min-scaled.jpg",
  "DSC_0117-min-scaled.jpg",
  "DSC_0131-min-scaled.jpg",
  "DSC_0143-min-scaled.jpg",
  "DSC_0147-min-scaled.jpg",
  "DSC_0166-min-scaled.jpg",
  "DSC_0170-min-scaled.jpg",
  "DSC_0171-min-scaled.jpg",
  "DSC_0174-min-scaled.jpg",
  "DSC_0191-min-scaled.jpg",
  "DSC_0197-min-scaled.jpg",
  "DSC_0212-min-scaled.jpg",
  "DSC_0214-min-scaled.jpg",
  "DSC_0217-min-scaled.jpg",
  "DSC_0223-min-scaled.jpg",
  "DSC_0227-min-scaled.jpg",
  "DSC_0234-min-scaled.jpg",
  "DSC_0250-min-scaled.jpg",
  "DSC_0259-min-scaled.jpg",
  "DSC_0262-min-scaled.jpg",
  "DSC_0273-min-scaled.jpg",
  "DSC_0274-min-scaled.jpg",
  "DSC_0280-min-scaled.jpg",
  "DSC_0286-min-scaled.jpg",
  "DSC_0294-min-scaled.jpg",
  "DSC_0304-min-scaled.jpg",
  "DSC_0311-min-scaled.jpg",
  "DSC_0325-min-scaled.jpg",
  "DSC_0338-min-scaled.jpg",
  "DSC_0404-min-scaled.jpg",
  "DSC_0406-min-scaled.jpg",
].map((name) => ({
  src: `https://fostiima.org/uploaded_files/cms/margdarshak/${name}`,
  alt: `Margdarshak 3 event photograph - ${name}`,
}));

export const margdarshakEditions: EditionData[] = [
  {
    id: "margdarshak-1",
    title: "ABOUT MARGDARSHAK 1",

    paragraphs: [
      "In keeping with its pioneering spirit, FOSTIIMA gave a new direction to management education the it instituted MARGDARSHAK AWARDS– in the memory of the founding faculty of the Indian Institute of Management, Ahmedabad– for outstanding HR corporate managers. These faculty gave up lucrative assignments in the USA and the industry to foster management education in India. They were visionaries, intellectual giants, teachers of a very tall stature and famous institution builders. If K. V. Kamath, Raghuram Rajan, Chetan Bhagat, A. S. Banga, Harsha Bhogle, Srikant Datar, and many others, are household names today, it is in no small measure due to the efforts of these founding faculty members.",

      "It seemed quite an anomalous situation where the products of an institution attained recognition, but the people who went into making these institutions famous remained in the shadows. We at FOSTIIMA were very well aware that while it is an established practice in the USA to acknowledge the institution builders, such an effort is lacking in India. The constraints of COVID notwithstanding, FOSTIIMA launched its first edition of MARGDARSHAK AWARDS in 2020. The response of the corporate sector was way beyond anything we could have imagined. They resonated so deeply with the industry that we were convinced that MARGDARSHAK AWARDS were an idea whose time had come. We have defined the following categories of awards:",
    ],

    sections: [
      {
        title: "Award Categories",
        list: [
          "Hall of Fame",
          "Lifetime Achievement Award",
          "Transformational Leadership Award",
          "Young Turk of the Year",
          "Disruptor of the Year Award",
          "Corporate Social Responsibility Award",
          "Excellence in Diversity and Inclusion",
          "Excellence in Talent Acquisition & Retention",
          "Excellence in Employee Engagement",
          "HR Director of the Year",
        ],
      },

      {
        title: "The Process",
        paragraphs: [
          "These awards are not bestowed but won by a rigorous process. M/s KPMG are associated with us as our Process Validators who measure the candidature of the participants as per their international template. After launching an edition of MARGDARSHAK AWARDS, FOSTIIMA Business School engages in heavy promotion and wide reach amongst the HR fraternity. We invite participation on a huge scale. The Nomination Forms, after preliminary screening, are forwarded to M/s KPMG. The qualifying candidates are shortlisted by an independent Interim Jury comprised of independent professionals of very high stature, The Interim Jury evaluates the candidates and submits the ranking to the Advisory Council which scales down the candidates to 3-4 per category and thus about 35/40 candidates are submitted to the jury Panel which then selects the winners.",
        ],
      },

      {
        title: "Jury Panel & Advisory Council",
        table: {
          headers: [
            "Sr No",
            "Jury Panel",
            "Advisory Council",
          ],
          rows: [
            ["1", "Mr Suresh Narayanan,CMD,Nestle", "Mr Aquil Busrai, Motorola, IBM"],
            ["2", "Ms Vinita Bali,( Cognizant)", "Mr P Dwarakanath GSK"],
            ["3", "Mr Deep Kalra (makemytrip.com, IIM-A)", "Mr Dhruv Prakash (IIM-A) Indiamart"],
            ["4", "Mr Rahul Bhasin (Barings Equity, IIM-A)", ""],
            ["5", "Mr Manish Sabharwal, (Team Lease IIM-A)", ""],
            ["6", "Mr S Y Siddique-Maruti Suzuki Ind Ltd", ""],
            ["7", "Mr Jaitirth Rao IIM-A Value Homes, IIM-A", ""],
          ],
        },
      },

      {
        title: "List of Winners",
        table: {
          headers: ["Name", "Company", "Award"],
          rows: [
            ["Ms Shambhavi Solanki", "Policybazaar", "Young Turk"],
            ["Ms Pooja Tiwari", "Nykaa", "Young Turk"],
            ["Mr Narasimha Rao", "At Foods", "Talent Acquisition"],
            ["Mr Dinesh Gulati", "IndiaMart", "Disruptor of Year"],
            ["Mr T K Srirang", "ICICI Bank", "Director of Year"],
            ["Mr Krish Shankar", "Infosys", "Employee Engagement"],
            ["Mr Yogi Sriram", "L&T", "Hall of Fame"],
            ["Dr Santrupt Misra", "Birla Cabon", "Hall of Fame"],
            ["Ms Nathan S V", "Deloitte", "Disruptor of Year"],
            ["Mr Rajeev Dubey", "Mahindra & Mahindra", "Hall of Fame"],
            ["Mr Rajesh Dahiya", "Axis Bank", "Transformational Leadership"],
            ["Ms R Mahalakshmi", "Mondelez", "Diversity & Inclusion"],
          ],
        },
      },

      {
        title: "List of Companies to Which Our Participants Belonged",
        table: {
          headers: [
            "Company",
            "Company",
            "Company",
            "Company",
          ],
          rows: [
            ["ICICI Bank", "Axis Bank", "Mahindra & Mahindra", "L&T"],
            ["Infosys", "Indiamart", "Mondelez", "Aditya Birla Sunlife"],
            ["Lupin Global", "Om Logistics", "ANI News", "SREI"],
            ["Deloitte", "Tata Steel", "RPG Group", "India Today"],
            ["P&G", "HPCL Ltd.", "Bharat fritz Werner", "MoEngage"],
            ["Jeena & Co", "People Strong", "Roinet Solutions", "Zensor Technologies"],
            ["TCS", "Oyo", "Nayka", "Policy Bazaar"],
            ["Blackbuck", "Kotak Bank", "AT Foods", "Accenture"],
            ["OTIS", "JSW L&T Nxt", "Birla Carbo", "Macawbery BeeKay P Ltd."],
            ["Monte Carlo", "Team Computers", "SMC Global Securities", "L&T Howden"],
            ["Sap Labs Ltd.", "IDFC Bank", "Nayara Energy", "Potash India"],
            ["Carrier Media India P Ltd.", "Reliance Jio", "JK Group", "Aajtak"],
          ],
        },
      },

      {
        title: "Images & Brochure",
        images: margdarshak1Images,
      },
    ],
  },

  {
    id: "margdarshak-2",
    title: "ABOUT MARGDARSHAK 2",

    paragraphs: [
      "The participants are outstanding HR luminaries who were measured by M/s KPMG as per their international template. The Advisory Council short-listed the candidates who were finally selected by an eminent Panel of Jury as the awardees for 10 categories i.e., Hall of Fame, Lifetime Achievement, Transformational Management, Young Turk of the Year, Corporate Social Responsibility, Diversity & Inclusion, Talent Acquisition & Retention, Disruptor of the Year, Employee Engagement and the Director of the Year.",

      "The Award Ceremony, held in September 2022, was an unforgettable experience where great HR professionals came together to be recognized and awarded. It was presided over by Mr Jyotiraditya Scindia, Hon'ble Union Minister of Civil Aviation and Steel, with Mr Yashish Dahiya, co-founder Policy Bazar, as the Chief Guest.",

      "Welcoming the guests the Chairman, Mr Somani, paid tribute to the founding faculty of IIMA. \"They were extremely tall in their stature. They were visionaries, institution builders and need to be recognised.\" Mr Somani further stated that these awards were entirely process driven. \"I wish to categorically state that these awards are not bestowed but actually won by a very fair selection process.\"",

      "Ms Shivani Sanwal, Director, Governance Risk & Compliance Services, M/s KPMG explained the entire process clearly spelling out the role of the Advisory Council and the Jury.",

      "The Chief Guest Jyotiraditya M. Scindia complimented the Chairman for the journey the latter had undertaken in setting up FOSTIIMA. Such institutes, Mr Scindia added, were always based on bonds and kinship. They were a unique coupling between an age-old institute and a newly spawned school.",

      "Giving the role of the HR luminaries a national perspective Mr Scindia added \"India's time has come. There is no power in the world can deny our place in the comity of nations.\" The awardees and their work have not only impacted individual lives but in a way it is changing the nation. The only way that we can keep empowering life is through developing Human Resources through innovative ideas. HR is the soul of any organization and it helps the organization to stay balanced and perform better.",

      "Mr Scindia went on to emphasise the role of women by stating very clearly that a nation cannot proper if half the work force is left behind. In his very perceptive way Mr Scindia said he was pleased to note that among the winners, women were in the majority. Turning to the Chairman, Mr Scindia said that he hoped that in the future the dignitaries on the dais would reflect the similar pattern. It was his earnest hope in near future too this trend will be maintained and more women come forward and lead from the front.",

      "The event truly missed the presence of the Jury Member Mr K V Kamath., who is amongst the senior most alumni of IIMA. Mr Kamath could not make it to Delhi due to prior engagements but, addressing the gathering virtually, mentioned that \"MARGDARSHAK AWARDS are a humble tribute to the IIM-A faculty who made the Institute what it is today.\" Mr Kamath thanked M/s KPMG, the Jury Panel, the Advisory Council and wished the winners the very best.",

      "Addressing the audience, Mr Rajeev Dubey, the Advisory Council Member, mentioned that its inspiring to be a part of this process.\" It is an amazing time to be an Indian. The potential is unlimited\" added Mr Dubey. The ultimate purpose is to remove poverty, disease and lack of education.",

      "Mr. Yashish Dahiya, the Guest of Honour said \"…I think the quality of the awardees was just stunning. The Judges I saw are absolutely stellar….and all this just in the second attempt\" Speaking in a lighter vein, Mr Dahiya added that was very sure that he was heading the HR function till he realised that one of his juniors, who won MARGDARSHAK award, was being perceived as the real HR Head!",

      "Mr Rashesh Shah, the eminent Jury Member could not make it as he was travelling during this period. But Mr Shah certainly conveyed his message over ZOOM when he mentioned that \"I can see that MARGDARSHAK AWARDS have become an exemplary and aspirational awards for the industry.\" Mr Shah advised the FOSTIIMA Team to keep the IIMA flag flying.",

      "Proposing the Vote of Thanks to the Chief Guest, Mr Ajay Garg, Founder & Director, Equirus Capital, complimented FOSTIIMA and expressed his desire to \"carry it forward for the next 25 yrs to give back to the society\"",

      "The Chief Mentor of FOSTIIMA, Mr Jaithirth Rao, being in New York for his book launch, advised the gathering via ZOOM that we have forgotten our traditions of guru shishya parampara, guru seva, guru dakshinya. Mr Rao added that \"through MARGDARSHAK AWARDS, FOSTIIMA wants simultaneously to make a connection with our traditions and also adopt a very modern approach of celebration\"",

      "Mr Suresh Narayana, CMD, Nestle India, mentioned that it has been a \"privilege and a honour to be a member of the Jury for last two years\" and complimented M/s KPMG for their remarkable efforts. Mr Narayanan paid \"special tribute to the Jury for whom I have the highest regard\" and wished all the winners the very best in their careers.",
    ],

    sections: [
      {
        title: "Jury Panel & Advisory Council",
        table: {
          headers: [
            "Sr No",
            "Jury Panel",
            "Advisory Council",
          ],
          rows: [
            ["1", "Mr K V Kamath", "Mr Rajeev Dubey-Mahindras"],
            ["2", "Ms Naina Lal Kidwai, ex-HSBC Bank", "Mr Manoj Kohli-Soft Bank"],
            ["3", "Mr Sanjeev Bikhchandani-IIM-A .Founder Infoedge", "Mr Dhruv Prakash (IIM-A)"],
            ["4", "Mr Suresh Narayanan,CMD,Nestle", ""],
            ["5", "Mr Rashesh Shah IIM-A, CO-Founder Edelweiss", ""],
            ["6", "Mr S Y Siddique-Maruti Suzuki Ind Ltd", ""],
            ["7", "Mr Jaitirth Rao IIM-A Value Homes, IIM-A", ""],
          ],
        },
      },

      {
        title: "Winners of Margdarshak Awards 2.0",
        table: {
          headers: ["Name", "Company", "Award"],
          rows: [
            ["P Dwarakanath", "ex GSK", "Hall of Fame"],
            ["Vivek Patwardhan", "HyTech Engineers", "Lifetime Acheivement"],
            ["Manu Wadhwa", "Sony Pictures Networks", "Transformational Leadership"],
            ["Pragya Singh", "PepsiCo", "Young Turk"],
            ["Aradhana Lal", "Lemon Tree", "Corporate Social Responsibility"],
            ["Rajesh Kumar", "Lemon Tree", "Corporate Social Responsibility"],
            ["Priyanka Kapur", "ZS Associate", "Disruptor of the Year"],
            ["Swati Rustagi", "Amazon", "Diversity & Inclusion"],
            ["Girish Menon", "Swiggy", "Talent Acquisition"],
            ["Yuvaraj Srivastava", "MakeMyTrip", "Employee Engagement"],
            ["Anuradha Razdan", "Hindustan Unilever", "Director of the year"],
          ],
        },
      },

      {
        title: "List of Participating Companies",
        table: {
          headers: ["Company", "Company", "Company", "Company", "Company", "Company", "Company", "Company"],
          rows: [
            ["Hindustan Unilever", "PWC", "PepsiCo Global Services", "Mitsubishi Electric Group", "Vodafone Idea", "Amazon", "Proctor & Gamble", "Delta Airlines Global Technology Hub"],
            ["Sony Pictures Network Ltd.", "HDFC Life", "Reliance Retail", "Reliance Jio Infocomm", "Mindtree Nxt (L&T)", "Dr. Lal Path Lab", "GSK India", "Pidilite"],
            ["JSW Energy Ltd.", "OSRAM Lighting", "Monte Carlo", "Nayara Energy", "Om Logistics", "Lemon Tree Hotels", "IFFCO TOKKIO General Insurance", "ZS Associates India"],
            ["Blue Star", "Adani Gas", "MakeMyTrip.com", "Dr. Reddy Lab", "Lupin Ltd.", "RM Education Solutions Ltd.", "JBM Group", "Swiggy"],
            ["Gameskraft India", "People Konnect", "Quest Retails Pvt. Ltd.", "Lakshimikumaran and Sridharan", "HMD mobile India", "Chaayos", "People strong", "MoEngage"],
            ["Savills", "Asian News International", "Pramerica Life Insurance", "DS Group", "ESME Consumer Pvt. Ltd.", "Credgenics", "Future Generali Life India Insurance", "Manpower"],
            ["NA_ independent Advisor & consultant", "The Body Shop International", "Macawbery BeeKay P Ltd", "Wipro", "Hy Tech Engineers", "J K Organization", "Policy Bazaar", "Ultra Tech Cement"],
          ],
        },
      },

      {
        title: "Images & Brochure",
        images: margdarshak2Images,
      },
    ],
  },

  {
    id: "margdarshak-3",
    title: "ABOUT MARGDARSHAK 3",

    paragraphs: [
      "The overwhelming success of the first two editions of MARGDARSHAK AWARDS gave huge impetus to FOSTIIMA Business School to launch the third edition. Once again FOSTIIMA cast its net far and wide to reach out to a vast section of HR fraternity who had not been able to participate earlier. The previous editions had generated a lot of awareness about the Awards. There were innumerable queries on participation fee. It was indeed a very pleasant surprise when they learnt that MARGDARSHAK AWARDS did not have any Registration Fee. The realisation that it was the solemnity and reverence of the memory of the founding faculty added immense prestige to these Awards. Once again FOSTIIMA scouted for outstanding HR luminaries who were measured by M/s KPMG as per their international template. As usual there were clarifications on T & C and expectations of M/s KPMG.",

      "After attending to concerns of the participants, the Application Forms started flowing in and were forwarded to The Advisory Council. As per established practice, the Advisory Council examined the candidature of the participants with uncompromising rigour. The short-listed candidates were finally selected by an eminent Panel of Jury as the awardees for 10 categories i.e., Hall of Fame, Lifetime Achievement, Transformational Management, Young Turk of the Year, Corporate Social Responsibility, Diversity & Inclusion, Talent Acquisition & Retention, Disruptor of the Year, Employee Engagement and the Director of the Year.",

      "The Award Ceremony, held in December 2024, was a memorable evening where great HR professionals came together to be recognized and awarded. It was presided over by Dr Shashi Tharoor, Hon'ble Member of Parliament.",

      "Speaking on the occasion Dr Tharoor stated that he was \"Delighted to be with you and it's wonderful to participate in the third edition of MARGDARSHAK AWARDS\"",

      "Dr Tharoor recalled the efforts and contribution of the founding faculty who, under the stewardship of first Prime Minister, Jawaharlal Nehru, gave up their lucrative assignments to build the newly established Indian Institute of Management in Ahmedabad. Dr Tharoor thanked FOSTIIMA for re-igniting that vision by introducing MARGDARSAK AWARDS. At the same time, Dr Tharoor reminded FOSTIIMA that the road ahead is long and the institute must traverse the path to continue to be a source of inspiration to young aspirational managers, educators and entrepreneurs.",

      "Dr Tharoor recalled the tireless efforts of Dr Vikram Sarabhai, the leader of India's space program who pioneered management education in the country and whose visionary leadership inspired many to achieve heights of excellence in their fields. Dr Tharoor particularly lauded the action of the Director of IIMA, Prof Ravi Mathai, who voluntary stepped down stating that the Institute needed another direction for which another suitable person should occupy the office of the Director. \"We don't see much of that today\" Dr Tharoor remarked.",

      "Dr Tharoor shared the evolution of business education as it evolved from USA which saw the sprouting of several business schools and how the trend came to India. Dr Tharoor was categorical in stating that it would be very short sighted to view IIMs as imparting management education. In fact, they prepare you for life. It's quite commonplace to see so many graduates taking to careers vastly different from management education.",
    ],

    sections: [
      {
        title: "Jury Panel & Advisory Council",
        table: {
          headers: [
            "Sr No",
            "Jury Panel",
            "Advisory Council",
          ],
          rows: [
            ["1", "Mr K V Kamath", "Mr Rajeev Dubey-Mahindras"],
            ["2", "Ms Vinita Bali", "Mr Vivek Patwardhan, Ex Asian Paints"],
            ["3", "Mr Sanjeev Bikhchandani-IIM-A .Founder Infoedge", "Mr Dhruv Prakash (IIM-A)"],
            ["4", "Mr Suresh Narayanan,CMD,Nestle", ""],
            ["5", "Mr Kiran Karnik, IIM-A, EX NASSCOM", ""],
            ["6", "Mr S Y Siddique-Maruti Suzuki Ind Ltd", ""],
            ["7", "Mr Sanjiv Mehta, CMD, HUL", ""],
          ],
        },
      },

      {
        title: "List of Winners",
        table: {
          headers: ["Name", "Company", "Award"],
          rows: [
            ["Alka Mittal", "Ex-ONGC", "Hall of Fame"],
            ["Satish Pradhan", "ex Tata Sons", "Life Time achievement"],
            ["Razdan", "HDFC Bank", "Director of The year"],
            ["Manu Wadhwa", "Infosys", "Transformational Leadership"],
            ["Pragya Singh", "PepsiCo", "Young Turk"],
            ["Carried Forward", "NA", "ESG"],
            ["Mohammad asif iqbal", "Price Waterhouse Cooper", "Jury Spl Award for CSR"],
            ["Shrandhanjali Rao", "Google India", "Disruptor of the Year"],
            ["Swati Rustagi", "Amazon", "Diversity & Inclusion"],
            ["Neha Dugad", "Marico Industries", "Talent Acquisition"],
            ["Yuvaraj Srivastava", "MakeMyTrip", "Employee Engagement"],
            ["Anuradha Razdan", "Hindustan Unilever", "Director of the year"],
          ],
        },
      },

      {
        title: "Images & Brochure",
        images: margdarshak3Images,
      },
    ],
  },

  {
    id: "margdarshak-4",
    title: "ABOUT MARGDARSHAK 4",

    paragraphs: [
      "Buoyed and encouraged by the huge support and unimaginable, incredible recognition by the corporates, we are convinced that MARGDARSHAK AWARDS have resonated deeply with the HR fraternity. Continuing our journey, we take immense pride in launching MARGDARSHAK AWARDS 4.0",

      "We rededicate ourselves to the memory of the founding faculty of IIM-A, who turned away from lucrative assignments and international careers to nurture management education in India.",

      "They were guided by the shining beacon of seeing native Indian genius flowering and gaining its rightful place in the corporate world.",

      "Do join us in celebrating the fructification of their vision as we see Indians heading innumerable corporates and educational institutes the world over.",

      "Once again, our Chairman, Mr Anil Somani, reaches out to the industry:",

      "We continue with M/s KPMG Assurance & Consulting Services LLP as our Process Validators and M/s India Today Television as our Broadcasting Partner.",
    ],

    sections: [
      {
        title: "Margdarshak 4 Visuals",
        images: [
          {
            src: "https://fostiima.org/uploaded_files/cms/margdarshak/Margdarshak4-1.jpg",
            alt: "Margdarshak Awards 4 Chairman message",
          },
          {
            src: "https://fostiima.org/uploaded_files/cms/margdarshak/Margdarshak4-2.png",
            alt: "Margdarshak Awards 4 partners",
          },
          {
            src: "https://fostiima.org/uploaded_files/cms/margdarshak/Margdarshak4-3.jpg",
            alt: "Margdarshak Awards 4 Jury Panel",
          },
          {
            src: "https://fostiima.org/uploaded_files/cms/margdarshak/Margdarshak4-4.jpg",
            alt: "Margdarshak Awards 4 Advisory Council",
          },
          {
            src: "https://fostiima.org/uploaded_files/cms/margdarshak/Margdarshak4-5.jpg",
            alt: "Margdarshak Awards 4 Conclave Directorate",
          },
        ],
      },
    ],
  },
];

export function getMargdarshakEdition(
  id: MargdarshakTabId,
) {
  return margdarshakEditions.find(
    (edition) => edition.id === id,
  );
}