require([
  "ditagis/classes/ConstName",
  "ditagis/config",
  "esri/Map",
  "esri/tasks/Locator",
  "ditagis/classes/MapView",
  "esri/layers/OpenStreetMapLayer",
  "esri/layers/MapImageLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/WebTileLayer",
  "esri/widgets/Expand",
  "esri/widgets/Locate",
  "esri/widgets/LayerList",
  "esri/widgets/Legend",
  "esri/widgets/Search",
  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/request",
  "esri/renderers/UniqueValueRenderer",
  "esri/symbols/SimpleMarkerSymbol",
  "ditagis/classes/SystemStatusObject",

  "ditagis/widgets/User",
  "ditagis/widgets/Popup",
  "ditagis/support/HightlightGraphic",
  'esri/symbols/SimpleFillSymbol',
  'esri/symbols/SimpleLineSymbol',
  "dojo/on",
  "dojo/dom-construct",
  "dojo/sniff",
  "css!ditagis/styling/dtg-map.css"


], function (constName, mapconfigs, Map, Locator, MapView, OpenStreetMapLayer, MapImageLayer, FeatureLayer, WebTileLayer,
  Expand, Locate, LayerList, Legend, Search,
  QueryTask, Query, esriRequest,
  UniqueValueRenderer, SimpleMarkerSymbol,
  SystemStatusObject,
  UserWidget, Popup, HightlightGraphic, SimpleFillSymbol, SimpleLineSymbol,
  on, domConstruct, has
) {
    'use strict';
    var systemVariable = new SystemStatusObject();
    var map = new Map({
      // basemap: 'osm'
    });
    var view = new MapView({
      container: "map", // Reference to the scene div created in step 5
      map: map, // Reference to the map object created before the scene
      center: mapconfigs.center,
      zoom: mapconfigs.zoom
    });
    var basemap, worldImage, osm;
    view.session().then(user => {
      systemVariable.user = user
      let definitionExpression;
      if (Math.floor(systemVariable.user.role / 100) === 7) { //role bat dau tu so 7
        definitionExpression = `MaHuyenTP = '${systemVariable.user.role.trim()}'`; //vi du role = 725, => MaHuyenTP = 725
      }

      view.systemVariable = systemVariable;
      const initBaseMap = () => {
        let bmCfg = mapconfigs.basemap; //basemap config
        if (definitionExpression) {
          for (let sublayer of bmCfg.sublayers) {
            sublayer.definitionExpression = definitionExpression;
          }
        }
        bmCfg.visible = false;
        basemap = new MapImageLayer(bmCfg);
        basemap.watch('visible', function (value) {
          if ($)
            $.notify(value ? 'Hiển thị dữ liệu nền' : 'Ẩn dữ liệu nền');
        });
        basemap.then(() => {
          if (definitionExpression) {
            let layer = basemap.findSublayerById(constName.INDEX_HANHCHINHHUYEN);
            let query = layer.createQuery();
            query.where = definitionExpression;
            query.returnGeometry = true;
            query.outSpatialReference = view.spatialReference;
            layer.queryFeatures(query).then(res => {
              let ft = res.features[0];
              view.goTo({
                target: ft.geometry
              })
            })
          }
        })
        worldImage = new WebTileLayer({
          urlTemplate: '//mt1.google.com/vt/lyrs=y&x={col}&y={row}&z={level}',
          title: 'Ảnh vệ tinh',
          id: 'worldimagery',
          visible: true
        });
        osm = new WebTileLayer({
          title: 'Đường đi',
          urlTemplate: '//mt1.google.com/vt/lyrs=m&x={col}&y={row}&z={level}',
          id: 'osm',
          visible: false
        })
        map.addMany([osm, worldImage, basemap])

        function watchVisible(newValue, oldValue, property, target) {
          if (newValue) {
            switch (target) {
              case osm:
                basemap.visible = worldImage.visible = !newValue;
                // map.findLayerById(constName.TRONGTROT).opacity = 1;
                break;
              case basemap:
                osm.visible = worldImage.visible = !newValue;
                // map.findLayerById(constName.TRONGTROT).opacity = 1;
                break;
              case worldImage:
                osm.visible = basemap.visible = !newValue;
                // map.findLayerById(constName.TRONGTROT).opacity = 0.7;
                break;
            }
          }
        }
        osm.watch('visible', watchVisible)
        worldImage.watch('visible', watchVisible)
        basemap.watch('visible', watchVisible)
      }
      const initFeatureLayers = () => {
        /**
         * Lấy attachments của feature layer
         */
        FeatureLayer.prototype.getAttachments = function (id) {
          return new Promise((resolve, reject) => {
            var url = this.url + "/" + this.layerId + "/" + id;
            esriRequest(url + "/attachments?f=json", {
              responseType: 'json',
              method: 'get'
            }).then(result => {
              resolve(result.data || null);
            });
          });
        }
        return new Promise((resolve, reject) => {
          esriRequest('/map/layerrole', {
            method: 'post'
          }).then(res => {
            if (res.data) {
              for (let lr of res.data) {
                let layer = mapconfigs.layers.find(f => f.id === lr.layer);
                layer.permission = {
                  create: lr.isCreate,
                  view: lr.isView,
                  delete: lr.false,
                  edit: lr.false
                }

              }
              for (var i in mapconfigs.layers) {
                let element = mapconfigs.layers[i];
                if (element.permission.view) {
                  if (element.id === constName.SAUBENH || element.id === constName.DOANHNGHIEP) {
                    continue;
                  }
                  if (definitionExpression) {
                    if (element.definitionExpression) {
                      element.definitionExpression += ` and ` + definitionExpression;
                    } else {
                      element.definitionExpression = definitionExpression;
                    }
                    element.definitionExpression = definitionExpression;
                  }
                  if (element.id === constName.TRONGTROT)
                    element.opacity = 0.7
                  let fl = new FeatureLayer(element);
                  map.add(fl);
                }
              }
              resolve();
            } else {
              throw 'cannot request permission';
            }
          })

        });
      }
      const initWidgets = () => {
        var userWidget = new UserWidget(view);
        userWidget.startup();
        view.ui.move(["zoom"], "top-left");
        //LAYER LIST
        view.ui.add(new Expand({
          expandIconClass: "esri-icon-layer-list",
          view: view,
          content: new LayerList({
            container: document.createElement("div"),
            view: view
          })
        }), "top-left");


        //LOCATE
        view.ui.add(new Locate({
          view: view
        }), "top-left");
        //neu khong phai la thiet bi di dong
        //LEGEND
        view.ui.add(new Expand({
          expandIconClass: "esri-icon-collection",
          content: new Legend({
            view: view,
          })
        }), "top-left");
        var hightlightGraphic = new HightlightGraphic(view, {
          symbolPlg: new SimpleFillSymbol({
            style: "none",
            outline: new SimpleLineSymbol({ // autocasts as SimpleLineSymbol
              color: "black",
              width: 3
            })
          })
        });
        // Widget Search Features //
        let locator = new Locator({
          url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
          countryCode: "VNM"
        });
        var searchWidget = new Search({
          searchAllEnabled: false,
          view: view,
          allPlaceholder: "Nhập nội dung tìm kiếm",
          sources: [{
            locator: locator,
            name: "Tìm địa chỉ",
            searchFields: ["*"],
            placeholder: "Nhập địa chỉ",
            popupOpenOnSelect: false,
            suffix: ", Bình Dương",
            resultGraphicEnabled: false,
            displayField: "Address",
          }, {
            featureLayer: map.findLayerById(constName.SAUBENH),
            searchFields: ["OBJECTID", "MaSauBenh", "MaHuyenTP"],
            displayField: "MaSauBenh",
            exactMatch: false,
            outFields: ["*"],
            name: "Sâu hại",
            placeholder: "Tìm kiếm theo tên, loại cây trồng, huyện/tp",
          }, {
            featureLayer: map.findLayerById(constName.DOANHNGHIEP),
            searchFields: ["OBJECTID", "MaDoanhNghiep", "NguoiDaiDienDoanhNghiep"],
            displayField: "NguoiDaiDienDoanhNghiep",

            exactMatch: false,
            outFields: ["*"],
            name: "Doanh Nghiệp",
            placeholder: "Nhập tên hoặc mã Doanh nghiệp",
          }, {
            featureLayer: map.findLayerById(constName.TRONGTROT),
            searchFields: ["MaDoiTuong"],
            displayField: "MaDoiTuong",

            exactMatch: false,
            outFields: ["*"],
            name: "Trồng Trọt",
            placeholder: "Nhập mã đối tượng Trồng trọt",
          }, {
            featureLayer: new FeatureLayer({
              // url: mapconfigs.basemap.url + '/' + constName.INDEX_HANHCHINHHUYEN
              url: "https://ditagis.com:6443/arcgis/rest/services/BinhDuong/DuLieuNen/MapServer/4"
            }),
            searchFields: ["MaPhuongXa", "TenXa"],
            displayField: "TenXa",
            outFields: ["*"],
            filter: {
              where: `${definitionExpression ? definitionExpression : '1=1'}`
            },
            name: "Hành chính xã",
            placeholder: "Nhập tên xã/ phường",
            popupOpenOnSelect: false,
            resultGraphicEnabled: false
          }]
        });
        // Add the search widget to the top left corner of the view
        view.ui.add(searchWidget, {
          position: "top-right"
        });
        searchWidget.on('search-complete', e => {
          hightlightGraphic.clear();
          let hanhChinh = e.results.find(f => {
            return f.sourceIndex === 4
          });
          if (hanhChinh && hanhChinh.results.length > 0) {
            let graphic = hanhChinh.results[0].feature;
            hightlightGraphic.add(graphic);
          }
        })
        /**
         * Layer Editor
         */
        var popup = new Popup(view);
        popup.startup();
      }

      initBaseMap();
      initFeatureLayers().then(() => {
        initWidgets();
        map.reorder(basemap, 5)
      })


      Loader.hide();
    })
  })