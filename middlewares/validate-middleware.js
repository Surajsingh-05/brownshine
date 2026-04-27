
const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next(); 
    } catch (err) {
        const status = 422;
    
        const message = "fill the input proprly"
      
        const extraDetails = err.errors ?
                        err.errors.map(e => e.message):
                        err.issues ? err.issues.map(e => e.message): [] ;


        const error = {
            status,
            message,
            extraDetails,
        };

        console.log(error);

        // res.status(400).json({msg: message});
        next(error);
    }
};

module.exports = validate;