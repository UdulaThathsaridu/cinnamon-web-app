const loadGoogleMaps = (callback) => {
    const existingScript = document.getElementById('googleMaps');
  
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDpncyKPflJL2jFGqvFuGxf_mhEg9ZWK_k`;
      script.id = 'googleMaps';
      document.body.appendChild(script);
  
      script.onload = () => {
        if (callback) callback();
      };
    }
  
    if (existingScript && callback) callback();
  };
  
  export default loadGoogleMaps;
  