/**
 *  @method GET
 *  @url  /
 *  @route  /
 *  @description - shows first page
 */

exports.firstPage = (req,res,next) => {

    res.render('index',{pageTitle:'HomePage'});
};