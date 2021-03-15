const moment = require('moment');
const SolarExpenses = require('../models/solarExpense');
const SolarStockInwards = require('../models/solarStockInwards');
const solarStockInwards = require('../models/solarStockInwards');
const SolarTotalSales = require('../models/solarTotalSales');
const SolarTelecalingData = require('../models/solarTelecalingData');


const getSolarTotalSales = async(req, res) => {
    const totalSales = await SolarTotalSales.find({});
    let user = null
    if(req.user){
        user = req.user
    }
    res.render('solar/total_sales', {total: totalSales, user: user})
}

const getSolarExpenses = async (req, res) => {
    const Expenses = await SolarExpenses.find({});
    let user = null;
    if(req.user){
        user = req.user
    }
    res.render('solar/expenses', {expenses: Expenses, user: user});
}

const getSolarStockReports = async (req, res) => { 
    const stockInward = await SolarStockInwards.find({});
    let user = null;
    if(req.user){
        user = req.user;
    }
    res.render('solar/stock_reports', {
        stocks: stockInward, 
        user: user,
    });
}

const getSolarTelecaling = async(req, res) => { 
    const TelecalingData = await SolarTelecalingData.find({});
    let user = null;
    if(req.user){
        user = req.user;
    }
    res.render('solar/telecaling_data', {prospects: TelecalingData, user: user});
}

const postSolarExpense = async (req, res) => {
    const { date, creatorName, execName, amount, purpose, remark, paymentMode } = req.body; 
    const newExpense = {
        expenseDate: date,
        creatorName: creatorName,
        executiveName: execName,
        amount: amount,
        purpose: purpose,
        remark: remark,
        paymentMode: paymentMode,
    }

    const addExpense = new SolarExpenses(newExpense);
    await addExpense.save();
    res.redirect('/solarExpenses');
}

const postTotalSales = async (req, res) => { 
    const { 
        custId,
        creatorName,
        custName, 
        prodName,
        reference,
        phNumber,
        phNumber1,
        address, 
        instDate, 
        instExec, 
        amount,
        paymentMode,
        accNo,
        branchName,
        chequeNo,
        chequeDate,
        remarks,
        emi, 
        advAmount, 
        duration 
    } = req.body;

    let boolEmi = true;
    emi == 'on' ? boolEmi = true : boolEmi = false;

    const newClient = {
        customerId: custId,
        creatorName: creatorName,
        customerName: custName,
        productName: prodName,
        reference: reference,
        phoneNumber: phNumber,
        alternatePhoneNumber: phNumber1,
        address: address,
        installationDate: instDate,
        installationExecutive: instExec,
        amount: amount,
        paymentMode: paymentMode,
        accNo: accNo,
        branchName: branchName,
        chequeNo: chequeNo,
        chequeDate: chequeDate,
        remarks: remarks,
        emi: boolEmi,
        advancePayment: advAmount,
        duration: duration,
    }

    const addClient = new SolarTotalSales(newClient);
    await addClient.save();
    if (req.body) res.redirect('/solarTotalSales')
}

const postSolarStockInward = async (req, res) => { 
    const { creatorName, prodName, noOfProd } = req.body;
    const newStockInward = {
        creatorName: creatorName,
        productName: prodName.toUpperCase(),
        numberOfProducts: noOfProd,
    }
    const addStockInward = new SolarStockInwards(newStockInward);
    await addStockInward.save();
    res.redirect('/solarStockReports');
}


const postSolarStockOutward = async (req, res) => { 
    const { creatorName, prodName, noOfProd, clientName, clientPhNo, technicianName } = req.body;
    const stocks = await solarStockInwards.findOne({productName: prodName.toUpperCase()});
    if(stocks !== null){
        const newStockOutward = {
            creatorName: creatorName, 
            productName: prodName.toUpperCase(),
            numberOfProducts: noOfProd,
            clientName: clientName,
            clientNumber: clientPhNo,
            technicianName: technicianName,
        }
        let outward = stocks.stockOutward;
        outward = [...outward, newStockOutward];
        await solarStockInwards.findOneAndUpdate({productName: prodName.toUpperCase()}, {$set: {stockOutward: outward}})

        if(stocks.stockOutward.length > 0){
            var sum = 0;
            stocks.stockOutward.forEach(out => {
                sum += parseInt(out.numberOfProducts);
            });
            stocks.numberOfProductsDifference = sum + parseInt(noOfProd);
            await stocks.save();
        }
    }
    res.redirect('/solarStockReports');
}

