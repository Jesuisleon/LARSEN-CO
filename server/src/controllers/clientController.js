const Client = require('../models/client');

exports.createClient = async (req, res) => {
  try {
    const newClient = await Client.create(req.body);
    const client = await newClient.save();
    if (!client) throw Error("Something went wrong saving the client");

    console.log("client created", client);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    if (!clients) throw Error("No clients");
    res.status(200).json(clients);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getSingleClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params._id);
    if (!client) throw Error("No client");
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body);
    if (!client) throw Error("Something went wrong updating the client");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
}

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) throw Error("No client found");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
}

