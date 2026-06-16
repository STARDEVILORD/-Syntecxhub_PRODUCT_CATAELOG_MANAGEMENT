const Product = require('../models/Product');

// @desc    Get all products (with Search, Filter, Sort, Pagination)
// @route   GET /api/products
exports.getProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || parseInt(process.env.DEFAULT_LIMIT, 10) || 10;
        const skip = (page - 1) * limit;

        const matchStage = {};

        // Case-insensitive Search by name or category
        if (req.query.search) {
            matchStage.$or = [
                { name: { $regex: req.query.search, $options: 'i' } },
                { category: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        // Filtering by price range
        if (req.query.minPrice || req.query.maxPrice) {
            matchStage.price = {};
            if (req.query.minPrice) matchStage.price.$gte = parseFloat(req.query.minPrice);
            if (req.query.maxPrice) matchStage.price.$lte = parseFloat(req.query.maxPrice);
        }

        // Sorting
        const sortStage = {};
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sortStage[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        } else {
            sortStage.createdAt = -1; // Default sort
        }

        // Aggregation Pipeline
        const pipeline = [
            { $match: matchStage },
            { $sort: sortStage },
            {
                $facet: {
                    metadata: [
                        { $count: "total" }
                    ],
                    data: [
                        { $skip: skip },
                        { $limit: limit }
                    ]
                }
            }
        ];

        const results = await Product.aggregate(pipeline);
        const data = results[0].data;
        const total = results[0].metadata[0] ? results[0].metadata[0].total : 0;

        res.status(200).json({
            success: true,
            count: data.length,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                totalItems: total
            },
            data
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new product
// @route   POST /api/products
exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};