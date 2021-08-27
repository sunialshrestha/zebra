import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Stripe from 'stripe'
import { v4 as uuidv4 } from 'uuid'

//@desc Create New Order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    })

    const createOrder = await order.save()

    res.status(201).json(createOrder)
  }
})

//@desc Get order by ID
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc Update order to paid
//@route GET /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: Date.now(),
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc Update order to paid by stripe
//@route GET /api/orders/:id/payByStripe
//@access Private
const updateOrderToPaidByStripe = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.rec_emailss,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Some problems with stripe, please try again')
  }
})

//@desc Update order to delivered
//@route GET /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc Get loagged in user orders
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

//@desc Get all orders
//@route GET /api/orders
//@access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

//@desc Pay orders by stripes
//@route POST /api/orders/:id
//@access Private
const checkout = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
  })
  let error
  let status
  let data
  try {
    const { token, orderId } = req.body
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    })

    const idempotencyKey = uuidv4()
    const order = await Order.findById(orderId).populate('user', 'name email')

    const charge = await stripe.charges.create(
      {
        amount: order.totalPrice * 100,
        currency: 'aud',
        customer: customer.id,
        receipt_email: token.email,
        description: `purchased from proshop`,
        shipping: {
          name: token.card.name,
          address: {
            line1: order.shippingAddress.address,
            city: order.shippingAddress.city,
            country: order.shippingAddress.country,
            postal_code: order.shippingAddress.postalCode,
          },
        },
      },
      {
        idempotencyKey,
      }
    )
    if (charge.status === 'succeeded') {
      status = 'success'
      data = charge
    } else {
      throw new Error('payment with stripe unsuccessful')
    }
  } catch (error) {
    status = 'failure'
    data = ''
  }
  res.json({ error, status, data })
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaidByStripe,
  checkout,
}
