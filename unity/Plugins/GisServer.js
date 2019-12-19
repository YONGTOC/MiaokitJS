
let POLYGON_STYLE = 5;
let POLYGON3D_STYLE = 6;
let aServer = [
    "https://ss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv",
    "https://ss1.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv",
    "https://ss2.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv",
    "https://ss3.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv"
];
let aOriginServer = ["https://pcor.baidu.com/"];
let pVersion = "001";
let pUdt = "20190919";
let nPixelRatio = 1;
let pFeatureStyle = undefined;
let pWaite = [];

/// 加载特征参数。
function LoadFS(pCallback) {
    let pUrl = aServer[0] + "/sty/vpl.js?udt=" + pUdt + "&v=" + pVersion;

    Request(pUrl, function (aData) {
        pFeatureStyle = eval(aData.substring(20));
        pCallback();
    });
}

/// 加载矢量瓦片数据。
function LoadVectorTileData(nCol, nRow, nLevel, pCallback) {
    let pKey = GetTileKey(nCol, nRow, nLevel);
    let pUrl = GetTilesUrl(nCol, nRow, nLevel);
    
    if (!pFeatureStyle) {
        if (undefined === pFeatureStyle) {
            pFeatureStyle = null;
            LoadFS(function () {
                for (let func of pWaite) {
                    func();
                }
            });
        }
        pWaite.push(function () {
            Request(pUrl, function (aData) {
                pCallback(pKey, aData);
            });
        });        
    }
    else {
        Request(pUrl, function (aData) {
            pCallback(pKey, aData);
        });
    }
}

/// 获取瓦片ID。
function GetTileKey(nCol, nRow, nLevel) {
    return "B_NORMAL_MAP" + "_" + nCol + "_" + nRow + "_" + nLevel;
}

/// 获取瓦片数据URL。
function GetTilesUrl(nCol_, nRow_, nLeve_) {
    let nCol = CalcLoopParam(nCol_, nLeve_); // n
    let nRow = nRow_; // a
    let nPath = Math.abs(nCol + nRow) % aServer.length; // h
    let pPath = aServer[nPath]; // c

    if (2 === Math.abs(nCol + nRow) % 3) {
        pPath = aOriginServer[0];
    }

    let nLimit = (nLeve_ >= 3 && 9 >= nLeve_) ? 100 : 80; // u
    let pScaler = nPixelRatio > 1 ? "&scaler=2" : ""; //p
    let pParam = "x=" + nCol + "&y=" + nRow + "&z=" + nLeve_; // d
    pParam += "&styles=pl&p=0&cm=1&limit=" + nLimit + pScaler + "&udt=" + pUdt + "&v=" + pVersion; // d
    let pUrl = pPath + "/pvd/?qt=tile" + "&param=" + EncodeUrl(pParam); // f

    return pUrl;
}

/// 处理瓦片循环问题。
function CalcLoopParam(nCol, nLevel) {
    let nCount = 6 * Math.pow(2, nLevel - 3);
    let nStart = -nCount / 2;
    let nEnd = nCount / 2 - 1;

    for (; nCol > nEnd;) {
        nCol -= nCount;
    }

    for (; nStart > nCol;) {
        nCol += nCount;
    }

    return nCol;
}

/// 对瓦片数据URL进行编码。
function EncodeUrl(pUrl) {
    let pBinaryUrl = "";

    for (let i = 0; i < pUrl.length; i++) {
        let nChar = pUrl.charCodeAt(i) << 1; // n
        let pBinary = nChar.toString(2); // a
        let pBinary8 = pBinary; // r

        if (8 > pBinary.length) {
            pBinary8 = "00000000" + pBinary;
            pBinary8 = pBinary8.substr(pBinary.length, 8);
        }

        pBinaryUrl += pBinary8;
    }

    let nGap = 5 - pBinaryUrl.length % 5; // s
    let pAppend = ""; // l

    for (let i = 0; i < nGap; i++) {
        pAppend += "0";
    }

    pBinaryUrl = pAppend + pBinaryUrl;

    let pOut = "";

    for (let i = 0; i < pBinaryUrl.length / 5; i++) {
        let pSubstring = pBinaryUrl.substr(5 * i, 5); // n
        let nCode = parseInt(pSubstring, 2) + 50; // c
        let nChar = String.fromCharCode(nCode);
        pOut += nChar;
    }

    return pOut + nGap;
}

/// 解析瓦片数据。
function ParseData(pData, nLevel) {
    let jData = undefined;
    eval("jData = " + pData);

    return ParseRegion(jData, nLevel);
}

