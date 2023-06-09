import nc from 'next-connect';

function onError(err, req, res, next) {
  res.status(500).end();
}

const handler = nc({
  onError: onError,
  onNoMatch: (req, res) => {
    res.status(404).send('Page is not found');
  },
});

export default handler;
