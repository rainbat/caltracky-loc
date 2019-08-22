		$('#location').on('click', function () {

			var onSuccess = function(position) {
				  log('Latitude: '          + position.coords.latitude          + '\n' +
				      'Longitude: '         + position.coords.longitude         + '\n' +
				      'Altitude: '          + position.coords.altitude          + '\n' +
				      'Accuracy: '          + position.coords.accuracy          + '\n' +
				      'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
				      'Heading: '           + position.coords.heading           + '\n' +
				      'Speed: '             + position.coords.speed             + '\n' +
				      'Timestamp: '         + position.timestamp                + '\n');
				};

			function onError(error) {
			    log('code: '    + error.code    + '\n' +
			          'message: ' + error.message + '\n');
			}

			window.navigator.geolocation.getCurrentPosition(onSuccess, onError);

		});

		var watchID = "";

		$('#watchPosition').on('click', function () {

			function onSuccess(position) {
			    /*alert('Latitude: '          + position.coords.latitude          + '\n' +
				      'Longitude: '         + position.coords.longitude         + '\n' +
				      'Altitude: '          + position.coords.altitude          + '\n' +
				      'Accuracy: '          + position.coords.accuracy          + '\n' +
				      'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
				      'Heading: '           + position.coords.heading           + '\n' +
				      'Speed: '             + position.coords.speed             + '\n' +
				      'Timestamp: '         + position.timestamp                + '\n');*/
				
				log( "moving with :" + position.coords.speed );
				
				if( position.coords.speed > 5 ){
				
				  cordova.plugins.notification.local.schedule({
					    title: 'Moving !',
					    text: "moving with :" + position.coords.speed,
					    progressBar: { value: 20 }
				  });
				
				}

			}

			function onError(error) {
			    log('code: '    + error.code    + '\n' +
			          'message: ' + error.message + '\n');
			}

			var watchID = window.navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 240000, frequency: 1000 });
			
		});

		$('#clearWatchPosition').on('click', function () {
			window.navigator.geolocation.clearWatch(watchID);
		});