const Client = require('../models/clients');
const ProspectsModal = require('../models/prospects');
const StockInwards = require('../models/stockInwards');
const StockOutwardsModal = require('../models/stockOutwards');
const ServicesPendingModal = require('../models/servicesPending');
const ExpensesModal = require('../models/expense');


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


const getTotalSales = async (req, res) => {
    const Clients = await Client.find({});
    res.render('wp/total_sales', {clients: Clients, user: req.user});
}
const getTelecaling = async (req, res) => {
    const Prospects = await ProspectsModal.find({});
    res.render('wp/telecaling_data', {prospects: Prospects, user: req.user});
}
const getStockReport = async (req, res) => {
    const StockInwardsFound = await StockInwards.find({});
    const Outwards = await StockOutwardsModal.find({});

    // let cardLowStock, paperLowStock;
    // if(StockInwards.length > 0 && Outwards.length > 0){
    //     const inCard = await StockInwards.find({productName: 'Card'});
    //     const outCard = await StockOutwardsModal.find({productName: 'Card'});
    //     cardLowStock = getLowStockReport(inCard, outCard);

    //     const inPaper = await StockInwards.find({productName: 'Paper'});
    //     const outPaper = await StockOutwardsModal.find({productName: 'Paper'});
    //     paperLowStock = getLowStockReport(inPaper, outPaper);
    // }    

    res.render('wp/stock_reports', {
        stocks: StockInwardsFound, 
        outwards: Outwards,
        // cardLowStock: cardLowStock,
        // paperLowStock: paperLowStock,
        user: req.user,
    });
}
const getServicesPending = async (req, res) => {
    const ServicesPending = await ServicesPendingModal.find({});
    res.render('wp/no_of_services_pending', {services: ServicesPending, user: req.user});
}
const getExpenses = async (req, res) => {
    const Expenses = await ExpensesModal.find({});
    res.render('wp/expenses', {expenses: Expenses, user: req.user});
}

const postWaterPurifier = async (req, res) => {
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

    const addClient = new Client(newClient);
    await addClient.save();
    if (req.body) res.redirect('/wpTotalSales')
}

const postProspects = async (req, res) => {
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

    const addProspect = new ProspectsModal(newProspect);
    await addProspect.save();
    res.redirect('/wpTelecaling');
}

const postStockInwards = async (req, res) => {
    const { prodName, noOfProd } = req.body;
    const newStockInward = {
        productName: prodName,
        numberOfProducts: noOfProd,
    }

    const addStockInward = new StockInwards(newStockInward);
    await addStockInward.save();
    res.redirect('/wpStockReport');
}

const postStockOutwards = async (req, res) => {
    const { prodName, noOfProd, clientName, clientPhNo } = req.body;
    const newStockOutward = {
        productName: prodName,
        numberOfProducts: noOfProd,
        clientName: clientName,
        clientNumber: clientPhNo
    }

    const addStockOutward = new StockOutwardsModal(newStockOutward);
    await addStockOutward.save();
    res.redirect('/wpStockReport');
}


const postServicePending = async (req, res) => {
    const { custName, phNumber, city,  address, instDate, instExec, complainDetail, status } = req.body;
    const newServicePending = {
        customerName: custName,
        phoneNumber: phNumber,
        city: city,
        address: address,
        installationDate: instDate,
        installationExecutive: instExec,
        complainDetail: complainDetail,
        status: status
    }

    const addServicesPending = new ServicesPendingModal(newServicePending);
    await addServicesPending.save();
    res.redirect('/wpServicesPending');
}


const postExpenses = async (req, res) => {
    const { date, execName, amount, purpose, paymentMode } = req.body;
    const newExpense = {
        expenseDate: date,
        executiveName: execName,
        amount: amount,
        purpose: purpose,
        paymentMode: paymentMode,
    }

    const addExpense = new ExpensesModal(newExpense);
    await addExpense.save();
    res.redirect('/wpExpenses');
}

const postCheciEMI = async (req, res) => {
    const {id} = req.body;

    const client = await Client.findById(id);
    res.render('emi', {person: client, user: req.user});
}


module.exports = {
    getTotalSales,
    getTelecaling,
    getStockReport,
    getServicesPending,
    getExpenses,
    postWaterPurifier,
    postProspects,
    postStockInwards,
    postStockOutwards,
    postServicePending,
    postExpenses,
    postCheciEMI,
};