const validator = require("validator");

const Report = require("../models/report");
const Client = require("../models/client");

const verifyClient = async (req, res) => {
  try {
    const clientExist = await Client.findOne({ contact: req.body.client.contact });
    if (clientExist) {
      return clientExist;
    } else {
      const newClient = await Client.create(req.body.client);
      const client = await newClient.save();
      if (!client) throw Error("Something went wrong saving the client");
      return client;
    }
  } catch (err) {
   throw Error(err.message);
  }
};

exports.createReport = async (req, res) => {

  try {
    let verifiedClient = await verifyClient(req, res);

      let newReport = new Report({
        salesman: req.body.salesman,
        client: verifiedClient,
        date: req.body.date,
        report: req.body.report,
        articles: req.body.articles,
        total_sales: req.body.total_sales,
        provisional_date: req.body.provisional_date,
        provisional_articles: req.body.provisional_articles,
        provisional_total: req.body.provisional_total,
      });

    const report = await newReport.save();
    if (!report) throw Error("Something went wrong saving the report");
    res.status(200).json(report);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    // Verify if email is valid
    const validEmail = validator.isEmail(req.body.client.contact);
    if (!validEmail) throw Error("Email is not valid");

    const client = await Client.findByIdAndUpdate(req.body.client._id, req.body.client);
    if (!client) throw Error("Something went wrong updating the report");

    const query = req.body

    // Permet d'enlever les champs provisoires du modéle si ils sont vides
    if (!query.$unset) {
      query.$unset = {};
    }

    if (!query.provisional_date) {
      query.$unset.provisional_date = 1;
      delete query.provisional_date
    }

    if (query.provisional_articles && query.provisional_articles.length === 0) {
      query.$unset.provisional_articles = 1;
      delete query.provisional_articles
    }

    if (!query.provisional_total) {
      query.$unset.provisional_total = 1;
      delete query.provisional_total
    }


    const report = await Report.findByIdAndUpdate(req.params.id, query);
    if (!report) throw Error("Something went wrong updating the report");

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

exports.getAllReportsBySalesman = async (req, res) => {
  try {
    const salesmanId = req.params.id;
    if (salesmanId !== req.payload._id.toString() && !req.payload.isAdmin) {
      throw Error("You are not authorized to view this report");
    }
    const reports = await Report.find({ salesman: salesmanId })
      .sort({ date: -1 })
      .populate("salesman")
      .populate("client");


    if (!reports) throw Error("No reports");
    res.status(200).json(reports);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("salesman")
      .populate("client");

    if (!reports) throw Error("No reports");
    res.status(200).json(reports);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getSingleReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("salesman")
      .populate("client");

    if (!report) throw Error("No report");
    res.status(200).json(report);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) throw Error("No report found");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
}

