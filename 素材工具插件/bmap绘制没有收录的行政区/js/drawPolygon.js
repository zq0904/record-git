function drawPolygon(map, points, fillColor, strokeColor) { // 地图实例 点位 填充色(透明) 边框颜色（红色）
    if (typeof (points[0][0]) === 'undefined') { // 一维
        core(points, fillColor, strokeColor);
    } else { // 二维
        if (!fillColor) {
            points.forEach(function (e, i) {
                core(e, false, strokeColor);
            });
            return false;
        }
        if (fillColor[0].length === 1) { // 一维
            points.forEach(function (e, i) {
                core(e, fillColor, strokeColor);
            });
        } else { // 二维
            points.forEach(function (e, i) {
                core(e, fillColor[i], strokeColor);
            });
        }
    }
    function core(p, f, s) {
        Polygon = new BMap.Polygon(p, { fillColor: f || 'rgba(0,0,0,0)', strokeWeight: 2, strokeColor: s || "red" }); // 绘制多边形
        map.addOverlay(Polygon); // 添加Polygon覆盖物
    }
}
var siteMap = [
    new BMap.Point(116.497981, 40.100746),
    new BMap.Point(116.500532, 40.100898),
    new BMap.Point(116.503119, 40.100953),
    new BMap.Point(116.505293, 40.101091),
    new BMap.Point(116.507521, 40.101187),
    new BMap.Point(116.510395, 40.101215),
    new BMap.Point(116.51539, 40.101546),
    new BMap.Point(116.518983, 40.10185),
    new BMap.Point(116.523834, 40.102567),
    new BMap.Point(116.527319, 40.103091),
    new BMap.Point(116.530661, 40.10356),
    new BMap.Point(116.53041, 40.107437),
    new BMap.Point(116.529996, 40.11181),
    new BMap.Point(116.530356, 40.111769),
    new BMap.Point(116.532889, 40.111645),
    new BMap.Point(116.536284, 40.111534),
    new BMap.Point(116.538746, 40.111479),
    new BMap.Point(116.539734, 40.111797),
    new BMap.Point(116.541135, 40.111314),
    new BMap.Point(116.543417, 40.111231),
    new BMap.Point(116.546112, 40.110969),
    new BMap.Point(116.54834, 40.110693),
    new BMap.Point(116.550047, 40.110431),
    new BMap.Point(116.553352, 40.111134),
    new BMap.Point(116.555742, 40.111645),
    new BMap.Point(116.557736, 40.112031),
    new BMap.Point(116.561572, 40.112769),
    new BMap.Point(116.562775, 40.10761),
    new BMap.Point(116.565291, 40.107761),
    new BMap.Point(116.567608, 40.107637),
    new BMap.Point(116.567465, 40.10634),
    new BMap.Point(116.566854, 40.102774),
    new BMap.Point(116.575046, 40.101725),
    new BMap.Point(116.574903, 40.097089),
    new BMap.Point(116.574759, 40.09444),
    new BMap.Point(116.5744, 40.088755),
    new BMap.Point(116.574471, 40.085885),
    new BMap.Point(116.574112, 40.081137),
    new BMap.Point(116.574256, 40.077935),
    new BMap.Point(116.57519, 40.07396),
    new BMap.Point(116.576196, 40.069598),
    new BMap.Point(116.576915, 40.067555),
    new BMap.Point(116.577633, 40.063414),
    new BMap.Point(116.578208, 40.059051),
    new BMap.Point(116.579071, 40.053197),
    new BMap.Point(116.579071, 40.049884),
    new BMap.Point(116.578927, 40.046791),
    new BMap.Point(116.578496, 40.044581),
    new BMap.Point(116.577346, 40.043366),
    new BMap.Point(116.576052, 40.042261),
    new BMap.Point(116.567429, 40.046791),
    new BMap.Point(116.559092, 40.051099),
    new BMap.Point(116.554349, 40.053418),
    new BMap.Point(116.552589, 40.056097),
    new BMap.Point(116.552481, 40.059245),
    new BMap.Point(116.552229, 40.063083),
    new BMap.Point(116.550864, 40.065429),
    new BMap.Point(116.54242, 40.072166),
    new BMap.Point(116.539042, 40.075009),
    new BMap.Point(116.533868, 40.077742),
    new BMap.Point(116.529772, 40.078101),
    new BMap.Point(116.525604, 40.077907),
    new BMap.Point(116.521507, 40.077162),
    new BMap.Point(116.518453, 40.077756),
    new BMap.Point(116.515614, 40.079467),
    new BMap.Point(116.513189, 40.081247),
    new BMap.Point(116.510746, 40.083525),
    new BMap.Point(116.505733, 40.087168),
    new BMap.Point(116.502499, 40.089362),
    new BMap.Point(116.499158, 40.09186),
    new BMap.Point(116.497918, 40.093861),
    new BMap.Point(116.497469, 40.095751)
];

// 使用方法引入drawPolygon.js工具 修改siteMap点位
// 绘制行政区
drawPolygon(map, siteMap); // 地图实例 点位 填充色(透明) 边框颜色（红色）