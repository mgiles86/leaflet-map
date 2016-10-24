/* -- Define the map object -- */
var map = L.map('map').setView([45.528, -122.680], 13);

/*-- Add Layers --*/
L.esri.basemapLayer("Topographic", {
    detectRetina: true
}).addTo(map);

var defaultStyle = { color: "#70ca49", weight: 2 },
    highlightStyle = { color: "#70ca49", weight: 4 },
    parks = L.esri.featureLayer({
        url: "https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Portland_Parks/FeatureServer/0",
        style: function() {
            return defaultStyle;
        },
        onEachFeature: function(feature, layer) {
            //highlight feature
            layer.on("mouseover", function(e) {
                highlightFeature(layer);
            });

            //unhighlight feature
            layer.on("mouseout", function(e) {
                if (!selected || feature != selected.feature)
                    unhighlightFeature(layer);
            });

            //click listener - populate attributes
            layer.on("click", function(e) {
                setSelectedFeature(feature, layer);
            });
        }
    }).addTo(map);

//highligh the feature - why does this work on layer??
function highlightFeature(layer) {
    layer.setStyle(highlightStyle);
}

//highligh the feature - why does this work on layer??
function unhighlightFeature(layer) {
    layer.setStyle(defaultStyle);
}

var selected;

function setSelectedFeature(feature, layer) {
    if (selected)
        unhighlightFeature(selected.layer);

    selected = { feature: feature, layer: layer };
    highlightFeature(selected.layer);
    console.log(selected.feature.properties);
}
