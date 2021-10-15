let base_url
if (process.env.NODE_ENV === 'production'){
	base_url = '';
}
else {
	base_url = 'http://localhost:8888';
}

export default base_url