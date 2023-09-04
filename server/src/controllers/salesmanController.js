const Salesman = require('../models/salesman');
const { totalSalesOfSalesman } = require('../request/salesman')

exports.getAllSalesmen = async (req, res) => {
  try {

    const salesmen = await Salesman.find();
    if (!salesmen) throw Error('No salesmen');


    const totalSales = await totalSalesOfSalesman();

    const updatedSalesmen = await Promise.all(
        salesmen.map(async (salesman) => {
        const total = totalSales.find(
            s => s._id.toString() === salesman._id.toString());

        // Permet de transformer l'objet mongoose en objet JS pour injecter la propriété total_sales
        const salesmanObject = salesman.toObject();
        salesmanObject.total_sales = total ? total.totalSales : 0;
        return salesmanObject;
      })
    );

    res.status(200).json(updatedSalesmen);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getSingleSalesman = async (req, res) => {
  try {
    const salesman = await Salesman.findById(req.params.id);
    if (!salesman) throw Error('No salesman');
    res.status(200).json(salesman);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.updateSalesman = async (req, res) => {
  try {
    const salesman = await Salesman.findByIdAndUpdate(req.params.id, req.body);
    if (!salesman) throw Error('Something went wrong updating the salesman');
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
}

exports.deleteSalesman = async (req, res) => {
  try {
    const salesman = await Salesman.findByIdAndDelete(req.params.id);
    if (!salesman) throw Error('No salesman found');
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
}

