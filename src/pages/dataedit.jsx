import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; //to navigate to last page on close
import { Pencil, ChevronDown, ChevronUp } from 'lucide-react';
import {Button} from '@/components/ui/button'; 
import PillDropdown from '@/components/ui/pilldropdown'; 
import Slider from '@/components/ui/slider'; 
import UpdownEditor from '@/components/ui/updowneditor'; 
import { getPropertyById } from "@/data/propertydata"; //import the file where all static data are saved
import '../css/global.css';
import '../css/dataedit.css';

const DataEditPage = () => {

  const { propertyId } = useParams(); // Get the propertyId from the URL
  const property = getPropertyById(propertyId); // Fetch the property data based on the propertyId
  
    // State for changing values
  const [showLT, setShowLT] = useState(true);  // Initially show LT
  const [showST, setShowST] = useState(false); // Initially hide ST
  const [showMortgageDetails, setShowMortgageDetails] = useState(false);
  const [propertyPrice, setPropertyPrice] = useState(0); // Example house Price
  const [interestRate, setInterestRate] = useState(0);  // Example default mortgage rate
  const [mortgageTerm, setMortgageTerm] = useState(30);  // Example default mortgage term
  const [mortgageInsurance, setMortgageInsurance] = useState(0);  // Example default mortgage insurance
  const [sliderValue, setSliderValue] = useState(0);  // Set initial value as 50
  const initialDownPayment=(propertyPrice * 0.2); //standard of 20%
  const [downPayment, setDownPayment] = useState(initialDownPayment); // Initial down payment in dollars
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20); // Initial percentage set to 20%
  


  // Initialize data for LT and ST before to get data from propertydata
  const [categories, setCategories] = useState({
    income: [
      { label: "Monthly Rent", ltValue: 0, stValue: 0 },
      { label: "Vacancy Rate", ltValue: 0, stValue: 0 }
    ],
    expenses: [
      { label: "Property Tax", ltValue: 0, stValue: 0 },
      { label: "Insurance", ltValue: 0, stValue: 0 },
      { label: "Property Management", ltValue: 0, stValue: 0 },
      { label: "HOA", ltValue: 0, stValue: 0 },
      { label: "Maintenance", ltValue: 0, stValue: 0 }
    ],
  });


  // Update the state values with the property data using useEffect
  useEffect(() => {
    if (property) {
      setPropertyPrice(property.recommendedPrice);
      setInterestRate(property.interestRate * 100);  // Default mortgage rate (can be adjusted later based on property)
      setSliderValue(20);  // Default down payment percentage
      setDownPayment(property.recommendedPrice * 0.2); // Set initial down payment (20% of the property price)
      setDownPaymentPercentage(20); // Set initial down payment percentage
      setMortgageTerm(property.mortgageTerm); // Set initial down payment percentage

      // Set the LT and ST values
      setCategories({
        income: [
          { label: "Monthly Rent", ltValue: property.estimatedMonthlyRent, stValue: property.nightlyRate },
          { label: "Vacancy Rate", ltValue: property.vacancyRate * 100, stValue: property.vacancyRateST * 100 },
        ],
        expenses: [
          { label: "Property Tax", ltValue: property.propertyTax, stValue: property.propertyTax },
          { label: "Insurance", ltValue: property.insurance, stValue: property.insuranceST },
          { label: "Property Management", ltValue: property.propertyManagement, stValue: property.propertyManagementST },
          { label: "HOA", ltValue: property.hoa, stValue: property.hoa },
          { label: "Maintenance", ltValue: property.maintenance, stValue: property.maintenanceST },
        ],
      });
    }
  }, [property]); // Re-run the effect when property data changes
  



  // Reset function to restore initial values
  const handleReset = () => {
    setPropertyPrice(property.recommendedPrice);
    setInterestRate(property.interestRate * 100);
    setMortgageTerm(property.mortgageTerm);
    setSliderValue(20);
    setDownPayment(property.recommendedPrice * 0.2);
    setDownPaymentPercentage(20);

    setCategories({
      income: [
        { label: "Monthly Rent", ltValue: property.estimatedMonthlyRent, stValue: property.nightlyRate },
        { label: "Vacancy Rate", ltValue: property.vacancyRate * 100, stValue: property.vacancyRateST * 100 },
      ],
      expenses: [
        { label: "Property Tax", ltValue: property.propertyTax, stValue: property.propertyTax },
        { label: "Insurance", ltValue: property.insurance, stValue: property.insuranceST },
        { label: "Property Management", ltValue: property.propertyManagement, stValue: property.propertyManagementST },
        { label: "HOA", ltValue: property.hoa, stValue: property.hoa },
        { label: "Maintenance", ltValue: property.maintenance, stValue: property.maintenanceST },
      ],
    });
  };
  

  // To close the window - to decomment in industrialized mode
 // const [isModalOpen, setIsModalOpen] = useState(true);  // Initially open

 //toggle is switching views between ST and LT
 const toggleView = () => {
    setShowLT(!showLT);
    setShowST(!showST);
  };


