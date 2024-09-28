import Razorpay from "razorpay";
import { instance } from "../index.js";
import ErrorHandler from "../Middleware/ErrorHandler.js";
import crypto from "crypto";
import Cart from "../Models/Cart.js";
import Order from "../Models/Order.js";
import Product from "../Models/Products.js";
import User from "../Models/Users.js";
import moment from "moment";
import { redisClient } from "../index.js";
import "../Services/Config.js";

export const checkout = async (req, res, next) => {
  const { amount } = req.body;
  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  if (!order) return new ErrorHandler("Something went wrong", 400);

  res.status(200).json({
    success: true,
    order,
  });
};

export const verifyPayment = async (req, res, next) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userDetails,
  } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

export const completePayment = async (req, res, next) => {
  const { userDetails, razorpay_order_id, total } = req.body;
  const userId = req.user.id;
  const cartItems = await Cart.find({ userId }).populate("productId");

  if (!cartItems.length) {
    return next(new ErrorHandler("No items in cart", 400));
  }

  const newOrder = await Order.create({
    user: userId,
    address: userDetails.address,
    city: userDetails.city,
    state: userDetails.state,
    pincode: userDetails.pincode,
    total: total,
    products: cartItems.map((item) => ({
      name: item.productId.name,
      quantity: item.quantity,
      price: item.productId.price * item.quantity,
    })),
    orderId: razorpay_order_id,
  });

  const populateOrder = await newOrder.populate("products user");

  for (let item of cartItems) {
      const product = await Product.findById(item.productId);
      
      if (!product) return next(new ErrorHandler("Product not found", 400));
      
      const currentQuantity = Number(product.quantity);
      const itemQuantity = Number(item.quantity);

      console.log(currentQuantity); 
      console.log(itemQuantity);
      console.log(currentQuantity - itemQuantity);
      if(!isNaN(currentQuantity) && !isNaN(itemQuantity)){
        await Product.findByIdAndUpdate(item.productId._id, {
          $set: { quantity: (currentQuantity - itemQuantity).toString() },
        });
      }
      else {
        return next(new ErrorHandler("Not enough quantity!", 400));
      }
  }

  const deleteItem = await Cart.deleteMany({ userId });

  const notification = {
    orderId: newOrder._id,
    message: "New Order Received",
    time: newOrder.createdAt.toString().trim().slice(0, 10),
  };

  redisClient.rPush("newOrder", JSON.stringify(notification));

  if (deleteItem) {
    return res.status(200).json({
      success: true,
      order: populateOrder,
    });
  } else {
    return res.status(400).json({
      success: false,
    });
  }
};

export const getOrders = async (req, res, next) => {
  const orders = await Order.find({});
  res.json({
    orders,
  });
};

export const getSingleOrder = async (req, res, next) => {
  const order = await Order.findOne({ orderId: req.params.id }).populate(
    "products user"
  );
  if (!order) return next(new ErrorHandler("Order not found", 400));

  res.json({
    order,
  });
};

export const updateOrderStatus = async (req, res, next) => {
  const orderId = req.params.id;
  const status = req.body.status;
  const order = await Order.findByIdAndUpdate(orderId, { status });
  if (!order) return next(new ErrorHandler("Order not found", 400));

  res.json({
    success: true,
  });
};

