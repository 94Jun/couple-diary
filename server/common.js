const generateRandomId = (table_name) => {
  return `${table_name}_` + Date.now() + Math.floor(Math.random() * 1000000);
};

module.exports = { generateRandomId };
