var renderer;
            function initThree() {
                width = document.getElementById('canvas-frame').clientWidth;
                height = document.getElementById('canvas-frame').clientHeight;
                renderer = new THREE.WebGLRenderer({
                    antialias : true
                });
                renderer.setSize(width, height);
                document.getElementById('canvas-frame').appendChild(renderer.domElement);
                renderer.setClearColor(0xFFFFFF, 1.0);
            }

            var camera;
            function initCamera() {
				console.info(width,height,window.screen.width,window.screen.height);
                camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
                camera.position.x = 0;
                camera.position.y = 500;
                camera.position.z = 0;
				//up:哪个轴在上面
                camera.up.x = 0;
                camera.up.y = 0;
                camera.up.z = 1;
                camera.lookAt({
                    x : 0,
                    y : 0,
                    z : 0
                });
            }
			
			// 1个单位（一般为1米）对应屏幕多少像素
			//camera.position.y = 500;
			// (45,w/h,1,1000)，屏幕分辨率708*600为例
			//2*tan(22.5) = 2* 0.414213562373 = 0.82842
			// 计算屏幕近景裁剪面的高 h = 2*tan(22.5)*500 = 0.82842 * 500 = 414.21
			//  600/ (2*tan(22.5)*(ZNear+z)) (ZNear是第三个参数,例子为1,z:500-1)
			//1单位 = 600 /   414.21   =1.7px
			
            var scene;
            function initScene() {
                scene = new THREE.Scene();
            }

            var light;
            function initLight() {
                light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
                light.position.set(100, 100, 200);
                scene.add(light);
            }

            var cube;
            function initObject() {
				console.info(window.screen.height,8888); 1200
                var geometry = new THREE.Geometry();
                geometry.vertices.push( new THREE.Vector3( - 500, 0, 0 ) );
                geometry.vertices.push( new THREE.Vector3( 500, 0, 0 ) );

                for ( var i = 0; i <= 20; i ++ ) {
                    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 0.2 } ) );
					line.position.z =  ( i * 50 ) - 500;
					scene.add( line );
                    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
                    line.position.x = ( i * 50 ) - 500;
                    // line.rotation.y = 90 * Math.PI / 180; //旋转90度
                    scene.add( line );
                }
            }

            function threeStart() {
                initThree();
                initCamera();
                initScene();
                initLight();
                initObject();
                renderer.clear();
                renderer.render(scene, camera);
            }