// Functions for navigation and state reset
const navigate = useNavigate();

const handleClose = () => {
    navigate('/explore');  // Redirect to the explore page (property card page)
  };

  const handleUpdate = () => {
    navigate('/explore');  // Redirect to the explore page (property card page)
  };



  // Define predefined mortgage terms
  const mortgageTerms = [
    { label: '15 Years', value: 15 },
    { label: '20 Years', value: 20 },
    { label: '30 Years', value: 30 },
  ];

  // Function to format numbers with commas (thousands separator)
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  // Function to update values of ST and LT
  const handleValueChange = (category, index, field, value) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const updatedCategories = { ...categories };
    updatedCategories[category][index][field] = numericValue;
    setCategories(updatedCategories);
  };
// Specific function to update the LT vacancy rate
const handleLTVacancyRateChange = (value) => {
    // Remove any non-numeric characters (e.g., %) and check if the input is empty
    let numericValue = value.replace(/[^0-9.]/g, '');
  
    // If the value is empty, set it to '0'
    numericValue = numericValue === '' ? '0' : numericValue;
  
    // Ensure the value does not exceed 100%
    if (parseFloat(numericValue) > 100) {
      numericValue = '100'; // Set the maximum value to 100%
    }
  
    // Update the state with the numeric value
    const updatedCategories = { ...categories };
    updatedCategories.income[1].ltValue = numericValue; // Update only the LT vacancy rate
    setCategories(updatedCategories);
  };
  
  // Specific function to update the ST vacancy rate
  const handleSTVacancyRateChange = (value) => {
    let numericValue = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
  
    // If the value is empty, set it to '0'
    numericValue = numericValue === '' ? '0' : numericValue;
  
    // Ensure the value does not exceed 100%
    if (parseFloat(numericValue) > 100) {
      numericValue = '100'; // Set the maximum value to 100%
    }
  
    const updatedCategories = { ...categories };
    updatedCategories.income[1].stValue = numericValue; // Update only the ST vacancy rate
    setCategories(updatedCategories);
  };


  // Update property price
  const handlePropertyPriceChange = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setPropertyPrice(Number(numericValue));
  };

  // Update Mortgage Insurance
  const handleMortgageinsuranceChange = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setMortgageInsurance(Number(numericValue));
  };


  //DOWN PAYMENT SLIDER
