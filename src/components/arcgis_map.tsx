import { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";

const ArcGisMap = (props:any)=> {

  const mapDiv = useRef(null)

  useEffect(() => {
    if (mapDiv?.current) {
      /**
       * Initialize application
       */
      const webmap = new WebMap({
        portalItem: {
          id: props.profileId
        }
      });

      const view = new MapView({
        container: `mapDiv`,
        map: webmap
      });

      // Bonus - how many bookmarks in the webmap?
      view.when(() => {
        if (webmap.bookmarks && webmap.bookmarks.length) {
          console.log("Bookmarks: ", webmap.bookmarks.length);
        } else {
          console.log("No bookmarks in this webmap.");
        }
      });
    }
  }, []);

  return <div style={{width:"100%",height:500}} ref={mapDiv} id="mapDiv"></div>;
}

export default ArcGisMap;