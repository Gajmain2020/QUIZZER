import jwt from "jsonwebtoken";

// export const authTeacher = (req, res, next) => {
//   console.log(req.headers.authorization);
//   try {
//     const token = req.headers;
//     console.log(token);
//     if (token) {
//       //* do something then go to next step
//       token = token.split(" ")[1];
//       console.log(token);
//       const user = jwt.verify(token, "test");
//       console.log(user);
//       req.userId = user.id;
//     } else {
//       return res
//         .status(401)
//         .json({ message: "user not logged in", successful: false });
//     }

//     next();
//   } catch (error) {
//     console.log(error.message);
//     return res
//       .status(401)
//       .json({ message: "user not logged in", successful: false });
//   }
// };

export const teacherAuth = (req, res, next) => {
  try {
    const { token } = JSON.parse(req.headers.authorization);
    jwt.verify(token, "test", (err, varifiedJwt) => {
      if (err) {
        return res
          .status(500)
          .json({ message: err.message, accessGrant: false });
      } else {
        next();
      }
    });
  } catch (error) {
    return res.status(404).json({ message: error.message, successful: false });
  }
};
