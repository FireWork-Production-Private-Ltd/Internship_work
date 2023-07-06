const Conversation = require('../../models/Conversation')

const myHeaders = new Headers();
myHeaders.append("apikey", "FMcJ5XR5Q5q3mCflnRp3PYxCMJ66cImE");
const isoCountryCurrency = require("iso-country-currency")
const cron = require("node-cron");

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

// FMcJ5XR5Q5q3mCflnRp3PYxCMJ66cImE
// beQ97xB2n5mbQSYp3lIpcaTrQ2ZJSrc2
// fetch("https://api.apilayer.com/exchangerates_data/latest?symbols={symbols}&base={base}", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

async function fetchcurrency(req, res) {
    try {
        
        const currencyList = [
            'NZD',
            'AUD',
            'EUR',
            'GBP',
            'USD',
            'HKD',
            'CAD',
            'JPY',
            'AFN',
            'ALL',
            'DZD',
            'XCD',
            'ARS',
            'AMD',
            'ANG',
            'AZN',
            'BSD',
            'BHD',
            'BDT',
            'BBD',
            'BYR',
            'BZD',
            'XOF',
            'BMD',
            'INR',
            'BOB',
            'BWP',
            'NOK',
            'BRL',
            'BND',
            'BGN',
            'BIF',
            'KHR',
            'XAF',
            'CVE',
            'KYD',
            'CLP',
            'CNY',
            'COP',
            'KMF',
            'CDF',
            'CRC',
            'HRK',
            'CUP',
            'CYP',
            'CZK',
            'DKK',
            'DJF',
            'DOP',
            'IDR',
            'ECS',
            'EGP',
            'SVC',
            'ETB',
            'EEK',
            'FKP',
            'FJD',
            'XPF',
            'GMD',
            'GEL',
            'GIP',
            'GTQ',
            'GNF',
            'GYD',
            'HTG',
            'HNL',
            'HUF',
            'ISK',
            'IRR',
            'IQD',
            'ILS',
            'JMD',
            'JOD',
            'KZT',
            'KES',
            'KPW',
            'KRW',
            'KWD',
            'KGS',
            'LAK',
            'LVL',
            'LBP',
            'LSL',
            'LRD',
            'LYD',
            'CHF',
            'LTL',
            'MOP',
            'MKD',
            'MGA',
            'MWK',
            'MYR',
            'MVR',
            'MTL',
            'MRO',
            'MUR',
            'MXN',
            'MDL',
            'MNT',
            'MAD',
            'MZN',
            'MMK',
            'NAD',
            'NPR',
            'NIO',
            'NGN',
            'OMR',
            'PKR',
            'PAB',
            'PGK',
            'PYG',
            'PEN',
            'PHP',
            'PLN',
            'QAR',
            'RON',
            'RUB',
            'RWF',
            'STD',
            'SAR',
            'SCR',
            'SLL',
            'SGD',
            'SKK',
            'SBD',
            'SOS',
            'ZAR',
            'LKR',
            'SDG',
            'SRD',
            'SZL',
            'SEK',
            'SYP',
            'TWD',
            'TJS',
            'TZS',
            'THB',
            'TOP',
            'TTD',
            'TND',
            'TRY',
            'TMT',
            'UGX',
            'UAH',
            'AED',
            'UYU',
            'UZS',
            'VUV',
            'VEF',
            'VND',
            'YER',
            'ZMK',
            'ZWD',
            'AOA',
            'AQD',
            'BAM',
            'GHS',
            'GGP',
            'RSD']


        var currencyListResult = {};

        await fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${currencyList}&base=INR`, requestOptions)
            .then(response => response.text())
            .then(result => { currencyListResult = JSON.parse(result) })
            .catch(error => console.log('error', error));

        console.log(currencyListResult)
        // console.log(typeof currencyListResult)
        // console.log(currencyListResult.rates);
        let conversationObject = []
        for (let currency in currencyListResult.rates) {
            // console.log(currency);
            // console.log(`${currency} : ${currencyListResult.rates[currency]}`);
            try {
                const countryList = isoCountryCurrency.getAllCountriesByCurrencyOrSymbol('currency', currency)
                // console.log(countryList);

                for (let i = 0; i < countryList.length; i++) {
                    const findcountry = await Conversation.findOne({ country: countryList[i] })
                    if (findcountry !== null) {
                        const updateprice = await Conversation.updateOne({
                            country: countryList[i]
                        }, {
                            $set: {
                                currencyvalue: currencyListResult.rates[currency]
                            }
                        }
                        )
                        const findupdatedcountry = await Conversation.findOne({country:countryList[i]})
                        conversationObject.push(findupdatedcountry)
                    }else{
                        const newConversation = new Conversation({
                            country: countryList[i],
                            currencyname: currency,
                            currencyvalue: currencyListResult.rates[currency]
                        })
                        const savecountry = await newConversation.save()
                        conversationObject.push(savecountry)
                    }
                 }

            } catch (error) {
                continue;
            }
}

        res.json({
            error: null,
            data: conversationObject
        })

    } catch (error) {
        res.json({
            error: "something went wrong",
            data: null
        })
    }
}
// */10 * * * * * -> every 10 sec
// 0 8 * * *
async function fetchcurrencycronjob(req,res){
    // runs on every day morning 8 am
    cron.schedule("0 8 * * *",fetchcurrency);

}

module.exports = {
    fetchcurrencycronjob
}