// Function to calculate the down payment in dollars based on the percentage and property price
const calculateDownPayment = (downPaymentPercentage, propertyPrice) => {
    return (downPaymentPercentage / 100) * propertyPrice; // Calculate down payment in dollars
  };
  
  // Handle slider change and update both the percentage and the dollar amount
  const handleSliderChange = (value) => {
    const calculatedDownPayment = calculateDownPayment(value, propertyPrice); // Calculate down payment in dollars
    setSliderValue(value); // Update the slider value (percentage from 0 to 100)
    setDownPayment(calculatedDownPayment); // Update the down payment in dollars
    setDownPaymentPercentage(value); // Update the down payment percentage (sync with slider)
  };
  
  // Initial slider value set to 20% of the property price
  const initialSliderValue = 20; // Initial down payment percentage
  
  useEffect(() => {
    // Initialize down payment based on the initial slider value
    const calculatedDownPayment = calculateDownPayment(initialSliderValue, propertyPrice);
    setSliderValue(initialSliderValue); // Set the initial slider value (20%)
    setDownPayment(calculatedDownPayment); // Set the initial down payment value in dollars
    setDownPaymentPercentage(initialSliderValue); // Set the initial down payment percentage to 20%
  }, [propertyPrice]); // Run this when propertyPrice changes

  //CALCULATION PART
  // Function to calculate MONTHLY MORTGAGE
    // Update the down payment calculation based on the slider value

  
    const calculateMonthlyMortgage = (propertyPrice, interestRate, mortgageTerm, downPayment) => {
    const loanAmount = propertyPrice - downPayment;  // Calculate loan amount after down payment
    const monthlyRate = interestRate / 100 / 12;  // Monthly interest rate
    const numPayments = mortgageTerm * 12;  // Total number of payments (months)
    
    // Mortgage payment formula
    const mortgagePayment =
      (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
  
    return mortgagePayment.toFixed(0);  // Return monthly mortgage payment rounded to 2 decimal places
  };
  
  // Using the down payment and property price to calculate mortgage payment
  const monthlyMortgage = calculateMonthlyMortgage(propertyPrice, interestRate, mortgageTerm, downPayment);
  
   // Function to calculate AVERAGE MONTHLY INCOME LT
const calculateMonthlyIncomeLT = (monthlyRentLT, vacancyRate) => {
    const vacancyDecimal = vacancyRate / 100;
    return monthlyRentLT * (1 - vacancyDecimal);
  };
  const incomeLT = calculateMonthlyIncomeLT(
    parseFloat(categories.income[0].ltValue),  // Dynamically use the LT value from the categories state
    parseFloat(categories.income[1].ltValue)   // Dynamically use the LT vacancy rate from the categories state
  );


  // Function to calculate AVERAGE MONTHLY INCOME ST
  const calculateMonthlyIncomeST = (nightRateST, vacancyRateST) => {
    const vacancyDecimal = vacancyRateST / 100;
    return nightRateST * 30 * (1 - vacancyDecimal); 
  };
  const incomeST = calculateMonthlyIncomeST(
    parseFloat(categories.income[0].stValue),  // Dynamically use the ST value from the categories state
    parseFloat(categories.income[1].stValue)   // Dynamically use the ST vacancy rate from the categories state
  );

    // Function to calculate TOTAL EXPENSE LT
    const calculateTotalExpenseLT = () => {
        const expenseValues = categories.expenses.map((expense) => parseFloat(expense.ltValue)); // Get LT expense values
        const totalExpenseLT = parseFloat(monthlyMortgage) + expenseValues.reduce((acc, value) => acc + value, 0); // Sum up all expenses
        return totalExpenseLT.toFixed(0); // Return the total expense rounded to two decimal places
    };
    const expenseLT = calculateTotalExpenseLT();  

    // Function to calculate TOTAL EXPENSE ST
    const calculateTotalExpenseST = () => {
        const expenseValues = categories.expenses.map((expense) => parseFloat(expense.stValue)); // Get LT expense values
        const totalExpenseST = parseFloat(monthlyMortgage) + expenseValues.reduce((acc, value) => acc + value, 0); // Sum up all expenses
        return totalExpenseST.toFixed(0); // Return the total expense rounded to two decimal places
    };
    const expenseST = calculateTotalExpenseST();  

    // Function to calculate CASHFLOW LT
    const calculateCashFlowLT = () => {
        const incomeLT = calculateMonthlyIncomeLT(parseFloat(categories.income[0].ltValue), parseFloat(categories.income[1].ltValue));
        const expenseLT = calculateTotalExpenseLT();
        return incomeLT - expenseLT;
      };
      const cashFlowLT = calculateCashFlowLT();


    // Function to calculate CASHFLOW ST
    const calculateCashFlowST = () => {
        const incomeST = calculateMonthlyIncomeST(parseFloat(categories.income[0].stValue), parseFloat(categories.income[1].stValue));
        const expenseST = calculateTotalExpenseST();
        return incomeST - expenseST;
      };
      const cashFlowST = calculateCashFlowST();

  
  // Function to calculate CAP RATE LT
  const calculateAnnualNOILT = (incomeLT, expenseLT, monthlyMortgage) => {
    return (incomeLT - (expenseLT - monthlyMortgage)) * 12 ; // Calculate NOI LT
};
    const annualNOILT = calculateAnnualNOILT(incomeLT, expenseLT, monthlyMortgage);
 
    const calculateCapRateLT = (propertyPrice, annualNOILT) => {
    return (annualNOILT / propertyPrice) * 100; // Calculate Cap Rate as a percentage
  };
  const capRateLT = calculateCapRateLT(propertyPrice, annualNOILT);
  
  
  // Function to calculate CAP RATE ST
  const calculateAnnualNOIST = (incomeST, expenseST, monthlyMortgage) => {
    return (incomeST - (expenseST - monthlyMortgage)) * 12; // Calculate NOI ST
};
    const annualNOIST = calculateAnnualNOIST(incomeST, expenseST, monthlyMortgage);
 
    const calculateCapRateST = (propertyPrice, annualNOIST) => {
    return (annualNOIST / propertyPrice) * 100; // Calculate Cap Rate as a percentage
  };
  const capRateST = calculateCapRateST(propertyPrice, annualNOIST);


  return (
    <div className="page-container">
       {/* {isModalOpen && ( --> to reuse when indistrualized to just close the window */}
      <div className="data-edit-page">

        {/* Fixed Banner including close button*/}
        <div className="fixed-banner">

         {/* title*/}    
         <div className="fixed-banner-headline">  
        {showLT && <h3 className="banner-title">{`Long Term Rental`}</h3>}
        {showST && <h3 className="banner-title">{`Short Term Rental`}</h3>}
         {/* title*/} 
        <div className="close-button-container">
                <Button
                className="close-button"
                onClick={handleClose}
                >
                <span className="close-icon">×</span> {/* Close (X) Icon */}
                </Button>
                </div>
        
        
        </div>

        <div className="banner-section">
        <div className="banner-category">
            {showLT && <h3 className="banner-kpi">{`$ ${formatNumberWithCommas(cashFlowLT.toFixed(0))}`}</h3>}
            {showST && <h3 className="banner-kpi">{`$${formatNumberWithCommas(cashFlowST.toFixed(0))}`}</h3>}
            <span>Monthly Cash Flow</span>
          </div>
          <div className="banner-category">
            {showLT && <h3 className="banner-kpi">{` ${capRateLT.toFixed(2)}%`}</h3>}
            {showST && <h3 className="banner-kpi">{` ${capRateST.toFixed(2)}%`}</h3>}
            <span>Cap Rate</span>
          </div>
          <div className="banner-category">      
            {showLT && <h3 className="banner-kpi">{`$ ${formatNumberWithCommas(incomeLT.toFixed(0))}`}</h3>}
            {showST && <h3 className="banner-kpi">{`$ ${formatNumberWithCommas(incomeST.toFixed(0))}`}</h3>}
            <span>Monthly Income</span>
          </div>
          <div className="banner-category">          
            {showLT && <h3 className="banner-kpi">{`$ ${formatNumberWithCommas(expenseLT)}`}</h3>}
            {showST && <h3 className="banner-kpi">{`$${formatNumberWithCommas(expenseST)}`}</h3>}
            <span>Monthly Expense</span>
          </div>

          </div>
        </div>

         {/* Toggle View Button */}
         <div className="toggle-view-button-container">
          <Button className="click-toggle-button" onClick={toggleView}>
            {showLT ? "Switch to Short Term" : "Switch to Long Term"}
          </Button>
        </div>

        {/* Data Categories */}
        <div className="categories">
          {/* INCOME CATEGORY */}
          <div className="category-section">
            <h3>INCOME</h3>
            <div className="money-section">
              {categories.income.map((item, propertyId) => (
                <div className="money-row" key={propertyId}>
                    <span className="row-label">
                        {/* Conditionally change the label based on LT or ST */}
                        {showST && item.label === "Monthly Rent" ? "Nightly Rate" : 
                            showST && item.label === "Vacancy Rate" ? "Vacancy Rate" : 
                            item.label
                        }
                        </span>
                  
                  {/* Render LT input field */}
                  {showLT && 
                  <div className="row-value">
                    <div className="currency-input-container">
                    {item.label === "Vacancy Rate" ? (
                      <input
                        type="tel"
                        value={`${item.ltValue} %`}  // Display as percentage for vacancy rate
                        onChange={(e) => handleLTVacancyRateChange(e.target.value)}
                        inputMode="numeric"

                      />
                    ) : (
                      <input
                        type="tel"
                        value={`$ ${formatNumberWithCommas(item.ltValue)}`}  // Display with $ for income
                        onChange={(e) => handleValueChange('income', propertyId, 'ltValue', e.target.value)}
                        inputMode="numeric"
                      />
                    )}
                    </div>
                  </div>}

                    {/* Render ST input field */}
                  {showST && 
                  <div className="row-value">
                    <div className="currency-input-container">
                    {item.label === "Vacancy Rate" ? (
                      <input
                        type="tel"
                        value={`${item.stValue} %`}  // Display as percentage for vacancy rate
                        onChange={(e) => handleSTVacancyRateChange(e.target.value)}
                        inputMode="numeric"
                      />
                    ) : (
                      <input
                        type="tel"
                        value={`$ ${formatNumberWithCommas(item.stValue)}`}  // Display with $ for income
                        onChange={(e) => handleValueChange('income', propertyId, 'stValue', e.target.value)}
                        inputMode="numeric"
                      />
                    )}
                    </div>
                  </div>}
                </div>
              ))}
            </div>
          </div>

          {/* EXPENSE CATEGORY */}
          <div className="category-section">
            <h3>MONTHLY EXPENSES</h3>
            <div className="money-row">
              <span className="row-label">Property Price</span>
              <div className="row-value">
                <div className="currency-input-container">
                  <span className="currency-symbol">$ </span>
                  <input
                    type="tel"
                    value={formatNumberWithCommas(propertyPrice)}
                    onChange={(e) => handlePropertyPriceChange(e.target.value)}
                    inputMode="numeric"
                  />
                </div>
              </div>
            </div>

            <div className="money-section">
              <div className="money-row">
                <span className="row-label">Mortgage</span>
                <span className="row-value-mortgage">$ {formatNumberWithCommas(monthlyMortgage)}</span>
                <div
                  className="expand-arrow"
                  onClick={() => setShowMortgageDetails(!showMortgageDetails)}
                >
                  {showMortgageDetails ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>
            </div>

            {showMortgageDetails && (
              <div className="mortgage-details">
                {/* Down Payment */}
                <div className="money-row">
                  <span className="row-label">Down Payment</span>
                  <div className="row-value-slider">
                    <Slider
                      className="down-payment-slider"
                      min={0}
                      max={100}
                      step={1}
                      value={sliderValue} // Set slider value
                      onChange={handleSliderChange} // Update slider value on change
                    />
                    <div className="down-payment-info">
                    {/* Display Down Payment info real time */}
                    <span className="amount">$ {formatNumberWithCommas(downPayment)}</span>
                    <span className="percentage">{downPaymentPercentage}%</span>
                  </div>
                  </div>
                </div>

                {/* Mortgage Term */}
                <div className="money-row">
                  <span className="row-label">Mortgage Term</span>
                  <div className="row-value">
                    <div className="custom-pill-dropdown">
                      <PillDropdown
                        options={mortgageTerms}
                        selected={mortgageTerm}
                        onSelect={(value) => setMortgageTerm(value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Mortgage Rate */}
                <div className="money-row">
                  <span className="row-label">Interest Rate</span>
                  <div className="row-value">
                    <UpdownEditor
                     key={interestRate} //to force reset when value changes
                      value={interestRate}
                      minValue={0}
                      maxValue={20}
                      increment={0.05}
                      onChange={setInterestRate}
                      unit="%"
                    />
                  </div>
                </div>

                {/* Mortgage Insurance */}
                <div className="money-row">
                  <span className="row-label">Mortgage Insurance</span>
                  <div className="row-value">
                    <div className="currency-input-container">
                      <span className="currency-symbol">$ </span>
                      <input
                        type="tel"
                        value={formatNumberWithCommas(mortgageInsurance)}
                        onChange={(e) => handleMortgageinsuranceChange(e.target.value)}
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Expenses */}
            <div className="money-section">
              {categories.expenses.map((item, propertyId) => (
                <div className="money-row" key={propertyId}>
                  <span className="row-label">{item.label}</span>
                  {showLT && (
                    <div className="row-value">
                      <div className="currency-input-container">
                        <span className="currency-symbol">$ </span>
                        <input
                          type="tel"
                          value={formatNumberWithCommas(item.ltValue)}
                          onChange={(e) =>
                            handleValueChange('expenses', propertyId, 'ltValue', e.target.value)
                          }
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                  )}
                  {showST && (
                    <div className="row-value">
                      <div className="currency-input-container">
                        <span className="currency-symbol">$ </span>
                        <input
                          type="tel"
                          value={formatNumberWithCommas(item.stValue)}
                          onChange={(e) =>
                            handleValueChange('expenses', propertyId, 'stValue', e.target.value)
                          }
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
                {/* Save changes Button */}
                <div className="button-container">
                <Button
                className="info-button"
                onClick={handleReset}
                >
                Reset values
                </Button>
              
                <Button
                className="cta-button"
                onClick={handleUpdate}
                >
                Save Changes
                </Button>
                </div>

      </div>
        
           {/*  )}  --> the ")}" are to decomment when ismodal is used */}
    </div>
  );
};

export default DataEditPage;
