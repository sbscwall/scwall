// src/data/propertydata.jsx



// general reusable calculations for some data

const calculateMonthlyExpense = ({propertyTax, propertyManagement, insurance, maintenance, hoa }) =>
  propertyManagement + insurance + propertyTax + maintenance + hoa;

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

const todayInterestRate=0.063;

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
      sqft: 1390,
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
      dealScoreComment: "A solid investment in a growing area, offering a steady rental income.",
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
      vacancyRateComment: "The vacancy rate is aligned with state average",
      demandComment: "Great LT cash flow, near schools and jobs",
      demandLevel: " 🔥 High Demand",
      trendComment: "Consistent working-class demand",
      trend: "⬆ Rising Rents",
      isRented: "🔑 Rented",
      risk: 2,
      growth: 4,
      neighborhoodAvgRent: "$1,900",
      AvgRentComment: "Strong fit for area",
      marketRentRange: "$1,900",
      marketRentRangeComment: "Slight premium",
      rentGrowth: 0.034,
      rentGrowthComment: "Above average",
      medianIncome: 62330,
      medianIncomeComment: "Rent is well within affordability standards for most tenants",
      medianAge: 41,
      medianAgecomment: "Adapted to the property",
      familyComposition: 2.3,
      familyCompositionComment: "Adapted to the property",
      rentersPct: 68,
      rentersPctComment: "Ideal for long-term rentals",
      schoolScore: "5/10",
      schoolScoreComment: "Might affect the property's appeal to families with young children.",
      crimeRate: "22/100",
      crimeRateComment: "Lower crime than surrounding zones",
      walkScore: "3/100",
      walkScoreComment: "Car-dependant",
      transitScore: "12/100",
      transitScoreComment: "Driving required",
      hoaStatus: "low",
      hoaComment: "No HOA rental restrictions",
    
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
      naturalRisk: "🟢",
      naturalRiskComment: "Non-flood area",
      naturalRiskPreview: "Ok",
      propertyCondition: "Built in 1989, renovated in 2012",
      propertyConditionRiskPreview: "Ok",
      propertyConditionComment: "Maintenance budget minimal",
      marketPropertyFit: "Works well with tenant demographics",
      marketPropertyFitRiskPreview: "Ok",
      marketPropertyFitComment: "The property is aligned with local population profile",
      verificationChecklist1: "Verify the current tenant's lease agreement, payment history, and lease expiration date. Confirm that the tenant has been paying rent on time and that no eviction or legal issues are present.",
      verificationChecklist2: "Inspect the carpet for any signs of wear, stains, or damage. Verify whether it needs cleaning or replacement before tenants move in.",
      verificationChecklist3: "Inspect the roof for missing shingles, leaks, or signs of wear. Ask the realtor about the roof's age and any recent repairs or replacements.",
      verificationChecklist4: "HVAC not mentionned: Check the HVAC system for functionality. Ask when the last service was performed and if any maintenance or repairs are due soon.",
      verificationChecklist5:"Test light switches and outlets. Ask about the age of the electrical system and whether it meets current code requirements",
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
        dealScoreComment: "Reliable cash flow and good potential for appreciation. A good balance of risk and return",
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
        vacancyRateComment: "The vacancy rate is aligned with state average",
        demandComment: "Affordable rental zone near employers",
        demandLevel: "high",
        trendComment: "Consistent increases",
        trend: "rising",
        isRented: "🔑 Vacant",
        risk: 3,
        growth: 4,
        neighborhoodAvgRent: 1700,
        AvgRentComment: "Aligned",
        marketRentRange: "$1,750",
        marketRentRangeComment: "Property in the market range",
        rentGrowth: 0.028,
        rentGrowthComment: "Solid growth",
        medianIncome: 53520,
        medianIncomeComment: "Rent is on the higher end, but still manageable for many tenants",
        medianAge: 43,
        medianAgecomment: "Mixed working class + retirees",
        familyComposition: 2.4,
        familyCompositionComment: "Adapted to the property",
        rentersPct: 64,
        rentersPctComment: "Good rental saturation",
        schoolScore: "6/10",
        schoolScoreComment: "Average-rated schools",
        crimeRate: "26/100",
        crimeRateComment: "Pretty safe",
        walkScore: "6/100",
        walkScoreComment: "Car-dependant",
        transitScore: "7/100",
        transitScoreComment: "Car-dependent",
        hoaStatus: "low",
        hoaComment: "No HOA rental restrictions",



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
        naturalRiskComment: "Non flood area",
        naturalRiskPreview: "Ok",
        propertyCondition: "Roof aged 15years",
        propertyConditionRiskPreview: "Attention",
        propertyConditionComment: "Inspection advised. Roof to be replaced soon",
        marketPropertyFit: "Works well with tenant demographics",
        marketPropertyFitRiskPreview: "Ok",
        marketPropertyFitComment: "The property is aligned with local population profile",
        verificationChecklist1: "Inspect the roof for missing shingles, leaks, or signs of wear. Ask the realtor about the roof's age and any recent repairs or replacements.",
        verificationChecklist2: "Look for visible cracks in the walls, floors, and ceilings. Check for any signs of water damage, especially in basements or crawlspaces",
        verificationChecklist3: "Inspect the carpet for any signs of wear, stains, or damage, and verify if it needs cleaning or replacement to avoid additional costs.",
        verificationChecklist4: "Inspect all appliances (fridge, stove, dishwasher, etc.) for wear or malfunction. Ask if any appliances need replacement.",
        verificationChecklist5: "Check the HVAC system for functionality. Ask when the last service was performed and if any maintenance or repairs are due soon.",
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
        dealScoreComment: "A well-located property, attractive for short-term or long-term rental. Pool maintenance and security to be considered",
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

        hoa: 38,
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
        estimatedMonthlyRent: 2480,
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
        demandComment: "Stable family rental market, near schools",
        demandLevel: "high",
        trendComment: "Consistent year-over-year rent growth",
        trend: "rising",
        isRented: "🔑 Vacant",
        risk: 3,
        growth: 4,
        neighborhoodAvgRent: 2050,
        AvgRentComment: "Slightly below asking rent",
        marketRentRange: "$2,100",
        marketRentRangeComment: "Matches current trends",
        rentGrowth: 0.029,
        rentGrowthComment: "Steady upward trend",
        medianIncome: 76062,
        medianIncomeComment: "Rent is well within affordability standards for most tenants",
        medianAge: 42,
        medianAgecomment: "Family-dense population",
        familyComposition: 2.3,
        familyCompositionComment: "Adapted to the property",
        rentersPct: 66,
        rentersPctComment: "Healthy",
        schoolScore: "7/10",
        schoolScoreComment: "Good. Can attract families with young children",
        crimeRate: "33/100",
        crimeRateComment: "Suburban feel, safe zone",
        walkScore: "5/100",
        walkScoreComment: "Car-dependant",
        transitScore: "3/100",
        transitScoreComment: "Car-dependent",
        hoaStatus: "Yes",
        hoaComment: "HOA, check restrictions",


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
        naturalRisk: "Flood area AE",
        naturalRiskComment: "Higher insurance",
        naturalRiskPreview: "Attention",
        vacancyRateRiskPreview: "Ok",
        vacancyRateComment: "Vacancy remains low in this submarket",
        propertyCondition: "Built after 2010, well-maintained",
        propertyConditionRiskPreview: "Ok",
        propertyConditionComment: "No major damage visible",
        marketPropertyFit: "Match for families with stable income",
        marketPropertyFitRiskPreview: "Ok",
        marketPropertyFitComment: "Fits area profile",
        verificationChecklist1: "Pool: check for proper maintenance and safety features such as fencing or a pool cover. Inspect outdoor spaces for general wear and tear",
        verificationChecklist2: "Flood zone: check past flood events, flood mitigation measures, and simulate the flood insurance premium to assess additional costs.",
        verificationChecklist3: "Test the HVAC system for functionality, ensuring the heating and cooling systems are working efficiently. Inquire about the last service date.",
        verificationChecklist4: "Inspect the plumbing system for leaks or damage, especially under sinks and in the crawlspace. Check water pressure in multiple faucets.",
        verificationChecklist5: "Inspect the exterior for any cracks, rot, or signs of water damage",
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
  