const handler = (req, res) => {
  let { creditCardNumber } = req.body;
  let total = 0;

  for (let i = 0; i < creditCardNumber.length; i++) {
    let sum = 0;
    let digit = Number(creditCardNumber.charAt(i));
    if (i % 2 == 0) {
      digit *= 2;
    }
    sum = Math.floor(digit / 10) + (digit % 10);
    total += sum;
  }

  const result = total % 10 === 0;

  res.json({ result });
};

module.exports = handler;
