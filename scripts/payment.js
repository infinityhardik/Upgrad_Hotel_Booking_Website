var paybtn = `<button type="button" class="btn btn-success" id="paymentButton" onclick="paymentStatus()">Pay Now</button>`;
document.getElementById('payment').innerHTML = paybtn;
document.getElementById('paymentButton').disabled = true;


var state = document.querySelector("header button");
state.addEventListener('click', ()=>{
    if(state.innerText==="LOGOUT"){
        document.getElementById('paymentButton').disabled = true;
    } else {
        document.getElementById('paymentButton').disabled = false;
    }
});


function paymentStatus(){
    alert("Hi, Your Booking is successful !!")
}