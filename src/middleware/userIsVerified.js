const userIsVerified = (req, res, next) => {
    const validation = req.user.isVerified
    console.log(validation)
    if(!validation) return res.status(401).json({message: "User is not verified"})
    next()
}

exports.userIsVerified = userIsVerified