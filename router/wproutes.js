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

const getShowSingleCust = async (req, res) => {
    const {id} = req.params;
    let user = null;
    if(req.user){
        user = req.user 
    }
    const client = await Client.findById(id);
    res.render('wp/single_customer', {singleClient: client, user: user});
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

    const foundClients = await Client.find({});
    var duplicateNumberFound = false;
    
    
    foundClients.forEach(async(cli) => {
        if(cli.phoneNumber == phNumber){
            req.flash("error_msg", "A client with same phone number is already exist");
            duplicateNumberFound = true;
            res.redirect('/wpTotalSales');
        }
    });

    if(!duplicateNumberFound){
        if(emi == "on"){
            if(advAmount == ''){
                req.flash("error_msg", "Advance Amount is mandatory");
                res.redirect('/wpTotalSales');
            }else{
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

                const addClient = new Client(newClient);
                await addClient.save();
                if (req.body) res.redirect('/wpTotalSales')
            }
        }else{
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

            const addClient = new Client(newClient);
            await addClient.save();
            if (req.body) res.redirect('/wpTotalSales')
        }
    }
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
    const { creatorName, prodName, noOfProd, remark } = req.body;

    const newStockInward = {
        creatorName: creatorName,
        productName: prodName.toUpperCase(),
        numberOfProducts: noOfProd,
        remark: remark
    }

    const addStockInward = new StockInwards(newStockInward);
    await addStockInward.save();
    res.redirect('/wpStockReport');
}

const postStockOutwards = async (req, res) => {
    const { creatorName, prodName, noOfProd, clientName, clientPhNo, technicianName, remark } = req.body;
    const stocks = await StockInwards.findOne({productName: prodName.toUpperCase()});
    if(stocks !== null){
        const newStockOutward = {
            creatorName: creatorName, 
            productName: prodName.toUpperCase(),
            numberOfProducts: noOfProd,
            clientName: clientName,
            clientNumber: clientPhNo,
            technicianName: technicianName,
            remark: remark
        }
        let outward = stocks.stockOutward;
        outward = [...outward, newStockOutward]; 

        await StockInwards.findOneAndUpdate({productName: prodName.toUpperCase()}, {$set: {stockOutward: outward}})

        var sum = 0;
        stocks.stockOutward.forEach(out => {
            sum += parseInt(out.numberOfProducts);
        });
        stocks.numberOfProductsDifference = sum + parseInt(noOfProd);
        await stocks.save();
    }
    res.redirect('/wpStockReport');
}

const postServicePending = async (req, res) => {
    const {id, status, serviceRemark, serviceExecutive} = req.body;
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
    const customer = await Client.findById(id);


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
            res.redirect(`/showSingleCust/${id}`)
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
            res.redirect(`/showSingleCust/${id}`)
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
            res.redirect(`/showSingleCust/${id}`)
        }
    }
    
} 

const postDeleteService = async (req, res) => {
    const {id, index} = req.body;
    const customer = await Client.findById(id);

    customer.services.splice(index, 1);
    await customer.save();
    res.redirect('/wpServicesPending');
}

const postDeletClient = async (req, res) => {
    await Client.findByIdAndDelete(req.body.id);
    res.redirect('/wpTotalSales');
}

const postDeleteTelecaling = async (req, res) => {
    await ProspectsModal.findByIdAndDelete(req.body.id);
    res.redirect('/wpTelecaling');
}

const postEditService = async (req, res) => {
    const {id, status, serviceExec, serviceDate, remark} = req.body;
    const customer = await Client.findById(id);
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
        if(req.originalUrl == "/editService"){
            res.redirect(`/showSingleCust/${id}`);
        }
        if(req.originalUrl == "/editService1"){
            res.redirect('/wpServicesPending')
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
        if(req.originalUrl == "/editService"){
            res.redirect(`/showSingleCust/${id}`);
        }
        if(req.originalUrl == "/editService1"){
            res.redirect('/wpServicesPending')
        }
    }
}

const postDeleteStockOutward = async (req, res) => {
    const {id, index} = req.body;
    const stock = await StockInwards.findById(id);
    const deletedNoOfProducts = parseInt(stock.stockOutward[index].numberOfProducts);
    stock.numberOfProducts = stock.numberOfProducts + deletedNoOfProducts;
    stock.stockOutward.splice(index, 1);
    await stock.save();
    res.redirect('/wpStockReport');
}

const postDeleteStockInward = async (req, res) => {
    await StockInwards.findByIdAndDelete(req.body.id);
    res.redirect('/wpStockReport');
}

const postDeleteExpense = async (req, res) => {
    await ExpensesModal.findByIdAndDelete(req.body.id);
    res.redirect('/wpExpenses');
}

const postUpdateRemark = async (req, res) => {
    const {remark, id} = req.body; 
    const client = await Client.findById(id);
    const d = new Date();
    const now = d.toLocaleDateString();
    if(client.remarks == ''){
        client.remarks = '('+now+')'+remark;
    }else{
        client.remarks = '('+now+')'+remark+'. '+client.remarks;
    }
    await client.save();
    res.redirect('/wpTotalSales');
}

const postStockRemark = async (req, res) => {
    const {remark, id} = req.body; 
    const client = await StockInwards.findById(id);
    const d = new Date();
    const now = d.toLocaleDateString();
    if(client.remark == ''){
        client.remark = '('+now+')'+remark;
    }else{
        client.remark = '('+now+')'+remark+'. '+client.remark;
    }
    await client.save();
    res.redirect('/wpStockReport');
}

const postStockOutwardRemark = async (req, res) => {
    const {remark, id, index} = req.body;
    const out = await StockInwards.findById(id);
    const d = new Date();
    const now = d.toLocaleDateString();

    out.stockOutward[index].remark =  "remark";
    if(out.stockOutward[index].remark){
        out.stockOutward[index].remark = '('+now+')'+ remark;
    }else{
        out.stockOutward[index].remark = '('+now+')'+ remark +'. '+ out.stockOutward[index].remark;
    }

    await out.save();
    res.redirect('/wpStockReport');
}

const postEditClient = async (req, res) => {
    const {id, custName, prodName, reference, phNumber, phNumber1, address, instExec, amount} = req.body;
    const client = await Client.findById(id);
    client.customerName = custName;
    client.productName = prodName;
    client.reference = reference;
    client.phoneNumber = phNumber;
    client.alternatePhoneNumber = phNumber1;
    client.address = address;
    client.installationExecutive = instExec;
    client.amount = amount;
    await client.save();
    res.redirect(`/showSingleCust/${id}`);
}

const postAddSell = async (req, res) => {
    const {id, prodName, amount, paymentMode, saleOrExchange, soldDate, exchangeDate, instExec, instDate, remark} = req.body;
    const client = await Client.findById(id)
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
    res.redirect(`/showSingleCust/${id}`)
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
    postUpdateServices,
    posteditRemark,
    posteditStatus,
    postAddMoreProduct,
    postEmiPaymentStatus,
    postDeleteService,
    postDeletClient,
    postDeleteTelecaling,
    postEditService,
    postDeleteStockOutward,
    postDeleteStockInward,
    postDeleteExpense,
    postUpdateRemark,
    postStockRemark,
    postEditClient,
    postAddSell,
    postStockOutwardRemark,
};