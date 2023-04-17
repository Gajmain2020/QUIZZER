import jwt from "jsonwebtoken";

export const teacherAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    jwt.verify(token, "teacherKey", (err, varifiedJwt) => {
      if (err) {
        console.log("2", err.message);
        return res
          .status(500)
          .json({ message: err.message, accessGrant: false });
      } else {
        next();
      }
    });
  } catch (error) {
    console.log("3", error.message);
    return res.status(404).json({ message: error.message, successful: false });
  }
};

export const studentAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    jwt.verify(token, "studentKey", (err, varifiedJwt) => {
      if (err) {
        console.log("2", err.message);
        return res
          .status(500)
          .json({ message: err.message, accessGrant: false });
      } else {
        next();
      }
    });
  } catch (error) {
    console.log("3", error.message);
    return res.status(404).json({ message: error.message, successful: false });
  }
};
