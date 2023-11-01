const express = require('express');
const path = require('path');
const QRCode = require('qrcode');
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const data = 'some data here '; // The data you want to encode in the QR code
  const outputPath = path.join(__dirname, 'public', 'qr-code.png'); // Fix the path.join issue

  QRCode.toFile(outputPath, data, (error) => {
    if (error) {
      console.error('Error generating QR code:', error);
      res.status(500).send('Error generating QR code');
    } else {
      console.log('QR code generated and saved to', outputPath);
      res.render('qrCode', { qrCodeImage: 'qr-code.png'});
    }
  });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
