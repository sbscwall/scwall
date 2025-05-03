// src/data/propertydata.jsx



// general reusable calculations for some data

const calculateMonthlyExpense = ({propertyManagement, insurance, maintenance, hoa }) =>
  propertyManagement + insurance + maintenance + hoa;

const calculateMonthlyTotalExpense = ({ monthlyExpense, monthlyMortgagePayment }) =>
  monthlyExpense + monthlyMortgagePayment;

const calculateMonthlyTotalIncome = ({ estimatedMonthlyRent, vacancyRate }) =>
  estimatedMonthlyRent * (1 - vacancyRate);

const calculateMonthlyCashFlow = ({ monthlyTotalIncome, monthlyTotalExpense }) =>
  monthlyTotalIncome - monthlyTotalExpense;

const calculateAnnualCashFlow = ({ monthlyCashFlow }) =>
  monthlyCashFlow * 12;

const calculateCapRate = ({ monthlyTotalIncome, monthlyExpense, recommendedPrice }) => 
   ((12 * (monthlyTotalIncome - monthlyExpense) / recommendedPrice) * 100).toFixed(2);

const calculateProjected5yValue = ({ recommendedPrice, appreciation }) =>
  Math.round(recommendedPrice * (1 + appreciation) ** 5);

const calculateProjected5yValueIncrease = ({ projected5yValue, recommendedPrice }) =>
  projected5yValue -recommendedPrice;

const estimateRentFromNightlyRate = ({ nightlyRate, occupancyRate = 0.65 }) =>
  Math.round(nightlyRate * 30 * occupancyRate);

const calculateMonthlyTotalIncomeST = ({ estimatedRentST, vacancyRateST }) =>
  Math.round(estimatedRentST * (1 - vacancyRateST));


const calculateMonthlyExpenseST = ({ propertyManagementST, insuranceST, maintenanceST }) =>
  propertyManagementST + insuranceST + maintenanceST;

const calculateMonthlyTotalExpenseST = ({ monthlyExpenseST, monthlyMortgagePayment }) =>
  monthlyExpenseST + monthlyMortgagePayment;

const calculateMonthlyCashFlowST = ({ monthlyTotalIncomeST, monthlyTotalExpenseST }) =>
  monthlyTotalIncomeST - monthlyTotalExpenseST;

const calculateAnnualCashFlowST = ({ monthlyCashFlowST }) =>
  monthlyCashFlowST * 12;

const calculateCapRateST = ({ monthlyTotalIncomeST, monthlyExpenseST, recommendedPrice }) => {
  const netAnnual = 12 * (monthlyTotalIncomeST - monthlyExpenseST);
  return `${((netAnnual / recommendedPrice) * 100).toFixed(2)}%`;
};

const calculateDownPayment = ({ recommendedPrice }) =>
  Math.round(recommendedPrice * 0.2);

const calculateLoanAmount = ({ recommendedPrice, downPayment }) =>
  recommendedPrice-downPayment;

const calculatePropertyManagement = ({ estimatedMonthlyRent }) =>
  Math.max(100, Math.round(estimatedMonthlyRent * 0.10)); //with min of $100

const calculatePropertyManagementST = ({ estimatedRentST }) =>
  Math.max(100, Math.round(estimatedRentST * 0.25)); //with min of $100

const todayInterestRate=0.063

const calculateMonthlyRate = ({ interestRate }) =>
  interestRate / 12;  // Interest rate divided by 12 to get the monthly rate


const calculateTotalPayments = ({ mortgageTerm }) =>
mortgageTerm * 12; //number of months of mortgage payment

const calculateMonthlyMortgagePayment = ({ loanAmount, monthlyRate, totalPayments  }) =>
loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);





