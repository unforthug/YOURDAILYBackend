
const movies = require('../Models/MovieSchema')

exports.filterMiddleware = async(req,res,next)=>{

    let token ;
    console.log(req)
    // if (!req?.headers?.authorization) {
    //     res.json({message : 'There is no token attached to the header'})
    // }

    // if (req?.headers?.authorization?.startsWith('Bearer')) {

    //     try {
    //         token = req.headers.authorization.split(' ')[1];
    //         if (token) {
    //             const decoded = jwt.verify(token , process.env.SECRET);
    //             const user = await User.findById(decoded?.id).select('-password')
    //             req.user = user ;
    //             next();
    //         }
    //     } catch (error) {
    //         res.json({message : "Not Authorized , token expired"})
    //     }
        
    // }
}