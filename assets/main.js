

/* window.onload = function () {
  if (location.search !== "") {
    document.getElementById("control").style.display = "block"
  } else {
    document.getElementById("login").style.display = "block"
    document.getElementById("subtitle").style.display = "block"
  }
} */
const backendUrl = "https://testnet.lnd.vulpem.com:3000"

const sendRequest = (route, body) => new Promise((resolve, reject) => {
  /*   const button = document.getElementById("button"),
          address = document.getElementById("input"),
          error = document.getElementById("error"),
          notification = document.getElementById("notification")
  
    error.style.display = "none"
    notification.style.display = "none"
    button.setAttribute("disabled", "disabled") */
  const xhr = new XMLHttpRequest()
  const json = JSON.stringify(body)
  console.log(json)
  xhr.open("POST", `${backendUrl}/${route}`)
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let response
        try {
          response = JSON.parse(xhr.response)
        } catch(e) {
          response = xhr.response
        }
        resolve(response)
      } else {
        let reason
        try {
          reason = JSON.parse(xhr.response)
        } catch(e) {
          reason = xhr.response
        }
        reject(reason)
      }
    } else {
      alert(xhr.readyState)
    }
  }
  xhr.send(json)
})

const setSpinnerStatus = (status) => {
  const pageloader = document.getElementById('pageloader')
   pageloader.classList.toggle('is-active');
}

const deposit = () => {
  const txHash = document.getElementById("txHash").value,
        invoice = document.getElementById("invoice").value

  sendRequest('deposit', { txHash, invoice })
    .then(response => alert(JSON.stringify(response.receipt)))
    .catch(reason =>  alert("Something went wrong! Reason: " + (reason.message || reason.error_description || reason)))
}

const withdraw = () => {
  const amount = document.getElementById("amount").value,
  address = document.getElementById("address").value


  sendRequest('withdraw', { address, amount })
    .then(response => alert(response.invoice.payment_request))
    .catch(reason =>  alert("Something went wrong! Reason: " + (reason.message || reason.error_description || reason)))

}
