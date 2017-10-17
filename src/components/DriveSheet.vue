<template>
  <div>
    <table>
      <tbody>
      <tr v-for="row in sheetRows">
        <td>{{row.datum}}</td>
        <td>{{row.dag}}</td>
        <td>{{row.toog}}</td>
        <td>{{row.lokaal}}</td>
        <td>{{row.voorraad}}</td>
      </tr>
      </tbody>
    </table>

  </div>

</template>

<script>
  export default {
    name: 'DriveSheet',
    data () {
      return {
        sheetRows: []
      }
    },
    mounted () {
      this.$http.get('https://spreadsheets.google.com/feeds/list/1R35GsMOHlSH7loeBFMgorVif5Ue1ZiO4rChmYosCwlY/default/public/values?alt=json')
        .then((response) => {
          this.sheetRows = response.data.feed.entry.map(driveRow => {
            return {
              'datum': driveRow.gsx$datum.$t,
              'dag': driveRow.gsx$dag.$t,
              'toog': driveRow.gsx$toog.$t,
              'lokaal': driveRow.gsx$lokaal.$t,
              'voorraad': driveRow.gsx$voorraad.$t,
              'opmerking': driveRow.gsx$opmerking.$t
            }
          })
        })
    }
  }
</script>
