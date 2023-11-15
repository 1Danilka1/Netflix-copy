// import PropTypes from "prop-types";
import React from 'react'

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props
  return (
    <div>
      <input type="number" className="input" value={amount || ""} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option, index) => (
          <option key={`${option}-${index}`} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}



// CurrencyRow.propTypes = {
//     currencyOptions: PropTypes.array,
// }
