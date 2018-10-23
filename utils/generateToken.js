const generateToken = length => {
  let allowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
    ""
  );
  let token = [];
  for (let i = 0; i < length; i++) {
    let j = (Math.random() * (allowed.length - 1)).toFixed(0);
    token[i] = allowed[j];
  }
  return token.join("");
};

module.exports = generateToken;
