<template>
  <v-card>
    <Navbar/>
    <NavDrawer/>
    <!-- 创建新项目后弹出的提示框 -->
    <Snackbar title="You added a new project."/>
  </v-card>
</template>

<script>
import Navbar from "@/components/Navbar";
import NavDrawer from "@/components/NavDrawer";
import Snackbar from "@/components/Snackbar";

export default {
  components: {
    Navbar,
    NavDrawer,
    Snackbar,
  },
}
</script>