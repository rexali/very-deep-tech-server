const { Transaction } = require("../models/transaction.model");

/** 
 * Get all transcations
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getTransactions = async (req, res) => {
    try {
        const page = parseInt(req.query.page ?? 1);
        const limit = 4;
        const skip = (page - 1) * limit;
        const subdomain = req.query?.subdomain ?? "";
        let transactions;
        if (subdomain == "maindomain" || "" || undefined) {
            transactions = await Transaction.find()
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .populate("user", ["_id", "email", "role"])
                .populate({
                    path: 'order',
                    model: "Order"
                })
                .exec();
        } else {
            transactions = await Transaction.find({ subdomain })
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .populate("user", ["_id", "email", "role"])
                .populate({
                    path: 'order',
                    model: "Order"
                })
                .exec();
        }


        const totalTransactions = (await Transaction.find()).length;
        const newTransactions = JSON.parse(JSON.stringify(transactions)).map(transaction => ({
            ...transaction,
            totalTransactions: totalTransactions,
            totalAmount: transactions.map(transaction => Number(transaction.amount))
                .reduce((prev, curr) => prev + curr, 0)
        }));

        if (transactions != null) {
            if (transactions.length) {
                res.status(200).json({
                    status: "success",
                    data: {
                        transactions: newTransactions,
                        salesFromMondayToFriday: await getSalesFromMondayToFriday(),
                        weeklySalesReport: await generateWeeklySalesReport(),
                        salesForMonth: await getSalesForMonth(2024, new Date().getMonth() + 1),
                        monthlySalesReport: await generateMonthlySalesReport(2024, new Date().getMonth() + 1),
                        // obj
                        generateSalesReportObj: await generateSalesReportObj(),
                        generateMonthlySalesReportObj: await generateMonthlySalesReportObj(),
                        generateQuarterlySalesReportObj: await generateQuarterlySalesReportObj(),
                        generateWeeklySalesReportObj: await generateWeeklySalesReport(),
                    },
                    message: "Transaction read",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { transactions: [] },
                    message: "No transaction found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { transactions: null },
                message: "No transaction found",
            });
        }

    } catch (error) {
        // catch  the error
        console.warn(error);
        // send error response
        res.status(500).json({
            status: "failed",
            data: null,
            message: "Error! " + error.message
        })
    }

}

async function getSalesFromMondayToFriday() {

    const startOfWeek = new Date();

    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Monday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);

    endOfWeek.setDate(startOfWeek.getDate() + 4); // Friday
    endOfWeek.setHours(23, 59, 59, 999);

    try {
        const sales = await Transaction.find({
            createdAt: {
                $gte: startOfWeek,
                $lte: endOfWeek
            }
        });

        return sales;
    } catch (error) {
        console.error('Error fetching sales:', error);
        throw error;
    }
}


async function generateWeeklySalesReport() {
    try {
        const sales = await getSalesFromMondayToFriday();
        const totalSales = sales.reduce((total, sale) => total + sale.amount, 0);

        return {
            totalSales,
            sales
        };
    } catch (error) {
        console.error('Error generating weekly sales report:', error);
        throw error;
    }
}

async function getSalesForMonth(year, month) {

    const startOfMonth = new Date(year, month, 1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(year, month + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    try {
        const sales = await Transaction.find({
            createdAt: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        });

        return sales;
    } catch (error) {
        console.error('Error fetching sales for month:', error);
        throw error;
    }
}

async function generateMonthlySalesReport(year, month) {
    try {
        const sales = await getSalesForMonth(year, month);
        const totalSales = sales.reduce((total, sale) => total + sale.amount, 0);

        return {
            totalSales,
            sales
        };
    } catch (error) {
        console.error('Error generating monthly sales report:', error);
        throw error;
    }
}

// Function to generate sales report for each day of the week
async function generateSalesReportObj() {
    const today = new Date();
    const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
    const sunday = new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000);

    const salesReport = await Transaction.aggregate([
        {
            $match: {
                createdAt: { $gte: monday, $lte: sunday }
            }
        },
        {
            $group: {
                _id: { $dayOfWeek: "$createdAt" },
                totalSales: { $sum: "$amount" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
    
    const data = [
        ["Day", "Sales"],
        // ["Monday", 1000],
        // ["Tuesday", 1170],
        // ["Wednesday", 660],
        // ["Thursday", 1030],
        // ["Friday", 800],
    ];

    salesReport.forEach(function(report) {
        let daySaleReports = Object.entries(report);
        data.push(daySaleReports[0]);
    })

    return data;
}


// Function to generate sales report for each week of the month
async function generateWeeklySalesReport() {
    const salesReport = await Transaction.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-W%U",
                        date: "$createdAt"
                    }
                },
                totalSales: { $sum: "$amount" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);


    const data = [
        ["Week", "Sales"],
        // ["Monday", 1000],
        // ["Tuesday", 1170],
        // ["Wednesday", 660],
        // ["Thursday", 1030],
        // ["Friday", 800],
    ];

    salesReport.forEach(function(report) {
        let weekSaleReports = Object.entries(report);
        data.push(weekSaleReports[0]);
    })


    return data;
}


// Function to generate sales report for each month of the year
async function generateMonthlySalesReportObj() {
    const salesReport = await Transaction.aggregate([
        {
            $group: {
                _id: { $month: "$createdAt" },
                totalSales: { $sum: "$amount" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);

    
    const data = [
        ["Month", "Sales"],
        // ["Monday", 1000],
        // ["Tuesday", 1170],
        // ["Wednesday", 660],
        // ["Thursday", 1030],
        // ["Friday", 800],
    ];

    salesReport.forEach(function(report) {
        let monthSaleReports = Object.entries(report);
        data.push(monthSaleReports[0]);
    })

    return data;
}



// Function to generate sales report for each quarter of the year
async function generateQuarterlySalesReportObj() {
    const salesReport = await Transaction.aggregate([
        {
            $group: {
                _id: {
                    $dateTrunc: {
                        date: "$createdAt",
                        unit: "quarter",
                        binSize: 1
                    }
                },

                totalSales: { $sum: "$amount" }
            },

        },

        {
            $sort: { _id: 1 }
        }
    ]);

    
    const data = [
        ["Quarter", "Sales"],
        // ["Monday", 1000],
        // ["Tuesday", 1170],
        // ["Wednesday", 660],
        // ["Thursday", 1030],
        // ["Friday", 800],
    ];

    salesReport.forEach(function(report) {
        let quarterlySaleReports = Object.entries(report);
        data.push(quarterlySaleReports[0]);
    })

    return data;
}






module.exports = {
    getTransactions
}