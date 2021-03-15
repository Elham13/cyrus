const moment = require('moment');
const Client = require('../models/clients');
const ProspectsModal = require('../models/prospects');
const StockInwards = require('../models/stockInwards');
const ExpensesModal = require('../models/expense');


const getTotalSales = async (req, res) => {
    const Clients = await Client.find({});
    let user = null;
    if(req.user){
        user = req.user;
    }
    res.render('wp/total_sales', {clients: Clients, user: user});
}

const getTelecaling = async (req, res) => {
    const Prospects = await ProspectsModal.find({});
    let user = null;
    if(req.user){
        user = req.user;
    }
    res.render('wp/telecaling_data', {prospects: Prospects, user: user});
}

const getStockReport = async (req, res) => {
    const stockInward = await StockInwards.find({});
    let user = null;
    if(req.user){
        user = req.user;
    }
    res.render('wp/stock_reports', {
        stocks: stockInward, 
        user: user,
    });
}

const getServicesPending = async (req, res) => {
    const client = await Client.find({});

    client.forEach(customer => {
        const next = new Date(customer.nextDates[customer.nextDates.length - 1]).toLocaleDateString();
        const now = new Date().toLocaleDateString();
        if(next == now){
            const fun = async () => {
                await Client.findOneAndUpdate({_id: customer._id}, {serviceStatus: "Pending"})
            }
            fun();
        }
    });

    let user = null;
    if(req.user){
        user = req.user;
    }
    res.render('wp/no_of_services_pending', {user: user, clients: client});
}
const getExpenses = async (req, res) => {
    const Expenses = await ExpensesModal.find({});
    let user = null;
    if(req.user){
        user = req.user;
    }
    res.render('wp/expenses', {expenses: Expenses, user: user});
}

const getShowSingleCust = (req, res) => {
    let user = null;
    if(req.user){
        user = req.user;
    }
    res.render('wp/single_customer', {singleClient: null, user: user})
}

const postWaterPurifier = async (req, res) => {
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

// ----------------------------------Next date Calculations---------------------------------------------------
console.log(moment(instDate).add(3, 'months'))
// ----------------------------------Next date Calculations---------------------------------------------------
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
        nextDates: [moment(instDate).add(3, 'months').format()],
    }

    const addClient = new Client(newClient);
    await addClient.save();
    if (req.body) res.redirect('/wpTotalSales')
}

const postProspects = async (req, res) => {
    const { creatorName, custName, phNumber, city, address, execName, remarks, radioBtn, followDate } = req.body;
    const newProspect = {
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

    const addProspect = new ProspectsModal(newProspect);
    await addProspect.save();
    res.redirect('/wpTelecaling');
}

const postStockInwards = async (req, res) => {
    const { creatorName, prodName, noOfProd } = req.body;

    const newStockInward = {
        creatorName: creatorName,
        productName: prodName.toUpperCase(),
        numberOfProducts: noOfProd,
    }

    const addStockInward = new StockInwards(newStockInward);
    await addStockInward.save();
    res.redirect('/wpStockReport');
}

const postStockOutwards = async (req, res) => {
    const { creatorName, prodName, noOfProd, clientName, clientPhNo, technicianName } = req.body;
    const stocks = await StockInwards.findOne({productName: prodName.toUpperCase()});
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
        await StockInwards.findOneAndUpdate({productName: prodName.toUpperCase()}, {$set: {stockOutward: outward}})

        if(stocks.stockOutward.length > 0){
            var sum = 0;
            stocks.stockOutward.forEach(out => {
                sum += parseInt(out.numberOfProducts);
            });
            stocks.numberOfProductsDifference = sum + parseInt(noOfProd);
            await stocks.save();
        }
    }
    res.redirect('/wpStockReport');
}


const postServicePending = async (req, res) => {
    const {id, status} = req.body;
    const customer = await Client.findById(id);
    customer.serviceStatus = status;
    const latestDate = new Date(customer.nextDates[customer.nextDates.length - 1])
    const threeMonthsLater = moment(latestDate).add(3, 'months').format();
    if(status == "Completed"){
        customer.nextDates = [...customer.nextDates, threeMonthsLater];
    }
    await customer.save();
    res.redirect('/wpServicesPending');
}


const postExpenses = async (req, res) => {
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

    const addExpense = new ExpensesModal(newExpense);
    await addExpense.save();
    res.redirect('/wpExpenses');
}

const postCheciEMI = async (req, res) => {
    const {id} = req.body; 
    let user = null;
    if(req.user){
        user = req.user
    }

    const client = await Client.findById(id);
    res.render('wp/emi', {person: client, user: user});
}

const postFirstPayment = async (req, res) => {
    const {id, firstPayment, firstPaymentDate, paidDate} = req.body;
    const client = await Client.findById(id);
    client.firstPayment = firstPayment;
    client.firstPaidDate = paidDate;
    client.firstPaymentDate = firstPaymentDate;
    await client.save();
    res.redirect('/wpTotalSales');
}

