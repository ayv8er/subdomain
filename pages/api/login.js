import { Magic } from "@magic-sdk/admin";

const mAdmin = new Magic(process.env.MAGIC_SECRET_KEY);

const login = async (req, res) => {
  try {
    const didToken = req.headers.authorization.substr(7);
    await mAdmin.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default login;
