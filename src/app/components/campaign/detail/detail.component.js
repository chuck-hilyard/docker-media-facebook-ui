import template from './detail.html';
import TrendChart from './charts/trend-chart';

class Controller {

  constructor($filter, $http, $scope, CampaignDetailService, Session) {
    'ngInject';
    // Anuglar
    this.$filter = $filter;
    this.$http = $http;
    this.$scope = $scope;

    // Local Vars
    this.metrics = this.setMetrics();
    this.session = Session;
    this.service = CampaignDetailService;

    this.trendChart = {};

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

    this.$scope.$watch(() => this.metrics.trend, () => {
      this.getTrendData();
    }, true);
  }

  getTrendData() {
    let params = this.getTrendParams();
    this.service.getTrendData(this.campaign.mcid, params)
      .then((response) => {
        this.trendChart = new TrendChart(response.data, this.metrics.trend, this.$filter);
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
    let maleColor = '#f67002';
    let femaleColor = '#faa967';

    chart.data = [ [], [] ];
    chart.labels = ['13-17', '18-24', '24-34', '35-44', '45-54', '55-64', '65+'];

    for(let i = 1; i <= 7; i++) {
      chart.data[0].push(this.randomNumber(500));
      chart.data[1].push(this.randomNumber(500) * -1);
    }

    chart.override = [
      {
        label: 'Male',
        stack: 'gender',
        backgroundColor: maleColor,
        borderColor: maleColor
      },
      {
        label: 'Female',
        stack: 'gender',
        backgroundColor: femaleColor,
        borderColor: femaleColor
      }
    ];

    chart.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            drawBorder: false
          },
          ticks: {
            callback: (dataLabel) => {
              return dataLabel < 0 ? dataLabel * -1 : dataLabel;
            }
          }
        }],
        yAxes: [{
          stacked: true,
          gridLines: {
            display: false
          }
        }]
      },
      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {

          label: (tooltipItem, data) => {
            let index = tooltipItem.index;
            let male = data.datasets[0].data[index];
            let female = data.datasets[1].data[index] * -1;
            return [
              `Male: ${male}`,
              `Female: ${female}`
            ];
          }
        }
      }

    };
  }

  setDeviceChart() {
    let chart = this.deviceChart;
    let mobileColor = '#f67002';
    let desktopColor = '#faa967';

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
