//listen for submit
document.getElementById('loanForm').addEventListener('submit', calculateResults);

//calculate results function
function calculateResults(e){
    
    //grab all elements from UI I need
    const resultDiv = document.getElementById('resultsDiv');
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('duration');
    const totalInterest = document.getElementById('result1');
    const monthlyPayment = document.getElementById('result2');
    const totalPayment = document.getElementById('result3');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Calculate monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.getElementById('resultsDiv').style.display = 'block';
        showError('Loan successfuly calculated');

    }else{
        showError('Please fill out the form correctly');
        
    }

    //Show resultas div

    e.preventDefault();

}

function showError(error){
    //Create div for error message
    const errorDiv = document.createElement('div')

    //grab elements to insert the new div
    const card = document.querySelector('.row');
    const heading = document.querySelector('.heading')

    //add a class
    errorDiv.className = 'card-panel coll s12 red errorDiv'

    //add text and appent to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert the new div
    card.insertBefore(errorDiv, heading);

    //clear error after 2 sec
    setTimeout(clearError, 2000);

}

function clearError(){
    document.querySelector('.errorDiv').remove();
}

