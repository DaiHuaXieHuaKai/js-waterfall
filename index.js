window.onload = function () {
    img_location("container", "box");
    //定义json字符串来模拟数据
    var img_data = {
        "data": [{
            "src": "a.jpg"
        }, {
            "src": "b.jpg"
        }, {
            "src": "c.jpg"
        }, {
            "src": "d.jpg"
        }, {
            "src": "e.jpg"
        }, {
            "src": "f.jpg"
        }, {
            "src": "g.jpg"
        }, {
            "src": "h.jpg"
        }, {
            "src": "i.jpg"
        }, {
            "src": "j.jpg"
        }, {
            "src": "k.jpg"
        }, {
            "src": "l.jpg"
        }, {
            "src": "m.jpg"
        }, {
            "src": "n.jpg"
        }, {
            "src": "o.jpg"
        }]
    };
    window.onscroll = function () {
        if (check_csroll()) {
            var dparent = document.getElementById("container");
            for (var i = 0; i < img_data.data.length; i++) {
                var dcontent = document.createElement("div"); //创建节点
                dcontent.className = "box";//为节点添加类名
                dparent.appendChild(dcontent);//添加根元素
                var boximg = document.createElement("div");//创建节点
                boximg.className = "box_img";//为节点添加类名
                dcontent.appendChild(boximg);//添加根元素
                var img = document.createElement("img");//创建节点
                img.src = "images/" + img_data.data[i].src;//图片加载路径
                boximg.appendChild(img);//添加根元素
            }
        }
        img_location("container", "box");//调用函数再一次执行图片的布局
    }
};

function check_csroll() {
    var parentNode = document.getElementById("container"); //获取父元素container
    var childArray = parentNode.getElementsByClassName("box");//获取父元素下所有的类名为box的元素
    var last_content_height = childArray[childArray.length - 1].offsetTop; //获取最后一张图片到顶的距离
    var scroll_top = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动条到顶的距离
    var page_height = document.documentElement.clientHeight || document.body.clientHeight; //获取屏幕高度
    if (last_content_height < scroll_top + page_height) {
        return true;
    }
}

function img_location(parent, content) {
    var parentNode = document.getElementById(parent); //获取父元素container
    var childArray = parentNode.getElementsByClassName(content);//获取父元素下所有的类名为box的元素

    var img_width = childArray[0].offsetWidth; //获取图片宽度
    var win_width = document.documentElement.clientWidth; //获取屏幕宽度
    var num = Math.floor(win_width / img_width); //获得一排摆的个数 用Math.floor()转换为整数
    parentNode.style.cssText = "width:" + img_width * num + "px; margin:0 auto"; //固定container的宽并设置居中

    var image_location = min_image_locatin(num, childArray);//将图片放在高度最低的图片下

}

function min_image_locatin(num, childArray) {
    var box_height_array = [];//定义数组用于存放所有图片的高度
    for (var i = 0; i < childArray.length; i++) { //遍历所有图片
        if (i < num) {
            box_height_array[i] = childArray[i].offsetHeight; //取得第一排图片的高度
        } else {
            var min_height = Math.min.apply(null, box_height_array); //获取第一排图片中高度最小的图片
            var min_index = get_min_height(box_height_array, min_height); //函数获得高度最小的图片的位置
            childArray[i].style.position = "absolute"; //绝对定位图片
            childArray[i].style.top = min_height + "px"; //图片距顶部像素
            childArray[i].style.left = childArray[min_index].offsetLeft + "px"; //图片距左的像素
            box_height_array[min_index] = box_height_array[min_index] + childArray[i].offsetHeight; //将最低高度的box的高度加上它下方的box高度
        }
    }
}

function get_min_height(box_height_array, min_height) {
    for (var i in box_height_array) {
        if (box_height_array[i] == min_height) { //循环所有数组的高度 让它等于最小图片的高度 返回i值
            return i;
        }
    }
}