const postSecondPayment = async (req, res) => {
    const {id, paidDate, secondPayment, secondPaymentDate } = req.body;
    const client = await Client.findById(id);
    client.secondPayment = secondPayment;
    client.secondPaidDate = paidDate;
    client.secondPaymentDate = secondPaymentDate;
    await client.save();
    res.redirect('/wpTotalSales');
}

const postThirPayment = async (req, res) => {
    const {id, paidDate, thirdPayment } = req.body;
    const client = await Client.findById(id);
    client.thirdPayment = thirdPayment;
    client.thirdPaidDate = paidDate;
    await client.save();
    res.redirect('/wpTotalSales');
}

const postShowSingleCust = async (req, res) => {
    const {id} = req.body;
    const client = await Client.findById(id);
    res.render('wp/single_customer', {singleClient: client, user: req.user});
}

const postUpdateServices = async (req, res) => {
    const {id, index, complain} = req.body;

    // Add it to completed services
    const services = {
        complainDetail: complain,
        status: "Complete",
    };
    const customerFound = await Client.findOne({_id: id});
    let custServices = customerFound.completedServices;
    custServices = [...custServices, services];
    await Client.findOneAndUpdate({_id: id}, {$set: {completedServices: custServices}});

    // Remove it from pending services
    Client.updateOne({ _id: id }, { "$pull": { "pendingServices": { "complainDetail": complain } }}, { safe: true, multi:true }, function(err, obj) {
        res.redirect('/wpTotalSales');
    });
}

const posteditRemark = async (req, res) => {
    const {id, remark} = req.body;
    const telecalingDate = await ProspectsModal.findById(id);

    const now = new Date().toLocaleDateString();
    if(telecalingDate.remarks == ''){
        telecalingDate.remarks = '('+now+')'+remark;
    }else{
        telecalingDate.remarks = '('+now+')'+remark+'. '+telecalingDate.remarks;
    }
    await telecalingDate.save();
    res.redirect('/wpTelecaling');
}

const posteditStatus = async (req, res) => {
    const {id, status, followDate} = req.body;
    const telecalingDate = await ProspectsModal.findById(id);
    if(status == 'FollowUp'){
        telecalingDate.status = 'follow-up';
        telecalingDate.followUpDate = followDate;
    }else{
        telecalingDate.status = 'not-interrested';
        telecalingDate.followUpDate = null;
    }
    await telecalingDate.save();
    res.redirect('wpTelecaling');
}

const postAddMoreProduct = async (req, res) => {
    const {addMoreProduct, id} = req.body;
    const stock = await StockInwards.findById(id);
    var prevNoOfProd = parseInt(stock.numberOfProducts);
    stock.numberOfProducts = prevNoOfProd + parseInt(addMoreProduct);
    await stock.save();
    res.redirect('/wpStockReport');
}

const postEmiPaymentStatus = async (req, res) => {
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


    const customer = await Client.findById(id);
    if(firstPaymentStatus){
        if(firstPaymentStatus == 'Paid'){
            customer.firstPaymentStatus = firstPaymentStatus;
            customer.firstPaidAmount = firstPaidAmount;
            customer.firstPaidDate = firstPaidDate;
            customer.firstNextPaymentDate = moment(firstPaidDate).add(1, 'months').format();
            await customer.save();
            res.redirect('/solarTotalSales')
        }
    }
    if(secondPaymentStatus){
        if(secondPaymentStatus == 'Paid'){
            customer.secondPaymentStatus = secondPaymentStatus;
            customer.secondPaidAmount = secondPaidAmount;
            customer.secondPaidDate = secondPaidDate;
            customer.secondNextPaymentDate = moment(secondPaidDate).add(1, 'months').format();
            await customer.save();
            res.redirect('/solarTotalSales')
        }
    }
    if(thirdPaymentStatus){
        if(thirdPaymentStatus == 'Paid'){
            customer.thirdPaymentStatus = thirdPaymentStatus;
            customer.thirdPaidAmount = thirdPaidAmount;
            customer.thirdPaidDate = thirdPaidDate;
            await customer.save();
            res.redirect('/solarTotalSales')
        }
    }
    
} 


module.exports = {
    getTotalSales,
    getTelecaling,
    getStockReport,
    getServicesPending,
    getExpenses,
    getShowSingleCust,
    postWaterPurifier,
    postProspects,
    postStockInwards,
    postStockOutwards,
    postServicePending,
    postExpenses,
    postCheciEMI,
    postFirstPayment,
    postSecondPayment,
    postThirPayment,
    postShowSingleCust,
    postUpdateServices,
    posteditRemark,
    posteditStatus,
    postAddMoreProduct,
    postEmiPaymentStatus,
};