var renderer;
var stats;
function initThree(){
	 width = document.getElementById('canvas-frame').clientWidth;
	height = document.getElementById('canvas-frame').clientHeight;
	renderer = new THREE.WebGLRenderer({
		antialias : true
	});
	renderer.setSize(width, height);
	document.getElementById('canvas-frame').appendChild(renderer.domElement);
	renderer.setClearColor(0xffffff, 1.0);
	
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.getElementById('canvas-frame').appendChild(stats.domElement);
}

var camera;

function initCanera(){
	camera = new THREE.PerspectiveCamera(45,width/height,1,10000);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 600;
	camera.up.x = 0;
	camera.up.y = 1;
	camera.up.z = 0;
	camera.lookAt({
		x:0,
		y:0,
		z:0
	})
}

var scene;
function initScene(){
	scene = new THREE.Scene();
}

var light;
function initLight(){
	light = new THREE.AmbientLight(0xffffff);
	light.position.set(0, 0, 0);
	scene.add(light);
	light = new THREE.PointLight(0xffffff,1,150);
	light.position.set(0, 0, 250);  //越大说明圆柱照到的光面积越广,由于光线的亮度不会随着距离的增加而减弱.所以看起来越亮
	scene.add(light);
}

var cube;
var mesh;
function initObject(){
	var geometry = new THREE.CylinderGeometry( 100,150,400);
	//备注!!!:这是一个上面半径为100,下面半径为150的圆柱体体体体体,半径是完成整的,可不是一半,换句话说,如果灯光设置小于100,则是看不见的没如果在100到150之间,只能看到一半,大于150才能关不照射到
	//THREE.CylinderGeometry:圆柱体
	// radiusTop	可选。此属性定义圆柱体顶部圆半径。默认值是 20
	// radiusBottom	可选。此属性定义圆柱体底部圆半径。默认值是 20
	// height	可选。此属性定义圆柱体的高度。默认值是 100
	// radiusSegments	可选。此属性定义圆柱体的上下部的圆截面分成多少段。默认值是 8
	// heightSegments	可选。此属性定义圆柱体竖直方向上分成多少段。默认值是 1
	// openEnded	可选。此属性定义圆柱体的顶部和底部是否为打开。默认值是 false

	var material = new THREE.MeshLambertMaterial( {color:0x339933} ); //!!!:不要写成黑色哦,看都看不出来,调了大半天
	// colo:color（颜色）
	// opacity:opacity（不透明度）
	// shading:shading（着色）
	// blendin:blending（融合）
	// depthTes:高级属性
	// depthWrite:高级属性
	// wireframe:wireframe（线框）
	// wireframeLinewidth:wireframeLinewidth（线框线宽）
	// wireframeLinecap:wireframeLinecap（线框线段端点）
	// wireframeLineJoin:wireframeLinejoin（线框线段连接点）
	// vertexColors:vertexColors（顶点颜色）
	// fog:fog（雾化）
	mesh = new THREE.Mesh(geometry,material);
	mesh.position = new THREE.Vector3(0,0,0);
	scene.add(mesh)
}

function initTween(){
    new TWEEN.Tween(mesh.position).to( { x: 400 }, 1000 ).easing(TWEEN.Easing.Sinusoidal.InOut).start();
}

function threeStart(){
	initThree();
	initCanera();
	initScene();
	initLight();
	initObject();
	initTween();
	animation();
	
}

function animation(){
	// camera.position.x = camera.position.x+1; //相机动
	// mesh.position.x-=1;   //物体动
	renderer.render(scene,camera);
	requestAnimationFrame(animation);
	stats.update();
	TWEEN.update();
}