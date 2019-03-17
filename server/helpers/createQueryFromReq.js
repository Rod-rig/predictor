exports.createQuery = (body, field) => {
  return body.map(item => ({
    [field]: item[field],
  }));
};
