import { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";

const ArcGisMap = ()=> {

  const mapDiv = useRef(null)

  useEffect(() => {
    if (mapDiv?.current) {
      /**
       * Initialize application
       */
      const webmap = new WebMap({
        portalItem: {
          id: "48908367c2d24cd9a2989bcc6b52e7c1"
        }
      });

      const view = new MapView({
        container: "mapDiv",
        map: webmap
      });

    //   const bookmarks = new Bookmarks({
    //     view
    //   });

    //   const bkExpand = new Expand({
    //     view,
    //     content: bookmarks,
    //     expanded: true
    //   });

      // Add the widget to the top-right corner of the view
    //   view.ui.add(bkExpand, "top-right");

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