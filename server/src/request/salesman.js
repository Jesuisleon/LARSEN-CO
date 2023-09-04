const Report = require("../models/report");


exports.totalSalesOfSalesman = async () =>{
    return Report.aggregate([
        {
            $group: {
                _id: '$salesman',
                totalSales: { $sum: '$total_sales' }
            },
        },
        {
            $sort: {
                totalSales: -1
            }
        }
    ]);
}


