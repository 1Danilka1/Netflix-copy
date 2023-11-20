import { useEffect, useState } from 'react'
import './App.css'
import CurrencyRow from './components/CurrencyRow/CurrencyRow'
import React from 'react';

const BASE_URL = "http://data.fixer.io/api/latest?access_key=76f6f58411cdf94394d886be1a4cef88"

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (exchangeRate !== undefined) {  
    if (amountInFromCurrency) {
      fromAmount = amount
      toAmount = amount * exchangeRate
    } else {
      toAmount = amount
      fromAmount = amount / exchangeRate
    }
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data && data.rates) {          
          const firstCurrency = Object.keys(data.rates)[0]
          setCurrencyOptions([data.base, ...Object.keys(data.rates)])
          setFromCurrency(data.base)
          setToCurrency(firstCurrency)
          setExchangeRate(data.rates[firstCurrency])
        }
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
        .then(data => setExchangeRate(data.rates[toCurrency]))
        .catch(error => console.error("Помилка при отриманні курсу обміну:", error));
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <img className='currency_image' src='https://play-lh.googleusercontent.com/pOiddrf8_IPWiUOyhj1cxbz2CzWejYdFjs8H5qGfIxnQs8YMNqZr4ScRevMhVnjS7Sg' alt='currency'></img>
      <h1 className='main_title'>Currency converter</h1>
      <div className='main_container'>
        <div className='container'>
          <h2 className='title'>Convert</h2>
          <div className='amount'>
            <div>
              <p className='text'>Amount</p>
              <CurrencyRow
                className='input'
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={fromAmount}
              />
            </div>
            <div className="equals">=</div>
            <div>
              <p className='text'>Converted to</p>
              <CurrencyRow
              className='input'
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={e => setToCurrency(e.target.value)}
              onChangeAmount={handleToAmountChange}
              amount={toAmount}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;


// 76f6f58411cdf94394d886be1a4cef88
