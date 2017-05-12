import template from './detail.html';

class Controller {

  constructor($filter, $http, $scope, CampaignDetailService, CampaignTrendChart, Session) {
    'ngInject';
    // Anuglar
    this.$filter = $filter;
    this.$http = $http;
    this.$scope = $scope;

    // Local Vars
    this.metrics = this.setMetrics();
    this.session = Session;
    this.service = CampaignDetailService;

    this.trendChart = angular.copy(CampaignTrendChart);

    // FPO RANDOM CHART DATA
    // TODO: REPLACE
    this.demographicChart = {};
    this.setDemographicChart();
    this.deviceChart = {};
    this.setDeviceChart();
  }

  $onInit() {
    this.campaign = this.campaignRequest.data.campaign;
    this.getTrendData();

    this.$scope.$watch(() => this.session.dateRange, () => {
      this.getTrendData();
    }, true);
  }

  getTrendData() {
    let params = this.getTrendParams();
    this.service.getTrendData(this.campaign.mcid, params)
      .then((response) => {
        this.trendChart.build('bar', response.data, this.metrics.trend);
      })
      .catch((error) => {
        throw new Error(JSON.stringify(error));
      });
  }

  getTrendParams() {
    let start = this.$filter('date')(this.session.dateRange.start, 'yyyy-MM-dd');
    let end = this.$filter('date')(this.session.dateRange.end, 'yyyy-MM-dd');
    let metrics = this.metrics.trend.map((item) => item.id);
    return {
      dates: `${start},${end}`,
      metrics: metrics.toString()
    };
  }

  setMetrics() {
    let options = [
      {
        id: 'impressions',
        format: 'int',
        label: 'Impressions',
        type: 'line'
      },
      {
        id: 'clicks',
        format: 'int',
        label: 'Clicks',
        type: 'line'
      },
      {
        id: 'ctr',
        format: 'float',
        label: 'CTR',
        type: 'line'
      },
      {
        id: 'spend',
        format: 'currency',
        label: 'Spend',
        type: 'bar'

      }
    ];
    return {
      options: options,
      demographics: [
        options.find((item) => item.id === 'impressions'),
        options.find((item) => item.id === 'spend')
      ],
      trend: [
        options.find((item) => item.id === 'impressions'),
        options.find((item) => item.id === 'spend')
      ]
    };
  }

  metricFilter(attr, index) {
    return this.metrics.options.filter((item) => {
      if(this.metrics[attr][index].id !== item.id) {
        return item;
      }
    });
  }

  // FPO RANDOM CHART DATA
  // TODO: REPLACE
  randomNumber(multiplier, roundMethod) {
    switch(roundMethod) {
    case 'none':
      return Math.random() * multiplier;
    case 'ceil':
      return Math.ceil(Math.random() * multiplier);
    case 'floor':
    default:
      return Math.floor(Math.random() * multiplier);
    }
  }

  setDemographicChart() {
    let chart = this.demographicChart;

    chart.colors = {
      metric1: {
        male: '#23a4a9',
        female: '#7bc8cb'
      },
      metric2: {
        male: '#bdd964',
        female: '#d7e8a2'
      }
    };

    chart.chart = {
      type: 'horizontalBar',
      data: {
        labels: ['13-17', '18-24', '24-34', '35-44', '45-54', '55-64', '65+'],
        datasets: [
          {
            label: 'Male Impressions',
            data: [],
            backgroundColor: chart.colors.metric1.male,
            borderColor: chart.colors.metric1.male,
            stack: 'impressions'
          },
          {
            label: 'Female Impressions',
            data: [],
            backgroundColor: chart.colors.metric1.female,
            borderColor: chart.colors.metric1.female,
            stack: 'impressions'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    };

    for(let i = 1; i <= 8; i++) {
      chart.chart.data.datasets[0].data.push(this.randomNumber(500));
      chart.chart.data.datasets[1].data.push(this.randomNumber(500) * -1);
    }
  }

  setDeviceChart() {
    let chart = this.deviceChart;
    let mobileColor = '#23a4a9';
    let desktopColor = '#7bc8cb';

    let totalCount = 100;
    let desktopCount = this.randomNumber(totalCount);

    chart.chart = {
      type: 'pie',
      data: {
        labels: [
          'Desktop',
          'Mobile'
        ],
        datasets: [{
          data: [
            desktopCount,
            (totalCount - desktopCount)
          ],
          backgroundColor: [
            desktopColor,
            mobileColor
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        cutoutPercentage: 80,
        elements: {
          center: {
            line1: '46,555',
            line1Padding: 50,
            line2: 'Impressions',
            line2Padding: 50,
            fontColor: '#394354'
          }
        }
      }
    };

  }

}

export default {
  template: template,
  controller: Controller,
  bindings: {
    campaignRequest: '<'
  }
};
