function calculatePayroll(basic, presentDays) {
  const perDay = basic / 30;
  const earned = perDay * presentDays;

  const pf = earned * 0.12;
  const esi = earned * 0.0075;
  const lop = basic - earned;

  const net = earned - pf - esi;

  return {
    basic,
    pf: pf.toFixed(2),
    esi: esi.toFixed(2),
    lop: lop.toFixed(2),
    net: net.toFixed(2)
  };
}

module.exports = calculatePayroll;