let barc = document.getElementById('p1');
let monza = document.getElementById('p2');
let bra = document.getElementById('p3');
let jap = document.getElementById('p4');
const distanceButton = document.getElementById("distance");
const areaButton = document.getElementById("area");
const clearButton = document.getElementById("clear");
require([
    "esri/Map",
    "esri/views/SceneView",
    "dijit/form/Button",
    "esri/layers/FeatureLayer",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/widgets/Legend",
    "esri/widgets/Search",
    "esri/widgets/LayerList",
    "esri/widgets/Measurement"
    ],(Map, SceneView, Button, FeatureLayer, Graphic, GraphicsLayer, BasemapGallery, Expand, Legend, Search, LayerList, Measurement) => {

        const layer = new FeatureLayer({
            url: "https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/tory_f1/FeatureServer?token=qpwp-gwRMM8t-wUCY__1wsvzsf53p7MrUDMma7IsGub6nsB3G5JamuPTDteo09NGUKpFwG2Q7hBCHyvWVKC_NgmjIkIhe_Sml5NKs7WzYLtJiMCrt1g7dWTKSuozhLeCgbh7XFz8v2HA-urwYCTK70VEPzhpODj18sq7wt906mqPdO27BcDVBE-EVnn2KHKBX40rT5oGc5Ue932Olwz8FD8_ro34TZ5llG2iBxZvoPcSRl8fY1DRHTdf2rrMvauhttps://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/tory_f1/FeatureServer?token=4mpNTl_smuJjGxoqEpXZXHMUcCk3EidAA_hPtGUZstoUVXDLqAOo1mTygvV3xbhxHDUzkdw4YYeQzd4BlPys_LAowolT2vLP7VcNMXfyGO3_w2NL6dlSBeDfksG2wvjfVnauUdFTt-TYmBwog4_MFScYjIHu0AoOR0zZO11Bmp9ec_4HuZwuwYokQATxNaG8mczbFQ1Oxnw_e2QQOXzzxw1Ukl0nsJ7pANsd7NfG6SOIvoaSyg_Z9C6mXzcQeS6w",
            outFields: ["Nazwa", "Pazstwo"],
            popupTemplate: { 
                title: "Tory F1",
                content: "<b>Nazwa:</b> {Nazwa}<br><b>Państwo:</b> {Pazstwo}"}
        });

        const map1 = new Map({
            basemap: "streets-night-vector",
            ground: "world-elevation",
            layers: [layer]
        });
        let view = new SceneView({
            map: map1,
            container: "mapDiv",
            zoom: 1,
            center: [2.2596828,41.5684243],
            // camera: {
            //     position: [2.2588828, 41.5334243, 2000],
            //     tilt: 65,
            //     heading: 0
            // }
        });

        let opts = {
            duration: 10000  // Duration of animation will be 5 seconds
        };
        monza.addEventListener("click",function() {
            view.goTo({
                center: [9.2826113,45.615799],
                zoom: 16,
                tilt: 65,
                heading: 0
            }, opts);

        });
        barc.addEventListener("click",function() {
            view.goTo({
                center: [2.2596828,41.5684243],
                zoom: 16,
                tilt: 65,
                heading: 0
            }, opts);
        });
        bra.addEventListener("click",function() {
            view.goTo({
                center: [-46.6974789,-23.7043574],
                zoom: 17,
                tilt: 65,
                heading: 0
            },opts);
        });
        jap.addEventListener("click",function() {
            view.goTo({
                center: [136.5344467, 34.845628],
                zoom: 16,
                tilt: 65,
                heading: 0
            },opts);
        });


        const basemapGallerywg = new BasemapGallery({
            view: view
        });

        const expWg = new Expand({
            view: view,
            content: basemapGallerywg
        });
        view.ui.add(expWg,{position: "bottom-right"});

        let legend = new Legend({
            view: view
        });

        view.ui.add(legend, "bottom-left");

        const searchWidget = new Search({
            view: view
        });

        view.ui.add(searchWidget, {
            position: "top-right",
            index: 2
        });

        const layerList = new LayerList({
            view: view
        });

        view.ui.add(layerList, {
            position: "top-right"
        });

        const measurement = new Measurement();

        measurement.view = view;
        distanceButton.addEventListener("click", () => {
            distanceMeasurement();
        });
          areaButton.addEventListener("click", () => {
            areaMeasurement();
        });
        clearButton.addEventListener("click", () => {
            clearMeasurements();
        });

        function distanceMeasurement() {
            measurement.activeTool = "direct-line";
            distanceButton.classList.add("active");
            areaButton.classList.remove("active");
        }
        function areaMeasurement() {
            measurement.activeTool = "area";
            distanceButton.classList.remove("active");
            areaButton.classList.add("active");
        }

        // const measurement = new Measurement({
        //     view: view,
        //     activeTool: "direct-line"
        // });
        function clearMeasurements() {
            distanceButton.classList.remove("active");
            areaButton.classList.remove("active");
            measurement.clear();
        }
    });


