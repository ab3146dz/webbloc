var  myObj, x, txt = "", map;
		var monSet= new Set();
		var valopt, option;
		rafraichirListe(true,'choixC','c0','monchoix1');
		

		function rafraichirListe(cat,fchoix,idd,monchoix){
			var str=document.getElementById("catchoix").value.toUpperCase();
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			        myObj = JSON.parse(this.responseText);
			        
			        txt="<select id=\""+monchoix+"\" onchange=\"fchoix()\">";
			        txt+="<option value=\"\" disabled selected>choisissez </option>";
			        for (x in myObj.manif) {
			        	chaine=myObj.manif[x]["Nom de la manifestation"];
			        	categorie=myObj.manif[x]["Catégorie de la manifestation"];
			        	if(cat){
			        		valopt=categorie;
			        		option=categorie;
			        		if (monSet.has(categorie)) continue;
			        		monSet.add(categorie);
			        	}
			        	else {
			        		valopt=myObj.manif[x].Identifiant;
			        		option=chaine;
				        	if((str!="") && (categorie.toUpperCase().search(str) == -1)){

				        		continue;
				        	}
			        	}
			             
			            txt +="<option value='"+valopt+"'>"+ option + "</option>";
			            
			        }
			        txt+="</select>";
			        document.getElementById(idd).innerHTML = txt;
			    }
			};

			xmlhttp.open("GET", "agendaManif31.json", true);
			xmlhttp.send();
		}

		var marker;
		function fchoix(){
			if (document.getElementById("catchoix").value!="") 
				choixM();
			else
				choixC()
		}
		function choixC(){
			document.getElementById("catchoix").value=document.getElementById("monchoix1").value;
			rafraichirListe(false,choixM,'demo','monchoix2');
		}

		function choixM(){
			var val = document.getElementById("monchoix2").value;

			/*var y;
			//console.log(typeof(val));
			for (x in myObj.manif){
				//console.log(myObj.manif[x].identifiant);
				if (myObj.manif[x].Identifiant == val){
					y=myObj.manif[x];
					console.log(y);
					break;
				}

			}*/
			var y,txt="",i=0;
			//console.log(typeof(val));
			for (x in myObj.manif){
				//console.log(myObj.manif[x].identifiant);
				if (myObj.manif[x].Identifiant == val){
					y=myObj.manif[x];
					for (z in y){
						if(y[z]=="" || z=="Identifiant") continue;
						if (y[z].length>="")
						txt+="<label for='x"+i+"'>"+z+"</label><input class=\"form-control\"  type=\"text\" id=\"x"+i+"\"  value=\""+y[z]+"\" readonly/>";
						i++;
					}
					document.getElementById("div1").innerHTML=txt;

					break;
				}

			}


			//console.log(y);
			lati=Number(y["GoogleMap latitude"]);
			longi=Number(y["GoogleMap longitude"]);
			document.getElementById("c0").value=y["Catégorie de la manifestation"];
			document.getElementById("c1").value=y["Nom de la manifestation"];
			document.getElementById("c2").value=y["Descriptif court"];
			document.getElementById("c3").value="du "+y["Date début"]+" au "+y["Date fin"];
			document.getElementById("c6").value=y["Lieu - nom"];
			document.getElementById("c7").value=y["Type de manifestation"];
			document.getElementById("c8").value=y["Thème de la manifestation"];
			document.getElementById("c4").value=lati;
			document.getElementById("c5").value=longi;

			//document.getElementById("coord").innerHTML="Votre choix :  "+commune+" "+codpostal+" "+lati+"/"+longi;
			var myCenter = new google.maps.LatLng(lati,longi);
  			var mapCanvas = document.getElementById("mapgoogle");
  			var mapOptions = {
  				center: myCenter,
  				zoom: 10,
  				mapTypeControlOptions: {
			      mapTypeIds: [
			        google.maps.MapTypeId.ROADMAP,
			        google.maps.MapTypeId.SATELLITE
			      ],
			      position: google.maps.ControlPosition.BOTTOM_LEFT
			    }

  				
  			};
  			map = new google.maps.Map(mapCanvas, mapOptions);
			//map = new google.maps.Map(document.getElementById('mapgoogle'), {
		    //center: {lat: 35.298753, lng: -0.982067},
		    //center: {lat: lati, lng: longi},
		    //zoom: 10		  });
		    

      
      
			marker = new google.maps.Marker({
				map: map,
				draggable: true,
    			animation: google.maps.Animation.DROP,
				position:myCenter,
				title: "click pour +info"
			});
  			//marker.setMap(map);
  			//marker.addListener('click', toggleBounce);
  			var contentString = '<div id="content">'+
		      '<div id="siteNotice">'+
		      '</div>'+
		        '<h3 id="firstHeading" class="firstHeading">'+y["Nom de la manifestation"]+'</h3>'+
		        '<div id="bodyContent">'+
		          '<p>Lieu: <b>'+y['Lieu - nom']+'</b><br>'+y['Lieu - adresse 1']+ " "+y['Lieu - adresse 2']+" "+y['Lieu - adresse 3']+" "+y['Code postal']+" "+y['Commune']+""+
		          "</p>"+
		        "</div>"+
		      "</div></div></div>";

		      var infowindow = new google.maps.InfoWindow({
        		content: contentString
      		});
  			marker.addListener('click', function() {
		        infowindow.open(map, marker);   });
			
  			

  			/*
  			Les itinéraires en vert foncé indiquent des voies réservées aux vélos. Les itinéraires en vert clair indiquent des rues avec des pistes cyclables. Les itinéraires en pointillés indiquent des rues ou des chemins recommandés pour le vélo.
  			*/
  			//var bikeLayer = new google.maps.BicyclingLayer();
 			// bikeLayer.setMap(map);
		}

		function toggleBounce() {
			  if (marker.getAnimation() !== null) {
			    marker.setAnimation(null);
			  } else {
			    marker.setAnimation(google.maps.Animation.BOUNCE);
			  }
		}    
		    

		//var map; //, lati=35.298753, longi=-0.982067;
		function initMap() {
		  
		}