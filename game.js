data = [];
for (let i = 0; i < 3000; i++) {
  data[i] = Math.sin((i / 3000) * 100) / 2 + Math.sin((i / 1200) * 100) / 2;
}
fourier = [];
dob = 0;
sum = 0;

reverseFourier = [];
reverseFourierFinal = [];
doneReverse = false;

for (let i = 0; i < 400; i++) {
  reverseFourierFinal[i] = 0;
}
function draw() {
  for (m = 0; m < 5; m++) {
    lastsum = sum;
    dob += 0.0003;
    // sum = 0;

    for (let i = 0; i < data.length - 1; i++) {
      drawLine(
        (600 / data.length) * i + 300,
        data[i] * 10 + 300,
        (600 / data.length) * (i + 1) + 300,
        data[i + 1] * 10 + 300
      );

      drawLine(
        600 + Math.cos(i * dob) * data[i] * 100,
        200 - Math.sin(i * dob) * data[i] * 100,
        600 + Math.cos((i + 1) * dob) * data[i + 1] * 100,
        200 - Math.sin((i + 1) * dob) * data[i + 1] * 100
      );
      sum += Math.cos(i * dob) * data[i];
      // context.fillRect(
      //   200 + Math.cos(i * dob) * data[i] * 100,
      //   200 - Math.sin(i * dob) * data[i] * 100,
      //   2,
      //   2
      // );
    }
    sum /= data.length - 1;
    // console.log(sum);
    if (reverseFourier.length < 400) {
      reverseFourier.push({ freq: dob, amp: sum });
    }
    for (let i = 0; i < data.length - 1; i++) {
      drawLine(
        dob * 5000,
        300 - sum * 100 + 200,
        dob * 5000,
        300 - lastsum * 100 + 200
      );
    }
  }
  if (reverseFourier.length == 400 && doneReverse == false) {
    for (let i = 0; i < reverseFourier.length; i++) {
      for (let j = 0; j < reverseFourierFinal.length; j++) {
        reverseFourierFinal[j] +=
          Math.sin(j * reverseFourier[i].freq * 4) * reverseFourier[i].amp;
      }
    }
    doneReverse = true;
  }
  if (doneReverse) {
    for (let j = 0; j < reverseFourierFinal.length; j++) {
      context.fillRect(j, 100 + reverseFourierFinal[j] * 20, 2, 2);
    }
  }
}
function update() {}
