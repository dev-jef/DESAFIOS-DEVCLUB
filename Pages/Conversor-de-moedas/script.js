

const flagFromImg = document.getElementById('flag-from-img')
const flagToImg = document.getElementById('flag-to-img')
const currencyToConvert = document.getElementById('currency-to-convert')
const currencyFrom = document.getElementById('currency-from')
const convertButton = document.getElementById('convert-button')
const conversorValues = {
    real: {
        dollar: 0.19,
        euro: 0.17,
        libra: 0.14,
        bitcoin: 0.0000047,
    },
    dollar: {
        real: 5.20,
        euro: 0.88,
        libra: 0.76,
        bitcoin: 0.000024,
    },
    euro: {
        real: 5.90,
        dollar: 1.13,
        libra: 0.86,
        bitcoin: 0.000027,
    },
    libra: {
        real: 6.80,
        dollar: 1.31,
        euro: 1.16,
        bitcoin: 0.000028,
    },
    bitcoin: {
        real: 212765.95,
        dollar: 40916.53,
        euro: 35894.21,
        libra: 31250.00,
    }
}
        


let lastValueFrom = document.getElementById('currency-from').value;
let lastValueToConvert = document.getElementById('currency-to-convert').value;



function convertValues() {

    const valueInputCurrency = document.getElementById('value-input-currency').value
    const pFrom = document.getElementById('p-from')
    const pTo = document.getElementById('p-to')
    let typeOfCurrencyFrom = '';

    console.log(currencyToConvert)

    switch (currencyFrom.value) {
        case 'real':
            typeOfCurrencyFrom = 'pt-BR'
        case 'dollar':
            typeOfCurrencyFrom = 'en-US'
        case 'euro':
            typeOfCurrencyFrom = 'euro'
        case 'bitcoin':
            typeOfCurrencyFrom = 'GBP'
        case 'libra':
            typeOfCurrencyFrom = 'en-GB'
        default:
            break;
    }
       
    console.log(`currencyFrom: ${currencyFrom.value} - currencyToConvert: ${currencyToConvert.value} - valueInputCurrency: ${valueInputCurrency}`)
    const convertedValueTo = exchangeValues(valueInputCurrency, currencyFrom.value, currencyToConvert.value)

    switch (currencyToConvert.value) {
        case 'dollar':
            pTo.innerText = new Intl.NumberFormat(typeOfCurrencyFrom, { style: 'currency', currency: 'USD' }).format(convertedValueTo)
            pFrom.innerText = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(valueInputCurrency)
            flagToImg.src = 'assets/estados-unidos 1.svg'
            alert(`O valor convertido em dólar é: US$ ${convertedValueTo.toFixed(2)}`)
            break;
        case 'euro':
            pTo.innerText = new Intl.NumberFormat(typeOfCurrencyFrom, { style: 'currency', currency: 'EUR' }).format(convertedValueTo)
            pFrom.innerText = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(valueInputCurrency)
            flagToImg.src = 'assets/euro.svg'
            alert(`O valor convertido em euro é: € ${convertedValueTo.toFixed(2)}`)
            break;
        case 'libra':
            pTo.innerText = new Intl.NumberFormat(typeOfCurrencyFrom, { style: 'currency', currency: 'GBP' }).format(convertedValueTo)
            pFrom.innerText = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(valueInputCurrency)
            flagToImg.src = 'assets/libra 1.svg'
            alert(`O valor convertido em libra é: £ ${convertedValueTo.toFixed(2)}`)
            break;
        case 'bitcoin':
            pTo.innerText = new Intl.NumberFormat(typeOfCurrencyFrom, { style: 'currency', currency: 'BTC' }).format(convertedValueTo)
            pFrom.innerText = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BTC' }).format(valueInputCurrency)
            flagToImg.src = 'assets/bitcoin.svg'
            alert(`O valor convertido em bitcoin é: ₿ ${convertedValueTo.toFixed(2)}`)
            break;

        case 'real':
            pTo.innerText = new Intl.NumberFormat(typeOfCurrencyFrom, { style: 'currency', currency: 'BRL' }).format(convertedValueTo)
            pFrom.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueInputCurrency)
            flagToImg.src = 'assets/brasil 2.svg'
            alert(`O valor convertido em real é: R$ ${convertedValueTo.toFixed(2)}`)
            break;
        default:
            alert('Valor de moeda para conversão inválido.')
            break;
    }
  
}

