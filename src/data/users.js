export const Users = [
  {
    id: "1025", email: "tarekBenlakri@gmail.com", name: "tarek", lastUpdate: "1:32 PM  15 April 2024", avatar: "/1.jpg",
    companies:
      [{ title: "INFOSYS", state: "Final Round", color: "green", round: 5 },
      { title: "Google", state: "Wating for Final Round result", color: "orange", round: 4 }
      ]
  },
  {
    id: "1026", email: "userGH@gmail.com", name: "user", lastUpdate: "1:32 PM  15 April 2024", avatar: "/1.jpg", companies:
      [{ title: "INFOSYS", state: "Final Round", color: "green", round: 5 },
      { title: "Google", state: "Wating for Final Round result", color: "orange", round: 4 },
      { title: "Microsoft", state: "Technical Round", color: "red", round: 3 }
      ]
  },

]

export const InterViewStatusUser = {

  Selected: "green",
  Rejected: "red",
  Pending: "yellow",
  Hire: "green",

};


export const userRole = [

  "recruitmentFirms",

  "HRE",

  "Recruiters"

]


export const additionalDetailsData = [
  { key: "address", label: "Address", defaultValue: "123 Main St" },
  { key: "gender", label: "Gender", defaultValue: "Male" },
  { key: "dateOfBirth", label: "Date of Birth", defaultValue: "1990-01-01", type: "date" },
  { key: "nationality", label: "Nationality", defaultValue: "American" },
  { key: "maritalStatus", label: "Marital Status", defaultValue: "Single" },
  { key: "bio", label: "Bio", defaultValue: "This is my bio" },
];





export const dummyDataCredit = [
  {
    "name": "Starter",
    "price": 5000,
    "credits": 100,
    "features": ["Onboarding support", "Custom integrations", "Priority Customer Support"]
  },
  {
    "name": "Business",
    "price": 50000,
    "credits": 12000,
    "features": ["Onboarding support", "Custom integrations", "Priority Customer Support"]
  },
  {
    "name": "Custom",
    "price": "Custom",
    "credits": "Unlimited",
    "features": ["Onboarding support", "Custom integrations", "Dedicated Account Manager", "Early Access to new features"]
  }
]

