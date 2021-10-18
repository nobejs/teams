function resolve(path, obj) {
  return path.split(".").reduce(function (prev, curr) {
    return prev ? prev[curr] : null;
  }, obj);
}

module.exports = (instance, attributes) => {
  const result = {};

  for (const attribute of attributes) {
    if (resolve(attribute, instance)) {
      result[attribute] = resolve(attribute, instance);
    }
  }

  return result;
};
