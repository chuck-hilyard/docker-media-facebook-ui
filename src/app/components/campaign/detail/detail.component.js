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

    this.trendChart = CampaignTrendChart;

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
    chart.data = [ [], [], [], [] ];
    chart.labels = ['13-17', '18-24', '24-34', '35-44', '45-54', '55-64', '65+'];

    for(let i = 1; i <= 7; i++) {
      chart.data[0].push(this.randomNumber(500));
      chart.data[1].push(this.randomNumber(500) );
      chart.data[2].push(this.randomNumber(500));
      chart.data[3].push(this.randomNumber(500));
    }

    chart.override = [
      {
        label: 'Male Impressions',
        backgroundColor: chart.colors.metric1.male,
        borderColor: chart.colors.metric1.male,
        stack: 'stack 0'
      },
      {
        label: 'Female Impressions',
        backgroundColor: chart.colors.metric1.female,
        borderColor: chart.colors.metric1.female,
        stack: 'stack 0'
      },
      {
        label: 'Male Spend',
        backgroundColor: chart.colors.metric2.male,
        borderColor: chart.colors.metric2.male,
        stack: 'stack 1'
      },
      {
        label: 'Female Spend',
        backgroundColor: chart.colors.metric2.female,
        borderColor: chart.colors.metric2.female,
        stack: 'stack 1'
      }
    ];

    chart.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              drawTicks: false
            }
          }
        ]
      }
    };
  }

  setDeviceChart() {
    let chart = this.deviceChart;
    let mobileColor = '#23a4a9';
    let desktopColor = '#7bc8cb';

    let totalCount = 100;
    let desktopCount = this.randomNumber(totalCount);

    chart.data = [
      desktopCount,
      (totalCount - desktopCount)
    ];
    chart.labels = ['Desktop', 'Mobile'];

    chart.colors = [desktopColor, mobileColor];

    chart.override = {
      hoverBackgroundColor: chart.colors
    };

    chart.options = {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 80,
      tooltips: {
        enabled: false
      },
      elements: {
        center: {
          line1: '46,555',
          line1Padding: 50,
          line2: 'Impressions',
          line2Padding: 50,
          fontFamily: '\'Roboto\', sans-serif',
          fontColor: '#394354'
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
