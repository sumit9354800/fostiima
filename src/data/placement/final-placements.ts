export type PlacementProfile = {
  id: string;
  category: string;
  percentage: number;
};

export type PlacementChartData = {
  id: string;
  title: string;
  data: PlacementProfile[];
};

export type PlacementStudent = {
  id: string;
  name: string;
  role: string;
  image: string;
};

export type FinalPlacementBatch = {
  id: string;
  batch: string;
  title: string;
  placementCharts: PlacementChartData[];
  highlights: string;
  students: PlacementStudent[];
};
export const finalPlacementBatches: FinalPlacementBatch[] = [
  {
    id: "final-placement-2023-2025",
    batch: "2023 - 2025",
    title: "Final Placement (2023 - 2025)",

    // Numeric graph data was not provided in the source.
    placementCharts: [
      {
        id: "industry-wise",
        title: "Industry Wise",
        data: [
          {
            id: "advertising",
            category: "Advertising",
            percentage: 15,
          },
          {
            id: "consulting",
            category: "Consulting",
            percentage: 8,
          },
          {
            id: "logistics",
            category: "Logistics",
            percentage: 33,
          },
          {
            id: "bfsi",
            category: "BFSI",
            percentage: 5,
          },
          {
            id: "real-estate",
            category: "Real Estate",
            percentage: 11,
          },
          {
            id: "fmcg",
            category: "FMCG",
            percentage: 12,
          },
          {
            id: "retail-marketing",
            category: "Retail Marketing",
            percentage: 12,
          },
          {
            id: "e-commerce",
            category: "E Commerce",
            percentage: 3,
          },
          {
            id: "ed-tech",
            category: "Ed Tech",
            percentage: 1,
          },
        ],
      },
      {
        id: "domain-wise",
        title: "Domain Wise",
        data: [
          {
            id: "finance",
            category: "Finance",
            percentage: 34,
          },
          {
            id: "hr",
            category: "HR",
            percentage: 6,
          },
          {
            id: "marketing",
            category: "Marketing",
            percentage: 23,
          },
          {
            id: "operations",
            category: "Operations",
            percentage: 11,
          },
          {
            id: "sales",
            category: "Sales",
            percentage: 7,
          },
          {
            id: "digital-marketing",
            category: "Digital Marketing",
            percentage: 9,
          },
          {
            id: "analytics",
            category: "Analytics",
            percentage: 10,
          },
        ],
      },
    ],

    highlights:
      "Some of the most reputed companies visit FOSTIIMA for selection of students. The recruiters are from diverse sectors such as Banking and Finance, Consulting, FMCG etc. Some of the well-known names include- ICICI Bank, Axis Bank, Kotak Bank, ICICI Prudential, ICICI Prudential AMC, IDFC Bank, RBL Bank, Deloitte, BlackRock, Wipro, Protiviti, Hansa Research, TCS, Mondelez, ITC, Nestle, JK Tyre, Asian Paints, MRF Tyres, Berger Paints, Prism Johnsons Cement and many more…",

    students: [
      {
        id: "naman-bhambri",
        name: "NAMAN BHAMBRI",
        role: "Deputy Manager, ICICI Bank PPO",
        image: "/final-placement/student1/std1.webp",
      },
      {
        id: "vikas-kumar-singh",
        name: "VIKAS KUMAR SINGH",
        role: "Executive Trainee, HDFC Life",
        image: "/final-placement/student1/std2.webp",
      },
      {
        id: "vanshika-jain",
        name: "VANSHIKA JAIN",
        role: "Associate Solution Advisor, Deloitte",
        image: "/final-placement/student1/std3.webp",
      },
      {
        id: "saurav-bisht",
        name: "SOURAV BISHT",
        role: "Management Trainee, ICICI Securities",
        image: "/final-placement/student1/std4.webp",
      },
      {
        id: "prince-maggon",
        name: "PRINCE MAGGON",
        role: "Management Trainee, Wipro",
        image: "/final-placement/student1/std5.webp",
      },
      {
        id: "prakhar-mangla",
        name: "Prakhar Mangla",
        role: "Manager, Aditya Birla Capital",
        image: "/final-placement/student1/std6.webp",
      },
      {
        id: "piyush-kaushik",
        name: "PIYUSH KAUSHIK",
        role: "Management Trainee, HCL",
        image: "/final-placement/student1/std7.webp",
      },
      {
        id: "dushyant-yadav",
        name: "DUSHYANT YADAV",
        role: "Personal Banker, HDFC Bank",
        image: "/final-placement/student1/std8.webp",
      },
      {
        id: "nitin-kaushik",
        name: "NITIN KAUSHIK",
        role: "Senior Executive, Make my Trip",
        image: "/final-placement/student1/std9.webp",
      },
      {
        id: "nimitt-rastogi",
        name: "NIMITT RASTOGI",
        role: "Management Trainee, Genpact",
        image: "/final-placement/student1/std101.webp",
      },
      {
        id: "navneet-kumar-thakur",
        name: "NAVNEET KUMAR THAKUR",
        role: "Manager, Aditya Birla Capital",
        image: "/final-placement/student1/std11.webp",
      },
      {
        id: "muskan-jain",
        name: "MUSKAN JAIN",
        role: "RTR New Associate, Accenture",
        image: "/final-placement/student1/std12.webp",
      },
      {
        id: "mitali-sapra",
        name: "MITALI SAPRA",
        role: "Deputy Manager, Kotak Bank",
        image: "/final-placement/student1/std13.webp",
      },
      {
        id: "meghna-motwani",
        name: "MEGHNA MOTWANI",
        role: "Section Sales Manager, Khimji Ramdas",
        image: "/final-placement/student1/std14.webp",
      },
      {
        id: "manya-khare",
        name: "MANYA KHARE",
        role: "Deputy Manager, ICICI Bank PPO",
        image: "/final-placement/student1/std15.webp",
      },
      {
        id: "manisha-bhateja",
        name: "MANISHA BHATEJA",
        role: "Analyst FAS, Ameriprise",
        image: "/final-placement/student1/std16.webp",
      },
      {
        id: "kartik-duggal",
        name: "KARTIK DUGGAL",
        role: "Finance Systems Analyst, JLL",
        image: "/final-placement/student1/std17.webp",
      },
      {
        id: "harshit-maurya",
        name: "HARSHIT MAURYA",
        role: "Management Trainee, ICICI Life",
        image: "/final-placement/student1/std18.webp",
      },
      {
        id: "anmol-dwivedi",
        name: "ANMOL DWIVEDI",
        role: "Deputy Manager, Axis Bank",
        image: "/final-placement/student1/std19.webp",
      },
      {
        id: "anamika-verma",
        name: "ANAMIKA VERMA",
        role: "Executive Trainee, Interocean",
        image: "/final-placement/student1/std20.webp",
      },
      {
        id: "aman-sachdeva",
        name: "AMAN SACHDEVA",
        role: "Management Trainee, Black Rock",
        image: "/final-placement/student1/std21.webp",
      },
      {
        id: "vishwajeet-yadav",
        name: "VISHWAJEET YADAV",
        role: "Management Trainee, ICICI Life",
        image: "/final-placement/student1/std22.webp",
      },
      {
        id: "varshika-kushwaha",
        name: "VARSHIKA KUSHWAHA",
        role: "Management Trainee, Policy Bazaar",
        image: "/final-placement/student1/std23.webp",
      },
      {
        id: "vanshika-govil",
        name: "VANSHiKA GOVIL",
        role: "Management Trainee, Jaro Education",
        image: "/final-placement/student1/std24.webp",
      },
      {
        id: "srishti",
        name: "SRISHTI",
        role: "Senior BDE, Castler",
        image: "/final-placement/student1/std25.webp",
      },
      {
        id: "shweta-gupta",
        name: "SHWETA GUPTA",
        role: "Sales Trainee, ITC Foods",
        image: "/final-placement/student1/std26.webp",
      },
      {
        id: "shruti-garg",
        name: "SHRUTI GARG",
        role: "Executive Trainee, RBL",
        image: "/final-placement/student1/std27.webp",
      },
      {
        id: "shreya-srivastava",
        name: "SHREYA SRIVASTAVA",
        role: "Management Trainee, HCL",
        image: "/final-placement/student1/std28.webp",
      },
      {
        id: "sanskar-gupta",
        name: "SANSKAR GUPTA",
        role: "TSE, Asian Paints",
        image: "/final-placement/student1/std29.webp",
      },
      {
        id: "sameer-kedia",
        name: "SAMEER KEDIA",
        role: "Executive Trainee, Hindware",
        image: "/final-placement/student1/std30.webp",
      },
      {
        id: "rinki-pandey",
        name: "RINKI PANDEY",
        role: "Management Trainee, WIPRO",
        image: "/final-placement/student1/std31.webp",
      },
      {
        id: "rashmeet-kaur",
        name: "RASHMEET KAUR",
        role: "Deputy Manager, Kotak",
        image: "/final-placement/student1/std32.webp",
      },
      {
        id: "rahul-goel",
        name: "RAHUL GOEL",
        role: "Finance Analyst, JLL",
        image: "/final-placement/student1/std33.webp",
      },
      {
        id: "priyanshi-garg",
        name: "PRIYANSHI GARG",
        role: "Deputy Manager, Kotak Bank",
        image: "/final-placement/student1/std34.webp",
      },
      {
        id: "pooja-gupta",
        name: "POOJA GUPTA",
        role: "Customer Executive, Pepsico",
        image: "/final-placement/student1/std35.webp",
      },
      {
        id: "narayan-dutt",
        name: "NARAYAN DUTT",
        role: "Branch Manager, IDFC",
        image: "/final-placement/student1/std36.webp",
      },
      {
        id: "muskan-agarwal",
        name: "MUSKAN AGARWAL",
        role: "Executive Trainee, RBL",
        image: "/final-placement/student1/std37.webp",
      },
      {
        id: "mayank-kumar",
        name: "MAYANK KUMAR",
        role: "Branch Sales Manager, Piramal",
        image: "/final-placement/student1/std38.webp",
      },
      {
        id: "manisha-agrawal",
        name: "MANISHA AGRAWAL",
        role: "Deputy Manager, Axis Bank",
        image: "/final-placement/student1/std39.webp",
      },
      {
        id: "kashish-gupta",
        name: "KASHISH GUPTA",
        role: "Executive Trainee, Hindware",
        image: "/final-placement/student1/std40.webp",
      },
      {
        id: "gurleen-kaur-chauhan",
        name: "GURLEEN KAUR CHAUHAN",
        role: "Management Trainee, Black Rock",
        image: "/final-placement/student1/std41.webp",
      },
      {
        id: "divyam-agarwal",
        name: "DIVYAM AGARWAL",
        role: "Executive Trainee, Interocean",
        image: "/final-placement/student1/std42.webp",
      },
      {
        id: "biswadip-dey",
        name: "BISWADIP DEY",
        role: "ASA, Deloitte",
        image: "/final-placement/student1/std43.webp",
      },
      {
        id: "aryan-sangal",
        name: "ARYAN SANGAL",
        role: "TSE, Asian Paints",
        image: "/final-placement/student1/std44.webp",
      },
      {
        id: "amrit-kaur",
        name: "AMRIT KAUR",
        role: "Deputy Manager, Kotak Bank",
        image: "/final-placement/student1/std45.webp",
      },
      {
        id: "akanksha-singh",
        name: "AKANKSHA SINGH",
        role: "Deputy Manager, Axis Bank",
        image: "/final-placement/student1/std46.webp",
      },
      {
        id: "aditya-krishna-dwivedi",
        name: "ADITYA KRISHNA DWIVEDI",
        role: "Management Trainee, Black rock",
        image: "/final-placement/student1/std47.webp",
      },
      {
        id: "abhishek-srivastava",
        name: "ABHISHEK SRIVASTAVA",
        role: "Manager, Aditya Birla Capital",
        image: "/final-placement/student1/std48.webp",
      },
      {
        id: "abhishek-rathi",
        name: "ABHISHEK RATHI",
        role: "Senior BDE, Castler",
        image: "/final-placement/student1/std49.webp",
      },
      {
        id: "aastha-gupta",
        name: "AASTHA GUPTA",
        role: "Management Trainee, Ecom Express",
        image: "/final-placement/student1/std50.webp",
      },
    ],
  },

  {
    id: "final-placement-2021-2023",
    batch: "2021 - 2023",
    title: "Final Placement (2021 - 2023)",

    placementCharts: [
      {
        id: "industry-wise",
        title: "Industry Wise",
        data: [
          {
            id: "advertising",
            category: "Advertising",
            percentage: 15,
          },
          {
            id: "consulting",
            category: "Consulting",
            percentage: 8,
          },
          {
            id: "logistics",
            category: "Logistics",
            percentage: 33,
          },
          {
            id: "bfsi",
            category: "BFSI",
            percentage: 5,
          },
          {
            id: "real-estate",
            category: "Real Estate",
            percentage: 11,
          },
          {
            id: "fmcg",
            category: "FMCG",
            percentage: 12,
          },
          {
            id: "retail-marketing",
            category: "Retail Marketing",
            percentage: 12,
          },
          {
            id: "e-commerce",
            category: "E Commerce",
            percentage: 3,
          },
          {
            id: "ed-tech",
            category: "Ed Tech",
            percentage: 1,
          },
        ],
      },
      {
        id: "domain-wise",
        title: "Domain Wise",
        data: [
          {
            id: "finance",
            category: "Finance",
            percentage: 34,
          },
          {
            id: "hr",
            category: "HR",
            percentage: 6,
          },
          {
            id: "marketing",
            category: "Marketing",
            percentage: 23,
          },
          {
            id: "operations",
            category: "Operations",
            percentage: 11,
          },
          {
            id: "sales",
            category: "Sales",
            percentage: 7,
          },
          {
            id: "digital-marketing",
            category: "Digital Marketing",
            percentage: 9,
          },
          {
            id: "analytics",
            category: "Analytics",
            percentage: 10,
          },
        ],
      },
    ],

    highlights:
      "Placements for 2021-23 batch started in mid- August. Many of the regular recruiters hired in large number and at much higher remunerations. Almost entire batch has been placed by November end.. Some of the most repute companies visit FOSTIIMA for selection of students. The recruiters are from diverse sectors such as Banking and Finance, Consulting, FMCG etc. Some of the well-known names include- ICICI Bank, Axis Bank, Kotak Bank, ICICI Prudential, ICICI Prudential AMC, IDFC Bank, RBL Bank, Deloitte, BlackRock, Wipro, Protiviti, Hansa Research, TCS, Mondelez, ITC, Nestle, JK Tyre, Asian Paints, MRF Tyres, Berger Paints, Prism Johnsons Cement and many more…",

    students: [
      {
        id: "yash-jain",
        name: "Yash Jain",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student2/std1.webp",
      },
      {
        id: "viral-sharma",
        name: "Virall Sharma",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student2/std2.webp",
      },
      {
        id: "vidushi-sahai",
        name: "Vidushi Sahai",
        role: "Analyst, Deloitte",
        image: "/final-placement/student2/std3.webp",
      },
      {
        id: "vanshika-mittal",
        name: "Vanshika Mittal",
        role: "Deputy Manager, ICICI PPO",
        image: "/final-placement/student2/std4.webp",
      },
      {
        id: "vanshika-gupta",
        name: "Vanshika Gupta",
        role: "Managment Trainee, ICICI Prudential",
        image: "/final-placement/student2/std5.webp",
      },
      {
        id: "utkarsh-pandey",
        name: "Utkarsh Pandey",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student2/std6.webp",
      },
      {
        id: "tushar-rana",
        name: "Tushar Rana",
        role: "Analyst, Deloitte",
        image: "/final-placement/student2/std7.webp",
      },
      {
        id: "swati-vishwakarma",
        name: "Swati Vishwakarma",
        role: "Deputy Manager, ICICI PPO",
        image: "/final-placement/student2/std8.webp",
      },
      {
        id: "somiya-gupta",
        name: "Somiya Gupta",
        role: "Analyst, Deloitte",
        image: "/final-placement/student2/std9.webp",
      },
      {
        id: "ruchi-jha",
        name: "Ruchi Jha",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student2/std10.webp",
      },
      {
        id: "ritika-rastogi",
        name: "Ritika Rastogi",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student2/std11.webp",
      },
      {
        id: "rishabh-dhingra",
        name: "Rishabh Dhingra",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student2/std12.webp",
      },
      {
        id: "ravi-mohan-trivedi",
        name: "Ravi Mohan Trivedi",
        role: "Prime RM, Kotak",
        image: "/final-placement/student2/std13.webp",
      },
      {
        id: "rati-rastogi",
        name: "Rati Rastogi",
        role: "Commercial RM- CE, Kotak",
        image: "/final-placement/student2/std14.webp",
      },
      {
        id: "raman-sharma",
        name: "Raman Sharma",
        role: "Management Trainee, Black Rock",
        image: "/final-placement/student2/std15.webp",
      },
      {
        id: "radhika-goyal",
        name: "Radhika Goyal",
        role: "Relationship Manager, Axis Bank",
        image: "/final-placement/student2/std16.webp",
      },
      {
        id: "prashant-shokeen",
        name: "Prashant Shokeen",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student2/std17.webp",
      },
      {
        id: "pradeep-prakash-singh",
        name: "Pradeep Prakash Singh",
        role: "Managment Trainee, ICICI Prudential",
        image: "/final-placement/student2/std18.webp",
      },
      {
        id: "pooja-ahuja",
        name: "Pooja Ahuja",
        role: "Management Trainee, Wipro",
        image: "/final-placement/student2/std19.webp",
      },
      {
        id: "payal-mundra",
        name: "Payal Mundra",
        role: "Relationship Manager, Axis Bank",
        image: "/final-placement/student2/std20.webp",
      },
      {
        id: "payal-dixit",
        name: "Payal Dixit",
        role: "Deputy Manager, ICICI PPO",
        image: "/final-placement/student2/std21.webp",
      },
      {
        id: "pragati-kumari",
        name: "Pargati Kumari",
        role: "Asst. Operation Manager, IDFC BANK",
        image: "/final-placement/student2/std22.webp",
      },
      {
        id: "nitish-kumar",
        name: "Nitish Kumar",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student2/std23.webp",
      },
      {
        id: "neha-shivhare",
        name: "Neha Shivhare",
        role: "BRM, Kotak",
        image: "/final-placement/student2/std24.webp",
      },
      {
        id: "neha-kalra",
        name: "Neha Kalra",
        role: "Relationship Manager, Axis Bank",
        image: "/final-placement/student2/std25.webp",
      },
      {
        id: "mohit-goyal",
        name: "Mohit Goyal",
        role: "Analyst, Deloitte",
        image: "/final-placement/student2/std26.webp",
      },
      {
        id: "mihir-singh",
        name: "Mihir Singh",
        role: "Analyst, Deloitte",
        image: "/final-placement/student2/std27.webp",
      },
      {
        id: "mayur-gupta",
        name: "Mayur Gupta",
        role: "RM Secured Mortage, Kotak",
        image: "/final-placement/student2/std28.webp",
      },
      {
        id: "lakshya-kumar-singh",
        name: "Lakshya Kumar Singh",
        role: "BRM ,Kotak",
        image: "/final-placement/student2/std29.webp",
      },
      {
        id: "lakshita-katla",
        name: "Lakshita Katla",
        role: "BRM-Business Loan, Kotak",
        image: "/final-placement/student2/std30.webp",
      },
      {
        id: "kanika-bedi",
        name: "Kanika Bedi",
        role: "Management Trainee, Black Rock",
        image: "/final-placement/student2/std31.webp",
      },
      {
        id: "himanshu-raghav",
        name: "Himanshu Raghav",
        role: "Deputy Manager, ICICI PPO",
        image: "/final-placement/student2/std32.webp",
      },
      {
        id: "guriender-kumar",
        name: "Gurinder Kumar",
        role: "Managment Trainee, ICICI Prudential",
        image: "/final-placement/student2/std33.webp",
      },
      {
        id: "gulshan-jain",
        name: "Gulshan Jain",
        role: "BRM - Working capital, Kotak",
        image: "/final-placement/student2/std34.webp",
      },
      {
        id: "eisha-jaiswal",
        name: "Eisha Jaiswal",
        role: "Managment Trainee, ICICI Prudential",
        image: "/final-placement/student2/std35.webp",
      },
      {
        id: "durgesh-panwar",
        name: "Durgesh Panwar",
        role: "RM - Secured Mortage, Kotak",
        image: "/final-placement/student2/std36.webp",
      },
      {
        id: "divya-patel",
        name: "Divya Patel",
        role: "Deputy Manager, ICICI PPO",
        image: "/final-placement/student2/std37.webp",
      },
      {
        id: "dev-chawla",
        name: "Dev Chawla",
        role: "Management Trainee, Shoperty",
        image: "/final-placement/student2/std38.webp",
      },
      {
        id: "diksha-sharma",
        name: "Diksha Sharma",
        role: "Managment Trainee, ICICI Prudential",
        image: "/final-placement/student2/std39.webp",
      },
      {
        id: "deepak-tomar",
        name: "Deepak Tomar",
        role: "Assitant Store Manager, ABFRL",
        image: "/final-placement/student2/std40.webp",
      },
      {
        id: "chandan-kesri",
        name: "Chandan Keshari",
        role: "Commercial RM-Agri business group, Kotak",
        image: "/final-placement/student2/std41.webp",
      },
      {
        id: "chahat-goyal",
        name: "Chahat Goyal",
        role: "Management Trainee, Black Rock",
        image: "/final-placement/student2/std42.webp",
      },
      {
        id: "anushka-gupta",
        name: "Anushka Gupta",
        role: "Analyst, Acuity Knowledge Partners",
        image: "/final-placement/student2/std43.webp",
      },
      {
        id: "aranshi-mahur",
        name: "Aranshi Mahur",
        role: "Analyst, Deloitte",
        image: "/final-placement/student2/std44.webp",
      },
      {
        id: "anupriya-kesharwani",
        name: "Anupriya Kesharwani",
        role: "Analyst, Deloitte",
        image: "/final-placement/student2/std45.webp",
      },
      {
        id: "anshika-singh",
        name: "Anshika Singh",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student2/std46.webp",
      },
      {
        id: "ankit-tiwary",
        name: "Ankit Tiwary",
        role: "Management Trainee, Black Rock",
        image: "/final-placement/student2/std47.webp",
      },
      {
        id: "ambika-jindal",
        name: "Ambika Jindal",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student2/std48.webp",
      },
      {
        id: "akshay-bhargava",
        name: "Akshay Bhargava",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student2/std49.webp",
      },
      {
        id: "akansha-yadav",
        name: "Akansha Yadav",
        role: "Managment Trainee, ICICI Prudential",
        image: "/final-placement/student2/std50.webp",
      },
      {
        id: "adarsh-sharma",
        name: "Adarsh Sharma",
        role: "Deputy Manager, ICICI PPO",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_adarash-shrarma.jpg",
      },
      {
        id: "adarsh-kumar-singh",
        name: "Adarsh Kumar Singh",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_adarsh-singh.jpg",
      },
      {
        id: "abhishek-gupta",
        name: "Abhishek Gupta",
        role: "Deputy Manager, ICICI PPO",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_abhishek-gupta.jpg",
      },
    ],
  },

  {
    id: "final-placement-2020-2022",
    batch: "2020 - 2022",
    title: "Final Placement 2020 - 2022",

    placementCharts: [
      {
        id: "industry-wise",
        title: "Industry Wise Percentage",
        data: [
          {
            id: "consulting",
            category: "Consulting",
            percentage: 29,
          },
          {
            id: "bfsi",
            category: "BFSI",
            percentage: 44,
          },
          {
            id: "fmcg",
            category: "FMCG",
            percentage: 6,
          },
          {
            id: "logistics",
            category: "Logistics",
            percentage: 7,
          },
          {
            id: "real-estate",
            category: "Real Estate",
            percentage: 3,
          },
          {
            id: "retail-marketing",
            category: "Retail Marketing",
            percentage: 6,
          },
          {
            id: "product-manufacturing",
            category: "Product Manufacturing",
            percentage: 5,
          },
        ],
      },
      {
        id: "domain-wise",
        title: "Domain Wise Percentage",
        data: [
          {
            id: "research-analytics",
            category: "Research Analytics",
            percentage: 17,
          },
          {
            id: "bfsi-finance",
            category: "BFSI/Finance",
            percentage: 39,
          },
          {
            id: "hr",
            category: "HR",
            percentage: 4,
          },
          {
            id: "logistics",
            category: "Logistics",
            percentage: 8,
          },
          {
            id: "marketing",
            category: "Marketing",
            percentage: 27,
          },
          {
            id: "sales",
            category: "Sales",
            percentage: 5,
          },
        ],
      },
    ],

    highlights:
      "The majority of the students of 2020-22 got placed in one of the most coveted places. The per annum income of students was a lot and just like other years, it was very impressive. The recruiters who came to the institute were reputed companies and banks who chose students across various areas of expertise. The recruiters were ICICI Bank, Deloitte, Maison D' Auraine, Ameriprise, Protiviti, Asian Paints, Naukri.com, Casita and so on.",

    students: [
      {
        id: "yash-jain",
        name: "Yash Jain",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student3/std1.webp",
      },
      {
        id: "viral-sharma",
        name: "Virall Sharma",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student3/std2.webp",
      },
      {
        id: "vidushi-sahai",
        name: "Vidushi Sahai",
        role: "Analyst, Deloitte",
        image: "/final-placement/student3/std3.webp",
      },
      {
        id: "vanshika-mittal",
        name: "Vanshika Mittal",
        role: "Deputy Manager, ICICI PPO",
        image: "/final-placement/student3/std4.webp",
      },
      {
        id: "vanshika-gupta",
        name: "Vanshika Gupta",
        role: "Managment Trainee, ICICI Prudential",
        image: "/final-placement/student3/std5.webp",
      },
      {
        id: "utkarsh-pandey",
        name: "Utkarsh Pandey",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student3/std6.webp",
      },
      {
        id: "tushar-rana",
        name: "Tushar Rana",
        role: "Analyst, Deloitte",
        image: "/final-placement/student3/std7.webp",
      },
      {
        id: "swati-vishwakarma",
        name: "Swati Vishwakarma",
        role: "Deputy Manager, ICICI PPO",
        image: "/final-placement/student3/std8.webp",
      },
      {
        id: "somiya-gupta",
        name: "Somiya Gupta",
        role: "Analyst, Deloitte",
        image: "/final-placement/student3/std9.webp",
      },
      {
        id: "ruchi-jha",
        name: "Ruchi Jha",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student3/std10.webp",
      },
      {
        id: "ritika-rastogi",
        name: "Ritika Rastogi",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student3/std11.webp",
      },
      {
        id: "rishabh-dhingra",
        name: "Rishabh Dhingra",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student3/std12.webp",
      },
      {
        id: "ravi-mohan-trivedi",
        name: "Ravi Mohan Trivedi",
        role: "Prime RM, Kotak",
        image: "/final-placement/student3/std13.webp",
      },
      {
        id: "rati-rastogi",
        name: "Rati Rastogi",
        role: "Commercial RM- CE, Kotak",
        image: "/final-placement/student3/std14.webp",
      },
      {
        id: "raman-sharma",
        name: "Raman Sharma",
        role: "Management Trainee, Black Rock",
        image: "/final-placement/student3/std15.webp",
      },
      {
        id: "radhika-goyal",
        name: "Radhika Goyal",
        role: "Relationship Manager, Axis Bank",
        image: "/final-placement/student3/std16.webp",
      },
      {
        id: "prashant-shokeen",
        name: "Prashant Shokeen",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student3/std17.webp",
      },
      {
        id: "pradeep-prakash-singh",
        name: "Pradeep Prakash Singh",
        role: "Managment Trainee, ICICI Prudential",
        image: "/final-placement/student3/std18.webp",
      },
      {
        id: "pooja-ahuja",
        name: "Pooja Ahuja",
        role: "Management Trainee, Wipro",
        image: "/final-placement/student3/std19.webp",
      },
      {
        id: "payal-mundra",
        name: "Payal Mundra",
        role: "Relationship Manager, Axis Bank",
        image: "/final-placement/student3/std20.webp",
      },
      {
        id: "payal-dixit",
        name: "Payal Dixit",
        role: "Deputy Manager, ICICI PPO",
        image: "/final-placement/student3/std21.webp",
      },
      {
        id: "pragati-kumari",
        name: "Pargati Kumari",
        role: "Asst. Operation Manager, IDFC BANK",
        image: "/final-placement/student3/std22.webp",
      },
      {
        id: "nitish-kumar",
        name: "Nitish Kumar",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student3/std23.webp",
      },
      {
        id: "neha-shivhare",
        name: "Neha Shivhare",
        role: "BRM, Kotak",
        image: "/final-placement/student3/std24.webp",
      },
      {
        id: "neha-kalra",
        name: "Neha Kalra",
        role: "Relationship Manager, Axis Bank",
        image: "/final-placement/student3/std25.webp",
      },
      {
        id: "mohit-goyal",
        name: "Mohit Goyal",
        role: "Analyst, Deloitte",
        image: "/final-placement/student3/std26.webp",
      },
      {
        id: "mihir-singh",
        name: "Mihir Singh",
        role: "Analyst, Deloitte",
        image: "/final-placement/student3/std27.webp",
      },
      {
        id: "mayur-gupta",
        name: "Mayur Gupta",
        role: "RM Secured Mortage, Kotak",
        image: "/final-placement/student3/std28.webp",
      },
      {
        id: "lakshya-kumar-singh",
        name: "Lakshya Kumar Singh",
        role: "BRM ,Kotak",
        image: "/final-placement/student3/std29.webp",
      },
      {
        id: "lakshita-katla",
        name: "Lakshita Katla",
        role: "BRM-Business Loan, Kotak",
        image: "/final-placement/student3/std30.webp",
      },
      {
        id: "kanika-bedi",
        name: "Kanika Bedi",
        role: "Management Trainee, Black Rock",
        image: "/final-placement/student3/std31.webp",
      },
      {
        id: "himanshu-raghav",
        name: "Himanshu Raghav",
        role: "Deputy Manager, ICICI PPO",
        image: "/final-placement/student3/std32.webp",
      },
      {
        id: "guriender-kumar",
        name: "Gurinder Kumar",
        role: "Managment Trainee, ICICI Prudential",
        image: "/final-placement/student3/std33.webp",
      },
      {
        id: "gulshan-jain",
        name: "Gulshan Jain",
        role: "BRM - Working capital, Kotak",
        image: "/final-placement/student3/std34.webp",
      },
      {
        id: "eisha-jaiswal",
        name: "Eisha Jaiswal",
        role: "Managment Trainee, ICICI Prudential",
        image: "/final-placement/student3/std35.webp",
      },
      {
        id: "durgesh-panwar",
        name: "Durgesh Panwar",
        role: "RM - Secured Mortage, Kotak",
        image: "/final-placement/student3/std36.webp",
      },
      {
        id: "divya-patel",
        name: "Divya Patel",
        role: "Deputy Manager, ICICI PPO",
        image: "/final-placement/student3/std37.webp",
      },
      {
        id: "dev-chawla",
        name: "Dev Chawla",
        role: "Management Trainee, Shoperty",
        image: "/final-placement/student3/std38.webp",
      },
      {
        id: "diksha-sharma",
        name: "Diksha Sharma",
        role: "Managment Trainee, ICICI Prudential",
        image: "/final-placement/student3/std39.webp",
      },
      {
        id: "deepak-tomar",
        name: "Deepak Tomar",
        role: "Assitant Store Manager, ABFRL",
        image: "/final-placement/student3/std40.webp",
      },
      {
        id: "chandan-kesri",
        name: "Chandan Keshari",
        role: "Commercial RM-Agri business group, Kotak",
        image: "/final-placement/student3/std41.webp",
      },
      {
        id: "chahat-goyal",
        name: "Chahat Goyal",
        role: "Management Trainee, Black Rock",
        image: "/final-placement/student3/std42.webp",
      },
      {
        id: "anushka-gupta",
        name: "Anushka Gupta",
        role: "Analyst, Acuity Knowledge Partners",
        image: "/final-placement/student3/std43.webp",
      },
      {
        id: "aranshi-mahur",
        name: "Aranshi Mahur",
        role: "Analyst, Deloitte",
        image: "/final-placement/student3/std44.webp",
      },
      {
        id: "anupriya-kesharwani",
        name: "Anupriya Kesharwani",
        role: "Analyst, Deloitte",
        image: "/final-placement/student3/std45.webp",
      },
      {
        id: "anshika-singh",
        name: "Anshika Singh",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student3/std46.webp",
      },
      {
        id: "ankit-tiwary",
        name: "Ankit Tiwary",
        role: "Management Trainee, Black Rock",
        image: "/final-placement/student3/std47.webp",
      },
      {
        id: "ambika-jindal",
        name: "Ambika Jindal",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student3/std48.webp",
      },
      {
        id: "akshay-bhargava",
        name: "Akshay Bhargava",
        role: "Deputy Manager, ICICI Bank",
        image: "/final-placement/student3/std49.webp",
      },
      {
        id: "akansha-yadav",
        name: "Akansha Yadav",
        role: "Managment Trainee, ICICI Prudential",
        image: "/final-placement/student3/std50.webp",
      },
      {
        id: "adarsh-sharma",
        name: "Adarsh Sharma",
        role: "Deputy Manager, ICICI PPO",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_adarash-shrarma.jpg",
      },
      {
        id: "adarsh-kumar-singh",
        name: "Adarsh Kumar Singh",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_adarsh-singh.jpg",
      },
      {
        id: "abhishek-gupta",
        name: "Abhishek Gupta",
        role: "Deputy Manager, ICICI PPO",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_abhishek-gupta.jpg",
      },
    ],
  },

  {
    id: "final-placement-2019-2021",
    batch: "2019 - 2021",
    title: "Final Placement 2019 - 2021",

    placementCharts: [
      {
        id: "industry-wise",
        title: "Industry wise placement 2019-21",
        data: [
          {
            id: "edutech",
            category: "EDUTECH",
            percentage: 13,
          },
          {
            id: "consulting-research",
            category: "CONSULTING / RESEARCH",
            percentage: 30,
          },
          {
            id: "ecommerce",
            category: "ECOMMERCE",
            percentage: 10,
          },
          {
            id: "fmcg",
            category: "FMCG",
            percentage: 7,
          },
          {
            id: "it",
            category: "IT",
            percentage: 8,
          },
          {
            id: "real-estate",
            category: "REAL ESTATE",
            percentage: 3,
          },
          {
            id: "logistics",
            category: "LOGISTICS",
            percentage: 6,
          },
          {
            id: "retail",
            category: "RETAIL",
            percentage: 3,
          },
          {
            id: "bfsi",
            category: "BFSI",
            percentage: 20,
          },
        ],
      },
      {
        id: "domain-wise",
        title: "Domain wise placement 2019-21",
        data: [
          {
            id: "research-analytics",
            category: "RESEARCH ANALYTICS",
            percentage: 6,
          },
          {
            id: "bfsi-finance",
            category: "BFSI/FINANCE",
            percentage: 13,
          },
          {
            id: "it-sales",
            category: "IT SALES",
            percentage: 3,
          },
          {
            id: "hr",
            category: "HR",
            percentage: 9,
          },
          {
            id: "sales",
            category: "SALES",
            percentage: 9,
          },
          {
            id: "logistics",
            category: "LOGISTICS",
            percentage: 25,
          },
          {
            id: "marketing",
            category: "MARKETING",
            percentage: 35,
          },
        ],
      },
    ],

    highlights:
      "The majority of the students of 2019-21 got placed in one of the most coveted places. The per annum income of students was a lot and just like other years, it was very impressive. The recruiters who came to the institute were reputed companies and banks who chose students across various areas of expertise. The recruiters were ICICI Bank, HDFC Bank, Decathlon, BYJUS, and so on.",

    students: [
      {
        id: "vartika-sinha",
        name: "Vartika Sinha",
        role: "Deloitte, Business Analyst",
        image: "/final-placement/student4/std1.webp",
      },
      {
        id: "smriti-nanda",
        name: "Smriti Nanda",
        role: "Kotak bank, HR Management Trainee",
        image: "/final-placement/student4/std2.webp",
      },
    ],
  },
];
