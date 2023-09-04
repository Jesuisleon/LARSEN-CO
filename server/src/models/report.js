const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  salesman: { type: Schema.Types.ObjectId, ref: "Salesman", required: true },
  client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  date: { type: Date, required: true },
  report: { type: String },
  articles: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Article", required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      listId: { type: Number, required: true}
    },
  ],
  total_sales: { type: Number, required: true },
  provisional_date: { type: Date},
  provisional_articles: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Article" },
      name: { type: String },
      quantity: { type: Number },
      price: { type: Number },
      listId: { type: Number }
    },
  ],
  provisional_total: { type: Number },
});

module.exports = mongoose.model("Report", ReportSchema);
