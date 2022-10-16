import bcrypt from 'bcrypt'

export const generatePass = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

export const verifyPassword = async (password, password2) => {
	const isSame = await bcrypt.compare(password2, password);
	return isSame;
};
