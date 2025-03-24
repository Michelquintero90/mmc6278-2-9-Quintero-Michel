const axios = require('axios');

const getMotivationalQuote = async () => {
    try {
        const response = await axios.get('https://zenquotes.io/api/random');
        const quote = response.data[0]; 
        return `${quote.q} - ${quote.a}`; 
    } catch (error) {
        console.error('Error getting the quote:', error);
        return 'Stay motivated and keep going.'; 
    }
};

module.exports = { getMotivationalQuote };