<template lang="html">
	<div class="paging">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next,jumper"
          :total="totalNumber">
      </el-pagination>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
			currentPage: 1,
			pagerObj: {}
	      };
	    },
		props: {
			totalNumber:'',//总条数
			pageSize: '',
			type: ''
		},
	    mounted() {
	    },
	    methods: {
	        handleSizeChange(val) {
	            console.log(`每页 ${val} 条`);
	        },
	        handleCurrentChange(val) {
	        	this.$emit('currentPage',`${val}`); //向父组件传递 当前页面
			}
	      }
		}
	}
</script>

<style lang="scss" scoped>

</style>