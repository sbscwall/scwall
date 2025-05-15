import React from 'react';
import { Pencil } from 'lucide-react';
import '../../css/breakdownmoneyflow.css';
import '../../css/global.css';
import '../../css/icon.css';
import { useNavigate } from 'react-router-dom'; //to navigate to edit page
import { getPropertyById } from "@/data/propertydata"; //import the file where all static data are saved

const formatCurrency = (value) => {
  if (typeof value !== "number") return "$–";
  return `$${Math.round(value).toLocaleString()}`;
};


const MoneyFlowBreakdown = ({ propertyId, data = () => {} }) => {
  const { income = [], expenses = [] } = data || {};

  const property = getPropertyById(propertyId);

// Functions for navigation to edit state
const navigate = useNavigate();

const handleEdit = () => {
  navigate(`/dataedit/${propertyId}`);  // Redirect to the explore page (property card page)
  };


  return (
    <div className="money-flow-dialog">
      {/* Earnings */}
      <div className="money-earning">
        <h3 className="money-earning-label"> Monthly Earnings: </h3>
        <h3 className="money-earning-value"> {formatCurrency(property.monthlyCashFlow)} </h3>
      </div>
      

      {/* Money In */}
      <div className="money-section">
        <table className="money-table">
          <tbody>
            <tr className="money-row money-total">
              <td className="money-cell">Monthly Total Income</td>
              <td className="money-cell">{formatCurrency(property.monthlyTotalIncome)}</td>
            </tr>

            {income.map((item, idx) => (
              <tr className="money-row" key={`in-${idx}`}>
                <td className="money-cell">{item.label}</td>
                <td className="money-cell">
                  {formatCurrency(item.amount)}
                  <Pencil className="edit-icon" size={16} onClick={handleEdit}/>
                  </td>        
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divider-thick" />

      {/* Money Out */}
      <div className="money-section">
        <table className="money-table">
          <tbody>
            <tr className="money-row money-total">
              <td className="money-cell">Monthly Total Expenses</td>
              <td className="money-cell">{formatCurrency(property.monthlyTotalExpense)}</td>
            </tr>

            {expenses.map((item, idx) => (
              <tr className="money-row" key={`out-${idx}`}>
                <td className="money-cell">{item.label}</td>
                <td className="money-cell">
                  {formatCurrency(item.amount)}
                  <Pencil className="edit-icon" size={16} onClick={handleEdit} />
               
                  </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoneyFlowBreakdown;