const postSolarCehckEmi =  async (req, res) => { 
    const {id} = req.body;
    let user = null;
    if(req.user){
        user = req.user
    }
    const client = await SolarTotalSales.findById(id);
    res.render('solar/solar_emi', {person: client, user: user});
}

const postSolarTelecaling = async (req, res) => {
    const { creatorName, custName, phNumber, city, address, execName, remarks, radioBtn, followDate } = req.body;
    const telecalingDataObject = {
        customerName: custName,
        creatorName: creatorName,
        phoneNumber: phNumber,
        city: city,
        address: address,
        executiveName: execName,
        remarks: remarks,
        status: radioBtn,
        followUpDate: followDate
    }

    const newTelecalingData = new SolarTelecalingData(telecalingDataObject);
    await newTelecalingData.save();
    res.redirect('/solarTelecaling');
}

const postShowSolarSingleCust = async (req, res) => {
    const {id} = req.body;
    const client = await SolarTotalSales.findById(id);
    res.render('solar/single_customer', {singleClient: client, user: req.user});
}

const postSolarEditRemark = async (req, res) => {
    const {id, remark} = req.body;
    const telecalingDate = await SolarTelecalingData.findById(id);

    const now = new Date().toLocaleDateString();
    if(telecalingDate.remarks == ''){
        telecalingDate.remarks = '('+now+')'+remark;
    }else{
        telecalingDate.remarks = '('+now+')'+remark+'. '+telecalingDate.remarks;
    }
    await telecalingDate.save();
    res.redirect('/solarTelecaling');
}

const postSolarEditStatus = async (req, res) => {
    const {id, status, followDate} = req.body;
    const telecalingDate = await SolarTelecalingData.findById(id);
    if(status == 'FollowUp'){
        telecalingDate.status = 'follow-up';
        telecalingDate.followUpDate = followDate;
    }else{
        telecalingDate.status = 'not-interrested';
        telecalingDate.followUpDate = null;
    }
    await telecalingDate.save();
    res.redirect('solarTelecaling');
}

const postSolarAddMoreProduct = async (req, res) => {
    const {addMoreProduct, id} = req.body;
    const stock = await solarStockInwards.findById(id);
    var prevNoOfProd = parseInt(stock.numberOfProducts);
    stock.numberOfProducts = prevNoOfProd + parseInt(addMoreProduct);
    await stock.save();
    res.redirect('/solarStockReports');
}

const postSolarEmiPaymentStatus = async (req, res) => {
    let {id, 
        firstPaidAmount, 
        firstPaidDate, 
        firstPaymentStatus,
        secondPaidAmount,
        secondPaidDate,
        secondPaymentStatus,
        thirdPaidAmount,
        thirdPaidDate,
        thirdPaymentStatus,
    } = req.body;

    firstPaidDate = new Date(firstPaidDate);
    secondPaidDate = new Date(secondPaidDate);
    thirdPaidDate = new Date(thirdPaidDate);


    const customer = await SolarTotalSales.findById(id);
    if(firstPaymentStatus){
        if(firstPaymentStatus == 'Paid'){
            customer.firstPaymentStatus = firstPaymentStatus;
            customer.firstPaidAmount = firstPaidAmount;
            customer.firstPaidDate = firstPaidDate;
            customer.firstNextPaymentDate = moment(firstPaidDate).add(1, 'months').format();
            await customer.save();
            res.redirect('/wpTotalSales')
        }
    }
    if(secondPaymentStatus){
        if(secondPaymentStatus == 'Paid'){
            customer.secondPaymentStatus = secondPaymentStatus;
            customer.secondPaidAmount = secondPaidAmount;
            customer.secondPaidDate = secondPaidDate;
            customer.secondNextPaymentDate = moment(secondPaidDate).add(1, 'months').format();
            await customer.save();
            res.redirect('/wpTotalSales')
        }
    }
    if(thirdPaymentStatus){
        if(thirdPaymentStatus == 'Paid'){
            customer.thirdPaymentStatus = thirdPaymentStatus;
            customer.thirdPaidAmount = thirdPaidAmount;
            customer.thirdPaidDate = thirdPaidDate;
            await customer.save();
            res.redirect('/wpTotalSales')
        }
    }
        
}

module.exports = {
    getSolarTotalSales,
    getSolarTelecaling,
    getSolarExpenses,
    getSolarStockReports,
    postSolarExpense,
    postSolarStockInward,
    postSolarStockOutward,
    postTotalSales,
    postSolarCehckEmi,
    postSolarTelecaling,
    postShowSolarSingleCust,
    postSolarEditRemark,
    postSolarEditStatus,
    postSolarAddMoreProduct,
    postSolarEmiPaymentStatus,
}