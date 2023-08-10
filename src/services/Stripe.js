//Stripe.js//
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class Stripe {
    constructor() {

    }
    async buildCheckoutPage(productsData) {
        let products = [];

        for(let i = 0; productsData.length > i; i++) {
            products.push(
                await stripe.products.create({
                    name: productsData[i].name,
                    description: productsData[i].description,
                    images: [
                        productsData[i].imageURL,
                    ]
                })
            );
        }

        let prices = [];
        for (let i = 0; products.length > i; i++) {
            prices.push(
                await stripe.prices.create({
                    currency: 'usd',
                    unit_amount: productsData[i].price,
                    product: products[i].id,
                })
            )
        }

        let lineItems = [];

        prices.forEach((e) => {
            lineItems.push({
                price: e.id,
                quantity: 1,
                adjustable_quantity: {enabled: true, minimum: 1, maximum: 10},
            })
        });
        const countriesArray = [
            "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT",
            "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI",
            "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY",
            "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO",
            "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC",
            "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA",
            "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ",
            "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID",
            "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP",
            "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB",
            "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD",
            "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT",
            "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL",
            "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK",
            "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU",
            "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM",
            "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF",
            "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW",
            "TZ", "UA", "UG", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU",
            "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"
        ];

        const paymentLink = await stripe.paymentLinks.create({
            line_items: lineItems,
            invoice_creation: {enabled: true},
            billing_address_collection: 'required',
            shipping_address_collection: {allowed_countries: countriesArray},
        });

        console.log(paymentLink)

        return [paymentLink.url, paymentLink.id];
    }
}

module.exports = {
    Stripe,
}