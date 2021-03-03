<template>
    <div class="recommend_main">
        <div class="carousel_map">
            <template>
                <el-carousel :interval="4000" type="card" height="170px">
                    <el-carousel-item v-for="item in img" :key="item.id">
                        <img :src="item.url" alt="无图片" style="width:100% ; height:100%">
                    </el-carousel-item>
                </el-carousel>
            </template>
        </div>
        <div>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
            666666<br>
        </div>
    </div>
    
</template>
<script>
export default {
    data() {
        return {
            img:[
                {
                    url:require("@/assets/img/banner1.jpg"),
                    id:1
                },
                {
                    url:require("@/assets/img/banner2.jpg"),
                    id:2
                },
                {
                    url:require("@/assets/img/banner3.jpg"),
                    id:3
                },
                {
                    url:require("@/assets/img/banner4.jpg"),
                    id:4
                },
                {
                    url:require("@/assets/img/banner5.jpg"),
                    id:5
                },
                {
                    url:require("@/assets/img/banner6.jpg"),
                    id:6
                }
            ]
        }
    }
}
</script>
<style >
    .recommend_main{
        height: 93%;
        overflow: scroll;
    }
    .carousel_map{
        width: 90%;
        margin: auto;
        max-width: 1100px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
        widows: 400px;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
        widows: 400px;
    }
</style>