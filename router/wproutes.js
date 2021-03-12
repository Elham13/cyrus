const Client = require('../models/clients');
const ProspectsModal = require('../models/prospects');
const StockInwards = require('../models/stockInwards');
const StockOutwardsModal = require('../models/stockOutwards');
const ServicesPendingModal = require('../models/servicesPending');
const ExpensesModal = require('../models/expense');
const stockInwards = require('../models/stockInwards');


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
    const stockOutard = await StockOutwardsModal.find({});
    var availableStocks = [];

    console.log('in: ', stockInward)
    console.log('out: ', stockOutard)
    // Stock Availble Calculation
    // if(stockInward.length && stockOutard.length){
    //     for(let i=0; i<stockInward.length; i++){
    //         for(let j=0; j<stockOutard.length; j++){
    //             // console.log( stockOutard[j].productName);
    //             if(stockOutard[j].productName == stockInward[j].productName){
    //                 availableStocks.push(stockInward[j]);
    //             }
    //         }
    //         break;
    //     }
    // }
    // console.log(availableStocks.map(inward => {
    //     stockOutard.map(outward => {
    //         return inward.numberOfProducts - outward.numberOfProducts;
    //     })
    // }));
    // Stock Availble Calculation

    let user = null;
    if(req.user){
        user = req.user;
    }
    res.render('wp/stock_reports', {
        stocks: stockInward, 
        outwards: stockOutard,
        user: user,
    });
}
const getServicesPending = async (req, res) => {
    const ServicesPending = await Client.find({$or:[{"pendingServices.0": {"$exists": true}}, {"completedServices.0": {"$exists": true}}]});
    let user = null;
    if(req.user){
        user = req.user;
    }
    res.render('wp/no_of_services_pending', {services: ServicesPending, user: user});
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
    const newStockOutward = {
        creatorName: creatorName, 
        productName: prodName.toUpperCase(),
        numberOfProducts: noOfProd,
        clientName: clientName,
        clientNumber: clientPhNo,
        technicianName: technicianName,
    }

    const addStockOutward = new StockOutwardsModal(newStockOutward);
    await addStockOutward.save();
    res.redirect('/wpStockReport');
}


const postServicePending = async (req, res) => {
    const { custId, complainDetail, status } = req.body;
    // const customer = await Client.findOne({customerId: custId});

    if(status == "Pending"){
        const services = {
            complainDetail: complainDetail,
            status: status,
        };
        const customerFound = await Client.findOne({customerId: custId});
        let custServices = customerFound.pendingServices;
        custServices = [...custServices, services];
        await Client.findOneAndUpdate({customerId: custId}, {$set: {pendingServices: custServices}});
        res.redirect('/wpServicesPending');
    }else{
        const services = {
            complainDetail: complainDetail,
            status: status,
        };
        const customerFound = await Client.findOne({customerId: custId});
        let custServices = customerFound.completedServices;
        custServices = [...custServices, services];
        await Client.findOneAndUpdate({customerId: custId}, {$set: {completedServices: custServices}});
        res.redirect('/wpServicesPending');
    }
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

    const client = await Client.findById(id);
    res.render('wp/emi', {person: client, user: req.user});
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
};