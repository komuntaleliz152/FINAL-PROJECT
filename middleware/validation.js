// Input validation middleware

// Validate procurement data
const validateProcurement = (req, res, next) => {
  const { produceName, produceType, tonnage, cost, dealerName, contact, branchName, date } = req.body;
  
  const errors = [];
  
  if (!produceName || produceName.trim() === '') {
    errors.push('Produce name is required');
  }
  
  if (!produceType || produceType.trim() === '') {
    errors.push('Produce type is required');
  }
  
  if (!tonnage || isNaN(tonnage) || parseFloat(tonnage) <= 0) {
    errors.push('Valid tonnage is required');
  }
  
  if (!cost || isNaN(cost.toString().replace(/,/g, '')) || parseFloat(cost.toString().replace(/,/g, '')) <= 0) {
    errors.push('Valid cost is required');
  }
  
  if (!dealerName || dealerName.trim() === '') {
    errors.push('Dealer name is required');
  }
  
  if (!contact || isNaN(contact) || contact.toString().length < 10) {
    errors.push('Valid contact number is required (at least 10 digits)');
  }
  
  if (!date) {
    errors.push('Date is required');
  }
  
  if (errors.length > 0) {
    return res.status(400).send(`Validation errors: ${errors.join(', ')}`);
  }
  
  next();
};

// Validate stock data
const validateStock = (req, res, next) => {
  const { produceName, produceType, tonnage, cost, sellingprice, dealerName, contact, date } = req.body;
  
  const errors = [];
  
  if (!produceName || produceName.trim() === '') {
    errors.push('Produce name is required');
  }
  
  if (!produceType || produceType.trim() === '') {
    errors.push('Produce type is required');
  }
  
  if (!tonnage || isNaN(tonnage) || parseFloat(tonnage) <= 0) {
    errors.push('Valid tonnage is required');
  }
  
  if (!cost || isNaN(cost.toString().replace(/,/g, '')) || parseFloat(cost.toString().replace(/,/g, '')) <= 0) {
    errors.push('Valid cost is required');
  }
  
  if (!sellingprice || isNaN(sellingprice.toString().replace(/,/g, '')) || parseFloat(sellingprice.toString().replace(/,/g, '')) <= 0) {
    errors.push('Valid selling price is required');
  }
  
  if (sellingprice && cost && parseFloat(sellingprice.toString().replace(/,/g, '')) < parseFloat(cost.toString().replace(/,/g, ''))) {
    errors.push('Selling price cannot be less than cost');
  }
  
  if (!dealerName || dealerName.trim() === '') {
    errors.push('Dealer name is required');
  }
  
  if (!contact || isNaN(contact) || contact.toString().length < 10) {
    errors.push('Valid contact number is required (at least 10 digits)');
  }
  
  if (!date) {
    errors.push('Date is required');
  }
  
  if (errors.length > 0) {
    return res.status(400).send(`Validation errors: ${errors.join(', ')}`);
  }
  
  next();
};

// Validate produce sale data
const validateProduceSale = (req, res, next) => {
  const { produceName, tonnage, amount, buyerName, salesAgent, saleDateTime } = req.body;
  
  const errors = [];
  
  if (!produceName || produceName.trim() === '') {
    errors.push('Produce name is required');
  }
  
  if (!tonnage || isNaN(tonnage) || parseFloat(tonnage) <= 0) {
    errors.push('Valid tonnage is required');
  }
  
  if (!amount || isNaN(amount.toString().replace(/,/g, '')) || parseFloat(amount.toString().replace(/,/g, '')) <= 0) {
    errors.push('Valid amount is required');
  }
  
  if (!buyerName || buyerName.trim() === '') {
    errors.push('Buyer name is required');
  }
  
  if (!salesAgent || salesAgent.trim() === '') {
    errors.push('Sales agent is required');
  }
  
  if (!saleDateTime) {
    errors.push('Sale date and time is required');
  }
  
  if (errors.length > 0) {
    return res.status(400).send(`Validation errors: ${errors.join(', ')}`);
  }
  
  next();
};

// Validate credit sale data
const validateCreditSale = (req, res, next) => {
  const { produceName, produceType, tonnage, buyerName, nationalId, contact, location, amountDue, dispatchDate, salesAgentName } = req.body;
  
  const errors = [];
  
  if (!produceName || produceName.trim() === '') {
    errors.push('Produce name is required');
  }
  
  if (!produceType || produceType.trim() === '') {
    errors.push('Produce type is required');
  }
  
  if (!tonnage || isNaN(tonnage) || parseFloat(tonnage) <= 0) {
    errors.push('Valid tonnage is required');
  }
  
  if (!buyerName || buyerName.trim() === '') {
    errors.push('Buyer name is required');
  }
  
  if (!nationalId || nationalId.trim() === '') {
    errors.push('National ID is required');
  }
  
  if (!contact || isNaN(contact) || contact.toString().length < 10) {
    errors.push('Valid contact number is required (at least 10 digits)');
  }
  
  if (!location || location.trim() === '') {
    errors.push('Location is required');
  }
  
  if (!amountDue || isNaN(amountDue.toString().replace(/,/g, '')) || parseFloat(amountDue.toString().replace(/,/g, '')) <= 0) {
    errors.push('Valid amount due is required');
  }
  
  if (!dispatchDate) {
    errors.push('Dispatch date is required');
  }
  
  if (!salesAgentName || salesAgentName.trim() === '') {
    errors.push('Sales agent name is required');
  }
  
  if (errors.length > 0) {
    return res.status(400).send(`Validation errors: ${errors.join(', ')}`);
  }
  
  next();
};

module.exports = {
  validateProcurement,
  validateStock,
  validateProduceSale,
  validateCreditSale
};