// Fake dataset — static input by property
const mockPropertyData = {

  



   // --------------------- PROPERTY 1: LEHIGH ACRES --------------------------------------   
    Property1: {



      //general information
      address: "3106 10th St W, Lehigh Acres, FL 33971",
      sqft: 1350,
      beds: 3,
      baths: 2,
      images: [
      '../assets/property_img/lehigh_image1.jpg',
      '../assets/property_img/lehigh_image2.jpg',
      '../assets/property_img/lehigh_image3.jpg',
      '../assets/property_img/lehigh_image4.jpg',
      '../assets/property_img/lehigh_image5.jpg'

      ],
    
      // Deal Score
      dealScore: 8,
      dealScoreComment: "A solid investment in a growing area, offering a steady rental income. Ideal for long-term growth with a relatively affordable price point",
      cashflowScore: 8,
      marketScore: 7,
      locationScore: 8,
      occupancyScore: 9,
      maintenanceScore: 7,
      appreciationScore: 6,
    
      // Money out
      recommendedPrice: 215000,
      listedPrice: 225000,
      get downPayment() {
        return calculateDownPayment(this);
      },
      get loanAmount() {
        return calculateLoanAmount(this);
      },
      interestRate:todayInterestRate,
      mortgageTerm: 30,

      get monthlyRate() {
        return calculateMonthlyRate(this);
      }, 

      get totalPayments() {
        return calculateTotalPayments(this);
      }, 

      get monthlyMortgagePayment() {
        return calculateMonthlyMortgagePayment(this);
      }, 

      mortgageInsurance: 0,
      propertyTax: 140,
      insurance: 120,

      hoa: 0,
      maintenance: 100,
      get propertyManagement() {
        return calculatePropertyManagement(this);
      },

      get monthlyExpense() {
        return calculateMonthlyExpense(this);
      },

      get monthlyTotalExpense() {
        return calculateMonthlyTotalExpense(this);
      },

      //Money in
      estimatedMonthlyRent: 2050,
      vacancyRate: 0.05,
      get monthlyTotalIncome() {
        return calculateMonthlyTotalIncome(this);
      },

      //financial performance
      get netCapRate() {
        return calculateCapRate(this);
      },
      get monthlyCashFlow() {
        return calculateMonthlyCashFlow(this);
      },
      get annualCashFlow() {
        return calculateAnnualCashFlow(this);
      },
    
    
      // Rental Potential
    
      vacancyRateRiskPreview: "Ok",
      vacancyRateComment: "Tenant demand exceeds inventory",
      demandComment: "Great LT cash flow, near schools and jobs",
      demandLevel: " 🔥 High Demand",
      trendComment: "Consistent working-class demand",
      trend: "⬆ Rising Rents",
      isRented: "🔑 Vacant",
      risk: 2,
      growth: 4,
      neighborhoodAvgRent: 190,
      AvgRentComment: "Strong fit for area",
      marketRentRange: "1900–2150",
      marketRentRangeComment: "Slight premium",
      rentGrowth: 0.034,
      rentGrowthComment: "Well above average",
      avgIncome: 45000,
      avgIncomeComment: "LT rent feasible for income levels",
      medianAge: 41,
      medianAgecomment: "Younger families, working class",
      familyComposition: "Families and small households",
      rentersPct: 68,
      rentersPctComment: "Ideal for long-term rentals",
      schoolScore: 5,
      schoolScoreComment: "Basic but accessible education",
      crimeRate: "32 out of 100",
      crimeRateComment: "Lower crime than surrounding zones",
      walkScore: "57 out of 100",
      walkScoreComment: "Markets within 8 minutes",
      transitScore: "22 out of 100",
      transitScoreComment: "Driving required",
      hoaStatus: "low",
      hoaComment: "No restrictions",
    
      // Selling Value
      avgDaysOnMarket: 66,
      bestSellingSeason: "Spring",
      appreciation: 0.023,
      get projected5yValue() {
        return calculateProjected5yValue(this);
      },
      get projected5yValueIncrease() {
        return calculateProjected5yValueIncrease(this);
      },
      
    
      // Risks
      naturalRisk: "Non-flood area",
      naturalRiskComment: "Safe",
      naturalRiskPreview: "Ok",
      propertyCondition: "Solid foundation, no current defects",
      propertyConditionRiskPreview: "Ok",
      propertyConditionComment: "Maintenance budget minimal",
      marketPropertyFit: "Works well with tenant demographics",
      marketPropertyFitRiskPreview: "Ok",
      marketPropertyFitComment: "Profile-aligned",
      verificationChecklist1: "Tax & insurance confirmed",
      verificationChecklist2: "Tenant docs validated",
      verificationChecklist3: "Appraisal pending",
      verificationChecklist4: "HVAC service logged",
      verificationChecklist5: "Appliance list received",
    
      // Misc
      capRateComment: "Cap rate adjusted for realistic 5% vacancy and PM fee",
  

      //Short term 
      nightlyRate: 150,
      vacancyRateST: 0.30,
      insuranceST: 140,
      maintenanceST: 120,
      get propertyManagementST() {
        return calculatePropertyManagementST(this);
      },
      
      get estimatedRentST() {
        return estimateRentFromNightlyRate(this);
      },
  
      get monthlyTotalIncomeST() {
        return calculateMonthlyTotalIncomeST(this);
      },
      get monthlyExpenseST() {
        return calculateMonthlyExpenseST(this);
      },
      get monthlyTotalExpenseST() {
        return calculateMonthlyTotalExpenseST(this);
      },

      get monthlyCashFlowST() {
        return calculateMonthlyCashFlowST(this);
      },
      get annualCashFlowST() {
        return calculateAnnualCashFlowST(this);
      },

      get capRateST() {
        return calculateCapRateST(this);
      },


    

    },
  

    // ------------------ PROPERTY 2 OCALA ------------------------------
    Property2: {


      //general information
      address: "4821 SW 60th Ave, Ocala, FL 34474",
        sqft: 1350,
        beds: 3,
        baths: 2,
        images: [
          '../assets/property_img/ocala_image1.jpg',
          '../assets/property_img/ocala_image2.jpg',
          '../assets/property_img/ocala_image3.jpg',
          '../assets/property_img/ocala_image4.jpg',
          '../assets/property_img/ocala_image5.jpg'

        ],

        //Score
        dealScore: 7,
        dealScoreComment: "A property in a developing market, offering reliable cash flow and good potential for appreciation. A good balance of risk and return",
        cashflowScore: 7,
        marketScore: 7,
        locationScore: 8,
        occupancyScore: 9,
        maintenanceScore: 6,
        appreciationScore: 5,



        //Money out
        listedPrice: 265000,
        recommendedPrice: 205000,
        get downPayment() {
          return calculateDownPayment(this);
        },
        get loanAmount() {
          return calculateLoanAmount(this);
        },
        interestRate:todayInterestRate,
        mortgageTerm: 30,
        get monthlyRate() {
          return calculateMonthlyRate(this);
        }, 
  
        get totalPayments() {
          return calculateTotalPayments(this);
        }, 
  
        get monthlyMortgagePayment() {
          return calculateMonthlyMortgagePayment(this);
        }, 

        mortgageInsurance: 0,
        propertyTax: 140,
        insurance: 120,

        hoa: 0,
        maintenance: 100,
        get propertyManagement() {
          return calculatePropertyManagement(this);
        },

        get monthlyExpense() {
          return calculateMonthlyExpense(this);
        },

        get monthlyTotalExpense() {
          return calculateMonthlyTotalExpense(this);
        },


        //Money in
        estimatedMonthlyRent: 1800,
        vacancyRate: 0.05,
        get monthlyTotalIncome() {
          return calculateMonthlyTotalIncome(this);
        },

        //financial performance
      get netCapRate() {
        return calculateCapRate(this);
      },
      get monthlyCashFlow() {
        return calculateMonthlyCashFlow(this);
      },
      get annualCashFlow() {
        return calculateAnnualCashFlow(this);
      },

  
     // Rental Potential
        vacancyRateRisk: "low",
        vacancyRateRiskPreview: "Ok",
        vacancyRateComment: "No oversupply",
        demandComment: "Affordable rental zone near employers",
        demandLevel: "high",
        trendComment: "Consistent increases",
        trend: "rising",
        isRented: "🔑 Vacant",
        risk: 3,
        growth: 4,
        neighborhoodAvgRent: 1700,
        AvgRentComment: "Aligned",
        marketRentRange: "1600–1900",
        marketRentRangeComment: "Fits well",
        rentGrowth: 0.028,
        rentGrowthComment: "Solid LT growth",
        avgIncome: 47000,
        avgIncomeComment: "Rent/income ratio acceptable",
        medianAge: 43,
        medianAgecomment: "Mixed working class + retirees",
        familyComposition: "Families and singles",
        rentersPct: 64,
        rentersPctComment: "Good rental saturation",
        schoolScore: 6,
        schoolScoreComment: "Average-rated schools",
        crimeRate: "35/100",
        crimeRateComment: "Normal for price range",
        walkScore: "60/100",
        walkScoreComment: "Driveable, basic access",
        transitScore: "30/100",
        transitScoreComment: "Basic coverage",
        hoaStatus: "low",
        hoaComment: "No HOA",



        // Selling Value
        avgDaysOnMarket: 58,
        bestSellingSeason: "Summer",
        appreciation: 0.02,
        get projected5yValue() {
          return calculateProjected5yValue(this);
      },
      get projected5yValueIncrease() {
        return calculateProjected5yValueIncrease(this);
      },


      // Risks
        naturalRisk: "None",
        naturalRiskComment: "Low flood risk",
        naturalRiskPreview: "Safe",
        propertyCondition: "Good condition, no major issues",
        propertyConditionRiskPreview: "Ok",
        propertyConditionComment: "No renovation needed",
        marketPropertyFit: "Tenant history + title verified",
        marketPropertyFitRiskPreview: "Inspection advised",
        marketPropertyFitComment: "Roof aged 8y",
        verificationChecklist1: "Appliances included",
        verificationChecklist2: "Cap rate calculated using NOI and market comps",
        verificationChecklist3: "(placeholder)",
        verificationChecklist4: "(placeholder)",
        verificationChecklist5: "(placeholder)",
        capRateComment: "Low maintenance and no HOA give this a cap rate boost.",

// Short term
        nightlyRate: 135,
        vacancyRateST: 0.30,
        insuranceST: 140,
        maintenanceST: 130,
        get propertyManagementST() {
          return calculatePropertyManagementST(this);
        },
        
        get estimatedRentST() {
          return estimateRentFromNightlyRate(this);
        },
        get monthlyTotalIncomeST() {
          return calculateMonthlyTotalIncomeST(this);
        },
        get monthlyExpenseST() {
          return calculateMonthlyExpenseST(this);
        },

        get monthlyTotalExpenseST() {
          return calculateMonthlyTotalExpenseST(this);
        },
        get monthlyCashFlowST() {
          return calculateMonthlyCashFlowST(this);
        },
        get annualCashFlowST() {
          return calculateAnnualCashFlowST(this);
        },
        get capRateST() {
          return calculateCapRateST(this);
        },


      },




 // --------------------- PROPERTY 3: CAPE CORAL --------------------------------------     
      Property3: {  


        //general information
        address: "2811 NW 6th St, Cape Coral, FL 33993",
        sqft: 1420,
        beds: 3,
        baths: 2,
        images: [
          '../assets/property_img/capecoral_image1.jpg',
          '../assets/property_img/capecoral_image2.jpg',
          '../assets/property_img/capecoral_image3.jpg',
          '../assets/property_img/capecoral_image4.jpg',
          '../assets/property_img/capecoral_image5.jpg'

        ],


        //Score
        dealScore: 7,
        dealScoreComment: "A well-located property in a desirable area, with attractive rent potential and long-term growth",
        cashflowScore: 7,
        marketScore: 7,
        locationScore: 8,
        occupancyScore: 9,
        maintenanceScore: 5,
        appreciationScore: 5,


        //Money out
        listedPrice: 315000,
        recommendedPrice: 270000,
        get downPayment() {
          return calculateDownPayment(this);
        },
        get loanAmount() {
          return calculateLoanAmount(this);
        },
        interestRate:todayInterestRate,
        mortgageTerm: 30,
        get monthlyRate() {
          return calculateMonthlyRate(this);
        }, 
  
        get totalPayments() {
          return calculateTotalPayments(this);
        }, 
  
        get monthlyMortgagePayment() {
          return calculateMonthlyMortgagePayment(this);
        }, 

        mortgageInsurance: 0,
        propertyTax: 160,
        insurance: 130,

        hoa: 0,
        maintenance: 230,
        get propertyManagement() {
          return calculatePropertyManagement(this);
        },

        get monthlyExpense() {
          return calculateMonthlyExpense(this);
        },

        get monthlyTotalExpense() {
          return calculateMonthlyTotalExpense(this);
        },


        //Money in
        estimatedMonthlyRent: 2280,
        vacancyRate: 0.04,
        get monthlyTotalIncome() {
          return calculateMonthlyTotalIncome(this);
        },

        //financial performance
      get netCapRate() {
        return calculateCapRate(this);
      },
      get monthlyCashFlow() {
        return calculateMonthlyCashFlow(this);
      },
      get annualCashFlow() {
        return calculateAnnualCashFlow(this);
      },



      // Rental potential
        monthlyEarning: 2150,
        estimatedRent: 2150,
        demandComment: "Stable family rental market, near schools",
        demandLevel: "high",
        trendComment: "Consistent year-over-year rent growth",
        trend: "rising",
        isRented: "🔑 Vacant",
        risk: 3,
        growth: 4,
        neighborhoodAvgRent: 2050,
        AvgRentComment: "Slightly below asking rent",
        marketRentRange: "2000–2200",
        marketRentRangeComment: "Matches current trends",
        rentGrowth: 0.029,
        rentGrowthComment: "Steady upward trend",
        avgIncome: 51000,
        avgIncomeComment: "Balanced affordability for working tenants",
        medianAge: 42,
        medianAgecomment: "Family-dense population",
        familyComposition: "Mostly families",
        rentersPct: 66,
        rentersPctComment: "Healthy rental stock",
        schoolScore: 6,
        schoolScoreComment: "Good access to schools",
        crimeRate: "33/100",
        crimeRateComment: "Suburban feel, safe zone",
        walkScore: "58/100",
        walkScoreComment: "Essential services nearby",
        transitScore: "25/100",
        transitScoreComment: "Car-dependent",
        hoaStatus: "low",
        hoaComment: "No HOA, no restrictions",


        // Selling Value
        avgDaysOnMarket: 63,
        bestSellingSeason: "Spring",
        appreciation: 0.021,
        get projected5yValue() {
          return calculateProjected5yValue(this);
      },
      get projected5yValueIncrease() {
        return calculateProjected5yValueIncrease(this);
      },


        //Risks
        naturalRisk: "None",
        naturalRiskComment: "Low flood risk zone",
        naturalRiskPreview: "Safe",
        vacancyRateRiskPreview: "Ok",
        vacancyRateComment: "Vacancy remains low in this submarket",
        propertyCondition: "Built after 2010, well-maintained",
        propertyConditionRiskPreview: "Ok",
        propertyConditionComment: "No major repair expected",
        marketPropertyFit: "Match for families with stable income",
        marketPropertyFitRiskPreview: "Ok",
        marketPropertyFitComment: "Fits area profile",
        verificationChecklist1: "Lease, tax, and utility docs received",
        verificationChecklist2: "Inspection clean",
        verificationChecklist3: "Insurance doc in progress",
        verificationChecklist4: "Roof age 10y",
        verificationChecklist5: "Appliances included",
        capRateComment: "Cap rate includes vacancy and expense buffer",

        //Short term
 
        nightlyRate: 180,      
        vacancyRateST: 0.3,
        insuranceST: 160,
        maintenanceST: 140,

        get propertyManagementST() {
          return calculatePropertyManagementST(this);
        },
        
        get estimatedRentST() {
          return estimateRentFromNightlyRate(this);
        },
        get monthlyTotalIncomeST() {
          return calculateMonthlyTotalIncomeST(this);
        },
        get monthlyExpenseST() {
          return calculateMonthlyExpenseST(this);
        },
        
        get monthlyTotalExpenseST() {
          return calculateMonthlyTotalExpenseST(this);
        },
        get monthlyCashFlowST() {
          return calculateMonthlyCashFlowST(this);
        },
        get annualCashFlowST() {
          return calculateAnnualCashFlowST(this);
        },
        get capRateST() {
          return calculateCapRateST(this);
        },


      },

};
  

  export const getPropertyById = (propertyId) => {
    return mockPropertyData[propertyId];
  };
  
  // Optional: simple updater for in-memory only
  export const updatePropertyField = (propertyId, field, value) => {
    if (!mockPropertyData[propertyId]) return;
    mockPropertyData[propertyId][field] = value;
  };
  