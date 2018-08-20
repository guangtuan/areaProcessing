(async () => {
    const china = require('./china.json');
    const dimensionReduce = transform => tree => tree.reduce((plane, node) => plane.concat(transform(node)), []);
    const cityToDistrict = ({
        provinceCode,
        provinceName,
        cityName,
        cityCode,
        districts
    }) => districts.map(
        ({
            name: districtName,
            code: districtCode
        }) => ({
            provinceCode,
            provinceName,
            districtName,
            districtCode,
            cityCode,
            cityName
        })
    );
    const provinceToCity = ({
        code: provinceCode,
        name: provinceName,
        children: districts
    }) => districts.map(
        ({
            name: cityName,
            code: cityCode,
            children: districts
        }) => ({
            provinceCode,
            provinceName,
            cityName,
            cityCode,
            districts
        })
    );
    console.log(dimensionReduce(cityToDistrict)((dimensionReduce(provinceToCity)(china))));
})();