const totalProducts = async (req, res, next) => {
  try {
    const result = await Product.find({}).countDocuments();
    return result;
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
};

const getActiveUsers = async (req, res, next) => {
  try {
    const result = await User.find({}).countDocuments();
    return result;
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
};

export const getStats = async (req, res, next) => {
  const total = await totalRaisedAmount(req, res);
  const pendingOrders = await getPendingOrders(req, res);
  const getTotalProducts = await totalProducts(req, res);
  const activeUsers = await getActiveUsers(req, res);
  return res.json({
    total: total,
    pendingOrders: pendingOrders,
    totalProducts: getTotalProducts,
    activeUsers: activeUsers,
  });
};

const totalRaisedAmount = async (req, res, next) => {
  try {
    const result = await Order.aggregate([
      {
        $addFields: {
          totalAsNumber: { $toDouble: "$total" }, // Convert total to a number
        },
      },
      {
        $group: {
          _id: null, // We don't need to group by any field
          totalRaised: { $sum: "$totalAsNumber" },
        },
      },
    ]);
    return result[0].totalRaised;
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
};

const getPendingOrders = async (req, res, next) => {
  try {
    const result = await Order.find({ status: "pending" }).countDocuments();
    return result;
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
};

export const getSalesData = async (req, res) => {
  try {
    const last5Days = Array.from({ length: 5 }, (_, i) =>
      moment().subtract(i, "days").startOf("day")
    ).reverse();

    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: last5Days[0].toDate(),
            $lte: new Date(),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalSales: {
            $sum: { $toDouble: "$total" },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const salesByDay = last5Days.map((date) => {
      const formattedDate = date.format("YYYY-MM-DD");
      const salesOnDay = salesData.find((data) => data._id === formattedDate);
      return {
        date: formattedDate,
        sales: salesOnDay ? salesOnDay.totalSales : 0,
      };
    });

    return res.status(200).json(salesByDay);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getProductCategory = async (req, res, next) => {
  try {
    const categoryCounts = await Product.aggregate([
      {
        $group: {
          _id: "$category", // Group by category reference (which is an ObjectId)
          count: { $sum: 1 }, // Count products per category
        },
      },
      {
        $lookup: {
          from: "categories", // The Category collection name
          localField: "_id", // The ObjectId reference to the category
          foreignField: "_id", // The ObjectId field in the Category collection
          as: "categoryInfo", // The new field to hold the joined data
        },
      },
      {
        $unwind: "$categoryInfo", // Unwind the array result of $lookup to get the actual category document
      },
      {
        $project: {
          categoryName: "$categoryInfo.name", // Only include the category name
          count: 1, // Include the product count
        },
      },
    ]);

    const totalProducts = categoryCounts.reduce(
      (sum, category) => sum + category.count,
      0
    );

    const categoryPercentages = categoryCounts.map((category) => ({
      category: category.categoryName,
      percentage: ((category.count / totalProducts) * 100).toFixed(2), // Format to 2 decimal places
    }));

    res.status(200).json(categoryPercentages);
  } catch (error) {
    console.error("Error fetching category percentages:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getLastFiveOrders = async (req, res, next) => {
  try {
    const last5Orders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user");

    return res.json({
      orders: last5Orders.map((order) => ({
        orderId: order.orderId,
        date: order.createdAt,
        status: order.status,
        total: order.total,
      })),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLessQuantityProducts = async (req, res, next) => {
  try {
    const lowStockProducts = await Product.find()
      .exec()
      .then((products) =>
        products.filter((product) => parseInt(product.quantity) < 5)
      );
    return res.json({
      products: lowStockProducts.map((product) => ({
        name: product.name,
        quantity: product.quantity,
      })),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getNotification = async (req, res, next) => {
  try {
    const result = await redisClient.lRange("newOrder", 0, -1);
    const parsedResult = result.map((item) => JSON.parse(item));
    if (parsedResult.length === 0) {
      return res.status(200).json({
        notifications: [],
      });
    } else {
      return res.json({
        notifications: parsedResult,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const clearNotification = async (req, res, next) => {
  const result = await redisClient.del("newOrder");
  return res.status(200).json({
    message: "Notifications cleared successfully",
  });
};

export const getOrdersByUser = async (req, res, next) => {
  const order = await Order.find({ user: req.user.id }).populate(
    "products user"
  );
  if (!order) return next(new ErrorHandler("Order not found", 400));

  res.json({
    orders: order,
  });
};

export const checkCartQuantity = async (req, res, next) => {
  const cartItems = await Cart.find({ userId: req.user.id });
  try {
    for (let item of cartItems) {
      const product = await Product.findById(item.productId);

      if (!product) return next(new ErrorHandler("Product not found", 400));

      if (product.quantity < item.quantity)
        return next(new ErrorHandler(`Not enough quantity of ${product.name}`, 400));
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler("Something went wrong", 400));
  }
};