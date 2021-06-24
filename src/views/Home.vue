<template>
  <div class="section-container">
    <section>Hello👋</section>
    <section>What are you listening?</section>
  </div>
  <div class="search-container">
    <el-input
      v-model="inputValue"
      placeholder="type the music you like..."
    ></el-input>
    <div class="icon" @click="iconClick"><i class="el-icon-search"></i></div>
  </div>
  <div class="playlists-container" ref="wrapper">
    <section class="playlists-title">
      Hot playlist
      <span style="font-size: 1.5rem">热门歌单</span>
    </section>
    <div class="playlists-item-container">
      <div class="playlists-item" v-for="item in playlistsData" :key="item.id">
        <img class="coverImg" :src="item.coverImgUrl" alt="歌单封面" />
        <section class="text">{{ item.name }}</section>
      </div>
    </div>
  </div>
  <div class="discover-container">
    <section class="discover-title">
      Discover
      <!-- <span style="font-size: 1.5rem">发现</span> -->
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import request from "../utils/request";
import BScroll from "@better-scroll/core";

export default defineComponent({
  name: "Home",
  created() {
    this.$nextTick(() => {
      new BScroll(this.$refs.wrapper, {
        scrollX: true,
        bounce: true,
        specifiedIndexAsContent: 1,
      });
    });
  },
  setup() {
    const data = reactive({
      inputValue: "",
      playlistsData: [],
    });

    // 获取热门歌单
    const getPlaylists = async (): Promise<void> => {
      const res = await request.get("/top/playlist", {
        params: {
          order: "hot",
          limit: "10",
        },
      });
      data.playlistsData = res.playlists;
    };
    getPlaylists();

    // 获取discover
    const getDiscover = async (): Promise<void> => {
      const res = await request.get("/banner?type=2");
      console.log(res);
    };
    getDiscover();

    // 搜索按钮
    const iconClick = (): void => {
      console.log("icon click", data.inputValue);
    };

    const RefsData = toRefs(data);
    return {
      ...RefsData,
      iconClick,
    };
  },
});
</script>
<style>
/* 替换el-input样式 */
.el-input__inner {
  padding: 2.5rem 2.5rem !important;
  padding-right: 5rem !important;
  font-style: italic !important;
  border: 1px solid #fff !important;
  border-radius: 1rem !important;
  box-shadow: 0.1rem 0.2rem 1.5rem 0 rgba(0, 0, 0, 0.1);
}
</style>
<style lang="scss" scoped>
.section-container {
  font-weight: 800;
  font-size: 2.5rem;
  section {
    margin: 1rem 0;
  }
}
.search-container {
  margin: 3rem 0;
  position: relative;

  .icon {
    font-size: 2rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 4rem;
    height: 4rem;
    text-align: center;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    border: 1px solid #fff !important;
    i {
      margin-top: 1rem;
      display: inline-block;
    }
  }
}
.playlists-container {
  .playlists-title {
    font-weight: 800;
    font-size: 2rem;
  }
  .playlists-item-container {
    margin-top: 1.5rem;
    display: flex;
    width: 160rem;

    .playlists-item {
      padding: 1.2rem;
      margin-right: 1.5rem;
      border-radius: 1rem;
      border: 1px solid #fff;
      box-shadow: 0 0.2rem 1.2rem 0 rgba(0, 0, 0, 0.1);
      .coverImg {
        width: 12rem;
        border-radius: 1rem;
        box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.1);
      }
      .text {
        width: 12rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 1.2rem 0 0.5rem 0;
        font-weight: 800;
        font-size: 1.2rem;
      }
    }
  }
}
.discover-container {
  margin-top: 3rem;
  .discover-title {
    font-weight: 800;
    font-size: 2rem;
  }
}
</style>
