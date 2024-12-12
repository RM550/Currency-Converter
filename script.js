const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const conversionResult = document.getElementById('conversionResult');

// Comprehensive list of currencies with country names
const currencyNames = {
    USD: '(United States)',
    EUR: '(Eurozone)',
    GBP: '(United Kingdom)',
    INR: '(India)',
    PKR: '(Pakistan)',
    AUD: '(Australia)',
    CAD: '(Canada)',
    JPY: '(Japan)',
    CNY: '(China)',
    AED: '(UAE)',
    ARS: '(Argentina)',
    BGN: '(Bulgaria)',
    BRL: '(Brazil)',
    CHF: '(Switzerland)',
    CLP: '(Chile)',
    COP: '(Colombia)',
    CZK: '(Czech Republic)',
    DKK: '(Denmark)',
    EGP: '(Egypt)',
    FJD: '(Fiji)',
    HKD: '(Hong Kong)',
    HUF: '(Hungary)',
    IDR: '(Indonesia)',
    ILS: '(Israel)',
    JOD: '(Jordan)',
    KES: '(Kenya)',
    KRW: '(South Korea)',
    KWD: '(Kuwait)',
    LKR: '(Sri Lanka)',
    MXN: '(Mexico)',
    MYR: '(Malaysia)',
    NZD: '(New Zealand)',
    NOK: '(Norway)',
    PLN: '(Poland)',
    QAR: '(Qatar)',
    RON: '(Romania)',
    RUB: '(Russia)',
    SAR: '(Saudi Arabia)',
    SEK: '(Sweden)',
    SGD: '(Singapore)',
    THB: '(Thailand)',
    TRY: '(Turkey)',
    TWD: '(Taiwan)',
    ZAR: '(South Africa)',
    XAU: '(Global)',
    XAG: '(Global)'
};

// Fetching exchange rates and populating currencies dropdown
async function fetchCurrencies() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();

    const currencies = Object.keys(data.rates);

    // Populating the 'fromCurrency' and 'toCurrency' dropdowns with full currency names and country names
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = `${currency} - ${currencyNames[currency] || currency}`;
        fromCurrencySelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = `${currency} - ${currencyNames[currency] || currency}`;
        toCurrencySelect.appendChild(option2);
    });
}

// Convert the currency
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();

    const rate = data.rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    conversionResult.textContent = `Conversion Result: ${convertedAmount} ${toCurrency} - ${currencyNames[toCurrency] || toCurrency}`;
}

// Call the function to fetch currencies on page load
fetchCurrencies();
