var app = new Vue({
  el: "#app",
  data: {
    items: null,
    keyword: "",
    message: ""
  },
  watch: {

  },
  // Vueインスタンス生成時に実行される処理
  created: function () {
    // テスト用
    this.keyword = "JavaScript"
    this.getAnswer()
  },
  methods: {
    getAnswer: function () {
      // 検索文字が何も指定されていなければ、itemsを空にする
      if (this.keyword === "") {
        this.item = null
        return
      }

      // 画面にLoadingの文字を表示
      this.message = "Loading..."
      // thisはvueインスタンス
      var vm = this
      // 検索条件を指定
      var params = { page: 1, per_page: 20, query: this.keyword }
      // apiから情報を取得
      axios.get("https://qiita.com/api/v2/items", { params })
        .then(function (response) {
          console.log(response)
          // itemsに取得したデータを格納
          vm.items = response.data
        })
        .catch(function (error) {
          vm.message = "Error!" + error
        })
        .finally(function () {
          vm.message = ""
        })
    }
  }
})