const sequelizeErrorHandlerMap = {
    SequelizeUniqueConstraintError: (err, res) => {
        return res.status(400).json({
            error: "UniqueConstraintError",
            message: "Oops, some fields are not unique.",
            key: err.errors[0].value,
        });
    },
    SequelizeValidationError: (err, res) => {
        const errors = [];
        err.errors.forEach((e) => {
            errors.push({
                message: e.message,
                field: e.path,
            });
        });

        return res.status(400).json({
            error: "ValidationError",
            message: "Some fields do not meet the requirements.",
            validations: errors,
        });
    },
    SequelizeDatabaseError: (err, res) => {
        return res.status(500).json({
            error: "DatabaseError",
            message: "Database error",
        });
    },
    SequelizeConnectionError: (err, res) => {
        return res.status(500).json({
            error: "DatabaseError",
            message: "Database error, connection failed.",
        });
    },
    SequelizeForeignKeyConstraintError: (err, res) => {
        const errors = [];
        errors.push({
            message: `Not exist on table: ${err.table}`,
            field: err.fields[0],
        });

        return res.status(400).json({
            error: "ForeignKeyConstraintError",
            message:
                "An inserted value does not match its respective foreign key.",
            validations: errors,
        });
    },
};

const customErrorHandlerMap = {
    ForbiddenError: (err, res) => {
        return res.status(err.statusCode).json({
            error: err.name,
            message: err.message,
            resource: err.resource,
        });
    },
    NotFoundError: (err, res) => {
        return res.status(err.statusCode).json({
            error: err.name,
            message: err.message,
            resourceId: err.resourceId,
        });
    },
    UnauthorizedError: (err, res) => {
        return res.status(err.statusCode).json({
            error: err.name,
            message: err.message,
            resource: err.resource,
            token: process.env.NODE_ENV === "development" ? err.token : "🎫",
        });
    },
    ValidationError: (err, res) => {
        return res.status(err.statusCode).json({
            error: err.name,
            message: err.message,
            validations: err.field,
        });
    },
};

const logError = (err) => {
    console.log("\x1b[1m\x1b[33m%s\x1b[0m", "Error name:", "\x1b[33m", err.name);
    console.log("\x1b[1m\x1b[31m%s\x1b[0m", "Error message:", "\x1b[31m", err.message);
    console.error("\x1b[1m\x1b[90m%s\x1b[0m", "Error stack:", err.stack || "🥞");
    console.log("\n\n");
};

const defaultErrorHandler = (err, res) => {
    const statusCode = err.statusCode || 500;
    const responseBody = {
        error: "InternalServerError",
        message:
            "We're sorry, an internal server error has occurred. Please try again later or seek further assistance if the issue persists.",
        stack: process.env.NODE_ENV === "development" ? err.stack : "🥞",
    };
    return res.status(statusCode).json(responseBody);
};

const errorHandler = (err, req, res, next) => {
    try {

        logError(err);

        const sequelizeError = sequelizeErrorHandlerMap[err.name];
        if (sequelizeError) {
            return sequelizeError(err, res);
        }

        const customError = customErrorHandlerMap[err.name];
        if (customError) {
            return customError(err, res);
        }

        return defaultErrorHandler(err, res);
    } catch (err) {
        return defaultErrorHandler(err, res);
    }
};

export default errorHandler;