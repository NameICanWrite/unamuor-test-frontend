import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { createRef, useEffect, useState } from 'react';

function App() {

  const formRef = createRef()

  // useEffect(() => {
  //   (async () => {
  //     const res = await axios.post('http://localhost:5000/checkout/checkout-cart-wayforpay', {}, {withCredentials: true})
  //     console.log(res);
  //   })()

  // }, [])



  return (
    <div className="App">
      <button onClick={
        async () => {
          //login
          // const login = await axios.post('http://localhost:5000/auth/login', {"password":"admin", "email": "vadimbaranivsky83@gmail.com"}, {withCredentials: true})

          //sign cart and receive data to populate the form
          const wayforpayData = (await axios.post('http://localhost:5000/checkout/create-online-payment-order', {
            email: 'vadimbaranivsky77@gmail.com',
            phone: '380635704828',
            name: 'Баранівський Вадим Миколайович',
            "destination": {
              "RecipientCityName": "Київ", 
              "SettlementType": "місто",
              "RecipientArea": "Київська",
              "RecipientAreaRegions": "",
              "RecipientAddressName": "1", 
              "RecipientHouse": "",
              "RecipientFlat": "",
              
            },
            products: [
            {id: '63f34ffe0fe30c9774da5130', count: 1, color: 'red', size: 's'}, 
            {id: '63f34ffe0fe30c9774da5130', count: 2, color: 'black', size: 'm'},
            {id: '63f34ffe0fe30c9774da5134', count: 1, color: 'red', size: 'm'}
          ]
          }, {withCredentials: true})).data
          const {
            merchantSignature, 
            amount, 
            orderReference,
            orderDate,
            merchantAccount,
            merchantDomainName,
            currency,
            serviceUrl,
            paymentSystems,
            products
          } = wayforpayData

          console.log(wayforpayData)
          

          // populate the form
          for (let prop in wayforpayData) {
            const item = wayforpayData[prop]

            if ((typeof item == 'string') || (typeof item == 'number')) {
              console.log(item);
            
              const input = document.createElement('input')
              input.name = prop
              input.value = item
              input.type = 'hidden'
              formRef.current.append(input)
            }
          }

        

          for (let i in products) {
            const item = products[i]

            const nameInput = document.createElement('input')
            nameInput.name = 'productName[]'
            nameInput.value = item.uniqueNameIntheCart
            nameInput.type = 'hidden'
            formRef.current.append(nameInput)

            const countInput = document.createElement('input')
            countInput.name = 'productCount[]'
            countInput.value = item.count
            countInput.type = 'hidden'
            formRef.current.append(countInput)

            const priceInput = document.createElement('input')
            priceInput.name = 'productPrice[]'
            priceInput.value = item.price
            priceInput.type = 'hidden'
            formRef.current.append(priceInput)
          }

          // formRef.current['productName[]'] = new RadioNodeList()
          // formRef.current['productCount[]'] = new RadioNodeList()
          // formRef.current['productPrice[]'] = new RadioNodeList()

          console.log(formRef.current)
          console.log(formRef.current.merchantSignature);

          // formRef.current['productPrice[]'].forEach(item => console.log(item.value))

          // formRef.current.submit()

          
          // formRef.current['productName[]'].value = cart.map(item => item.name)
          // formRef.current['productCount[]'].value = cart.map(item => item.count)
          // formRef.current['productPrice[]'].value = cart.map(item => item.price)
          
          formRef.current.submit()
        }
      }>checkout</button>
      <form method="post" action="https://secure.wayforpay.com/pay" accept-charset="utf-8" ref={formRef}>
        {/* <input name="merchantAccount" value="" /> */}
        <input name="merchantAuthType" value="SimpleSignature" />
        {/* <input name="merchantDomainName" value="" />
        <input name="orderReference" value="" />
        <input name="orderDate" value="" />
        <input name="amount" value="" /> */}
        {/* <input name="currency" value="UAH" /> */}
        
        <input name="merchantTransactionSecureType" value="AUTO" />
        <input type="hidden" name="orderTimeout" value="5" />
        {/* <input name="productName[]" value="f" />
        <input name="productName[]" value="d" /> */}
        {/* <input name="productPrice[]" value="f" />
        <input name="productPrice[]" value="d" />
        <input name="productCount[]" value="f" />
        <input name="productCount[]" value="d" /> */}
        <input name="clientFirstName" value="Вадим" />
        <input name="clientPhone" value="+380992856055" />
        <input name="clientLastName" value="Баранівський" />
        <input name="clientAddress" value="пр. Гагарина, 12" />
        <input name="clientCity" value="Днепропетровск" />
        <input name="clientEmail" value="some@mail.com" />
        {/* <input name="defaultPaymentSystem" value="card" /> */}
        {/* <input name="merchantSignature"  /> */}
        {/* <input type="submit" value="Test" /> */}
      </form>
    </div>
  );
}

export default App;
