export default [
    {
        path: '/user',
        name: 'User',
        meta: {
            title: '个人',
            index: 0,y:0
        },
        component:
            () => import('@/views/User/User'),
    },
    {
        path: '/user/myaddress',
        name: 'MyAddress',
        meta: {
            title: '地址管理',
            index: 1,y:0
        },
        component:
            () => import('@/views/User/MyAddress'),
    },
    {
        path: '/user/pushaddlist',
        name: 'PushAddlist',
        meta: {
            title: '添加地址',
            index: 2,y:0
        },
        component:
            () => import('@/views/User/Child/PushAddlist'),
    },
    {
        path: '/user/setpage',
        name: 'SetPage',
        meta: {
            title: '设置',
            index: 2,y:0
        },
        component:
            () => import('@/views/User/Child/SetPage'),
    },
    {
        path: '/user/aboutapp',
        name: 'AboutApp',
        meta: {
            title: '关于',
            index: 3,y:0
        },
        component:
            () => import('@/views/User/Child/AboutApp'),
    },
    {
        path: '/user/userdetail',
        name: 'UserDetail',
        meta: {
            title: '个人信息',
            index: 3,y:0
        },
        component:
            () => import('@/views/User/Child/UserDetail'),
    },
    {
        path: '/user/editer',
        name: 'Editer',
        meta: {
            title: '编辑个人信息',
            index: 6,y:0
        },
        component:
            () => import('@/views/User/Child/Editer'),
    },
    {
        path: '/user/replacement',
        name: 'Replacement',
        meta: {
            title: '重置密码',
            index: 7,y:0
        },
        component:
            () => import('@/views/User/Child/Replacement'),
    },
    {
        path: '/user/eaditeraddlist',
        name: 'EaditerAddlist',
        meta: {
            title: '编辑地址',
            index: 2,y:0
        },
        component:
            () => import('@/views/User/Child/EaditerAddlist'),
    },
    {
        path: '/user/collectiongoods',
        name: 'CollectionGoods',
        meta: {
            title: '收藏商品',
            index: 2,y:0
        },
        component:
            () => import('@/views/User/CollectionGoods'),
    },
    {
        path: '/user/collectiongoodsseac',
        name: 'CollectionGoodsSeac',
        meta: {
            title: '收藏商品',
            index: 2,y:0
        },
        component:
            () => import('@/views/User/CollectionGoodsSeac'),
    },
    {
        path: '/user/browsinghistory',
        name: 'BrowsingHistory',
        meta: {
            title: '浏览记录',
            index: 2,y:0
        },
        component:
            () => import('@/views/User/BrowsingHistory'),
    },
    
]