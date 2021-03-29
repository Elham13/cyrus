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

const getShowSolarSingleCust = async (req, res) => {
    const {id} = req.params;
    let user = null;
    if(req.user){
        user = req.user
    }
    const client = await SolarTotalSales.findById(id);
    res.render('solar/single_customer', {singleClient: client, user: user});
}

const getSolarServicesPending = async (req, res) => {
    const client = await SolarTotalSales.find({});

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
    res.render('solar/service_pending', {user: user, clients: client});
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
        firstNextPaymentDate: moment(instDate).add(2, 'months').format(),
        firstEmiDate: moment(instDate).add(1, 'months').format(),
        secondEmiDate: moment(instDate).add(2, 'months').format(),
        thirdEmiDate: moment(instDate).add(3, 'months').format(),
        advancePayment: advAmount,
        duration: duration,
        nextDates: [moment(instDate).add(3, 'months').format()],
        services: [{
            DueServiceDate: moment(instDate).add(3, 'months').format(),
            ServiceStatus: "Pending",
            ServicingDate: "",
            ServiceNextDate: "",
            ServicingExecutive: '',
            ServicingRemark: '',
        }],
    }

    const addClient = new SolarTotalSales(newClient);
    await addClient.save();
    if (req.body) res.redirect('/solarTotalSales')
}

const postSolarStockInward = async (req, res) => { 
    const { creatorName, prodName, noOfProd, remark } = req.body;
    const newStockInward = {
        creatorName: creatorName,
        productName: prodName.toUpperCase(),
        numberOfProducts: noOfProd,
        remark: remark,
    }
    const addStockInward = new SolarStockInwards(newStockInward);
    await addStockInward.save();
    res.redirect('/solarStockReports');
}


const postSolarStockOutward = async (req, res) => { 
    const { creatorName, prodName, noOfProd, clientName, clientPhNo, technicianName, remark } = req.body;
    const stocks = await SolarStockInwards.findOne({productName: prodName.toUpperCase()});
    if(stocks !== null){
        const newStockOutward = {
            creatorName: creatorName, 
            productName: prodName.toUpperCase(),
            numberOfProducts: noOfProd,
            clientName: clientName,
            clientNumber: clientPhNo,
            technicianName: technicianName,
            remark: remark,
        }
        let outward = stocks.stockOutward;
        outward = [...outward, newStockOutward]; 

        await SolarStockInwards.findOneAndUpdate({productName: prodName.toUpperCase()}, {$set: {stockOutward: outward}})

        var sum = 0;
        stocks.stockOutward.forEach(out => {
            sum += parseInt(out.numberOfProducts);
        });
        stocks.numberOfProductsDifference = sum + parseInt(noOfProd);
        await stocks.save();
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
        firstPaidAmountOptional,
        firstPaidDate,
        firstPaidDateOptional,
        firstPaymentStatus,
        firstPaymentMode,
        secondPaidAmount,
        secondPaidAmountOptional,
        secondPaidDate,
        secondPaidDateOptional,
        secondPaymentMode,
        secondPaymentStatus,
        thirdPaidAmount,
        thirdPaidAmountOptional,
        thirdPaymentMode,
        thirdPaidDate,
        thirdPaidDateOptional,
        thirdPaymentStatus,
        totalOutstanding1, 
        totalOutstanding2,
        totalOutstanding3,
    } = req.body;

    const customer = await SolarTotalSales.findById(id);

    firstPaidDate = new Date(firstPaidDate);
    secondPaidDate = new Date(secondPaidDate);
    thirdPaidDate = new Date(thirdPaidDate);


    if(firstPaymentStatus){
        if(firstPaymentStatus == 'Paid'){
            if(customer.dueAmountsCleared1){
                customer.dueAmountsCleared2 = null;
                customer.dueAmountsCleared3 = null;
            }
            if(totalOutstanding1 !== undefined){
                if(totalOutstanding1 == "on"){
                    customer.dueAmountsCleared1 = true;
                }
            }
            customer.firstPaymentStatus =  firstPaymentStatus;
            customer.firstPaidAmount = firstPaidAmountOptional !== "" ? firstPaidAmountOptional : firstPaidAmount;
            customer.firstPaidDate = firstPaidDateOptional !== "" ? firstPaidDateOptional : firstPaidDate;
            customer.firstNextPaymentDate = moment(customer.installationDate).add(2, "months").format();
            customer.firstPaymentMode = firstPaymentMode;
            await customer.save();
            res.redirect(`/showSolarSingleCust/${id}`)
        }
    }
    if(secondPaymentStatus){
        if(secondPaymentStatus == 'Paid'){
            if(customer.dueAmountsCleared2){
                customer.dueAmountsCleared3 = null;
            }
            if(totalOutstanding2 !== undefined){
                if(totalOutstanding2 == "on"){
                    customer.dueAmountsCleared2 = true;
                }
            }
            customer.secondPaymentStatus = secondPaymentStatus;
            customer.secondPaidAmount = secondPaidAmountOptional !== "" ? secondPaidAmountOptional : secondPaidAmount;
            customer.secondPaidDate = secondPaidDateOptional !== "" ? secondPaidDateOptional : secondPaidDate;
            customer.secondNextPaymentDate = moment(customer.installationDate).add(3, "months").format();
            customer.secondPaymentMode = secondPaymentMode;
            await customer.save();
            res.redirect(`/showSolarSingleCust/${id}`)
        }
    }
    if(thirdPaymentStatus){
        if(thirdPaymentStatus == 'Paid'){
            if(totalOutstanding3 !== undefined){
                if(totalOutstanding3 == "on"){
                    customer.dueAmountsCleared3 = true;
                }
            }
            customer.thirdPaymentStatus = thirdPaymentStatus;
            customer.thirdPaidAmount = thirdPaidAmountOptional !== "" ? thirdPaidAmountOptional : thirdPaidAmount;
            customer.thirdPaidDate = thirdPaidDateOptional !== "" ? thirdPaidDateOptional : thirdPaidDate;
            customer.thirdPaymentMode = thirdPaymentMode;
            await customer.save();
            res.redirect(`/showSolarSingleCust/${id}`)
        }
    }
    
        
}

