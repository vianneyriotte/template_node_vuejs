export default {
	Http400: (res) => {
		return res.status(400);
	},
	Http200: (res, data) => {
		return res.status(200).send({ ok: true, data: data });
	},
	Http500: (res, err) => {
		return res.status(500).send({ ok: false, error: err });
	},
	Http401: (res, err) => {
		return res.status(401).send({ ok: false, error: err });
	}
};
