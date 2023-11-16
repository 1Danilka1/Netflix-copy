// import PropTypes from "prop-types";
import React from 'react'
import css from './CurrencyRow.module.css'

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props 
  return (
    <div className={css.container}>
      <input type="number" className="input" value={amount || ""} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeCurrency} className={css.select}>
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
