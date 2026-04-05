const mongoose = require('mongoose');
const Record = require('../models/Record');


// CREATE RECORD
exports.createRecord = async (req, res) => {
  try {
    const { type, amount, category, date } = req.body;

    if (!type || !['income', 'expense'].includes(type.toLowerCase())) {
      return res.status(400).json({ message: "Invalid type" });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    if (!category) {
      return res.status(400).json({ message: "Category required" });
    }

    if (!date) {
      return res.status(400).json({ message: "Date required" });
    }

    const record = await Record.create({
      ...req.body,
      type: type.toLowerCase(),
      userId: req.user.id
    });

    res.status(201).json(record);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET RECORDS (FILTER + SEARCH + PAGINATION)
exports.getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate, search, page, limit } = req.query;

    let filter = { userId: req.user.id };

    if (type) filter.type = type.toLowerCase();
    if (category) filter.category = category;

    if (search) {
      filter.notes = { $regex: search, $options: 'i' };
    }

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;

    const total = await Record.countDocuments(filter);

    const records = await Record.find(filter)
      .sort({ date: -1 }) // latest first
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.json({
      total,
      page: pageNum,
      limit: limitNum,
      data: records
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// SUMMARY
exports.getSummary = async (req, res) => {
  try {
    const records = await Record.find({ userId: req.user.id });

    let income = 0;
    let expense = 0;

    records.forEach(r => {
      const type = r.type?.toLowerCase();
      const amount = Number(r.amount) || 0;

      if (type === "income") income += amount;
      else if (type === "expense") expense += amount;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE RECORD
exports.updateRecord = async (req, res) => {
  try {
    if (req.body.type && !['income', 'expense'].includes(req.body.type.toLowerCase())) {
      return res.status(400).json({ message: "Invalid type" });
    }

    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (record.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await Record.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        type: req.body.type ? req.body.type.toLowerCase() : record.type
      },
      { new: true, runValidators: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE RECORD
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (record.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Record.findByIdAndDelete(req.params.id);

    res.json({ message: "Record deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// CATEGORY TOTALS
exports.categoryTotals = async (req, res) => {
  try {
    const data = await Record.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// MONTHLY TRENDS
exports.monthlyTrends = async (req, res) => {
  try {
    const data = await Record.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// RECENT ACTIVITY
exports.recentActivity = async (req, res) => {
  try {
    const records = await Record.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(5);

    res.json(records);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};