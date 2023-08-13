function init(){
	const section = document.createElement('section');
	const img = document.createElement('img');
	const button = document.createElement('button');
	const title = document.createElement('h1');

	img.src = './assets/init.png';	
	console.log(img);
	section.append(img, button, title);
	return section;
}

export default init;
