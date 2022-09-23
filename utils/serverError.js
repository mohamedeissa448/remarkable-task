export default function errorServerResponse( res, err){

    let statusCode = 500;
    if(err && err.name === 'ValidationError'){
        statusCode = 400;
    }
    res.status(statusCode).json({
        status: 'error',
        err:err,
        message: err? err.message: 'Unexpected server error!.Please try again later!'
    });

}