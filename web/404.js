var SCREEN_WIDTH = window.innerWidth,
			SCREEN_HEIGHT = window.innerHeight,

			mouseX = 0, mouseY = 0,

			windowHalfX = window.innerWidth / 2,
			windowHalfY = window.innerHeight / 2,

			SEPARATION = 200,
			AMOUNTX = 80,
			AMOUNTY = 80,

			camera, scene, renderer;

			init();
			animate();

			function init() {

				var container, separation = 200, amountX = 80, amountY = 80,
				particles, particle;
        
				container = document.createElement('div');
				document.body.appendChild(container);

				camera = new THREE.PerspectiveCamera( 85, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.z = 1000;

				scene = new THREE.Scene();

				renderer = new THREE.CanvasRenderer({ alpha: true });
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				container.appendChild( renderer.domElement );

        
        
				// particles

				var PI2 = Math.PI * 2;
				var material = new THREE.SpriteCanvasMaterial( {

					color: 0xffffff,
					program: function ( context ) {

						context.beginPath();
						context.arc( 0, 0, 0.6, 0, PI2, true );
						context.fill();

					}

				} );

				for ( var i = 0; i < 4500; i ++ ) {

					particle = new THREE.Sprite( material );
					particle.position.x = Math.random() * 2 - 1;
					particle.position.y = Math.random() * 4 - 1;
					particle.position.z = Math.random() * 2 - 1;
					particle.position.normalize();
					particle.position.multiplyScalar( Math.random() * 10 + 600 );
					particle.scale.multiplyScalar( 2 );
					scene.add( particle );

				}

				// lines

				for (var i = 0; i < 3000; i++) {

					var geometry = new THREE.Geometry();

					var vertex = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 4 - 1 );
					vertex.normalize();
					vertex.multiplyScalar( 100 );
          // Put 0 to remove lines
					geometry.vertices.push( vertex );

					var vertex2 = vertex.clone();
					vertex2.multiplyScalar( Math.random() * 0 + 1 );

					geometry.vertices.push( vertex2 );

					var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: Math.random() } ) );
					scene.add( line );
				}

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function onDocumentMouseMove(event) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}

			function onDocumentTouchStart( event ) {

				if ( event.touches.length > 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;

				}

			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length == 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 1 ].pageX - windowHalfX;
					mouseY = event.touches[ 1 ].pageY - windowHalfY;

				}

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {
        

				camera.position.x += ( mouseX - camera.position.x ) * 1;
				camera.position.y += ( - mouseY + 300 - camera.position.y ) * 0.05;
				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}