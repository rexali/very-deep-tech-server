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
        const transactions = await Transaction.find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate({
                path: 'order',
                model: "Order"
            })
            .exec();

        const totalTransactions = (await Transaction.find()).length;
        const newTransactions = JSON.parse(JSON.stringify(transactions)).map(transaction => ({
            ...transaction,
            totalTransactions: totalTransactions,
            totalAmount: transactions.map(transaction => Number(transaction.amount))
                .reduce((prev, curr) => prev + curr, 0)
        })).reverse();

        if (transactions != null) {
            if (transactions.length) {
                res.status(200).json({
                    status: "success",
                    data: {
                        transactions: newTransactions,
                        salesFromMondayToFriday: getSalesFromMondayToFriday(),
                        weeklySalesReport: generateWeeklySalesReport(),
                        salesForMonth: getSalesForMonth(2024, 1),
                        monthlySalesReport: generateMonthlySalesReport(2024, 1)
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

module.exports = {
    getTransactions,
    generateMonthlySalesReport,
    getSalesForMonth,
    generateWeeklySalesReport,
    getSalesFromMondayToFriday
}