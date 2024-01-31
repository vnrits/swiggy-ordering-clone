const { Magic } = require("@magic-sdk/admin");
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const authMiddleware = async (req, res, next) => {
  console.log("Auth middleware called");
  try {
    const didToken = req.headers.authorization.substring(7);
    await magic.token.validate(didToken);
    req.magicId = magic.token.getIssuer(didToken);
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = authMiddleware;