function exchangeValues(value, fromCurrency, toCurrency) {
    const convertedValue = value * conversorValues[fromCurrency][toCurrency]
    return convertedValue
}

function resetCurrencyOptions(valor, id) {
    const options = ['real', 'dollar', 'euro', 'bitcoin', 'libra'];
    const currencyToConvertSelect = document.getElementById(id);
    for (let i = 0; i < options.length; i++) {
        const indice = options.indexOf(valor)
        if (indice != -1) {
            options.splice(indice, 1)
        }
    }

    console.log(`valor: ${valor} - id: ${id} - options: ${options}`)
    currencyToConvertSelect.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        switch (option) {
            case 'real':
                optionElement.text = 'R$ Real brasileiro';
                break;
            case 'dollar':
                optionElement.text = 'US$ Dólar americano';
                break;
            case 'euro':
                optionElement.text = '€ Euro';
                break;
            case 'bitcoin':
                optionElement.text = '₿ Bitcoin';
                break;
            case 'libra':
                optionElement.text = '£ Libra esterlina';
                break;
            default:
                break;
        }

        currencyToConvertSelect.appendChild(optionElement);

        if (id === 'currency-to-convert' && option.includes(lastValueToConvert)) {
            optionElement.selected = true;
        }

        if (id === 'currency-from' && option.includes(lastValueFrom)) {
            optionElement.selected = true;
        }
    })
}

convertButton.addEventListener('click', convertValues)

currencyFrom.addEventListener('change', (event) => {

    console.log(`CHANGE FROM: lastValueToConvert: ${lastValueToConvert} - lastValueFrom: ${lastValueFrom}`)

    switch (currencyFrom.value) {
        case 'real':
            flagFromImg.src = 'assets/brasil 2.svg'
            break;
        case 'dollar':
            flagFromImg.src = 'assets/estados-unidos 1.svg'
            break;
        case 'euro':
            flagFromImg.src = 'assets/euro.svg'
            break;
        case 'bitcoin':
            flagFromImg.src = 'assets/bitcoin.svg'
            break;
        case 'libra':
            flagFromImg.src = 'assets/libra 1.svg'
            break;

        default:

            break;
    }

    if (currencyFrom.value) {
        lastValueFrom = currencyFrom.value
    }

    console.log(`valor: ${currencyFrom.value}`)
    resetCurrencyOptions(currencyFrom.value, 'currency-to-convert')
})

currencyToConvert.addEventListener('change', (event) => {

    console.log(`CHANGE TO: lastValueToConvert: ${lastValueToConvert} - lastValueFrom: ${lastValueFrom}`)
    switch (currencyToConvert.value) {
        case 'dollar':
            flagToImg.src = 'assets/estados-unidos 1.svg'
            break;
        case 'euro':
            flagToImg.src = 'assets/euro.svg'
            break;
        case 'bitcoin':
            flagToImg.src = 'assets/bitcoin.svg'
            break;
        case 'real':
            flagToImg.src = 'assets/brasil 2.svg'
            break;
        case 'libra':
            flagToImg.src = 'assets/libra 1.svg'
            break;
        default:

            break;
    }

    if (currencyToConvert.value) {
        lastValueToConvert = currencyToConvert.value
    }

    console.log(`valor: ${currencyToConvert.value}`)
    resetCurrencyOptions(currencyToConvert.value, 'currency-from')
})