/// 解析区域几何数据。
function ParseRegion(jData, nLevel) {
    let aData = [];
    let nCount = 0;

    let jRegionList = jData[2]; // j
    let jRoadList = jData[6]; // f

    if (jRegionList) {
        for (let i = 0; i < jRegionList.length; i++) {
            let jRegion = jRegionList[i]; // m
            let jFStyle = pFeatureStyle[jRegion[5]]; // n

            if (18 <= nLevel && POLYGON3D_STYLE === jFStyle[0]) {
                let pID = jRegion[1];
                let nHeight = jRegion[3] * Math.pow(2, nLevel - 18);

                aData.push(0.0); // ID
                aData.push(1.0); // TYPE:"Building"
                aData.push(1.0); aData.push(1.0); aData.push(1.0); aData.push(1.0); // COLOR
                aData.push(nHeight); // HEIGHT

                ParseFeature(jRegion, "Building", aData); // POINTS

                nCount++;
            }
            else if (POLYGON_STYLE === jFStyle[0]) {
                if (jRegion[4] && "090301" === jRegion[4].toString()) {
                    continue;
                }

                let pColor = jFStyle[1]; // g
                let aColor = pColor.split(','); // n

                aData.push(0.0); // ID
                aData.push(2.0); // TYPE:"Area"
                aData.push(parseInt(aColor[0])); aData.push(parseInt(aColor[1])); aData.push(parseInt(aColor[2])); aData.push(parseInt(aColor[3])); // COLOR
                aData.push(0.0); // HEIGHT

                ParseFeature(jRegion, "Area", aData); // POINTS

                nCount++;
            }
        }
    }

    if (jRoadList) {
        for (let i = 0; i < jRoadList.length; i++) {
            let jRegion = jRoadList[i]; // r
            let jFStyle = pFeatureStyle[jRegion[5]]; // w

            let pColor = jFStyle[1]; // e
            let aColor = pColor.split(','); // m

            aData.push(0.0); // ID
            aData.push(3.0); // TYPE:"Road"
            aData.push(parseInt(aColor[0])); aData.push(parseInt(aColor[1])); aData.push(parseInt(aColor[2])); aData.push(parseInt(aColor[3])); // COLOR
            aData.push(0.0); // HEIGHT

            ParseFeature(jRegion, "Road", aData); // POINTS

            nCount++;
        }
    }

    return { m_nCount: nCount, m_aData: aData };
}

/// 解析几何数据。
function ParseFeature(jRegion, pType, aData) {
    let jPolygon = jRegion[0]; // f
    let x = 0.0; // a
    let z = 0.0; // g

    aData.push(jPolygon.length);

    if ("Building" === pType) {
        for (let i = 0; i < jPolygon.length; i++) {
            x += jPolygon[i][0] / 10;
            z += jPolygon[i][1] / 10;

            aData.push(x);
            aData.push(0.0);
            aData.push(z);
        }
    }
    else if ("Area" === pType || "Road" === pType) {
        for (let i = 0; i < jPolygon.length; i++) {
            x += jPolygon[i][0] / 10;
            z += jPolygon[i][1] / 10;

            // 顶点索引要逆序
            aData.push(x);
            aData.push(0.0);
            aData.push(z);
        }
    }
}

/// 获取百度地图瓦片。
function LoadBdmapTile(nCol, nRow, nLevel, pCallback) {
    LoadVectorTileData(nCol, nRow, nLevel, function (pKey, pText) {
        if (pText) {
            let pData = ParseData(pText, nLevel);
            pCallback(pData);
        }
        else {
            pCallback(null);
        }
    });
}


var http = require('http');
var https = require('https');
var url = require('url');

function Request(url, response) {
    https.get(url, function (req, res) {
        var text = '';

        req.on('data', function (data) {
            text += data;
        });

        req.on('end', function () {
            response(text);
        });
    }).on('error', function (err) {
        response(null);
    });
}

function start() {
    // http://127.0.0.1:8888/baidu_tile_3d?&x=47976&y=11284&l=18
    function onRequest(request, response) {
        let _url = url.parse(request.url, true);
        if (_url.pathname === "/baidu_tile_3d") {
            let x = _url.query.x;
            let y = _url.query.y;
            let l = _url.query.l;

            LoadBdmapTile(x, y, l, function (pData) {
                if (null !== pData) {
                    let jData = JSON.stringify(pData);

                    response.writeHead(200, { "Content-Type": "text/plain" });
                    response.write(jData);
                    response.end();
                }
                else {
                    let jData = JSON.stringify({ m_nCount: 0 });

                    response.writeHead(400, { "Content-Type": "text/plain" });
                    response.write(jData);
                    response.end();
                }
            });
        }
    }

    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

start();