const postSolarDeletClient = async (req, res) => {
    await SolarTotalSales.findByIdAndDelete(req.body.id);
    res.redirect('/solarTotalSales');
}

const postSolarEditService = async (req, res) => {
    const {id, status, serviceExec, serviceDate, remark} = req.body;
    const customer = await SolarTotalSales.findById(id);
    if(customer.services.length == 1){
        const newService = {
            DueServiceDate: moment(customer.services[0].DueServiceDate).format(),
            ServiceStatus: status,
            ServicingDate: moment(serviceDate).format(),
            ServiceNextDate: moment(serviceDate).add(3, "months").format(),
            ServicingExecutive: serviceExec,
            ServicingRemark: remark,
        }
        customer.services = [newService];

        const newService2 = {
            DueServiceDate: moment(customer.services[0].ServiceNextDate).format(),
            ServiceStatus: "Pending",
            ServicingDate: '',
            ServiceNextDate: '',
            ServicingExecutive: "",
            ServicingRemark: "",
        }
        customer.services = [...customer.services, newService2];
        await customer.save(); 
        if(req.originalUrl == "/solarEditService"){
            res.redirect(`/showSolarSingleCust/${id}`);
        }
        if(req.originalUrl == "/solarEditService1"){
            res.redirect(`/solarServicesPending`);
        }
    }else{
        const newService = {
            DueServiceDate: moment(customer.services[customer.services.length - 2].DueServiceDate).add(3, 'months').format(),
            ServiceStatus: status,
            ServicingDate: moment(serviceDate).format(),
            ServiceNextDate: moment(serviceDate).add(3, "months").format(),
            ServicingExecutive: serviceExec,
            ServicingRemark: remark,
        }
        customer.services[customer.services.length - 1] = newService;

        const newService2 = {
            DueServiceDate: moment(customer.services[customer.services.length - 1].ServiceNextDate).format(),
            ServiceStatus: "Pending",
            ServicingDate: '',
            ServiceNextDate: '',
            ServicingExecutive: "",
            ServicingRemark: "",
        }
        customer.services = [...customer.services, newService2];
        await customer.save();
        if(req.originalUrl == "/solarEditService"){
            res.redirect(`/showSolarSingleCust/${id}`);
        }
        if(req.originalUrl == "/solarEditService1"){
            res.redirect(`/solarServicesPending`);
        }
    }
}

