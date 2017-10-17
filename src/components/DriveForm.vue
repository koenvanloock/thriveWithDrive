<template>
  <div>
    <h1 style='margin-bottom: 20px;'>Wat zijn de meest geliefde programmeertalen onder de tothepointers?</h1>
    <div class='container-fluid'>
      <div class='col-xs-8'>
        <div class='col-xs-4'>
          <ul>
            <li v-for="name in nameset">{{name}}</li>
          </ul>
        </div>
        <div id='pie' class='col-xs-4'></div>
        <button class='btn btn-default' v-on:click='updatePie'>Update</button>
      </div>
      <div>
        <form
          style='text-align: left'
          class='col-xs-4'
          method='post'
          action='https://docs.google.com/forms/d/e/1FAIpQLScV8JaPDa6TyMWB6e4ReuaT9Ij5XSeba4C4AIL9Sly3ZfS0eA/formResponse'>
          <div class='form-group'>
            <input id='name' placeholder='Naam' class='form-control' name='entry.1325692636' v-model='name'/>
          </div>
          <div class='form-group'>
            <div v-for='language in languages' class='form-check'>
              <input v-bind:id='language'
                     type='radio'
                     name='langChoice'
                     v-bind:value='language'
                     v-model='chosenLang'/>
              <label v-bind:for='language'>{{language}}</label>
            </div>
          </div>
          <div>
            <input hidden name='entry.1081420145' v-bind:value='chosenLang'/>
          </div>
          <button class='btn btn-primary'>Versturen</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DriveForm',
    data () {
      return {
        name: '',
        languages: ['Java', 'Javascript', 'Ruby', 'Python', 'Scala', 'Elixir', 'Other'],
        colors: {
          Scala: '#A60F2B',
          Java: '#0c2c8c',
          Javascript: '#f2ae3b',
          Ruby: '#e43a3c',
          Python: '#c9cb35',
          Elixir: '#7b145e',
          Other: '#48e43a'
        },
        chosenLang: '',
        dataset: [],
        nameset: []
      }
    },
    mounted () {
      this.updatePie()
    },
    methods: {
      drawPie () {
        let width = 360
        let height = 360
        let radius = Math.min(width, height) / 2

        this.$d3.select('#pie').select('*').remove()
        let svg = this.$d3.select('#pie')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')

        let arc = this.$d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        let pie = this.$d3.pie()
          .value((d) => { return d.count })
          .sort(null)
        svg.selectAll('path')
          .data(pie(this.dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', (d, i) => {
            return this.colors[d.data.label]
          })
        svg.selectAll('text')
          .data(pie(this.dataset))
          .enter()
          .append('text')
          .attr('fill', '#fff')
          .style('font-weight', 'bold')
          .attr('transform', (d) => {
            d.innerRadius = 0
            d.outerRadius = radius
            return 'translate(' + arc.centroid(d) + ')'
          })
          .style('font-size', '12px')
          .text((d) => d.data.count ? d.data.label : '')
      },
      updatePie () {
        this.$http.get('https://spreadsheets.google.com/feeds/list/1J8IrbhTV_-OmmekZmIE7-d42ze_opKMjDpwnCA4Fkcc/default/public/values?alt=json')
          .then((response) => {
            this.nameset = []
            let sheetRows = response.data.feed.entry.map(driveRow => {
              this.nameset.push(driveRow.gsx$naam.$t)
              return {
                'name': driveRow.gsx$naam.$t,
                'language': driveRow.gsx$watisjefavorieteprogrammeertaal.$t
              }
            })
            let groupedResult = countBy(sheetRows, 'language')
            this.dataset = []
            this.languages.map(language => {
              let timesLiked = groupedResult[language]
              this.dataset.push({label: language, count: timesLiked || 0})
            })
            this.drawPie()
          })
      }
    }
  }

  function countBy (xs, key) {
    return xs.reduce((acc, listItem) => {
      acc[listItem[key]] = (acc[listItem[key]] || 0) + 1
      return acc
    }, {})
  }
</script>

<style>
  h1{
    text-align: center;
  }
</style>
