const SolarExpenses = require('../models/solarExpense');
const SolarStockInwards = require('../models/solarStockInwards');
const SolarStockOutwards = require('../models/solarStockOutwards');
const solarStockInwards = require('../models/solarStockInwards');
const SolarTotalSales = require('../models/solarTotalSales');
const solarStockOutwards = require('../models/solarStockOutwards');
const SolarTelecalingData = require('../models/solarTelecalingData')

// ----------------------------Helper function----------------------------------------
const getLowStockReport = (inStock, outStock) => {
    
    const inCardNoOfProd = inStock[0].numberOfProducts;
    const outCardNoOfProd = outStock.map(out => {return out.numberOfProducts})
    var outCardNoOfProdSum = 0
    outCardNoOfProd.forEach(number => {
        outCardNoOfProdSum += number
    })

    var lowStock;
    if((inCardNoOfProd - outCardNoOfProdSum) <= 10){
        lowStock = {
            productName: inStock[0].productName,
            numberOfProducts: inCardNoOfProd - outCardNoOfProdSum
        }
    }
    return lowStock
}
// ----------------------------Helper function----------------------------------------

const getSolarTotalSales = async(req, res) => {
    const totalSales = await SolarTotalSales.find({});
    res.render('solar/total_sales', {total: totalSales, user: req.user})
}

const getSolarExpenses = async (req, res) => {
    const Expenses = await SolarExpenses.find({});
    res.render('solar/expenses', {expenses: Expenses, user: req.user});
}

const getSolarStockReports = async (req, res) => {
    const StockInward = await SolarStockInwards.find({});
    const Outwards = await SolarStockOutwards.find({});

    // const inCard = await SolarStockInwards.find({productName: 'Card'});
    // const outCard = await SolarStockOutwards.find({productName: 'Card'});
    // const cardLowStock = getLowStockReport(inCard, outCard);

    // const inPaper = await solarStockInwards.find({productName: 'Paper'});
    // const outPaper = await SolarStockOutwards.find({productName: 'Paper'});
    // const paperLowStock = getLowStockReport(inPaper, outPaper);

    res.render('solar/stock_reports', {
        stocks: StockInward, 
        outwards: Outwards,
        // cardLowStock: cardLowStock,
        // paperLowStock: paperLowStock,
        user: req.user
    });
}

const getSolarTelecaling = async(req, res) => {
    const TelecalingData = await SolarTelecalingData.find({})
    res.render('solar/telecaling_data', {prospects: TelecalingData, user: req.user})
}

const postSolarExpense = async (req, res) => {
    const { date, execName, amount, purpose, paymentMode } = req.body;

    const newSolarExpense = {
        expenseDate: date,
        executiveName: execName,
        amount: amount,
        purpose: purpose,
        paymentMode: paymentMode,
    }

    const addSolarExpense = new SolarExpenses(newSolarExpense);
    await addSolarExpense.save();
    res.redirect('/solarExpenses');
}

const postTotalSales = async (req, res) => {
    const { custName, phNumber, address, instDate, instExec, amount, emi, advAmount, duration } = req.body;
    let boolEmi = true;
    emi == 'on' ? boolEmi = true : boolEmi = false;
    const newClient = {
        customerName: custName,
        phoneNumber: phNumber,
        address: address,
        installationDate: instDate,
        installationExecutive: instExec,
        amount: amount,
        emi: boolEmi,
        advancePayment: advAmount,
        duration: duration,
    }

    const addClient = new SolarTotalSales(newClient);
    await addClient.save();
    if (req.body) res.redirect('/solarTotalSales')
}

const postSolarStockInward = async (req, res) => {
    const { prodName, noOfProd } = req.body;
    const newStockInward = {
        productName: prodName,
        numberOfProducts: noOfProd,
    }

    const addStockInward = new SolarStockInwards(newStockInward);
    await addStockInward.save();
    res.redirect('/solarStockReports');
}


const postSolarStockOutward = async (req, res) => {
    const { prodName, noOfProd, clientName, clientPhNo } = req.body;
    const newStockOutward = {
        productName: prodName,
        numberOfProducts: noOfProd,
        clientName: clientName,
        clientNumber: clientPhNo
    }

    const addStockOutward = new solarStockOutwards(newStockOutward);
    await addStockOutward.save();
    res.redirect('/solarStockReports');
}

const postSolarCehckEmi =  async (req, res) => {
    const {id} = req.body;

    const client = await SolarTotalSales.findById(id);
    res.render('solar/solar_emi', {person: client, user: req.user});
}

const postSolarTelecaling = async (req, res) => {
    const { custName, phNumber, city, address, execName, remarks, radioBtn, followDate } = req.body;
    const newProspect = {
        customerName: custName,
        phoneNumber: phNumber,
        city: city,
        address: address,
        executiveName: execName,
        remarks: remarks,
        status: radioBtn,
        followUpDate: followDate
    }

    const addProspect = new SolarTelecalingData(newProspect);
    await addProspect.save();
    res.redirect('/solarTelecaling');
}

module.exports = {
    getSolarTotalSales,
    getSolarTelecaling,
    getSolarExpenses,
    postSolarExpense,
    getSolarStockReports,
    postSolarStockInward,
    postSolarStockOutward,
    postTotalSales,
    postSolarCehckEmi,
    postSolarTelecaling,
}