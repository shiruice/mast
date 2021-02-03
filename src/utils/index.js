import {
    getFunction,
    postFunction,
    putFunction,
    deleteFunction
  } from "@/utils/request";

// 获取省级名称
export function getProvince() {
    return getFunction(`/api/location-service/region/provinces-based-id`)
}

// 获取id下级区域
export function getCity(id) {
    return getFunction(`/api/location-service/region/${id}/subs`)
}


// 地址树状图
export function addressTree() {
    return getFunction(`/api/location-service/region/threeleveltree-startwith-province`)
}