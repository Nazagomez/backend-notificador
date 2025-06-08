const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API",
            version: "2.0.0",
			description: "API documentation"
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 4000}/api`,
                description: "Local server",
            },
        ],
    },
    apis: [
        'src/swagger/schemas/*.js',
        'src/swagger/routes/*.js'
    ],
};

export default swaggerOptions;