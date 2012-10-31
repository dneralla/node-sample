function fblogin() {

        
		 if (FB)
		  { 
		     FB.api('/me/feed' function(response) {
		           
                   var ul = document.getElementById('posts');
                   for (var i=0, l=response.length; i<l; i++) {
                     var post = response.data[i];
                     a = document.createElement('h');
                     a.innerHtml = post.message;
                  
                      
                      ul.appendChild(a);
                   }
              });
                   
	        } else {
	                   console.log("user cancelled, not fetching");
	                }

	            }, {perms:'read_stream,publish_stream,offline_access,user_photos,friends_photos,user_photo_video_tags,friends_photo_video_tags'});
		  }
		 else
			 {
			 alert("fb not initialized properly");
			 }
	     }
	     
	     
        
           
            //calls init function once all the resources are loaded
            