const postSolarDeleteTelecaling = async (req, res) => {
    await SolarTelecalingData.findByIdAndDelete(req.body.id);
    res.redirect('/solarTelecaling');
}

const postSolarDeleteStockInward = async (req, res) => {
    await SolarStockInwards.findByIdAndDelete(req.body.id);
    res.redirect('/solarStockReports');
}

const postSolarDeleteStockOutward = async (req, res) => {
    const {id, index} = req.body;
    const stock = await SolarStockInwards.findById(id);
    const deletedNoOfProducts = parseInt(stock.stockOutward[index].numberOfProducts);
    stock.numberOfProducts = stock.numberOfProducts + deletedNoOfProducts;
    stock.stockOutward.splice(index, 1);
    await stock.save();
    res.redirect('/solarStockReports');
}

const postSolarUpdateRemark = async (req, res) => {
    const {remark, id} = req.body; 
    const client = await SolarTotalSales.findById(id);
    const d = new Date();
    const now = d.toLocaleDateString();
    if(client.remarks == ''){
        client.remarks = '('+now+')'+remark;
    }else{
        client.remarks = '('+now+')'+remark+'. '+client.remarks;
    }
    await client.save();
    res.redirect('/solarTotalSales');
}

const postSolarEditClient = async (req, res) => {
    const {id, custName, prodName, reference, phNumber, phNumber1, address, instExec, amount} = req.body;
    const client = await SolarTotalSales.findById(id);
    client.customerName = custName;
    client.productName = prodName;
    client.reference = reference;
    client.phoneNumber = phNumber;
    client.alternatePhoneNumber = phNumber1;
    client.address = address;
    client.installationExecutive = instExec;
    client.amount = amount;
    await client.save();
    res.redirect(`/showSolarSingleCust/${id}`);
}

const postSolarAddSell = async (req, res) => {
    const {id, prodName, amount, paymentMode, saleOrExchange, soldDate, exchangeDate, instExec, instDate, remark} = req.body;
    const client = await SolarTotalSales.findById(id)
    const obj = {
        prodName,
        amount,
        paymentMode,
        saleOrExchange,
        soldDate,
        exchangeDate,
        instExec,
        instDate,
        remark
    }
    client.salesAndExchanges.push(obj);
    await client.save();
    res.redirect(`/showSolarSingleCust/${id}`)
}

const postSolarDeleteService = async (req, res) => {
    const {id, index} = req.body;
    const customer = await SolarTotalSales.findById(id);

    customer.services.splice(index, 1);
    await customer.save();
    res.redirect('/solarServicesPending');
}

const postSolarStockRemark = async (req, res) => {
    const {remark, id} = req.body; 
    const client = await SolarStockInwards.findById(id);
    const d = new Date();
    const now = d.toLocaleDateString();
    if(client.remark == ''){
        client.remark = '('+now+')'+remark;
    }else{
        client.remark = '('+now+')'+remark+'. '+client.remark;
    }
    await client.save();
    res.redirect('/solarStockReports');
}

module.exports = {
    getSolarTotalSales,
    getSolarTelecaling,
    getSolarExpenses,
    getSolarStockReports,
    getSolarServicesPending,
    getShowSolarSingleCust,
    postSolarExpense,
    postSolarStockInward,
    postSolarStockOutward,
    postTotalSales,
    postSolarCehckEmi,
    postSolarTelecaling,
    postSolarEditRemark,
    postSolarEditStatus,
    postSolarAddMoreProduct,
    postSolarEmiPaymentStatus,
    postSolarDeletClient,
    postSolarEditService,
    postSolarDeleteTelecaling,
    postSolarDeleteStockInward,
    postSolarDeleteStockOutward,
    postSolarUpdateRemark,
    postSolarEditClient,
    postSolarAddSell,
    postSolarDeleteService,
    postSolarStockRemark,
}