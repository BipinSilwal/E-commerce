export const getProducts = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello there!!',
  });
};
