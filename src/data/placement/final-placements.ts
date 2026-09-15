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
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_naman-bhambri1.jpeg",
      },
      {
        id: "vikas-kumar-singh",
        name: "VIKAS KUMAR SINGH",
        role: "Executive Trainee, HDFC Life",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_vikas-kumar-singh1.jpg",
      },
      {
        id: "vanshika-jain",
        name: "VANSHIKA JAIN",
        role: "Associate Solution Advisor, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_vanshika-jain1.jpg",
      },
      {
        id: "saurav-bisht",
        name: "SOURAV BISHT",
        role: "Management Trainee, ICICI Securities",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_saurav-bisht.jpg",
      },
      {
        id: "prince-maggon",
        name: "PRINCE MAGGON",
        role: "Management Trainee, Wipro",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_prince-maggon.jpeg",
      },
      {
        id: "prakhar-mangla",
        name: "Prakhar Mangla",
        role: "Manager, Aditya Birla Capital",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_prakhar-mangla.jpg",
      },
      {
        id: "piyush-kaushik",
        name: "PIYUSH KAUSHIK",
        role: "Management Trainee, HCL",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_piyush-kaushik.jpeg",
      },
      {
        id: "dushyant-yadav",
        name: "DUSHYANT YADAV",
        role: "Personal Banker, HDFC Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_dushyant-yadav.jpg",
      },
      {
        id: "nitin-kaushik",
        name: "NITIN KAUSHIK",
        role: "Senior Executive, Make my Trip",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_nitin-kaushik.jpg",
      },
      {
        id: "nimitt-rastogi",
        name: "NIMITT RASTOGI",
        role: "Management Trainee, Genpact",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_no-img.png",
      },
      {
        id: "navneet-kumar-thakur",
        name: "NAVNEET KUMAR THAKUR",
        role: "Manager, Aditya Birla Capital",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_navneet-kumar.jpg",
      },
      {
        id: "muskan-jain",
        name: "MUSKAN JAIN",
        role: "RTR New Associate, Accenture",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_muskan-jain.jpg",
      },
      {
        id: "mitali-sapra",
        name: "MITALI SAPRA",
        role: "Deputy Manager, Kotak Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_mitali-sapra.jpg",
      },
      {
        id: "meghna-motwani",
        name: "MEGHNA MOTWANI",
        role: "Section Sales Manager, Khimji Ramdas",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_meghna-motwani.jpg",
      },
      {
        id: "manya-khare",
        name: "MANYA KHARE",
        role: "Deputy Manager, ICICI Bank PPO",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_manya-khare.jpg",
      },
      {
        id: "manisha-bhateja",
        name: "MANISHA BHATEJA",
        role: "Analyst FAS, Ameriprise",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_manisha-bhateja.jpg",
      },
      {
        id: "kartik-duggal",
        name: "KARTIK DUGGAL",
        role: "Finance Systems Analyst, JLL",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_kartik-duggal.jpeg",
      },
      {
        id: "harshit-maurya",
        name: "HARSHIT MAURYA",
        role: "Management Trainee, ICICI Life",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_harshit-maurya.jpg",
      },
      {
        id: "anmol-dwivedi",
        name: "ANMOL DWIVEDI",
        role: "Deputy Manager, Axis Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_anmol-dwivedi.jpg",
      },
      {
        id: "anamika-verma",
        name: "ANAMIKA VERMA",
        role: "Executive Trainee, Interocean",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_anamika-verma.jpg",
      },
      {
        id: "aman-sachdeva",
        name: "AMAN SACHDEVA",
        role: "Management Trainee, Black Rock",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_no-img1.png",
      },
      {
        id: "vishwajeet-yadav",
        name: "VISHWAJEET YADAV",
        role: "Management Trainee, ICICI Life",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_vishwajeet-yadav.jpg",
      },
      {
        id: "varshika-kushwaha",
        name: "VARSHIKA KUSHWAHA",
        role: "Management Trainee, Policy Bazaar",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_varshika-kushwaha.jpg",
      },
      {
        id: "vanshika-govil",
        name: "VANSHiKA GOVIL",
        role: "Management Trainee, Jaro Education",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_vanshika-govil.jpg",
      },
      {
        id: "srishti",
        name: "SRISHTI",
        role: "Senior BDE, Castler",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_mehul-sharma.jpg",
      },
      {
        id: "shweta-gupta",
        name: "SHWETA GUPTA",
        role: "Sales Trainee, ITC Foods",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_shweta-gupta.jpg",
      },
      {
        id: "shruti-garg",
        name: "SHRUTI GARG",
        role: "Executive Trainee, RBL",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_shruti-garg.jpg",
      },
      {
        id: "shreya-srivastava",
        name: "SHREYA SRIVASTAVA",
        role: "Management Trainee, HCL",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_shreya-srivastava.jpg",
      },
      {
        id: "sanskar-gupta",
        name: "SANSKAR GUPTA",
        role: "TSE, Asian Paints",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_sanskar-gupta.jpg",
      },
      {
        id: "sameer-kedia",
        name: "SAMEER KEDIA",
        role: "Executive Trainee, Hindware",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_sameer-kedia.jpg",
      },
      {
        id: "rinki-pandey",
        name: "RINKI PANDEY",
        role: "Management Trainee, WIPRO",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_rinki-pandey.jpg",
      },
      {
        id: "rashmeet-kaur",
        name: "RASHMEET KAUR",
        role: "Deputy Manager, Kotak",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_rashmeet-kaur.jpg",
      },
      {
        id: "rahul-goel",
        name: "RAHUL GOEL",
        role: "Finance Analyst, JLL",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_rahul-goel.jpg",
      },
      {
        id: "priyanshi-garg",
        name: "PRIYANSHI GARG",
        role: "Deputy Manager, Kotak Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_priyanshi-garg.jpg",
      },
      {
        id: "pooja-gupta",
        name: "POOJA GUPTA",
        role: "Customer Executive, Pepsico",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_pooja-gupta.jpg",
      },
      {
        id: "narayan-dutt",
        name: "NARAYAN DUTT",
        role: "Branch Manager, IDFC",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_narayan-dutt.jpg",
      },
      {
        id: "muskan-agarwal",
        name: "MUSKAN AGARWAL",
        role: "Executive Trainee, RBL",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_muskan-agarwal.jpg",
      },
      {
        id: "mayank-kumar",
        name: "MAYANK KUMAR",
        role: "Branch Sales Manager, Piramal",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_mayank-kumar.jpg",
      },
      {
        id: "manisha-agrawal",
        name: "MANISHA AGRAWAL",
        role: "Deputy Manager, Axis Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_manisha-agrawal.jpg",
      },
      {
        id: "kashish-gupta",
        name: "KASHISH GUPTA",
        role: "Executive Trainee, Hindware",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_kashish-gupta.jpg",
      },
      {
        id: "gurleen-kaur-chauhan",
        name: "GURLEEN KAUR CHAUHAN",
        role: "Management Trainee, Black Rock",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_gurleen-kaur.jpg",
      },
      {
        id: "divyam-agarwal",
        name: "DIVYAM AGARWAL",
        role: "Executive Trainee, Interocean",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_divyam-agarwal.jpg",
      },
      {
        id: "biswadip-dey",
        name: "BISWADIP DEY",
        role: "ASA, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_biswadip-dey.jpg",
      },
      {
        id: "aryan-sangal",
        name: "ARYAN SANGAL",
        role: "TSE, Asian Paints",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_aryan-sangal.jpg",
      },
      {
        id: "amrit-kaur",
        name: "AMRIT KAUR",
        role: "Deputy Manager, Kotak Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_amrit-kaur.jpg",
      },
      {
        id: "akanksha-singh",
        name: "AKANKSHA SINGH",
        role: "Deputy Manager, Axis Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_akanksha-singh.jpg",
      },
      {
        id: "aditya-krishna-dwivedi",
        name: "ADITYA KRISHNA DWIVEDI",
        role: "Management Trainee, Black rock",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_aditya-krishna-dwivedi.jpg",
      },
      {
        id: "abhishek-srivastava",
        name: "ABHISHEK SRIVASTAVA",
        role: "Manager, Aditya Birla Capital",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_abhishek-srivastav.jpg",
      },
      {
        id: "abhishek-rathi",
        name: "ABHISHEK RATHI",
        role: "Senior BDE, Castler",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_abhishek-rathi.jpg",
      },
      {
        id: "aastha-gupta",
        name: "AASTHA GUPTA",
        role: "Management Trainee, Ecom Express",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_aastha-gupta.jpg",
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
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_yash-jain.jpg",
      },
      {
        id: "viral-sharma",
        name: "Virall Sharma",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_viral.jpg",
      },
      {
        id: "vidushi-sahai",
        name: "Vidushi Sahai",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_vidushi-antil.jpg",
      },
      {
        id: "vanshika-mittal",
        name: "Vanshika Mittal",
        role: "Deputy Manager, ICICI PPO",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_vanshika-mittal.jpg",
      },
      {
        id: "vanshika-gupta",
        name: "Vanshika Gupta",
        role: "Managment Trainee, ICICI Prudential",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_vanshika-gupta.jpg",
      },
      {
        id: "utkarsh-pandey",
        name: "Utkarsh Pandey",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_utkarsh-pandey.jpg",
      },
      {
        id: "tushar-rana",
        name: "Tushar Rana",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_tushar-rana.jpg",
      },
      {
        id: "swati-vishwakarma",
        name: "Swati Vishwakarma",
        role: "Deputy Manager, ICICI PPO",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_swati-vishwakarma.jpg",
      },
      {
        id: "somiya-gupta",
        name: "Somiya Gupta",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_soumya-gupta.jpg",
      },
      {
        id: "ruchi-jha",
        name: "Ruchi Jha",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_ruchi-jha.jpg",
      },
      {
        id: "ritika-rastogi",
        name: "Ritika Rastogi",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_ritika-rastogi.jpg",
      },
      {
        id: "rishabh-dhingra",
        name: "Rishabh Dhingra",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_rishabh-dhingra.jpg",
      },
      {
        id: "ravi-mohan-trivedi",
        name: "Ravi Mohan Trivedi",
        role: "Prime RM, Kotak",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_ravi-mohan-trivedi.jpg",
      },
      {
        id: "rati-rastogi",
        name: "Rati Rastogi",
        role: "Commercial RM- CE, Kotak",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_rati-rastogi.jpg",
      },
      {
        id: "raman-sharma",
        name: "Raman Sharma",
        role: "Management Trainee, Black Rock",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_raman-sharma.jpg",
      },
      {
        id: "radhika-goyal",
        name: "Radhika Goyal",
        role: "Relationship Manager, Axis Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_radhika-goyal.jpg",
      },
      {
        id: "prashant-shokeen",
        name: "Prashant Shokeen",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_prashant-shokeen.jpg",
      },
      {
        id: "pradeep-prakash-singh",
        name: "Pradeep Prakash Singh",
        role: "Managment Trainee, ICICI Prudential",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_pradeep-prakash-singh.jpg",
      },
      {
        id: "pooja-ahuja",
        name: "Pooja Ahuja",
        role: "Management Trainee, Wipro",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_pooja-ahuja.jpg",
      },
      {
        id: "payal-mundra",
        name: "Payal Mundra",
        role: "Relationship Manager, Axis Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_payal-mundra.jpg",
      },
      {
        id: "payal-dixit",
        name: "Payal Dixit",
        role: "Deputy Manager, ICICI PPO",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_payal-dixit.jpg",
      },
      {
        id: "pragati-kumari",
        name: "Pargati Kumari",
        role: "Asst. Operation Manager, IDFC BANK",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_pragati-kumari.jpg",
      },
      {
        id: "nitish-kumar",
        name: "Nitish Kumar",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_nitish-kumar.jpg",
      },
      {
        id: "neha-shivhare",
        name: "Neha Shivhare",
        role: "BRM, Kotak",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_neha-shivare.jpg",
      },
      {
        id: "neha-kalra",
        name: "Neha Kalra",
        role: "Relationship Manager, Axis Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_neha-kalra.jpg",
      },
      {
        id: "mohit-goyal",
        name: "Mohit Goyal",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_mohit-goyal.jpg",
      },
      {
        id: "mihir-singh",
        name: "Mihir Singh",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_mihir-singh.jpg",
      },
      {
        id: "mayur-gupta",
        name: "Mayur Gupta",
        role: "RM Secured Mortage, Kotak",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_mayur-gupta.jpg",
      },
      {
        id: "lakshya-kumar-singh",
        name: "Lakshya Kumar Singh",
        role: "BRM ,Kotak",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_lakshya-kumar-singh.jpg",
      },
      {
        id: "lakshita-katla",
        name: "Lakshita Katla",
        role: "BRM-Business Loan, Kotak",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_lakshita-katla.jpg",
      },
      {
        id: "kanika-bedi",
        name: "Kanika Bedi",
        role: "Management Trainee, Black Rock",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_kanika-bedi.jpg",
      },
      {
        id: "himanshu-raghav",
        name: "Himanshu Raghav",
        role: "Deputy Manager, ICICI PPO",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_himanshu-raghav.jpg",
      },
      {
        id: "guriender-kumar",
        name: "Gurinder Kumar",
        role: "Managment Trainee, ICICI Prudential",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_guriender-kumar.jpg",
      },
      {
        id: "gulshan-jain",
        name: "Gulshan Jain",
        role: "BRM - Working capital, Kotak",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_gulshan-jain.jpg",
      },
      {
        id: "eisha-jaiswal",
        name: "Eisha Jaiswal",
        role: "Managment Trainee, ICICI Prudential",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_eisha-jaiswal.jpg",
      },
      {
        id: "durgesh-panwar",
        name: "Durgesh Panwar",
        role: "RM - Secured Mortage, Kotak",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_durgesh-panwar.jpg",
      },
      {
        id: "divya-patel",
        name: "Divya Patel",
        role: "Deputy Manager, ICICI PPO",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_divya-patel.jpg",
      },
      {
        id: "dev-chawla",
        name: "Dev Chawla",
        role: "Management Trainee, Shoperty",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_dev-chawla.jpg",
      },
      {
        id: "diksha-sharma",
        name: "Diksha Sharma",
        role: "Managment Trainee, ICICI Prudential",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_diksha-sharma.jpg",
      },
      {
        id: "deepak-tomar",
        name: "Deepak Tomar",
        role: "Assitant Store Manager, ABFRL",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_deepak-tomar.jpg",
      },
      {
        id: "chandan-kesri",
        name: "Chandan Keshari",
        role: "Commercial RM-Agri business group, Kotak",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_chandan-kesri.jpg",
      },
      {
        id: "chahat-goyal",
        name: "Chahat Goyal",
        role: "Management Trainee, Black Rock",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_chahat-goyal.jpg",
      },
      {
        id: "anushka-gupta",
        name: "Anushka Gupta",
        role: "Analyst, Acuity Knowledge Partners",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_anushka-gupta.jpg",
      },
      {
        id: "aranshi-mahur",
        name: "Aranshi Mahur",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_aranshi-mahur.jpg",
      },
      {
        id: "anupriya-kesharwani",
        name: "Anupriya Kesharwani",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_anupriya-kesharwani.jpg",
      },
      {
        id: "anshika-singh",
        name: "Anshika Singh",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_anshika-singh.jpg",
      },
      {
        id: "ankit-tiwary",
        name: "Ankit Tiwary",
        role: "Management Trainee, Black Rock",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_ankit-tiwari.jpg",
      },
      {
        id: "ambika-jindal",
        name: "Ambika Jindal",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_ambika-jindal.jpg",
      },
      {
        id: "akshay-bhargava",
        name: "Akshay Bhargava",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_akshay-bhargva.jpg",
      },
      {
        id: "akansha-yadav",
        name: "Akansha Yadav",
        role: "Managment Trainee, ICICI Prudential",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_akansha-yadav.jpg",
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
        id: "harshit-singla",
        name: "Harshit Singla",
        role: "Business Banking Asset, Kotak Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_harshit-singla.jpg",
      },
      {
        id: "basima-andrabi",
        name: "Basima Andrabi",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_basima-andrabi.jpg",
      },
      {
        id: "shubham-verma",
        name: "Shubham Verma",
        role: "BDM, 1K Kirana",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_shubham-verma.jpg",
      },
      {
        id: "vishab-gupta",
        name: "Vishab Gupta",
        role: "Financial Planning Analyst, Ameriprise Operation",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_vishab-gupta.jpg",
      },
      {
        id: "shivam-mittal",
        name: "Shivam Mittal",
        role: "Deputy Manager, Kotak Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_shivam-mittal.jpg",
      },
      {
        id: "ruchi-yadav",
        name: "Ruchi Yadav",
        role: "Deputy Manager, ICICI BANK",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_ruchi-yadav.jpeg",
      },
      {
        id: "vanshika-garg",
        name: "Vanshika Garg",
        role: "Associate- General Research, Protiviti",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_vanshika-garg.jpeg",
      },
      {
        id: "harish-sharma",
        name: "Harish Sharma",
        role: "Business Analyst, ICICI Securities",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_harish-sharma.jpg",
      },
      {
        id: "gagan-chopra",
        name: "Gagan Chopra",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_gagan-chopra.jpg",
      },
      {
        id: "raj-rajeshwari-agrawal",
        name: "Raj Rajeshwari Agrawal",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_raj-rajeshwari-agrawal.jpg",
      },
      {
        id: "saumya-shukla",
        name: "Saumya Shukla",
        role: "Fund Analyst, SS & C TECHNOLOGIES",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_saumya-shukla.jpg",
      },
      {
        id: "himanshu-bansal",
        name: "Himanshu Bansal",
        role: "Financial Analyst, Ameriprise",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_himanshu-bansal.jpg",
      },
      {
        id: "ayush-agarwal",
        name: "Ayush Agarwal",
        role: "Fund Analyst, SS & C TECHNOLOGIES",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_ayush-agarwal.jpg",
      },
      {
        id: "mansi-dadhich",
        name: "Mansi Dadhich",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_mansi-dadhich.jpg",
      },
      {
        id: "piyush-jain",
        name: "Piyush Jain",
        role: "Business Banking Asset, Kotak Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_piyush-jain.jpg",
      },
      {
        id: "lovely-bharati",
        name: "Lovely Bharati",
        role: "ANALYST, Global Growth",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_lovely-bharati.jpg",
      },
      {
        id: "sanjana-kumari",
        name: "Sanjana Kumari",
        role: "Fund Analyst, SS & C TECHNOLOGIES",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_sanjana-kumari.jpg",
      },
      {
        id: "anubhav-jain",
        name: "Anubhav Jain",
        role: "Management Trainee, Ameriprise",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_anubhav-jain.jpg",
      },
      {
        id: "muskan-bansal",
        name: "Muskan Bansal",
        role: "Risk & Financial Advisory, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_muskan-bansal.jpg",
      },
      {
        id: "aniket-jaiswal",
        name: "Aniket Jaiswal",
        role: "Manager- Career Development, Maison D' Auraine",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_aniket-jaiswal.jpg",
      },
      {
        id: "durba-bose",
        name: "Durba Bose",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_durba-bose.jpg",
      },
      {
        id: "vidit-jain",
        name: "Vidit Jain",
        role: "Financial Analyst, Ameriprise",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_vidit-jain.jpg",
      },
      {
        id: "ankit-kumar",
        name: "Ankit Kumar",
        role: "Assistant Store Manager, ABFRL",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_ankit-kumar.jpg",
      },
      {
        id: "avinav-jain",
        name: "Avinav Jain",
        role: "Senior Executive – Makemy trip",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_avinav-jain.jpeg",
      },
      {
        id: "vanshika-sharma",
        name: "Vanshika Sharma",
        role: "Deputy Manager, Indusind Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_vanshika-sharma.jpg",
      },
      {
        id: "harshvardhan-seth",
        name: "Harshvardhan Seth",
        role: "Sales Officer, Asian Paints",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_harshvardhan-seth.jpeg",
      },
      {
        id: "ritik-jain",
        name: "Ritik Jain",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_ritik-jain.jpg",
      },
      {
        id: "prashana-yadav",
        name: "Prashana Yadav",
        role: "Deputy Manager, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_prashana-yadav.jpg",
      },
      {
        id: "ashish-sharma",
        name: "Ashish Sharma",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_ashish-sharma.jpg",
      },
      {
        id: "deepshikha",
        name: "Deepshikha",
        role: "Management Trainee, IDFC Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_deepshikha.jpg",
      },
      {
        id: "tayyab-khan",
        name: "Tayyab Khan",
        role: "Partnership Support Officer, Casita",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_tayyab-khan.jpg",
      },
      {
        id: "shailja-sati",
        name: "Shailja Sati",
        role: "Hr Trainee, Naukri.com",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_shailja-sati.jpg",
      },
      {
        id: "amit-jawalia",
        name: "Amit Jawalia",
        role: "CDE, Jaro Education",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_amit-jawalia.jpg",
      },
      {
        id: "ayush-bhaskar",
        name: "Ayush Bhaskar",
        role: "SEG- Relationship Manager, Axis Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_ayush-bhaskar.jpg",
      },
      {
        id: "saurabh-tiwari",
        name: "Saurabh Tiwari",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_saurabh-tiwari.jpg",
      },
      {
        id: "arpit-pachauri",
        name: "Arpit Pachauri",
        role: "CDE, Kotak Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_arpit-pachauri.jpg",
      },
      {
        id: "amandeep",
        name: "Amandeep",
        role: "SEG- Relationship Manager, Axis Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_amandeep.jpg",
      },
      {
        id: "sonia",
        name: "Sonia",
        role: "Business Banking Asset, Kotak Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_sonia.jpg",
      },
      {
        id: "surabhi-gupta",
        name: "Surabhi Gupta",
        role: "Affluent Busiiness- Manager, Axis Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_surabhi-gupta.jpg",
      },
      {
        id: "sukrita-ahuja",
        name: "Sukrita Ahuja",
        role: "Associate, Protiviti",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_sukrita-ahuja.jpg",
      },
      {
        id: "avantika-pathak",
        name: "Avantika Pathak",
        role: "SEG- Relationship Manager, Axis Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_avantika-pathak.jpeg",
      },
      {
        id: "arpita-gupta",
        name: "Arpita Gupta",
        role: "Analyst, Deloitte",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_arpita-gupta.jpg",
      },
      {
        id: "akriti-singh",
        name: "Akriti Singh",
        role: "Deputy Manager, Kotak Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_akriti-singh.jpg",
      },
      {
        id: "ajay-kumar",
        name: "Ajay Kumar",
        role: "Deputy Manager, ICICI BANK",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_ajay-kumar.jpg",
      },
      {
        id: "aishwarya-agarwal",
        name: "Aishwarya agarwal",
        role: "CDE, Jaro education",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_aishwarya-agarwal.jpg",
      },
      {
        id: "aditya-raj",
        name: "Aditya Raj",
        role: "Deputy Manager, ICICI BANK",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_aditya-raj.jpg",
      },
      {
        id: "aditi-modi",
        name: "Aditi Modi",
        role: "HR Trainee, Prism Johnson",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_aditi-modi.jpg",
      },
      {
        id: "adarsh-priye",
        name: "Adarsh Priye",
        role: "DEPUTY MANAGER, ICICI Bank",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_adarsh-priye.jpg",
      },
      {
        id: "abhinav-prakash",
        name: "Abhinav Prakash",
        role: "Fund Analyst, SS & C TECHNOLOGIES",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_abhinav-prakash.jpg",
      },
      {
        id: "abhinav-kumar",
        name: "Abhinav Kumar",
        role: "Assistant Store Manager, ABFRL",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_abhinav-kumar.jpg",
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
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_vartika-sinha.jpg",
      },
      {
        id: "smriti-nanda",
        name: "Smriti Nanda",
        role: "Kotak bank, HR Management Trainee",
        image:
          "https://fostiima.org/uploaded_files/thumb_cache/thumb_281_281_smriti-nanda.jpg",
      },
    ],
  },
];
