var app = new Vue({
  el: "#app",
  data: {
    items: null,
    keyword: "",
    message: ""
  },
  watch: {
    // 検索欄が更新されたらdebouncedGetAnswerを実行する
    keyword: function (newKeyword, oldKeyword) {
      console.log(newKeyword)
      this.message = "Waiting for you to srop typing..."
      this.debouncedGetAnswer()
    }
  },
  // Vueインスタンス生成時に実行される処理
  created: function () {
    // テスト用
    // this.keyword = "JavaScript"
    // this.getAnswer()

    // 指定時間内に同一の操作があれば処理を実行しない→apiへの接続を減らすため
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
  },
  methods: {
    getAnswer: function () {
      // 検索文字が何も指定されていなければ、itemsとmessageを空にする
      if (this.keyword === "") {
        this.items = null
        this.message = ""
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